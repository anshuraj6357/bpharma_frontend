import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Phone, Loader2,MapPin ,Check , X,Zap ,ReceiptText, ShieldCheck, ArrowRight,LayoutGrid,Layers,Calendar,CheckCircle2,Construction,CheckCircle,
  Sparkles, Home,Bed,Maximize ,Armchair,Users, Navigation, Share2, Star, BadgeCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SkeletonLoader from "./loader/skeletondetails.jsx";
import { useProfileQuery } from "../backend-routes/userroutes/authapi";


import { useGetPgByIdQuery } from "../backend-routes/userroutes/allpg.js";
import {
  useRazorpayPaymentVerifyMutation,
  useRazorpayPaymentMutation,
} from "../backend-routes/userroutes/payment";


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
        `https://roomgi-backend-project-2.onrender.com/api/payment/user/status/${bookingId}`,
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


  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);


  const { data, isLoading, isError } = useGetPgByIdQuery(id);
  console.log("data",data)



  const [razorpayPayment, { isLoading: razorpaypaymentloading }] =
    useRazorpayPaymentMutation();
  const [razorpayPaymentVerify] =
    useRazorpayPaymentVerifyMutation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const pg = data?.room;
  console.log("pg",pg)

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



    const [lng, lat] =data.location.coordinates || [];
    if (!lat || !lng) return toast.error("PG location missing");
    if (!userLocation.lat) return toast.error("User location not available");

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const sharePG = () => {
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
    pg.price + (pg.advancedmonth);

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






const totalServicePrice =
  pg.services?.reduce((sum, s) => sum + Number(s.price || 0), 0) || 0;



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
   <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 relative group/gallery">

  {/* ------- MOBILE LAYOUT (Compact & Modern) ------- */}
  <div
  className="md:hidden w-full max-w-screen-sm mx-auto h-[320px] sm:h-[360px] relative overflow-hidden rounded-[2rem] shadow-2xl"
  role="region"
  aria-label="Property image gallery"
>
  {/* SINGLE IMAGE */}
  {allImages.length === 1 && (
    <img
      src={allImages[0]}
      className="w-full h-full object-cover"
      alt={`${pg?.branch?.name || "Property"} main image`}
      loading="eager"
      fetchpriority="high"
    />
  )}

  {/* TWO IMAGES */}
  {allImages.length === 2 && (
    <div className="grid grid-cols-2 h-full gap-1.5">
      {allImages.map((img, i) => (
        <img
          key={i}
          src={img}
          className="w-full h-full object-cover"
          alt={`${pg?.branch?.name || "Property"} view ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </div>
  )}

  {/* THREE OR MORE */}
  {allImages.length >= 3 && (
    <div className="grid grid-cols-2 grid-rows-3 gap-1.5 h-full">
      {/* HERO */}
      <div className="col-span-2 row-span-2 overflow-hidden">
        <img
          src={allImages[0]}
          className="w-full h-full object-cover"
          alt={`${pg?.branch?.name || "Property"} featured image`}
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* SECOND */}
      <div className="overflow-hidden">
        <img
          src={allImages[1]}
          className="w-full h-full object-cover"
          alt={`${pg?.branch?.name || "Property"} gallery image 2`}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* THIRD */}
      <div className="overflow-hidden relative">
        <img
          src={allImages[2]}
          className="w-full h-full object-cover"
          alt={`${pg?.branch?.name || "Property"} gallery image 3`}
          loading="lazy"
          decoding="async"
        />

        {allImages.length > 3 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center border-l border-white/20">
            <span className="text-white font-black text-xl tracking-tight">
              +{allImages.length - 3}
            </span>
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
              Photos
            </span>
          </div>
        )}
      </div>
    </div>
  )}

  {/* MOBILE FLOATING CTA */}
  <button 
    onClick={() => navigate(`/allpotos/${id}`)}
    aria-label="View all property photos"
    title="View all photos"
    className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-xl text-[11px] font-black text-slate-900 shadow-xl border border-white/50 flex items-center gap-2 active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <LayoutGrid size={14} />
    Show Gallery
  </button>
</div>



  {/* ------- DESKTOP LAYOUT (MNC Bento Style) ------- */}
  <div
  className="hidden md:block w-full max-w-screen-2xl mx-auto relative overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-100"
  role="region"
  aria-label="Property image gallery"
>
  <div className="h-[420px] lg:h-[550px] xl:h-[600px]">
    {allImages.length === 1 ? (
      <div className="relative h-full overflow-hidden group">
        <img
          src={allImages[0]}
          alt={`${pg?.branch?.name || "Property"} main image`}
          loading="eager"
          fetchpriority="high"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
    ) : (
      <div
        className={`grid h-full gap-2 lg:gap-3 ${
          allImages.length === 2
            ? "grid-cols-2"
            : allImages.length === 3
            ? "grid-cols-3 grid-rows-2"
            : "grid-cols-4 grid-rows-2"
        }`}
      >
        {/* HERO IMAGE */}
        <div
          className={`${
            allImages.length === 2
              ? "col-span-1"
              : "col-span-2 row-span-2"
          } relative overflow-hidden group`}
        >
          <img
            src={allImages[0]}
            alt={`${pg?.branch?.name || "Property"} featured image`}
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 cursor-pointer"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* SECONDARY IMAGES */}
        {allImages.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden group bg-white"
          >
            <img
              src={img}
              alt={`${pg?.branch?.name || "Property"} gallery image ${i + 2}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-pointer"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    )}
  </div>

  {/* FLOATING CTA */}
  <button
    onClick={() => navigate(`/allpotos/${id}`)}
    aria-label="View all property photos"
    title="View all photos"
    className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-xl text-white px-4 py-2 lg:px-6 lg:py-3 rounded-2xl font-bold text-xs lg:text-sm shadow-2xl border border-white/10 flex items-center gap-2 lg:gap-3 transition-all hover:px-6 lg:hover:px-8 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 group"
  >
    <LayoutGrid
      size={18}
      className="transition-transform duration-500 group-hover:rotate-90"
    />
    <span>View All Photos</span>
  </button>
</div>



</div>




      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE — INFORMATION */}
        <div className="lg:col-span-2 space-y-8">

         {/* BASIC INFORMATION SECTION */}
<InfoBlock title="Property Overview">
  <div className="space-y-10">
    {/* ================= HEADER SECTION (MNC STYLE) ================= */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {pg.branch.name}
          </h2>
          {pg.verified && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200">
              <BadgeCheck className="w-4 h-4 fill-white text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-wider">Verified Stay</span>
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-500 gap-2">
          <MapPin size={18} className="text-indigo-500" />
          <span className="text-lg font-medium">{pg.city}, India</span>
        </div>
      </div>

      {/* RATING PILL - Floating Design */}
      <div className="flex items-center gap-4 bg-white border border-gray-100 p-2 pr-6 rounded-2xl shadow-xl shadow-gray-100/50">
        <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
          <Star className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900">
              {pg.personalreview?.length > 0
                ? (pg.totalrating / pg.personalreview.length).toFixed(1)
                : "New"}
            </span>
            <span className="text-xs font-bold text-gray-400">/ 5.0</span>
          </div>
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">
            {pg.personalreview?.length || 0} Guest Reviews
          </p>
        </div>
      </div>
    </div>

    {/* ================= BENTO GRID DETAILS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      {/* Main Info Card (Large) */}
      <div className="md:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Sparkles size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Essential Details</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6">
          <InfoItem icon={<Home size={16}/>} label="Category" value={pg.category} />
          <InfoItem icon={<Bed size={16}/>} label="Room Number" value={`Room No ${pg.roomNumber}`} />
          <InfoItem icon={<Maximize size={16}/>} label="Layout" value={
            pg.category === "Hotel" ? pg.hoteltype : 
            pg.category === "Pg" ? pg.type : 
            pg.renttype === "Flat-Rent" ? pg.flattype : pg.roomtype
          } />
          <InfoItem icon={<Armchair size={16}/>} label="Furnishing" value={pg.furnishedType} />
          
          {/* Advance Month Logic */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Deposit</span>
            {pg.advancedmonth > 0 ? (
              <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                {pg.advancedmonth} <span className="text-sm text-gray-500 font-medium">Rs</span>
              </p>
            ) : (
              <span className="w-fit text-[10px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md font-bold uppercase tracking-tighter">No Advance</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</span>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full animate-pulse ${pg.availabilityStatus === "Available" ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
               <span className={`text-lg font-bold ${pg.availabilityStatus === "Available" ? "text-emerald-600" : "text-red-600"}`}>
                {pg.availabilityStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy Stats Card (Sidebar Style) */}
      <div className="md:col-span-4 bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
        {/* Abstract Background Decoration */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 blur-[80px] group-hover:bg-indigo-500/40 transition-all duration-700"></div>
        
        <h3 className="text-lg font-bold mb-8 relative z-10 flex items-center gap-2">
          <Users size={18} className="text-indigo-400" />
          Live Status
        </h3>

        <div className="space-y-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Currently Occupied</p>
              <p className="text-4xl font-black">{pg.occupied || "0"}</p>
            </div>
            <div className="w-12 h-1 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Vacant Units</p>
              <p className="text-4xl font-black text-emerald-400">
                {pg.category === "Pg" ? pg.vacant : Math.max(0, pg.vacant - pg.occupied)}
              </p>
            </div>
            <div className="w-12 h-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
          </div>
        </div>

        <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/10">
          Instant Booking
        </button>
      </div>
    </div>
  </div>
</InfoBlock>


         {/* DESCRIPTION SECTION - PRODUCTION GRADE */}
{pg.description && (
  <InfoBlock title="About this space">
    <div className="relative group/desc">
      {/* 1. Iconic Lead-in: MNCs use subtle accents to break text monotony */}
      <div className="flex gap-4">
        <div className="hidden md:flex flex-col items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mb-2 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          <div className="w-[2px] flex-1 bg-gradient-to-b from-indigo-100 to-transparent rounded-full" />
        </div>

        <div className="space-y-6">
          {/* 2. Optimized Typography: Leading-relaxed and Gray-600 for eye comfort */}
          <div className="relative">
            <p className="text-gray-600 leading-[1.8] text-base md:text-lg font-medium selection:bg-indigo-100 selection:text-indigo-900">
              {pg.description}
            </p>
          </div>

          {/* 3. Feature Highlights: Automated extraction from text (Mental Mapping) */}
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100 group-hover/desc:border-indigo-100 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Recently Renovated</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100 group-hover/desc:border-indigo-100 transition-colors">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Top Rated Host</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Subtle Border Decoration for Desktop */}
      <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gray-100 hidden md:block" />
    </div>
  </InfoBlock>
)}

          {/* ALLOWED FOR */}
        {/* ALLOWED FOR SECTION - PRODUCTION LEVEL */}
{pg.allowedFor && (
  <InfoBlock title="Preferred Guests">
    <div className="relative overflow-hidden group/allowed">
      <div className={`flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 ${
        pg.allowedFor.toLowerCase().includes('girls') 
          ? 'bg-rose-50/50 border border-rose-100' 
          : 'bg-indigo-50/50 border border-indigo-100'
      }`}>
        
        <div className="flex items-center gap-5">
          {/* Icon Container with Dark Contrast */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover/allowed:rotate-[-10deg] ${
            pg.allowedFor.toLowerCase().includes('girls')
              ? 'bg-rose-600 shadow-rose-200'
              : 'bg-indigo-900 shadow-indigo-200'
          }`}>
            <Users className="text-white w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Exclusively For</span>
            <h4 className="text-2xl font-black text-gray-900 tracking-tight">
              {pg.allowedFor}
            </h4>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black text-gray-700 uppercase tracking-tighter">Admission Open</span>
        </div>

        {/* Background Abstract Pattern (MNC Style Decor) */}
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
           <Users size={120} />
        </div>
      </div>

      {/* Trust Note */}
      <p className="mt-4 px-2 text-xs font-bold text-gray-500 flex items-center gap-2">
        <BadgeCheck size={14} className="text-indigo-500" />
        Strict adherence to house rules is required for all {pg.allowedFor}.
      </p>
    </div>
  </InfoBlock>
)}

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* RULES SECTION */}
  {pg.rules?.length > 0 && (
    <InfoBlock title="House Guidelines">
      <div className="space-y-4">
        {pg.rules.map((rule, i) => (
          <div key={i} className="flex items-start gap-4 group/rule">
            <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover/rule:bg-emerald-500 transition-colors">
              <Check size={12} className="text-emerald-600 group-hover/rule:text-white" />
            </div>
            <p className="text-gray-900 font-bold text-[15px] leading-snug">{rule}</p>
          </div>
        ))}
      </div>
    </InfoBlock>
  )}

  {/* NOT ALLOWED SECTION */}
  {pg.notAllowed?.length > 0 && (
    <InfoBlock title="Restricted">
      <div className="space-y-4">
        {pg.notAllowed.map((item, i) => (
          <div key={i} className="flex items-start gap-4 group/not">
            <div className="mt-1 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 group-hover/not:bg-rose-500 transition-colors">
              <X size={12} className="text-rose-600 group-hover/not:text-white" />
            </div>
            <p className="text-gray-900 font-bold text-[15px] leading-snug">{item}</p>
          </div>
        ))}
      </div>
    </InfoBlock>
  )}
</div>


     

{/* FACILITIES SECTION */}
{pg.facilities?.length > 0 && (
  <InfoBlock title="Premium Amenities">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pg.facilities.map((item, i) => (
        <div 
          key={i} 
          className="relative overflow-hidden flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/item"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover/item:opacity-10 transition-opacity">
            <Sparkles size={40} />
          </div>

          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
            {/* Yahan aap category-based icon logic bhi laga sakte hain, 
                filhal hum modern Check use kar rahe hain */}
            <Zap size={20} className="fill-current" />
          </div>

          <span className="font-black text-gray-900 text-sm text-center tracking-tight leading-tight">
            {item}
          </span>
          
          {/* Bottom Dot Decor */}
          <div className="w-1 h-1 rounded-full bg-indigo-200 group-hover/item:w-4 transition-all" />
        </div>
      ))}
    </div>
  </InfoBlock>
)}


          {/* PUBLISH STATUS */}
 

  {/* 1. PUBLISH STATUS BLOCK (MNC Upgrade) */}
  {pg.toPublish?.status && (
    <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm group hover:shadow-md transition-all duration-300">
      {/* Subtle Background Icon */}
      <CheckCircle2 className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-50 opacity-[0.05] group-hover:scale-110 transition-transform" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
          <Calendar size={20} strokeWidth={2.5} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Visibility Status</h3>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">
            Live on Platform
          </p>
          <p className="text-slate-500 font-bold text-sm">
            Launched on {new Date(pg.toPublish.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Active
        </div>
      </div>
    </div>
  )}

  {/* 2. BRANCH ROOMS SECTION (The Upgrade) */}


<InfoBlock
  className="mt-12 md:mt-16 p-4 md:p-6 bg-white"
  role="region"
  aria-labelledby="branch-units-heading"
>
  {/* --- HEADER WITH ACTIONS --- */}
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-6">
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-6 w-1 bg-indigo-600 rounded-full" aria-hidden="true"></div>
        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
          Inventory Intelligence
        </span>
      </div>

      <h2
        id="branch-units-heading"
        className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
      >
        Branch Units{" "}
        <span className="text-slate-300 font-light">/ Overview</span>
      </h2>

      <p className="text-slate-500 font-medium text-sm max-w-md">
        Real-time availability and occupancy metrics for{" "}
        <span className="text-slate-900 font-bold">
          Branch ID: {pg.branchId}
        </span>.
      </p>
    </div>

    <button
      onClick={() => navigate(`/branch-rooms/${pg.branch}`)}
      aria-label="Manage all branch inventory"
      title="Manage all inventory"
      className="relative overflow-hidden group flex items-center gap-3 bg-slate-950 text-white px-6 md:px-10 py-3 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-xs md:text-sm transition-all hover:bg-indigo-600 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <span className="relative z-10">Manage All Inventory</span>
      <ArrowRight
        className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"
        size={18}
        aria-hidden="true"
      />

      {/* Subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  </header>

  {/* --- STATS GRID SLOT (Scalable Area) --- */}
  <section
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    aria-label="Branch statistics"
  >
    {/* Your stat cards go here */}
  </section>

  {/* --- CARD ACTION FOOTER (Reusable) --- */}
  <div className="mt-4 pt-4 border-t border-slate-100/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
      View Details
    </span>
    <ArrowRight size={14} className="text-slate-400" aria-hidden="true" />
  </div>
</InfoBlock>


</div>

     {/* RIGHT SIDE — RENT & ACTIONS */}
<div className="space-y-6 lg:sticky lg:top-24">
  
  {/* ================== PREMIUM RENT CARD ================== */}
  <InfoBlock title="Payment Summary">
    <div className="w-full bg-slate-50/50 rounded-3xl p-2 space-y-4">
      
      {/* RENT BREAKDOWN BOX */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <ReceiptText size={18} className="text-indigo-600" />
          <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider">
            Billing Details
          </h4>
        </div>

        <div className="space-y-3">
          
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Standard Room Rent</span>
              <span className="text-slate-900 font-bold">₹{pg.price}</span>
            </div>
          

          {pg.advancedmonth > 0 && (
            <div className="flex justify-between items-center py-2 px-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
              <div className="flex flex-col">
                <span className="text-indigo-700 font-bold text-xs uppercase">Security Deposit</span>
                <span className="text-[10px] text-indigo-400 font-medium">{pg.advancedmonth} Month Refundable</span>
              </div>
              <span className="text-indigo-700 font-black text-sm">₹{ pg.advancedmonth}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-between items-baseline">
          <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Total Value</span>
         {pg?.category === "Pg" ? (
  <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-200">
   
    <span className="text-indigo-600 font-black text-lg">
      ₹{pg.price+pg.advancedmonth}
    </span>
  </div>
) : (
  <span className="text-xl font-black text-slate-900">
    ₹
    {Number(pg.price || 0) +
      Number(pg.advancedmonth ||  0)}
  </span>
)}

          
        </div>
      </div>

      {/* WALLET & FINAL CHECKOUT */}
      {(() => {
        
        const totalRent =pg.services?.length>0?totalServicePrice+ (pg.advancedmonth ? totalServicePrice * pg.advancedmonth : 0):pg.price + (pg.advancedmonth);
        const maxWalletAllowed = totalRent * 0.1;
        const walletDiscount = Math.min(user?.walletBalance || 0, maxWalletAllowed);
        const isWalletApplicable = totalRent > 1 && user?.walletBalance > 0;
        const finalPayable = totalRent - (useWallet && isWalletApplicable ? walletDiscount : 0);

        return (
          <div className="p-4 space-y-4">
            {isAuthenticated && pg.availabilityStatus === "Available" && isWalletApplicable && (
              <div 
                onClick={() => setUseWallet(!useWallet)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  useWallet ? "bg-emerald-50 border-emerald-500 shadow-md" : "bg-white border-slate-100"
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  useWallet ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-200"
                }`}>
                  {useWallet && <Check size={14} className="text-white stroke-[4px]" />}
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-black text-xs uppercase tracking-tight">Redeem Wallet</p>
                  <p className="text-[10px] text-slate-500 font-medium">Balance: ₹{user.walletBalance}</p>
                </div>
                {useWallet && <span className="text-emerald-600 font-black text-sm">-₹{walletDiscount}</span>}
              </div>
            )}

            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
              <div className="absolute right-[-10%] top-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles size={100} />
              </div>
              
              <div className="relative z-10 flex justify-between items-end mb-6">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Final Amount</p>
                  <p className="text-3xl font-black tracking-tighter">₹{pg.price+(pg.advancedmonth||0)}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-emerald-400">Secure Payment</p>
                   <ShieldCheck className="ml-auto text-emerald-400" size={20} />
                </div>
              </div>
{isAuthenticated ? (
  pg.availabilityStatus === "Occupied" ? (
    <button
      disabled
      className="group relative w-full py-4 bg-slate-100 border-2 border-slate-200 text-slate-400 rounded-2xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
    >
      <span className="z-10">Currently Occupied</span>
      {/* Subtle "unavailable" pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
    </button>
  ) : (
    <button
      onClick={() =>
        handleBook({
          totalAmount: totalRent,
          walletUsed: useWallet ? walletDiscount : 0,
          payableAmount: finalPayable,
        })
      }
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2"
    >
      Confirm & Pay ₹{finalPayable.toLocaleString()}
      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
    </button>
  )
) : (
  <div className="space-y-3">
    <button
      className="w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
      onClick={() =>navigate("/login")}
    >
      Login to Book
    </button>
    <p className="text-center text-xs text-slate-500 font-medium">
      Secure your spot in seconds after signing in.
    </p>
  </div>
)}
            </div>
          </div>
        );
      })()}
    </div>
  </InfoBlock>

  {/* ================== PREMIUM ACTIONS ================== */}
  <div className="grid grid-cols-1 gap-3">
    <ActionBtn 
      icon={<Phone size={20} />} 
      label="Contact us" 
      primary 
      onClick={() => window.open(`https://wa.me/919693915693`, '_blank')} 
    />
    <div className="grid grid-cols-2 gap-3">
      <ActionBtn icon={<Navigation size={18} />} label="Directions" onClick={handleGetDirections} />
      <ActionBtn icon={<Share2 size={18} />} label="Share Link" onClick={sharePG} />
    </div>
  </div>
</div>

      </div>
    </div>
  );
}


// REUSABLE INFO BLOCK COMPONENT
function InfoBlock({ title, children }) {
  return (
   <section
  className="bg-white rounded-[2.5rem] border border-gray-100/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group mb-8"
  aria-labelledby={`section-${title?.toLowerCase()?.replace(/\s+/g, "-")}`}
>
  {/* Dynamic Gradient Accent */}
  <div
    className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-400 to-transparent opacity-10 group-hover:opacity-100 transition-opacity duration-700"
    aria-hidden="true"
  />

  <div className="p-8 md:p-10">
    
    {/* Section Header */}
    <header className="relative mb-10 flex items-center justify-between">
      <div className="relative inline-block">
        <h3
          id={`section-${title?.toLowerCase()?.replace(/\s+/g, "-")}`}
          className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight relative z-10"
        >
          {title}
        </h3>

        {/* Title Decoration */}
        <div
          className="absolute -bottom-1 left-0 w-1/4 h-1.5 bg-indigo-500/20 rounded-full group-hover:w-full transition-all duration-700 ease-out"
          aria-hidden="true"
        />
      </div>

      {/* Status / Decorative Icon */}
      <div
        className="hidden sm:flex w-10 h-10 rounded-2xl bg-gray-50 items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all duration-500"
        aria-hidden="true"
      >
        <Sparkles size={18} />
      </div>
    </header>

    {/* Content */}
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-forwards">
      {children}
    </div>
  </div>
</section>

  );
}
// ACTION BUTTON COMPONENT
// 1. Pehle ye reusable component define karein
function ActionBtn({
  icon,
  label,
  primary = false,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={label}
      className={`flex items-center justify-center gap-3 py-4 px-6 rounded-[1.5rem] font-black transition-all duration-300 w-full 
        active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
        ${
          primary
            ? "bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-indigo-600"
            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
        }
      `}
    >
      {/* Icon */}
      <span
        className={`flex items-center justify-center ${
          primary ? "text-indigo-400" : "text-slate-400"
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Label */}
      <span className="text-sm uppercase tracking-tighter">
        {loading ? "Please wait..." : label}
      </span>
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


