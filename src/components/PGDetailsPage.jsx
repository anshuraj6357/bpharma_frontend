import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Loader2, Navigation, Share2, Star, BadgeCheck, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SkeletonLoader from "./loader/skeletondetails.jsx";


import AuthModal from "../components/AuthModal";
import { useGetPgByIdQuery } from "../Bothfeatures/features/api/allpg.js";
import { useRazorpayPaymentVerifyMutation, useRazorpayPaymentMutation } from "../Bothfeatures/features2/api/paymentapi";
import { useOnlinepaidtenantMutation } from "../Bothfeatures/features2/api/tenant";


// ------------------ RAZORPAY PAYMENT FUNCTION ------------------
// async function startPayment(amount, razorpayPayment, razorpayPaymentVerify, id, onlinepaidtenant) {
//   console.log("💰 Starting payment flow for amount:", amount);

//   try {
//     // Step 1: Create order on backend
//     console.log("🔹 Creating order via backend...");
//     const { data: orderData, error: orderError } = await razorpayPayment({ amount: amount * 100 });

//     if (orderError) {
//       console.error("❌ Error creating order:", orderError);
//       toast.error("Failed to create order");
//       return;
//     }

//     if (!orderData?.order) {
//       console.error("❌ No order data received:", orderData);
//       toast.error("Failed to create order");
//       return;
//     }

//     const order = orderData.order;
//     console.log("✅ Order created successfully:", order);

//     // Step 2: Razorpay options
//     const options = {
//       key: "rzp_live_Rn8nwfw3Hdmb8E",
//       amount: order.amount,
//       currency: order.currency,
//       name: "Roomgi.com",
//       description: "PG/hotel/rental room Booking Payment",
//       order_id: order.id,
//       handler: async function (response) {
//         console.log("📥 Payment handler triggered. Response:", response);

//         try {
//           // Step 3: Verify payment on backend
//           console.log("🔹 Verifying payment...");
//           const { data: verifyData, error: verifyError } = await razorpayPaymentVerify({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             roomId: id,
//             amount: amount,
//           });

//           if (verifyError) {
//             console.error("❌ Error verifying payment:", verifyError);
//             toast.error("Payment Verification Failed ❌");
//             return;
//           }

//           if (!verifyData?.success) {
//             console.error("❌ Verification failed:", verifyData);
//             toast.error("Payment Verification Failed ❌");
//             return;
//           }

//           console.log("✅ Payment verified successfully:", verifyData);
//           toast.success("Payment Successful ✔");

//           // Step 4: Mark tenant as paid
//           console.log("🔹 Marking tenant as paid...");
//           await onlinepaidtenant(id);
//           console.log("✅ Tenant payment recorded");

//         } catch (err) {
//           console.error("❌ Exception during verification:", err);
//           toast.error("Verification Error!");
//         }
//       },
//       prefill: { name: "Guest User", email: "guest@example.com" },
//       theme: { color: "#3399cc" },
//       modal: {
//         ondismiss: function () {
//           console.warn("⚠️ User closed Razorpay modal without paying");
//           toast.info("Payment not completed.");
//         }
//       }
//     };

//     // Step 5: Open Razorpay payment modal
//     console.log("🔹 Opening Razorpay modal...");
//     const rzp = new window.Razorpay(options);
//     rzp.on('payment.failed', function (response) {
//       console.error("❌ Payment failed:", response.error);
//       toast.error(`Payment Failed: ${response.error.description}`);
//     });
//     rzp.open();
//     console.log("✅ Razorpay modal opened");

//   } catch (err) {
//     console.error("❌ Exception in startPayment:", err);
//     toast.error("Payment Error!");
//   }
// }


async function startPayment(
  amount,
  razorpayPayment,
  razorpayPaymentVerify,
  id,
  onlinepaidtenant,
  navigate
) {
  try {
    const { data } = await razorpayPayment({ amount: amount * 100 });

    if (!data?.order) {
      toast.error("Failed to create order");
      return;
    }

    const order = data.order;

    const options = {
      key: "rzp_live_Rn8nwfw3Hdmb8E",
      amount: order.amount,
      currency: order.currency,
      name: "Roomgi.com",
      description: "Room Booking Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data: verifyData } = await razorpayPaymentVerify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            roomId: id,
            amount,
          });

          if (!verifyData?.success) {
            toast.error("Payment verification failed ❌");
            return;
          }

          toast.success("Payment successful ✔");
          navigate(0);

        } catch (err) {
          console.log(err)
          toast.error("Verification error ❌");
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled");
        },
      },

      prefill: {
        name: "Guest User",
        email: "guest@example.com",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      toast.error(response.error.description || "Payment failed");
    });

    rzp.open();

  } catch (error) {
    toast.error("Payment error ❌");
  }
}


export default function PGDetailsPage() {
  const navigate = useNavigate();
  const [onlinepaidtenant, { data: addtenantdata, isLoading: tenantloading, error }] = useOnlinepaidtenantMutation()

  const [razorpayPayment, { isLoading: razorpaypaymentloading }] = useRazorpayPaymentMutation();
  const [razorpayPaymentVerify] = useRazorpayPaymentVerifyMutation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPgByIdQuery(id);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const pg = data?.room;

  const allImages = useMemo(() => {
    if (!pg) return [];
    const roomImages = pg.roomImages || [];
    return [...roomImages];
  }, [pg]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => toast.warning("Enable location to get directions")
      );
    }
  }, []);

  const handleBook = (amount) => {
    
    if (!isAuthenticated) {
      toast.error("Logged In  first")

    }
    else {
      startPayment(amount, razorpayPayment, razorpayPaymentVerify, id, onlinepaidtenant, navigate)

    }
  };

  const handleGetDirections = () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    const [lng, lat] = pg?.branch?.location?.coordinates || [];
    if (!lat || !lng) return toast.error("PG location missing");
    if (!userLocation.lat) return toast.error("User location not available");

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`,
      "_blank"
    );
  };

  const sharePG = () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    if (navigator.share) {
      navigator.share({
        title: `Check out ${pg.branch.name}`,
        text: "I found an amazing PG!",
        url: window.location.href,
      });
    } else {
      toast.info("Browser does not support sharing");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SkeletonLoader count={1} />
      </div>
    );
  }

  if (isError || !pg)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-red-500 text-lg font-semibold">Error loading PG!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">


      {/* IMAGE SLIDER */}
      <div className="max-w-6xl mx-auto mt-6 relative h-auto">

        {/* ------- MOBILE LAYOUT (hidden on md+) ------- */}
        <div className="md:hidden grid grid-cols-2 grid-rows-3 gap-2 h-[400px]">

          {/* Big top image */}
          <div className="col-span-2 row-span-2 overflow-hidden rounded-t-2xl">
            <img
              src={allImages[0]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom 2 small images */}
          <div className="overflow-hidden">
            <img
              src={allImages[1]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden relative">

            <img
              src={allImages[2]}
              className="w-full h-full object-cover rounded-b-2xl"
            />

            {/* Show all button */}
            <button
              onClick={() => navigate(`/allpotos/${id}`)}
              className="absolute bottom-3 right-3 bg-white/90 px-3 py-2 rounded-lg shadow"
            >
              Show all photos
            </button>
          </div>

        </div>



        {/* ------- DESKTOP LAYOUT (hidden on mobile) ------- */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">

          {/* Big left image */}
          <div className="col-span-2 row-span-2 overflow-hidden rounded-l-2xl">
            <img
              src={allImages[0]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={allImages[1]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-tr-2xl">
            <img
              src={allImages[2]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={allImages[3]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-br-2xl relative">
            <img
              src={allImages[4]}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => navigate(`/allpotos/${id}`)}
              className="absolute bottom-3 right-3 bg-white/90 px-4 py-2 rounded-lg shadow"
            >
              Show all photos
            </button>
          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE — INFORMATION */}
        <div className="lg:col-span-2 space-y-8">

          {/* BASIC INFORMATION */}
          <InfoBlock title="Basic Information">
            <div className="space-y-4">

              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                {pg.branch.name}
                {pg.verified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" /> Verified
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-3 mt-3 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-xl w-fit shadow-sm">
                {/* Star Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-100">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>

                {/* Rating Info */}
                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-bold text-gray-900">
                    {pg.personalreview && pg.personalreview.length > 0
                      ? (pg.totalrating / pg.personalreview.length).toFixed(1)
                      : "0.0"}
                    <span className="text-sm font-medium text-gray-600"> / 5</span>
                  </span>

                  <span className="text-sm text-gray-600">
                    {pg.personalreview && pg.personalreview.length || 0} Reviews
                  </span>
                </div>
              </div>


              {/* Room Overview */}
              <div className="mt-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200 space-y-4">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🏠 Property & Room Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Address</span>
                    <p className="text-lg font-semibold text-gray-800 tracking-wide">{pg.branch.address}</p>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">City</span>
                    <p className="text-lg font-semibold text-gray-800 tracking-wide">{pg.city}</p>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Room Number</span>
                    <p className="text-lg font-semibold text-gray-800 tracking-wide">{pg.roomNumber}</p>
                  </div>



                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Room Type</span>

                    <p className="text-lg font-semibold text-gray-800 tracking-wide">
                      {
                        pg.category === "Hotel" ? (
                          pg.hoteltype
                        ) : pg.category === "Pg" ? (
                          pg.type
                        ) : pg.category === "Rented-Room" ? (
                          pg.renttype === "Flat-Rent"
                            ? pg.flattype
                            : pg.renttype === "Room-Rent"
                              ? pg.roomtype
                              : ""
                        ) : ""
                      }
                    </p>

                  </div>


                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Furnished</span>
                    <p className="text-lg font-semibold text-gray-800 tracking-wide">{pg.furnishedType}</p>
                  </div>




                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Availability</span>
                    <p className={`text-xl font-bold tracking-wide ${pg.availabilityStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {pg.availabilityStatus}
                    </p>
                  </div>

                  <div className="flex gap-6 mt-4">

                    <div className="flex flex-col items-center backdrop-blur-xl bg-white/40 px-6 py-3 rounded-2xl shadow-lg border border-white/30">
                      <span className="text-sm font-medium text-gray-600">Occupied</span>
                      <p className="text-3xl font-extrabold text-red-600 drop-shadow-sm">{pg.occupied || "0"}</p>
                    </div>

                    <div className="flex flex-col items-center backdrop-blur-xl bg-white/40 px-6 py-3 rounded-2xl shadow-lg border border-white/30">
                      <span className="text-sm font-medium text-gray-600">Vacant</span>

                      {pg?.category === "Pg" ? (
                        <p className="text-3xl font-extrabold text-green-600 drop-shadow-sm">
                          {pg.vacant}
                        </p>
                      ) : (
                        <p className="text-3xl font-extrabold text-green-600 drop-shadow-sm">
                          {Math.max(0, pg.vacant - pg.occupied)}
                        </p>
                      )}
                    </div>


                  </div>
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

          {/* RENT CARD */}
          <InfoBlock title="Rent Details">
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">
                {pg.category === "Pg" || pg.category === "Rented-Room" ? "Rent per Month" : "Rent Options"}
              </p>
              <h3 className="text-4xl font-bold text-gray-900 mt-1">
                {pg.category === "Pg" || pg.category === "Rented-Room"
                  ? `₹${pg.price}`
                  : <></>}
              </h3>
            </div>

            <div className="w-full flex flex-col gap-2">
              {razorpaypaymentloading ? (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg cursor-not-allowed hover:bg-blue-600 transition transform"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </button>
              ) : pg.category === "Pg" || pg.category === "Rented-Room" ? (
                // Monthly PG Booking
                <button
                  onClick={() => isAuthenticated && pg.availabilityStatus === "Available" && handleBook(pg.price)}
                  disabled={pg.availabilityStatus !== "Available" || !isAuthenticated}
                  className={`flex flex-col items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold shadow-lg
    ${pg.availabilityStatus === "Available" && isAuthenticated
                      ? "bg-blue-600 text-white hover:bg-blue-700 transition transform hover:-translate-y-1 hover:scale-105"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed relative group overflow-hidden"
                    }`}
                >
                  <span className="text-lg">
                    {pg.availabilityStatus === "Available"
                      ? (isAuthenticated ? "Monthly Booking" : "Login to Book")
                      : (
                        <>
                          <span className="line-through">Monthly Booking</span>
                          <span className="text-red-500"> ✖ </span>
                        </>
                      )}
                  </span>

                  <span className="text-sm">₹{pg.price} / month</span>

                  {/* Tooltip for unavailable */}
                  {pg.availabilityStatus !== "Available" && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      Booking not available
                    </span>
                  )}

                  {/* Tooltip for unauthenticated */}
                  {!isAuthenticated && pg.availabilityStatus === "Available" && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      Login required
                    </span>
                  )}
                </button>

              ) : (
                // Non-PG: show available rates
                <div className="w-full flex flex-col gap-4">
                  {pg?.rentperNight && (
                    <button
                      onClick={() => handleBook(pg.rentperNight)}
                      disabled={pg.occupied !== 0}
                      className={`flex justify-between items-center w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition transform ${pg.occupied === 0
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed relative group"
                        }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-bold">
                          {pg.occupied === 0 ? "Booking per Night" : (
                            <>
                              <span className="line-through">Booking per Night</span>
                              <span className="text-red-500 ml-1">✖</span>
                            </>
                          )}
                        </span>
                        <span className="text-sm mt-1">
                          ₹{pg.rentperNight} / night
                        </span>
                      </div>
                      {pg.occupied !== 0 && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Booking not available
                        </span>
                      )}
                    </button>
                  )}

                  {pg?.rentperday && (
                    <button
                      onClick={() => handleBook(pg.rentperday)}
                      disabled={pg.occupied !== 0}
                      className={`flex justify-between items-center w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition transform ${pg.occupied === 0
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed relative group"
                        }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-bold">
                          {pg.occupied === 0 ? "Booking per Day" : (
                            <>
                              <span className="line-through">Booking per Day</span>
                              <span className="text-red-500 ml-1">✖</span>
                            </>
                          )}
                        </span>
                        <span className="text-sm mt-1">
                          ₹{pg.rentperday} / day
                        </span>
                      </div>
                      {pg.occupied !== 0 && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Booking not available
                        </span>
                      )}
                    </button>
                  )}

                  {pg?.rentperhour && (
                    <button
                      onClick={() => handleBook(pg.rentperhour)}
                      disabled={pg.occupied !== 0}
                      className={`flex justify-between items-center w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition transform ${pg.occupied === 0
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:-translate-y-1 hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed relative group"
                        }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-bold">
                          {pg.occupied === 0 ? "Booking per Hour" : (
                            <>
                              <span className="line-through">Booking per Hour</span>
                              <span className="text-red-500 ml-1">✖</span>
                            </>
                          )}
                        </span>
                        <span className="text-sm mt-1">
                          ₹{pg.rentperhour} / hour
                        </span>
                      </div>
                      {pg.occupied !== 0 && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Booking not available
                        </span>
                      )}
                    </button>
                  )}
                </div>

              )}
            </div>
          </InfoBlock>


          {/* ACTION BUTTONS */}
          <InfoBlock title="Actions">
            <div className="flex flex-col mt-5 space-y-4">
              <Action icon={<Phone />} label="Contact Owner" whatsappNumber="+919693915693" isAuthenticated={isAuthenticated} onAuthOpen={() => setIsAuthModalOpen(true)} />
              <Action icon={<Navigation />} label="Get Directions" onClick={handleGetDirections} isAuthenticated={isAuthenticated} onAuthOpen={() => setIsAuthModalOpen(true)} />
              <Action icon={<Share2 />} label="Share PG" onClick={sharePG} isAuthenticated={isAuthenticated} onAuthOpen={() => setIsAuthModalOpen(true)} />
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
