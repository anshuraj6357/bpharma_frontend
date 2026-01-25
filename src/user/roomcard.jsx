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
      {pgData.map((room, index) => {
        const isRentedRoom = room.category === "Rented-Room";
        const isGirlsOnly = room.allowedFor === "Girls";
        const avgRating = calculateRating(room.personalreview);

        const totalPgPrice =
          room.category === "Pg"
            ? room.services?.reduce(
                (total, s) => total + Number(s.price || 0),
                Number(room.rent || 0)
              )
            : null;

        return (
         <article
  key={room._id}
  onClick={() => goToDetail(room._id)}
  className="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 
             hover:border-green-200 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)] 
             transition-all duration-500 overflow-hidden cursor-pointer active:scale-[0.98]"
>
  {/* IMAGE SECTION */}
  <div className="relative aspect-[4/5] overflow-hidden">
    <img
      src={optimizeImg(room.roomImages || room.branch?.Propertyphoto?.[0])}
      alt={room.branch?.name || "Premium Accommodation"}
      loading={index < 2 ? "eager" : "lazy"}
      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 
        ${room.availabilityStatus === "Occupied" ? "grayscale opacity-80" : "brightness-[0.95] group-hover:brightness-100"}`}
    />

    {/* OCCUPIED STATE - Sophisticated Minimalist */}
    {room.availabilityStatus === "Occupied" && (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
        <div className="bg-white/90 px-6 py-2 rounded-full shadow-xl">
          <span className="text-slate-900 font-black text-xs uppercase tracking-widest">Fully Booked</span>
        </div>
      </div>
    )}

    {/* FLOATING BADGES - Top Left */}
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
      {room.verified && (
        <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg">
          <ShieldCheck size={12} fill="white" />
          <span>VERIFIED</span>
        </div>
      )}
      <div className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm border border-white/20">
        {room.allowedFor?.toUpperCase() === "ANYONE" ? "👥 MIXED" : `👩 ${room.allowedFor?.toUpperCase()}`}
      </div>
    </div>

    {/* WISHLIST - Top Right */}
    <div className="absolute top-4 right-4 z-30" onClick={(e) => e.stopPropagation()}>
      <div className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-colors duration-300">
        <WishlistButton pg={room} onAuthOpen={() => setIsAuthModalOpen(true)} />
      </div>
    </div>

    {/* RATING - Bottom Right */}
    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white">
      <Star size={12} className="text-amber-500" fill="currentColor" />
      <span className="text-xs font-bold text-slate-800">{avgRating || "New"}</span>
    </div>
{/* 
    {/* URGENCY TAG - Bottom Left */}
    {/* {room. > 0 && room.vacant <= 2 && (
      <div className="absolute bottom-4 left-4 bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg animate-pulse shadow-lg">
        LOW SEATS
      </div>
    )} */} 
  </div>

  {/* CONTENT SECTION */}
  <div className="p-5 flex flex-col flex-grow">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
        {isRentedRoom ? "Independent" : room.category}
      </span>
    </div>

    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
      {room.branch?.name}
    </h3>

    <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
      <MapPin size={12} className="shrink-0" />
      <span className="truncate">{room.branch?.address}</span>
    </div>

    {/* AMENITIES / SPECS */}
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold bg-slate-50 px-2.5 py-1.5 rounded-lg">
        <Users size={14} />
        <span>{room.type} Sharing</span>
      </div>
      <div className="text-slate-400 text-xs font-medium">
        {room.furnishedType || "Furnished"}
      </div>
    </div>

    {/* PRICE & ACTION */}
    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
      <div>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Monthly</p>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-black text-slate-900">₹{room.category === "Pg" ? totalPgPrice : room.price}</span>
          <span className="text-xs font-bold text-slate-400">/mo</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToDetail(room._id);
        }}
        className="flex-grow bg-slate-900 text-white py-3 rounded-xl font-bold text-sm 
                   hover:bg-green-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
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
