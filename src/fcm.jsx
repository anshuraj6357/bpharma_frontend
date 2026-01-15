import { getToken } from "firebase/messaging";
import { messaging } from "./firebase.jsx";

export const getFCMToken = async () => {
  console.log("STEP 1: getFCMToken function called");

  try {
    console.log("STEP 2: Requesting notification permission...");
    const permission = await Notification.requestPermission();
    console.log("STEP 3: Permission result =", permission);

    if (permission !== "granted") {
      console.log("STEP 4: Permission NOT granted ❌");
      alert("Please allow notifications");
      return null;
    }

    console.log("STEP 5: Permission granted ✅");

    console.log("STEP 6: Registering Service Worker...");
    const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("STEP 7: Service Worker registered =", swReg);

    console.log("STEP 8: Waiting for Service Worker to be ready...");
    await navigator.serviceWorker.ready;
    console.log("STEP 9: Service Worker is READY ✅");

    console.log("STEP 10: Generating FCM Token...");
    const token = await getToken(messaging, {
      vapidKey: "BO-1Yh03vKr146F3TGt1CtEY6VcyKbiJpTby1dOCBcVHFLD9s-bM78s4n2Bld5zGN_74Npc-pdbapJHH3k1u460",
      serviceWorkerRegistration: swReg,
    });

    console.log("STEP 11: FCM Token =", token);

    if (!token) {
      console.log("STEP 12: Token is NULL ❌");
      return null;
    }

    console.log("STEP 13: Token generated successfully ✅");
    return token;

  } catch (err) {
    console.error("STEP ERROR: Something failed ❌", err);
    return null;
  }
};
