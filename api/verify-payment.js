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
    // const hash = crypto
    //   .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    //   .update(JSON.stringify(req.body))
    //   .digest("hex");

    // if (hash !== req.headers["x-paystack-signature"]) {
    //   return res.status(401).json({ message: "Invalid signature" });
    // }
    // Flutterwave sends a hash in the headers
    const flwHash = req.headers["verif-hash"];
    if (flwHash !== process.env.FLW_WEBHOOK_HASH) {
      return res.status(401).json({ message: "Invalid signature" });
    }
    const event = req.body.event;
    const reference = req.body.data.tx_ref;
    // const event = req.body.event;
    // const reference = req.body.data.reference;

    if (event === "charge.completed") {
      const { data: orderData, error: fetchError } = await supabase
        .from("orders")
        .select("*")
        .eq("ticket_code", reference)
        .single();

      if (fetchError || !orderData) {
        return res.status(404).json({ message: "Order not found" });
      }

      const { error: updateError } = await supabase
        .from("orders")
        .update({ payment_status: "paid" })
        .eq("ticket_code", reference);

      if (updateError) {
        return res.status(500).json({ message: "Failed to update order" });
      }

      // Check VR eligibility — only for Package B, first 50 orders
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "paid")
        .eq("vr_eligible", true);

      if (count < 50) {
        // Check if this order is Package B
        const { data: pkgCheck } = await supabase
          .from("packages")
          .select("name")
          .eq("id", orderData.package_id)
          .single();

        if (
          pkgCheck?.name?.toLowerCase().includes("package b") ||
          pkgCheck?.name?.toLowerCase().includes("beef rice")
        ) {
          await supabase
            .from("orders")
            .update({ vr_eligible: true })
            .eq("ticket_code", reference);
        }
      }

      await supabase.rpc("increment_slot", { slot_day: orderData.pickup_day });

      const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Maxie's Kitchen", email: "agamahalvin@gmail.com" },
          to: [{ email: orderData.email, name: orderData.student_name }],
          subject: "🎫 Your Maxie's Kitchen Ticket is Confirmed!",
          htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: white; padding: 32px; border-radius: 12px;">
          <h1 style="color: #f97316;">🎉 Order Confirmed!</h1>
          <p>Hi ${orderData.student_name},</p>
          <p>Your order has been confirmed. Here are your details:</p>
          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <p style="color: #f97316; font-size: 24px; font-weight: bold;">🎫 ${orderData.ticket_code}</p>
            <p>📅 Pickup: Day ${orderData.pickup_day}</p>
            <p>📍 Present this ticket at the Maxie's Kitchen stand</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderData.ticket_code}" alt="QR Code" style="margin: 16px 0;"/>
          </div>
          <p style="color: #999; font-size: 12px;">Keep this email safe. See you at the trade fair!</p>
        </div>
    `,
        }),
      });
      const brevoResult = await brevoResponse.json();
      console.log("brevo result:", JSON.stringify(brevoResult));
    }
    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured in verify payment script",
      error: error,
    });
  }
}
