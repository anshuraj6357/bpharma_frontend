import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB7ivr8Ekt2FXW4xEXABm-pY1atVSQBjWM",
  authDomain: "roomgi.firebaseapp.com",
  projectId: "roomgi",
  storageBucket: "roomgi.firebasemstorage.app",
  messagingSenderId: "15819721748",
  appId: "1:15819721748:web:b2fcfbc82bd1222b88eb01",
};

const app = initializeApp(firebaseConfig);

// 🔥 FCM messaging instance
export const messaging = getMessaging(app);
