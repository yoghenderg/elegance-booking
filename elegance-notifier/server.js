import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/notify", async (req, res) => {
  const { title, message } = req.body;

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${process.env.ONESIGNAL_API_KEY}`
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: message },
      included_segments: ["Subscribed Users"]
    })
  });

  const result = await response.json();
  console.log("OneSignal Response:", result);
  res.status(200).json({ success: true, result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});