import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }
  try {
    const { data: slotData, error: slotError } = await supabase
      .from("pickup_slots")
      .select("*");

    if (slotError) {
      return res.status(500).json({
        message: "Error occured in fetching slot data",
        error: slotError,
      });
    }

    const {
      student_name,
      matric_number,
      phone_number,
      email,
      hostel,
      room_number,
      pickup_day,
      package_id,
    } = req.body;
    if (
      !student_name ||
      !matric_number ||
      !phone_number ||
      !email ||
      !hostel ||
      !room_number ||
      !pickup_day ||
      !package_id
    ) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const chosenSlot = slotData.find((slot) => slot.day === pickup_day);
    if (!chosenSlot) {
      return res.status(400).json({ message: "Invalid pickup day selected" });
    }
    if (chosenSlot.booked >= chosenSlot.capacity) {
      return res
        .status(400)
        .json({ message: "Pickup slot exceeded for chosen day" });
    }
    const ticketCode = `TF-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
    const { data: packageData } = await supabase
      .from("packages")
      .select("price")
      .eq("id", package_id)
      .single();
    if (!packageData) {
      return res.status(400).json({ message: "Invalid package selected" });
    }
    const { data: _, error: insertError } = await supabase
      .from("orders")
      .insert({
        ticket_code: ticketCode,
        student_name: student_name,
        matric_number: matric_number,
        phone_number: phone_number,
        email: email,
        hostel: hostel,
        room_number: room_number,
        pickup_day: pickup_day,
        package_id: package_id,
        payment_status: "pending",
      })
      .select();

    if (insertError) {
      return res.status(500).json({
        message: "Error occured in fetching availability data",
        error: insertError,
      });
    }

    //   paystack initiallization
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          amount: packageData.price,
          reference: ticketCode,
          callback_url: "https://tradefair-nu.vercel.app/order/success",
        }),
      },
    );
    const paystackData = await paystackResponse.json();
    return res.status(200).json({
      message: "Success",
      authorization_url: paystackData.data.authorization_url,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error happened in creating order", error: error });
  }
}
