import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, ShieldCheck, Users, Info } from "lucide-react";
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
            className="group bg-white rounded-2xl border border-slate-100
              hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]
              transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
          >
            {/* IMAGE */}
            <div className="relative aspect-[4/4.5] overflow-hidden">
  <img
    src={optimizeImg(room.roomImages || room.branch?.Propertyphoto?.[0])}
    alt={room.branch?.name || "Room"}
    loading={index < 2 ? "eager" : "lazy"}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  {/* OCCUPIED OVERLAY */}
  {room.availabilityStatus === "Occupied" && (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
      <div className="bg-red-600 text-white text-xs font-extrabold tracking-widest px-4 py-1 rotate-[-90deg] rounded-md shadow-xl">
        OCCUPIED
      </div>
    </div>
  )}
</div>


            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                {isRentedRoom ? "Independent Rental" : room.category}
              </p>

              <h3 className="text-base font-extrabold truncate group-hover:text-green-600">
                {room.branch?.name}
              </h3>

              <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 mb-3">
                <MapPin size={12} />
                <span className="truncate">
                  {room.branch?.address}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs mb-4">
                {isRentedRoom ? (
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                    {room.flattype || "Studio"}
                  </span>
                ) : (
                  <>
                    <Users size={14} />
                    <span className="font-semibold">
                      {room.type} Sharing
                    </span>
                  </>
                )}
                <span className="text-slate-500">
                  {room.furnishedType || "Furnished"}
                </span>
              </div>

              {/* PRICE + CTA */}
              <div className="mt-auto pt-3 border-t">
                {room.category === "Pg" ? (
                  <>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                      All Inclusive Price
                    </p>
                    <div className="text-xl font-black text-green-600">
                      ₹{totalPgPrice}/mo
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                      Starting from
                    </p>
                    <div className="text-xl font-black">
                      ₹{room.price}
                      <span className="text-xs text-slate-400">
                        /{room.category === "Hotel" ? "night" : "mo"}
                      </span>
                    </div>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToDetail(room._id);
                  }}
                  className="mt-3 w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-green-600 transition"
                >
                  View Details
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
