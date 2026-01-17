import { useState } from "react";
import { useGetbookingQuery } from "../Bothfeatures/adminfeatures/api/tenant";
import { useCreateReviewMutation } from "../Bothfeatures/adminfeatures/api/reviewapi";
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
} from "lucide-react";
import { toast } from "react-toastify";

/* ===================== MAIN ===================== */

export default function Booking() {
  const { data, isLoading } = useGetbookingQuery();
  const bookings = data?.bookings || [];


  const statusColors = {
    paid: `
    bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600
    text-white shadow-emerald-400/40
  `,
    processing: `
    bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500
    text-white shadow-orange-400/40 animate-pulse
  `,
    cancelled: `
    bg-gradient-to-r from-rose-500 via-red-500 to-pink-600
    text-white shadow-red-400/40
  `,
  };


  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No booking records found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">My Bookings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
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

  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();

  const isCheckedOut = booking.status === "In-Active";

  const userReview = booking?.room?.personalreview?.find(
    (r) => r?.user?._id?.toString() === user?._id?.toString()
  );

  const hasReviewed = !!userReview;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmitReview = async (rating, review) => {
    try {
      await createReview({
        roomId: booking.room._id,
        rating,
        review,
      }).unwrap();
      toast.success("Review submitted successfully");
      setShowReview(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const statusColors = {
    processing: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    "In-Active": "bg-gray-100 text-gray-700",
  };

  return (
    <>
      <div
        className="
    bg-white/90 backdrop-blur-xl
    rounded-3xl
    border border-gray-200/50
    shadow-lg hover:shadow-2xl
    hover:-translate-y-1
    transition-all duration-300
    p-6
    group
    relative
  "
      >
        {/* STATUS BADGE */}
        <span
          className={`
      absolute top-4 right-4
      inline-flex items-center gap-2
      px-4 py-1.5
      text-xs font-semibold uppercase tracking-wider
      rounded-full
      shadow-lg
      ring-1 ring-white/30
      backdrop-blur-md
      transition-all duration-300
      group-hover:scale-105
      ${statusColors[booking.status]}
    `}
        >
          <span
            className={`
        w-2.5 h-2.5 rounded-full
        ${booking.status === "paid" && "bg-green-300 animate-pulse"}
        ${booking.status === "processing" && "bg-yellow-300 animate-pulse"}
        ${booking.status === "cancelled" && "bg-red-300"}
      `}
          />
          <span className="capitalize">{booking.status}</span>
        </span>

        {/* INFO */}
        <div className="space-y-1 pr-20">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Home size={18} className="text-indigo-600" />
            {booking.branch?.name}
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} />
            {booking.branch?.city}
          </p>

          <p className="text-xs text-gray-400">
            Booking ID:
            <span className="ml-1 font-medium text-gray-600">
              {booking.bookingId}
            </span>
          </p>
        </div>

        <hr className="my-5 border-gray-200/70" />

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Room" value={booking.roomNumber} icon={<BedDouble size={15} />} />
          <Detail label="Payment" value={booking.paymentSource} icon={<Wallet size={15} />} />
          <Detail label="User" value={booking.username} icon={<User size={15} />} />
          <Detail label="Email" value={booking.email} icon={<User size={15} />} />
          <Detail label="Check-in" value={formatDate(booking.checkInDate)} icon={<Calendar size={15} />} />
          <Detail
            label="Check-out"
            value={booking.checkedoutdate ? formatDate(booking.checkedoutdate) : "—"}
            icon={<Calendar size={15} />}
          />
        </div>

        {/* AMOUNT */}
        <div className="mt-6 rounded-2xl bg-gray-50 p-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-gray-900">
              ₹{booking.amount?.totalAmount}
            </span>
          </p>

          <p className="flex justify-between">
            <span className="text-gray-500">Wallet Used</span>
            <span className="font-semibold text-green-600">
              ₹{booking.amount?.walletUsed}
            </span>
          </p>

          <p className="flex justify-between text-base">
            <span className="font-medium text-gray-700">Payable</span>
            <span className="
        font-extrabold
        text-transparent bg-clip-text
        bg-gradient-to-r from-indigo-600 to-purple-600
      ">
              ₹{booking.amount?.payableAmount}
            </span>
          </p>
        </div>

        {/* RAZORPAY */}
        <div className="mt-5 text-xs text-gray-500 space-y-2">
          {[
            { label: "Order ID", value: booking.razorpay?.orderId },
            { label: "Payment ID", value: booking.razorpay?.paymentId },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span>
                {label}: <span className="font-medium">{value}</span>
              </span>
              <button
                onClick={() => handleCopy(value)}
                className="hover:text-indigo-600 transition"
                title="Copy"
              >
                <Copy
                  size={14}
                  className={
                    copiedId === value ? "text-green-600" : "text-gray-400"
                  }
                />
              </button>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">
          {!isCheckedOut && booking.status === "paid" && (
            <>
              <button
                onClick={() => navigate(`/complain/${booking.branch?._id}`)}
                className="
          bg-gradient-to-r from-red-500 to-red-600
          text-white py-3 rounded-xl
          hover:from-red-600 hover:to-red-700
          transition
          flex items-center justify-center gap-2
          font-semibold
          shadow-md hover:shadow-xl
        "
              >
                <AlertCircle size={16} /> Raise Complaint
              </button>
              <button  
               onClick={() => navigate(`/Wishlistdetails/${booking.branch?._id}`)}
              
              >PAy Rent/Explore</button>

            </>

          )}

          {isCheckedOut && !hasReviewed && (
            <button
              onClick={() => setShowReview(true)}
              className="
          bg-gradient-to-r from-yellow-500 to-yellow-600
          text-white py-3 rounded-xl
          hover:from-yellow-600 hover:to-yellow-700
          transition
          flex items-center justify-center gap-2
          font-semibold
          shadow-md hover:shadow-xl
        "
            >
              <Star size={16} /> Rate & Review
            </button>
          )}

          {hasReviewed && isCheckedOut && (
            <div className="
        bg-green-50 border border-green-300
        text-green-800 rounded-xl p-4
        text-center shadow-sm
        flex flex-col items-center gap-2
      ">
              <p className="font-semibold flex items-center gap-2">
                <Star size={16} className="text-yellow-400" /> Already Reviewed
              </p>
              <div className="flex gap-1">
                {Array.from({ length: userReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" />
                ))}
                {Array.from({ length: 5 - userReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-gray-300" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {showReview && (
        <ReviewModal
          loading={reviewLoading}
          onClose={() => setShowReview(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}

/* ===================== REVIEW MODAL ===================== */

function ReviewModal({ onClose, onSubmit, loading }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-scaleIn">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Rate your stay</h2>

        {/* STARS */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={30}
              onClick={() => setRating(n)}
              className={`cursor-pointer ${n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        <textarea
          rows={4}
          className="w-full border rounded-xl p-3 mb-4"
          placeholder="Write your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button
          disabled={!rating || loading}
          onClick={() => onSubmit(rating, review)}
          className="w-full bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

/* ===================== SKELETON ===================== */

function BookingSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-5 shadow animate-pulse">
      <div className="h-44 bg-gray-200 rounded-2xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
      <div className="h-10 bg-gray-200 rounded-xl mt-6" />
    </div>
  );
}

/* ===================== HELPERS ===================== */

function Detail({ label, value, icon }) {
  return (
    <div>
      <p className="text-xs text-gray-500 flex items-center gap-1">
        {icon} {label}
      </p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
