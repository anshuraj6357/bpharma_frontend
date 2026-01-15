




import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Loader2, Navigation, Share2, Star, BadgeCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SkeletonLoader from "./loader/skeletondetails.jsx";
import { useProfileQuery } from "../Bothfeatures/features/api/authapi";

import AuthModal from "../components/AuthModal";
import { useGetPgByIdQuery } from "../Bothfeatures/features/api/allpg.js";
import {
  useRazorpayPaymentVerifyMutation,
  useRazorpayPaymentMutation,
} from "../Bothfeatures/features2/api/paymentapi";

/* ============================
   RAZORPAY SCRIPT LOADER
============================ */
/* ============================
   RAZORPAY SCRIPT LOADER
============================ */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    console.log("💡 Loading Razorpay script...");
    if (window.Razorpay) {
      console.log("✅ Razorpay script already loaded");
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.error("❌ Razorpay script failed to load");
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/* ============================
   BOOKING STATUS POLLING
============================ */
function startBookingStatusPolling(bookingId, navigate, setIsConfirmingBooking) {
  console.log("🔁 Starting booking status polling for bookingId:", bookingId);
  const MAX_RETRIES = 20; // ~1 minute
  let attempts = 0;

  const interval = setInterval(async () => {
    attempts++;
    console.log(`⏳ Polling attempt ${attempts} for bookingId ${bookingId}`);

    try {
      const res = await fetch(
        `https://roomgi-backend-project-2.onrender.com/api/payment/status/${bookingId}`,
        { credentials: "include" }
      );
      console.log("📦 Polling response status:", res.status);

      if (!res.ok) throw new Error("Status API failed");

      const data = await res.json();
      console.log("📊 Polling data:", data);

      if (data.status === "paid") {
        clearInterval(interval);
        setIsConfirmingBooking(false);
        console.log("🎉 Booking confirmed!");

        toast.success("Booking confirmed 🎉");

        navigate("/bookingssuccess", {
          replace: true,
          state: {
            bookingId: data.bookingId,
            branchName: data.branchName,
            roomNumber: data.roomNumber,
            amount: data.amount,
          },
        });
      }

      if (data.status === "failed") {
        clearInterval(interval);
        setIsConfirmingBooking(false);
        console.error("❌ Payment failed / refunded");
        toast.error("Payment failed / refunded");
        navigate(-1);
      }

      if (attempts >= MAX_RETRIES) {
        clearInterval(interval);
        setIsConfirmingBooking(false);
        console.warn("⚠ Verification taking longer than usual");
        toast.warning("Verification taking longer than usual");
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, 3000);
}

/* =========================
   START PAYMENT
========================= */
async function startPayment(
  amount,
  razorpayPayment,
  razorpayPaymentVerify,
  roomId,
  navigate,
  setIsConfirmingBooking,
  user
) {
  console.log("💳 Initiating payment for roomId:", roomId, "amount:", amount);

  try {
    // 1️⃣ Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Payment SDK failed to load");
      console.error("❌ Razorpay SDK failed to load");
      return;
    }
    console.log("✅ Razorpay SDK loaded");

    // 2️⃣ Create Razorpay order on backend
    console.log("📦 Creating Razorpay order...");
    const response = await razorpayPayment({
      amount: amount.payableAmount * 100, // amount in INR
      receipt: `receipt_${Date.now()}_${roomId}`,
    }).unwrap();

    console.log("📦 Razorpay order response:", response);

    const order = response?.order;
    if (!order) {
      toast.error("Order creation failed");
      console.error("❌ Order creation failed, response:", response);
      return;
    }

    // 3️⃣ Minimum amount check
    if (order.amount < 100) { // Razorpay minimum 1 INR = 100 paise
      toast.error("Amount too low. Minimum 1 INR required.");
      console.error("❌ Order amount too low:", order.amount);
      return;
    }
    console.log("✅ Order amount OK (paise):", order.amount);

    // 4️⃣ Razorpay payment modal options
    const options = {
      key: "rzp_live_Rn8nwfw3Hdmb8E",
      amount: order.amount, // already in paise from backend
      currency: order.currency,
      name: "Roomgi",
      description: "Room Booking Payment",
      order_id: order.id,

      handler: async (rzpResponse) => {
        console.log("💡 Razorpay handler called with response:", rzpResponse);

        try {
          setIsConfirmingBooking(true);
          toast.info("Confirming your booking ⏳");

          // 5️⃣ Verify payment on backend
          const verifyData = await razorpayPaymentVerify({
            razorpay_order_id: rzpResponse.razorpay_order_id,
            razorpay_payment_id: rzpResponse.razorpay_payment_id,
            razorpay_signature: rzpResponse.razorpay_signature,
            roomId,
            amount,
          }).unwrap();

          console.log("📦 Payment verification data:", verifyData);

          if (!verifyData?.success) {
            toast.error("Payment verification failed");
            console.error("❌ Payment verification failed");
            setIsConfirmingBooking(false);
            return;
          }

          // 6️⃣ Start webhook-based booking status polling
          console.log("🔁 Starting booking status polling for:", verifyData.booking._id);
          startBookingStatusPolling(verifyData.booking._id, navigate, setIsConfirmingBooking);

        } catch (err) {
          console.error("❌ Payment verification error:", err);
          toast.error("Verification error");
          setIsConfirmingBooking(false);
        }
      },

      modal: {
        ondismiss: () => {
          console.log("⚠ Payment modal dismissed by user");
          toast.info("Payment cancelled");
          setIsConfirmingBooking(false);
        },
      },

      prefill: {
        name: user?.name || "Guest User",
        email: user?.email || "guest@roomgi.com",
        contact: user?.phone || "",
      },

      theme: { color: "#2563eb" },
    };

    console.log("💡 Opening Razorpay modal with options:", options);
    new window.Razorpay(options).open();

  } catch (err) {
    console.error("❌ Payment failed:", err);
    toast.error("Payment failed");
    setIsConfirmingBooking(false);
  }
}




/* =========================
   MAIN COMPONENT
========================= */
export default function PGDetailsPage() {
  const { data: userdata } = useProfileQuery();




  const user = userdata?.profile;
  console.log(user)

  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);


  const { data, isLoading, isError } = useGetPgByIdQuery(id);



  const [razorpayPayment, { isLoading: razorpaypaymentloading }] =
    useRazorpayPaymentMutation();
  const [razorpayPaymentVerify] =
    useRazorpayPaymentVerifyMutation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const pg = data?.room;

  const allImages = useMemo(() => {
    if (!pg) return [];
    return pg.roomImages || [];
  }, [pg]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => toast.warning("Enable location to get directions")
      );
    }
  }, []);

  const handleBook = (amount) => {
    if (!isAuthenticated) {
      toast.error("Login first");
      return;
    }

    startPayment(
      amount,
      razorpayPayment,
      razorpayPaymentVerify,
      id,
      navigate,
      setIsConfirmingBooking,
      user
    );
  };


  const handleGetDirections = () => {



    if (!isAuthenticated) return setIsAuthModalOpen(true);

    const [lng, lat] = pg?.branch?.location?.coordinates || [];
    if (!lat || !lng) return toast.error("PG location missing");
    if (!userLocation.lat) return toast.error("User location not available");

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const sharePG = () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    navigator.share
      ? navigator.share({
        title: `Check out ${pg.branch.name}`,
        url: window.location.href,
      })
      : toast.info("Sharing not supported");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SkeletonLoader count={1} />
      </div>
    );
  }

  if (isError || !pg) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 font-semibold">Error loading PG</p>
      </div>
    );
  }
  const totalRent =
    pg.price + (pg.advancedmonth ? pg.price * pg.advancedmonth : 0);

  const maxWalletAllowed = totalRent * 0.1;
  const walletDiscount = Math.min(user?.walletBalance || 0, maxWalletAllowed);

  // 👇 FINAL CHECK
  const finalAfterWallet = totalRent - walletDiscount;

  // 👇 WALLET APPLICABLE ONLY IF > ₹1 LEFT
  const isWalletApplicable = finalAfterWallet > 1;


  const ShowAllButton = () => (
    <button
      onClick={() => navigate(`/allpotos/${id}`)}
      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur
    px-4 py-2 rounded-lg shadow-md text-sm font-semibold
    hover:bg-white transition z-10"
    >
      Show all photos
    </button>
  );



  return (
    <div className="min-h-screen bg-gray-50">


      {isConfirmingBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl w-[90%] max-w-sm">

            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />

            <h2 className="text-xl font-bold text-gray-800">
              Confirming your booking
            </h2>

            <p className="text-sm text-gray-500 text-center">
              Please wait while we securely confirm your payment and reserve your room.
            </p>

          </div>
        </div>
      )}

      {/* IMAGE SLIDER */}
      <div className="max-w-6xl mx-auto mt-6 relative h-auto">

        {/* ------- MOBILE LAYOUT (hidden on md+) ------- */}
        <div className="md:hidden w-full h-[400px] relative overflow-hidden rounded-2xl">

          {/* ===== SINGLE IMAGE ===== */}
          {allImages.length === 1 && (
            <img
              src={allImages[0]}
              className="w-full h-full object-cover"
            />
          )}

          {/* ===== TWO IMAGES ===== */}
          {allImages.length === 2 && (
            <div className="grid grid-cols-2 h-full gap-1">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          )}

          {/* ===== THREE OR MORE IMAGES ===== */}
          {allImages.length >= 3 && (
            <div className="grid grid-cols-2 grid-rows-3 gap-1 h-full">

              {/* Big top image */}
              <div className="col-span-2 row-span-2 overflow-hidden">
                <img
                  src={allImages[0]}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom left */}
              <div className="overflow-hidden">
                <img
                  src={allImages[1]}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right */}
              <div className="overflow-hidden relative">
                <img
                  src={allImages[2]}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                {allImages.length > 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{allImages.length - 3} more
                    </span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ===== SHOW ALL BUTTON (ALWAYS VISIBLE) ===== */}
          {allImages.length > 1 && (
            <button
              onClick={() => navigate(`/allpotos/${id}`)}
              className="absolute bottom-3 right-3
        bg-white/90 backdrop-blur
        px-4 py-2 rounded-xl
        text-sm font-semibold shadow-lg"
            >
              Show all photos
            </button>
          )}
        </div>




        {/* ------- DESKTOP LAYOUT (hidden on mobile) ------- */}
        {/* ================= IMAGE GRID ================= */}
        <div className="hidden md:block h-[500px]">

          {/* ===== 1 IMAGE ===== */}
          {allImages.length === 1 && (
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img src={allImages[0]} className="w-full h-full object-cover" />

              <ShowAllButton />
            </div>
          )}

          {/* ===== 2 IMAGES ===== */}
          {allImages.length === 2 && (
            <div className="grid grid-cols-2 gap-2 h-full">
              {allImages.map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}

              <ShowAllButton />
            </div>
          )}

          {/* ===== 3 IMAGES (PERFECT LAYOUT) ===== */}
          {allImages.length === 3 && (
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full relative">

              <div className="col-span-2 row-span-2 rounded-l-2xl overflow-hidden">
                <img src={allImages[0]} className="w-full h-full object-cover" />
              </div>

              <div className="rounded-tr-2xl overflow-hidden">
                <img src={allImages[1]} className="w-full h-full object-cover" />
              </div>

              <div className="rounded-br-2xl overflow-hidden">
                <img src={allImages[2]} className="w-full h-full object-cover" />
              </div>

              <ShowAllButton />
            </div>
          )}

          {/* ===== 4 OR MORE IMAGES ===== */}
          {allImages.length >= 4 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full relative">

              <div className="col-span-2 row-span-2 rounded-l-2xl overflow-hidden">
                <img src={allImages[0]} className="w-full h-full object-cover" />
              </div>

              {allImages.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden ${i === 1 ? "rounded-tr-2xl" : ""
                    } ${i === 3 ? "rounded-br-2xl" : ""}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}

              <ShowAllButton />
            </div>
          )}
        </div>



      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE — INFORMATION */}
        <div className="lg:col-span-2 space-y-8">

          {/* BASIC INFORMATION */}
          <InfoBlock title="Basic Information">
            <div className="space-y-8">

              {/* ================= TITLE + VERIFIED ================= */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  {pg.branch.name}

                  {pg.verified && (
                    <span className="flex items-center gap-1 px-3 py-1
          bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <BadgeCheck className="w-4 h-4" /> Verified
                    </span>
                  )}
                </h2>

                {/* ================= RATING CARD ================= */}
                <div className="flex items-center gap-3 bg-yellow-50
        border border-yellow-200 px-4 py-2 rounded-xl shadow-sm">

                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-100">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-lg font-bold text-gray-900">
                      {pg.personalreview?.length > 0
                        ? (pg.totalrating / pg.personalreview.length).toFixed(1)
                        : "0.0"}
                      <span className="text-sm text-gray-600"> / 5</span>
                    </span>

                    <span className="text-sm text-gray-600">
                      {pg.personalreview?.length || 0} Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= PROPERTY DETAILS CARD ================= */}
              <div className="bg-gradient-to-br from-white to-gray-50
      rounded-3xl border border-gray-200 shadow-xl p-8 space-y-8">

                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  🏠 Property & Room Details
                </h3>

                {/* ================= INFO GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  <InfoItem label="Address" value={data?.roomz} />
                  <InfoItem label="City" value={pg.city} />
                  <InfoItem label="Room Number" value={pg.roomNumber} />

                  <InfoItem
                    label="Room Type"
                    value={
                      pg.category === "Hotel"
                        ? pg.hoteltype
                        : pg.category === "Pg"
                          ? pg.type
                          : pg.category === "Rented-Room"
                            ? pg.renttype === "Flat-Rent"
                              ? pg.flattype
                              : pg.roomtype
                            : ""
                    }
                  />

                  <InfoItem label="Furnished" value={pg.furnishedType} />

                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">Advance</span>

                    {pg.advancedmonth > 0 ? (
                      <p className="text-xl font-bold text-indigo-700">
                        {pg.advancedmonth} month{pg.advancedmonth > 1 ? "s" : ""}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 rounded-full
        bg-green-100 text-green-700 font-semibold">
                          No Advance Required
                        </span>
                      </div>
                    )}
                  </div>


                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Availability</span>
                    <p
                      className={`text-xl font-bold ${pg.availabilityStatus === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {pg.availabilityStatus}
                    </p>
                  </div>
                </div>

                {/* ================= OCCUPANCY STATS ================= */}
                <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-200">

                  <StatCard
                    label="Occupied"
                    value={pg.occupied || "0"}
                    color="red"
                  />

                  <StatCard
                    label="Vacant"
                    value={
                      pg.category === "Pg"
                        ? pg.vacant
                        : Math.max(0, pg.vacant - pg.occupied)
                    }
                    color="green"
                  />
                </div>
              </div>
            </div>
          </InfoBlock>


          {/* DESCRIPTION */}
          {pg.description && (
            <InfoBlock title="Description">
              <p className="text-gray-700 leading-relaxed text-[15px]">{pg.description}</p>
            </InfoBlock>
          )}

          {/* ALLOWED FOR */}
          {pg.allowedFor && (
            <InfoBlock title="Allowed For">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-600 font-bold text-xl">✔</span>
                <span className="text-gray-800 font-semibold text-lg">{pg.allowedFor}</span>
              </div>
            </InfoBlock>
          )}

          {/* RULES */}
          {pg.rules?.length > 0 && (
            <InfoBlock title="Rules">
              <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-700">
                {pg.rules.map((rule, i) => <li key={i}>{rule}</li>)}
              </ul>
            </InfoBlock>
          )}

          {/* NOT ALLOWED */}
          {pg.notAllowed?.length > 0 && (
            <InfoBlock title="Not Allowed">
              <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-700">
                {pg.notAllowed.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </InfoBlock>
          )}

          {/* FACILITIES */}
          {pg.facilities?.length > 0 && (
            <InfoBlock title="Facilities">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {pg.facilities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 p-3 rounded-lg">
                    <span className="text-green-600 text-xl font-bold">✔</span>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>
          )}

          {/* PUBLISH STATUS */}
          {pg.toPublish?.status && (
            <InfoBlock title="Publish Status">
              <p className="text-gray-600 font-semibold">Published on: {new Date(pg.toPublish.date).toLocaleDateString()}</p>
            </InfoBlock>
          )}

        </div>

        {/* RIGHT SIDE — RENT & ACTIONS */}
        <div className="space-y-8">

          {/* ================== RENT CARD ================== */}
          <InfoBlock title="Rent & Services Breakdown">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">

              {/* ================= BASE RENT / SERVICES ================= */}
              <div>
                <h4 className="text-gray-700 font-semibold text-lg mb-2">
                  Base Rent Breakdown
                </h4>

                <div className="pl-4 space-y-2">
                  {pg.services?.length > 0 ? (
                    pg.services.map((s) => (
                      <div
                        key={s._id}
                        className="flex justify-between text-gray-800 text-sm"
                      >
                        <span>{s.name}</span>
                        <span>₹{s.price}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between text-gray-800 text-sm">
                      <span>Room / House Rent</span>
                      <span>₹{pg.price}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total Rent / month</span>
                    <span>₹{pg.price}</span>
                  </div>
                </div>
              </div>

              {/* ================= ADVANCE ================= */}
              {pg.advancedmonth > 0 && (
                <div>
                  <h4 className="text-gray-700 font-semibold text-lg mb-2">
                    Advance Payment
                  </h4>

                  <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span>
                      {pg.advancedmonth} Month
                      {pg.advancedmonth > 1 ? "s" : ""} Advance
                    </span>
                    <span>₹{pg.price * pg.advancedmonth}</span>
                  </div>
                </div>
              )}

             {/* ================= TOTAL ================= */}
{(() => {
  const totalRent =
    pg.price + (pg.advancedmonth ? pg.price * Math.max(0,pg.advancedmonth) : 0);

  const maxWalletAllowed = totalRent * 0.1; // 10% cap
  const walletDiscount = Math.min(
    user?.walletBalance || 0,
    maxWalletAllowed
  );

  const finalAfterWallet = totalRent - walletDiscount;
  const isWalletApplicable = finalAfterWallet > 1;

  const finalPayable =
    totalRent -
    (useWallet && isWalletApplicable ? walletDiscount : 0);

  return (
    <>
      <div className="border-t pt-3 flex justify-between text-base font-semibold">
        <span>Total Payable</span>
        <span>₹{totalRent}</span>
      </div>

      {/* ================= WALLET CASES ================= */}
      {isAuthenticated && pg.availabilityStatus === "Available" && (
        <>
          {user?.walletBalance > 0 && (
            <div
              className={`mt-3 flex items-center gap-3 px-4 py-3 rounded-xl border transition
              ${
                isWalletApplicable
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-300 opacity-70"
              }`}
            >
              <input
                type="checkbox"
                checked={useWallet}
                disabled={!isWalletApplicable}
                onChange={() => setUseWallet(!useWallet)}
                className="h-5 w-5 accent-green-600 disabled:opacity-50"
              />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  Use Wallet Balance
                </span>
                <span className="text-xs text-gray-500">
                  Available: ₹{user.walletBalance}
                </span>
              </div>

              <span className="ml-auto text-sm font-semibold">
                {isWalletApplicable ? (
                  useWallet ? (
                    <span className="text-green-700">
                      −₹{walletDiscount}
                    </span>
                  ) : (
                    <span className="text-gray-500">Optional</span>
                  )
                ) : (
                  <span className="text-red-500">Not Applicable</span>
                )}
              </span>
            </div>
          )}

          {/* ================= FINAL PAYABLE ================= */}
          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Final Payable</span>
            <span>₹{finalPayable}</span>
          </div>

          {/* ================= CONFIRM ================= */}
          <button
            onClick={() =>
              handleBook({
                totalAmount: totalRent,
                walletUsed:
                  useWallet && isWalletApplicable
                    ? walletDiscount
                    : 0,
                payableAmount: finalPayable,
              })
            }
            className="w-full mt-4 py-3 rounded-xl font-semibold
            text-white bg-blue-600 hover:bg-blue-700 transition active:scale-95"
          >
            Confirm Booking
          </button>
        </>
      )}

      {!isAuthenticated && (
        <button
          disabled
          className="w-full mt-4 py-3 rounded-xl font-semibold
          bg-gray-300 text-white cursor-not-allowed"
        >
          Login to Book
        </button>
      )}
    </>
  );
})()}

            </div>
          </InfoBlock>







          {/* ================== ACTION BUTTONS ================== */}
          <InfoBlock title="Actions">
            <div className="flex flex-col mt-5 space-y-4">
              <Action
                icon={<Phone />}
                label="Contact Owner"
                whatsappNumber="+919693915693"
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />
              <Action
                icon={<Navigation />}
                label="Get Directions"
                onClick={handleGetDirections}
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />
              <Action
                icon={<Share2 />}
                label="Share PG"
                onClick={sharePG}
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />
            </div>
          </InfoBlock>

        </div>

      </div>


      {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}

    </div>
  );
}


// REUSABLE INFO BLOCK COMPONENT
function InfoBlock({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// PRICE COMPONENT
function Price({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">₹{value}</span>
    </div>
  );
}

// ACTION BUTTON COMPONENT
function Action({ icon, label, onClick, whatsappNumber, isAuthenticated, onAuthOpen }) {
  const handleClick = () => {
    if (!isAuthenticated) return onAuthOpen();
    if (whatsappNumber) {
      const msg = encodeURIComponent("Hello, I'm interested in your PG");
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
      return;
    }
    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-3 p-3 border rounded-xl shadow-sm transition hover:bg-gray-100">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <p className="text-lg font-semibold text-gray-800 tracking-wide">
      {value || "—"}
    </p>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className="flex flex-col items-center
    bg-white/70 backdrop-blur-xl
    px-6 py-4 rounded-2xl shadow-lg border border-white/30">
    <span className="text-sm font-medium text-gray-600">{label}</span>
    <p
      className={`text-3xl font-extrabold ${color === "green" ? "text-green-600" : "text-red-600"
        }`}
    >
      {value}
    </p>
  </div>
);

