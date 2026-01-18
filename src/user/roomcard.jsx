import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, ShieldCheck, Users, Info, ArrowRight } from "lucide-react";
import WishlistButton from "../user/wishlist.jsx";

/* ---------------- IMAGE OPTIMIZATION ---------------- */
const optimizeImg = (url) => {
  if (!url) return "/room-placeholder.jpg";
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_500,c_fill,g_auto/"
  );
};

/* ---------------- RATING CALC ---------------- */
const calculateRating = (reviews = []) => {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
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

/* ---------------- CARD ---------------- */
const RoomCard = memo(function RoomCard({
  pgData = [],
  setIsAuthModalOpen,
  isLoading,
}) {
  const navigate = useNavigate();

  const goToDetail = useCallback(
    (id) => navigate(`/pg/${id}`),
    [navigate]
  );

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} />
        ))}
      </section>
    );
  }

  if (!pgData.length) {
    return (
      <p className="text-center text-slate-400 py-20">
        No properties found
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {pgData.map((room, index) => {
        const isRentedRoom = room.category === "Rented-Room";
        const isGirlsOnly = room.allowedFor === "Girls";

        const avgRating = useMemo(
          () => calculateRating(room.personalreview),
          [room.personalreview]
        );

        return (
          <article
            key={room._id}
            className="group bg-white rounded-2xl border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]
                       transition-all duration-500 overflow-hidden flex flex-col relative"
          >
            {/* IMAGE */}
            <div className="relative aspect-[4/4.5] bg-slate-50 overflow-hidden">
              <img
                src={optimizeImg(
                  room.roomImages?.[0] ||
                    room.branch?.Propertyphoto?.[0]
                )}
                alt={room.branch?.name}
                loading={index < 2 ? "eager" : "lazy"}
                fetchpriority={index < 2 ? "high" : "auto"}
                decoding="async"
                width="500"
                height="560"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* BADGES */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                {room.verified && (
                  <span className="bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <ShieldCheck size={12} /> VERIFIED
                  </span>
                )}
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md ${
                    isGirlsOnly
                      ? "bg-pink-500/90 text-white"
                      : "bg-slate-900/80 text-white"
                  }`}
                >
                  {room.allowedFor?.toUpperCase() === "ANYONE"
                    ? "FOR ALL"
                    : room.allowedFor?.toUpperCase()}
                </span>
              </div>

              {/* WISHLIST */}
              <div
                className="absolute top-3 right-3 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <WishlistButton
                  pg={room}
                  onAuthOpen={() => setIsAuthModalOpen(true)}
                />
              </div>

              {/* VACANCY */}
              {room.vacant > 0 && room.vacant <= 2 && (
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 text-red-600 text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center gap-2">
                  <Info size={14} /> Only {room.vacant} left!
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    {isRentedRoom ? "Independent Rental" : room.category}
                  </p>
                  <h3 className="text-base font-extrabold truncate group-hover:text-green-600">
                    {room.branch?.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-1 rounded-lg border border-amber-100">
                  <Star size={12} className="text-amber-500" fill="currentColor" />
                  <span className="text-xs font-bold text-amber-700">
                    {avgRating || "New"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                <MapPin size={12} />
                <span className="truncate">
                  {room.branch?.address}
                </span>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-y border-slate-50 mb-4">
                {isRentedRoom ? (
                  <span className="text-[11px] font-bold bg-blue-50 px-2 py-0.5 rounded">
                    {room.flattype || "Studio"}
                  </span>
                ) : (
                  <>
                    <Users size={14} />
                    <span className="text-[11px] font-semibold">
                      {room.type} Sharing
                    </span>
                  </>
                )}
                <span className="text-[11px] text-slate-500">
                  {room.furnishedType || "Furnished"}
                </span>
              </div>

              {/* PRICE + CTA */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black">
                      ₹{room.price}
                    </span>
                    <span className="text-xs text-slate-400">
                      /{room.category === "Hotel" ? "night" : "mo"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => goToDetail(room._id)}
                  className="bg-slate-900 text-white p-2 rounded-xl hover:bg-green-600 transition-all"
                >
                  <ArrowRight size={18} />
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
