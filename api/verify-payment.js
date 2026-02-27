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
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).json({ message: "Invalid signature" });
    }
    const event = req.body.event;
    const reference = req.body.data.reference;

    if (event === "charge.success") {
      const { error: updateError } = await supabase
        .from("orders")
        .update({ payment_status: "paid" })
        .eq("ticket_code", reference);
      if (updateError) {
        return res.status(500).json({ message: "Failed to update order" });
      }
    }
    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured in verify payment script" });
  }
}
