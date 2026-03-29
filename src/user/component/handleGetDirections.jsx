import { toast } from "react-hot-toast";

/* =========================
   📍 GET USER LOCATION (HOOK)
========================= */
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      }
    );
  });
};

/* =========================
   🚀 HANDLE DIRECTIONS
========================= */
const handleGetDirections = async (coord) => {
  try {
    console.log(coord);
    // ✅ 1. Get property coordinates
    const coords = coord?.coordinates;

    if (!coords || coords.length < 2) {
      return toast.error("Property location missing ❌");
    }

    const [lng, lat] = coords;

    if (lat == null || lng == null) {
      return toast.error("Invalid location data ❌");
    }

    let userLocation = null;

    // ✅ 2. Try to get user location
    try {
      userLocation = await getUserLocation();
    } catch (err) {
      console.warn("User location not available:", err);
    }

    // ✅ 3. If user location exists → directions
    if (userLocation?.lat && userLocation?.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}`;

      window.open(url, "_blank");
      return;
    }

    // ✅ 4. Fallback → just open location
    const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(fallbackUrl, "_blank");

  } catch (error) {
    console.error(error);
    toast.error("Unable to open directions ❌");
  }
};

export default handleGetDirections;