// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCiBpaaAixmnfqL6yagfpis_C9fexqZRPI",
  authDomain: "elegance-studio-new.firebaseapp.com",
  projectId: "elegance-studio-new",
  storageBucket: "elegance-studio-new.appspot.com",
  messagingSenderId: "171817759674",
  appId: "1:171817759674:web:fc2bb17a44dbb3be296383"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = "New Booking Alert!";
  const notificationOptions = {
    body: payload.notification.body || "You have a new booking.",
    icon: '/touch-icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});