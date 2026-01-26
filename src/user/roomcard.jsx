import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin,ArrowRight, ShieldCheck, Users, Info } from "lucide-react";
import WishlistButton from "../user/wishlist.jsx";

/* ---------------- IMAGE OPTIMIZATION ---------------- */
const optimizeImg = (input) => {
  // If array → take first image
  let url = Array.isArray(input) ? input[0] : input;

  // If still not a string → fallback
  if (typeof url !== "string") {
    return "/room-placeholder.jpg";
  }

  // Cloudinary optimization
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_500,c_fill,g_auto/"
  );
};
/* ---------------- SAFE PRICE CALC ---------------- */
const getTotalPrice = (room) => {
  // PG → services based
  if (room?.category === "Pg" && Array.isArray(room?.services)) {
    return room.services.reduce(
      (sum, s) => sum + Number(s?.price || 0),
      Number(room?.price || 0)
    );
  }

  // Hotel priority
  if (room?.category === "Hotel") {
    return room?.rentperNight || room?.rentperday || room?.price || 0;
  }

  // Rented Room
  return room?.price || 0;
};


/* ---------------- RATING CALC ---------------- */
const calculateRating = (reviews = []) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
  return (total / reviews.length).toFixed(1);
};

/* ---------------- SKELETON ---------------- */
const Skeleton = () => (
  <div className="animate-pulse bg-white rounded-2xl border border-slate-100 p-3">
    <div className="bg-slate-200 aspect-[4/4.5] rounded-xl mb-4" />
    <div className="h-4 bg-slate-200 rounded w-4/5 mb-2" />
    <div className="h-3 bg-slate-200 rounded w-3/5" />
  </div>
);

/* ---------------- CARD COMPONENT ---------------- */
const RoomCard = memo(function RoomCard({
  pgData = [],
  setIsAuthModalOpen,
  isLoading = false,
}) {
  const navigate = useNavigate();

  const goToDetail = useCallback(
    (id) => navigate(`/pg/${id}`),
    [navigate]
  );

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} />
        ))}
      </section>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!pgData.length) {
    return (
      <p className="text-center text-slate-400 py-20">
        No properties found
      </p>
    );
  }

  /* ---------- CARDS ---------- */
return (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
    {Array.isArray(pgData) && pgData.map((room, index) => {
      const isRentedRoom = room.category === "Rented-Room";
      const avgRating = calculateRating(room.personalreview);

      return (
        <article
          key={room._id}
          onClick={() => goToDetail(room._id)}
          className="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 
                     hover:border-green-200 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)] 
                     transition-all duration-500 overflow-hidden cursor-pointer active:scale-[0.98]"
        >
          {/* IMAGE */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={optimizeImg(room.roomImages || room.branch?.Propertyphoto?.[0])}
              alt={room.branch?.name || "Room"}
              loading={index < 2 ? "eager" : "lazy"}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 
                ${room.availabilityStatus === "Occupied"
                  ? "grayscale opacity-80"
                  : "brightness-[0.95] group-hover:brightness-100"
                }`}
            />

            {room.availabilityStatus === "Occupied" && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
                <span className="bg-white px-6 py-2 rounded-full text-xs font-black">
                  Fully Booked
                </span>
              </div>
            )}

            {/* BADGES */}
            <div className="absolute top-4 left-4 z-30 space-y-2">
              {room.verified && (
                <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold">
                  <ShieldCheck size={12} />
                  VERIFIED
                </div>
              )}
              <div className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold">
                {room.allowedFor === "Anyone"
                  ? "👥 MIXED"
                  : `👩 ${room.allowedFor?.toUpperCase()}`}
              </div>
            </div>

            {/* WISHLIST */}
            <div
              className="absolute top-4 right-4 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <WishlistButton
                pg={room}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />
            </div>

            {/* RATING */}
            <div className="absolute bottom-4 right-4 bg-white px-2.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <Star size={12} className="text-amber-500" fill="currentColor" />
              <span className="text-xs font-bold">
                {avgRating || "New"}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 flex flex-col flex-grow">
            <span className="text-[10px] font-bold text-green-600 uppercase mb-1">
              {isRentedRoom ? "Independent" : room.category}
            </span>

            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
              {room.branch?.name}
            </h3>

            <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
              <MapPin size={12} />
              <span className="truncate">{room.branch?.address}</span>
            </div>

            {/* AMENITIES */}
            <div className="flex items-center gap-3 mb-6">
              {room.type && (
                <div className="flex items-center gap-1 text-xs font-semibold bg-slate-50 px-3 py-1.5 rounded-lg">
                  <Users size={14} />
                  {room.type} Sharing
                </div>
              )}
              <span className="text-xs text-slate-400">
                {room.furnishedType || "Furnished"}
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-auto pt-4 border-t flex justify-between items-center gap-4">
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">
                  {room.category === "Hotel" ? "Per Night" : "Monthly"}
                </p>

                <p className="text-sm font-black text-gray-900">
                  ₹{getTotalPrice(room)}hg
                  <span className="text-[10px] text-gray-500">
                    /{room.category === "Hotel" ? "night" : "mo"}
                  </span>
                </p>

                {room.category === "Pg" && (
                  <span className="text-[8px] text-emerald-600 font-bold uppercase">
                    Incl. Services
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToDetail(room._id);
                }}
                className="flex-grow bg-slate-900 text-white py-3 rounded-xl font-bold text-sm 
                           hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>
      );
    })}
  </section>
);

});

export default RoomCard;
