import { useState } from "react";
import { useGetbookingQuery } from "../backend-routes/ownerroutes/tenant";
import { useCreateReviewMutation } from "../backend-routes/userroutes/review";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  MapPin,
  Calendar,
  BedDouble,
  Wallet,
  AlertCircle,
  Star,
  X,
  Copy,
  User,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Heart,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

/* ===================== MAIN ===================== */

export default function Booking() {
  const { data, isLoading, isError } = useGetbookingQuery();
  const bookings = data?.bookings || [];
  console.log(bookings[1])

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md space-y-4">
          <XCircle className="w-24 h-24 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Failed to load bookings</h2>
          <p className="text-gray-600">Please refresh or try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <BookingSkeletons />;
  }

  if (!bookings.length) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your stays, payments, and leave reviews for your favorite properties
          </p>
        </motion.div>

        

        {/* Bookings Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <BookingCard booking={booking} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ===================== CARD ===================== */

function BookingCard({ booking }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showReview, setShowReview] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

  const isCheckedOut = booking.tenantId&&booking.tenantId.status === "In-Active";
  const userReview = booking?.room?.personalreview?.find(
    (r) => r?.user?._id?.toString() === user?._id?.toString()
  );
  const hasReviewed = !!userReview;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.success("Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmitReview = async (rating, reviewText) => {
    try {
      await createReview({
        roomId: booking.room._id,
        rating,
        review: reviewText,
      }).unwrap();
      toast.success("🎉 Review submitted successfully!");
      setShowReview(false);
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const getStatusConfig = (status) => {
    const config = {
      paid: { bg: "from-emerald-500 to-teal-600", text: "text-white", icon: CheckCircle },
      processing: { bg: "from-amber-400 to-orange-500", text: "text-white animate-pulse", icon: Clock },
      "In-Active": { bg: "from-slate-400 to-slate-500", text: "text-white", icon: CheckCircle },
      cancelled: { bg: "from-rose-500 to-pink-600", text: "text-white", icon: XCircle },
    };
    return config[status] || config.cancelled;
  };
const STATUS_CONFIG = {
  paid: {
    label: "Active Booking",
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  processing: {
    label: "Processing",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  "In-Active": {
    label: "Completed",
    color: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-rose-100 text-rose-700",
    dot: "bg-rose-500",
  },
};

  const { bg, text, icon: StatusIcon } = getStatusConfig(booking.status);

  return (
   <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

  {/* ================= HEADER ================= */}
  <div className="px-5 pt-5 pb-3 flex justify-between">
    <div className="space-y-1">
      <h2 className="text-lg font-bold text-slate-900">
        {booking.branch?.name}
      </h2>

      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <MapPin size={12} className="text-indigo-500" />
        {booking.branch?.city}, {booking.branch?.state || "India"}
      </div>

      {/* STATUS */}
      {(() => {
        const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG.cancelled;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${status.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        );
      })()}
    </div>

    <button
      onClick={() => handleCopy(booking.bookingId)}
      className="p-2 rounded-lg hover:bg-slate-100"
    >
      <Copy size={16} className="text-slate-500" />
    </button>
  </div>

  {/* ================= BOOKING ID ================= */}
  <div className="px-5 pb-3">
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase">
        Booking ID
      </p>
      <p className="text-xs font-mono font-semibold text-slate-800 truncate">
        {booking.bookingId}
      </p>
    </div>
  </div>

  {/* ================= DETAILS ================= */}
  <div className="px-5 pb-4 grid grid-cols-2 gap-3">
    <DetailItem
      label="Payment"
      value={booking.paymentSource}
      icon={Wallet}
    />

    {booking.tenantId && (
      <>
        <DetailItem
          label="Check-in"
          value={formatDate(booking.tenantId.checkInDate)}
          icon={Calendar}
        />
        <DetailItem
          label="Check-out"
          value={
            booking.tenantId.checkedoutdate
              ? formatDate(booking.tenantId.checkedoutdate)
              : "Ongoing"
          }
          icon={Calendar}
        />
      </>
    )}
  </div>

  {/* ================= PAYMENT SUMMARY ================= */}
  <div className="px-5 pb-4">
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-slate-500">Total</span>
        <span className="font-bold">₹{booking.amount?.totalAmount}</span>
      </div>

      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Wallet</span>
        <span className="text-emerald-600">
          −₹{booking.amount?.walletUsed}
        </span>
      </div>

      <div className="flex justify-between font-bold text-base pt-2 border-t">
        <span>Payable</span>
        <span className="text-indigo-600">
          ₹{booking.amount?.payableAmount}
        </span>
      </div>
    </div>
  </div>

  {/* ================= RAZORPAY ================= */}
  <div className="px-5 pb-4 grid grid-cols-2 gap-3 text-xs">
    <RazorpayDetail
      label="Order ID"
      value={booking.razorpay?.orderId}
      onCopy={() => handleCopy(booking.razorpay?.orderId)}
    />
    <RazorpayDetail
      label="Payment ID"
      value={booking.razorpay?.paymentId}
      onCopy={() => handleCopy(booking.razorpay?.paymentId)}
    />
  </div>

  {/* ================= ACTIONS ================= */}
  <div className="px-5 pb-5 space-y-2">
    {booking.status === "paid" && booking.tenantId && booking.tenantId.status=="Active" ?(
      <>
        <button
          onClick={() => navigate(`/complain/${booking.branch?._id}`)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-rose-500 text-white hover:bg-rose-600"
        >
          Raise Complaint
        </button>

        <button
          onClick={() => navigate(`/Wishlistdetails/${booking.branch?._id}`)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Pay Rent / Explore
        </button>
      </>
    ):<>
    <button onClick={()=>setShowReview(true)}>
      review
    </button>
    
    </>}
  </div>
</div>

  );
}
   
/* ===================== COMPONENTS ===================== */

function DetailItem({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
        <Icon size={14} className="text-indigo-600" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}


function RazorpayDetail({ label, value, onCopy }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
      <div className="flex items-center gap-2">
        <span className="flex-1 truncate text-xs font-mono bg-slate-100 px-2 py-1 rounded-lg">
          {value}
        </span>
        <button
          onClick={onCopy}
          className="p-1.5 rounded-lg hover:bg-slate-200"
        >
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
}


function ReviewModal({ booking, onClose, onSubmit, loading }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.7, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 50 }}
        className="bg-white/95 backdrop-blur-2xl rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-3xl border border-white/50"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Rate Your Stay
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-2xl transition-all"
            >
              <X className="w-6 h-6 text-gray-500" />
            </motion.button>
          </div>

          {/* Property Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{booking.branch?.name}</h3>
                <p className="text-sm text-gray-600">{booking.branch?.city}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.button
                key={n}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRating(n)}
                className={`p-2 rounded-xl transition-all ${
                  n <= rating
                    ? "text-yellow-400 bg-yellow-100 shadow-lg"
                    : "text-gray-300 hover:text-yellow-300 hover:bg-yellow-50"
                }`}
              >
                <Star className="w-8 h-8" fill={n <= rating ? "currentColor" : "none"} />
              </motion.button>
            ))}
          </div>

          {/* Review Text */}
          <textarea
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience... What did you love? Any suggestions?"
            className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 resize-none transition-all duration-300 text-lg placeholder-gray-400"
          />

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!rating || loading}
            onClick={() => onSubmit(rating, review)}
            className="w-full mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Star className="w-6 h-6" />
                Submit Review
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md space-y-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
          <Home className="w-16 h-16 text-white" />
        </div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            No Bookings Yet
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
            Your booking journey starts here. Find amazing stays and create your first booking.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 mx-auto block"
        >
          Explore Properties
        </motion.button>
      </motion.div>
    </div>
  );
}

function BookingSkeletons() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="h-12 w-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl mx-auto animate-pulse mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded-full mx-auto animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl animate-pulse"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 mb-6" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded-xl w-3/4" />
                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                <div className="grid grid-cols-2 gap-4 h-20">
                  <div className="h-12 bg-gray-200 rounded-xl" />
                  <div className="h-12 bg-gray-200 rounded-xl" />
                </div>
                <div className="h-20 bg-gray-100 rounded-2xl" />
                <div className="h-32 bg-gray-100 rounded-2xl" />
                <div className="h-12 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}



 