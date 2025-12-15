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
  MessageCircle,
  AlertCircle,
  Star,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Booking() {
  const { data, isLoading } = useGetbookingQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-14 w-14 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
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
      <h1 className="text-3xl font-bold text-center mb-10">My Bookings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- BOOKING CARD ---------------- */

function BookingCard({ booking }) {
  console.log(booking.room)
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  const [showReview, setShowReview] = useState(false);
  const [createReview] = useCreateReviewMutation();

  const isCheckedOut = booking.status === "In-Active";

console.log("Logged-in User ID:", user?._id?.toString());

const hasReviewed =
  booking?.room?.personalreview?.some((r, index) => {
    console.log(`\n---- Review ${index + 1} ----`);
    console.log("Full review object:", r);

    console.log(
      "Review user object:",
      r.user
    );

    console.log(
      "Review user _id:",
      r.user?._id
    );

    console.log(
      "Review user _id (string):",
      r.user?._id?.toString()
    );

    console.log(
      "Logged user _id (string):",
      user?._id?.toString()
    );

    const isMatch =
      r.user?._id?.toString() === user?._id?.toString();

    console.log("Is same user? 👉", isMatch);

    return isMatch;
  }) || false;

console.log("\nFINAL hasReviewed VALUE 👉", hasReviewed);


  const handleComplain = () => {
    navigate(`/complain/${booking.branch?._id}`);
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
      console.log(err)
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col">
        {/* IMAGE */}
        <img
          src={booking?.room?.roomImages?.[0] || "/room-placeholder.jpg"}
          alt="Room"
          className="h-40 w-full object-cover rounded-xl mb-4"
        />

        {/* INFO */}
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Home size={18} /> {booking.branch?.name}
        </h2>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin size={14} /> {booking.branch?.city}
        </p>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
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
        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            onClick={handleComplain}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            <AlertCircle size={16} className="inline" /> Complaint
          </button>
          {isCheckedOut && !hasReviewed && booking?.room?._id && (
            <button
              onClick={() => {
                console.log("Room ID:", booking.room._id);
                setShowReview(true);
              }}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
            >
              Rate & Review
            </button>
          )}

        </div>
      </div>

      {/* REVIEW MODAL */}
      {showReview && (
        <ReviewModal
          onClose={() => setShowReview(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}

/* ---------------- REVIEW MODAL ---------------- */

function ReviewModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Rate your stay
        </h2>

        {/* STARS */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={28}
              onClick={() => setRating(num)}
              className={`cursor-pointer ${num <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
                }`}
            />
          ))}
        </div>

        {/* TEXT */}
        <textarea
          placeholder="Write your experience..."
          className="w-full border rounded-lg p-3 mb-4"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button
          onClick={() => onSubmit(rating, review)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

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
