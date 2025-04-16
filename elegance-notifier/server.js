require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/notify', async (req, res) => {
  const { name, service, date, time } = req.body;

  const notificationData = {
    app_id: process.env.ONESIGNAL_APP_ID,
    included_segments: ['Subscribed Users'],
    headings: { en: 'New Booking Received!' },
    contents: {
      en: `${name} booked a ${service} on ${date} at ${time}`
    },
    url: 'https://elegancestudiomy.com/admin.html'
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', notificationData, {
      headers: {
        'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, message: 'Notification sent!', response: response.data });
  } catch (error) {
    console.error('Notification error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Notification server is running!");
});

app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
});