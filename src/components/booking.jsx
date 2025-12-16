import { useState } from "react";
import { useGetbookingQuery } from "../Bothfeatures/features2/api/tenant";
import { useCreateReviewMutation } from "../Bothfeatures/features2/api/reviewapi";
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
} from "lucide-react";
import { toast } from "react-toastify";

/* ===================== MAIN ===================== */

export default function Booking() {
  const { data, isLoading } = useGetbookingQuery();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookingSkeleton key={i} />
        ))}
      </div>
    );
  }

  const bookings = data?.bookings || [];

  if (!bookings.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No booking records found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        My Bookings
      </h1>

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
  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();

  const isCheckedOut = booking.status === "In-Active";

  const hasReviewed =
    booking?.room?.personalreview?.some(
      (r) => r?.user?.toString() === user?._id?.toString()
    ) || false;

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

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition p-5 border">
        {/* IMAGE */}
        <img
          src={booking?.room?.roomImages?.[0] || "/room-placeholder.jpg"}
          alt="Room"
          className="h-44 w-full object-cover rounded-2xl"
        />

        {/* INFO */}
        <div className="mt-4 space-y-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Home size={18} /> {booking.branch?.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> {booking.branch?.city}
          </p>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
          <Detail label="Room" value={booking.roomNumber} icon={<BedDouble size={14} />} />
          <Detail label="Rent" value={`₹${booking.Rent}`} icon={<Wallet size={14} />} />
          <Detail label="Check-in" value={formatDate(booking.checkInDate)} icon={<Calendar size={14} />} />
          <Detail
            label="Check-out"
            value={booking.checkedoutdate ? formatDate(booking.checkedoutdate) : "—"}
            icon={<Calendar size={14} />}
          />
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">
          {!isCheckedOut && (
            <button
              onClick={() => navigate(`/complain/${booking.branch?._id}`)}
              className="bg-red-50 text-red-600 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition"
            >
              <AlertCircle size={16} className="inline mr-1" />
              Raise Complaint
            </button>
          )}

          {isCheckedOut && !hasReviewed && (
            <button
              onClick={() => setShowReview(true)}
              className="bg-yellow-500 text-white py-2.5 rounded-xl hover:bg-yellow-600"
            >
              ⭐ Rate & Review
            </button>
          )}

          {hasReviewed && (
            <p className="text-center text-green-600 text-sm">
              ✅ Already Reviewed
            </p>
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

        <h2 className="text-xl font-bold text-center mb-4">
          Rate your stay
        </h2>

        {/* STARS */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={30}
              onClick={() => setRating(n)}
              className={`cursor-pointer ${
                n <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
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
