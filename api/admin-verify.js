export default async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123";

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, token: "maxies_kitchen_admin_session_token" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
}
