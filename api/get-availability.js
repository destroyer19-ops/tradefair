import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function (req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { data, error } = await supabase.from("pickup_slots").select("*");

    if (error) {
      return res.status(500).json({
        error: "Error occured in fetching availability data",
      });
    }
    return res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured in get availability script",
      error: error,
    });
  }
}
