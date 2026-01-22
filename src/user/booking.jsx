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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {[
            { label: "Total", value: bookings.length, icon: Home, color: "indigo" },
            { label: "Active", value: bookings.filter(b => b.status === "paid").length, icon: Clock, color: "yellow" },
            { label: "Completed", value: bookings.filter(b => b.status === "In-Active").length, icon: CheckCircle, color: "green" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r from-${color}-500 to-${color}-600 flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{label}</p>
              </div>
            </motion.div>
          ))}
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

  const isCheckedOut = booking.status === "In-Active";
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

  const { bg, text, icon: StatusIcon } = getStatusConfig(booking.status);

  return (
    <>
      <div className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl hover:shadow-3xl hover:shadow-indigo-500/25 transition-all duration-500 overflow-hidden hover:-translate-y-3 hover:scale-[1.02]">
        
        {/* Status Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className={`
            absolute -top-4 -right-4 w-24 h-24 rounded-2xl
            bg-gradient-to-r ${bg}
            flex items-center justify-center shadow-2xl
            ring-4 ring-white/50
            ${text}
          `}
        >
          <StatusIcon className="w-8 h-8" />
        </motion.div>

        {/* Header */}
        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {booking.branch?.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {booking.branch?.city}, {booking.branch?.state}
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => handleCopy(booking.bookingId)}
                className="p-2 hover:bg-white/50 rounded-xl transition-all"
                title="Copy Booking ID"
              >
                <Copy className={`w-5 h-5 ${copiedId === booking.bookingId ? 'text-emerald-500' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Booking ID */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 mb-6">
            <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">Booking ID</p>
            <p className="font-mono text-sm font-bold text-gray-900 truncate" title={booking.bookingId}>
              {booking.bookingId}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-8 pb-8 grid grid-cols-2 gap-4">
          <DetailItem label="Room" value={booking.roomNumber} icon={BedDouble} />
          <DetailItem label="Payment" value={booking.paymentSource} icon={Wallet} />
          <DetailItem label="Guest" value={booking.username} icon={User} />
          <DetailItem label="Check-in" value={formatDate(booking.checkInDate)} icon={Calendar} />
          <DetailItem 
            label="Check-out" 
            value={booking.checkedoutdate ? formatDate(booking.checkedoutdate) : "Ongoing"} 
            icon={Calendar}
          />
        </div>

        {/* Payment Breakdown */}
        <div className="px-8 pb-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Total Amount</span>
                <span className="text-xl font-black text-gray-900">₹{booking.amount?.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wallet Used</span>
                <span className="text-emerald-600 font-semibold">−₹{booking.amount?.walletUsed}</span>
              </div>
              <div className="h-px bg-gradient-to-r from-gray-200 to-gray-300 my-3" />
              <div className="flex justify-between items-end">
                <span className="text-lg font-semibold text-gray-700">Payable</span>
                <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{booking.amount?.payableAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay Details */}
        <div className="px-8 pb-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <RazorpayDetail label="Order ID" value={booking.razorpay?.orderId} onCopy={() => handleCopy(booking.razorpay?.orderId)} />
            <RazorpayDetail label="Payment ID" value={booking.razorpay?.paymentId} onCopy={() => handleCopy(booking.razorpay?.paymentId)} />
          </div>
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 pt-4">
          <div className="space-y-3">
            {!isCheckedOut && booking.status === "paid" && (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/complain/${booking.branch?._id}`)}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <AlertCircle size={20} />
                  Raise Complaint
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/Wishlistdetails/${booking.branch?._id}`)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Heart size={20} />
                  Pay Rent / Explore
                </motion.button>
              </>
            )}

            {isCheckedOut && !hasReviewed && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReview(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Star size={20} />
                Rate & Review Stay
              </motion.button>
            )}

            {hasReviewed && isCheckedOut && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 text-center shadow-xl"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Thank you for your review!</h3>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < userReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-sm text-emerald-700">{userReview.review}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReview && (
          <ReviewModal
            booking={booking}
            loading={reviewLoading}
            onClose={() => setShowReview(false)}
            onSubmit={handleSubmitReview}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ===================== COMPONENTS ===================== */

function DetailItem({ label, value, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-2 mb-2 opacity-75 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      </div>
      <p className="font-bold text-gray-900 text-base truncate">{value}</p>
    </motion.div>
  );
}

function RazorpayDetail({ label, value, onCopy }) {
  return (
    <div className="space-y-1 group">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono font-medium text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-xl truncate flex-1" title={value}>
          {value}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopy}
          className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-600 group-hover:scale-110 transition-all duration-200"
        >
          <Copy className="w-4 h-4" />
        </motion.button>
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

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
}
