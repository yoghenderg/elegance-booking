// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHe01XhD8eXevSTp0Dk4PL0UMLgf0VbsM",
  authDomain: "elegance-studio-booking.firebaseapp.com",
  projectId: "elegance-studio-booking",
  storageBucket: "elegance-studio-booking.appspot.com",
  messagingSenderId: "532571364052",
  appId: "1:532571364052:web:2b7345e5a54f4687747941",
  measurementId: "G-9B46QH43E7"
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