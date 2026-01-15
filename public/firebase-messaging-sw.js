importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB7ivr8Ekt2FXW4xEXABm-pY1atVSQBjWM",
  authDomain: "roomgi.firebaseapp.com",
  projectId: "roomgi",
  storageBucket: "roomgi.firebasestorage.app",
  messagingSenderId: "15819721748",
  appId: "1:15819721748:web:b2fcfbc82bd1222b88eb01",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
