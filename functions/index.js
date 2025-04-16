const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Subscribe a device to a topic
exports.subscribeToTopic = functions.https.onRequest(async (req, res) => {
  const { token, topic } = req.body;
  try {
    await admin.messaging().subscribeToTopic(token, topic);
    res.status(200).send({ success: true, message: `Subscribed to ${topic}` });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Send notification to topic
exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const { title, body, topic } = req.body;
  const message = {
    notification: { title, body },
    topic,
  };

  try {
    await admin.messaging().send(message);
    res.status(200).send({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});