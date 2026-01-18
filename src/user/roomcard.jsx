import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import WishlistButton from "../user/wishlist.jsx";

const RoomCard = memo(function RoomCard({ pgData, setIsAuthModalOpen }) {
  const navigate = useNavigate();

  if (!pgData || pgData.length === 0) {
    return (
      <div className="col-span-full py-24 text-center">
        <p className="text-slate-400 text-sm">No listings available</p>
      </div>
    );
  }

  return (
    <section
      aria-label="Room listings"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {pgData.map((room) => {
        const reviews = room.personalreview || [];

        const avgRating = useMemo(() => {
          return reviews.length
            ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            : 0;
        }, [reviews]);

        return (
          <article
            key={room._id}
            onClick={() => navigate(`/pg/${room._id}`)}
            className="group bg-white rounded-xl border border-slate-200 
            hover:shadow-lg transition-all duration-300 
            cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src={room?.roomImages?.[0] || "/room-placeholder.jpg"}
                alt={`${room?.branch?.name} accommodation in ${room?.branch?.address}`}
                loading="lazy"
                className="w-full h-full object-cover 
                transition-transform duration-700 group-hover:scale-105"
              />

              {/* Wishlist */}
              <div
                className="absolute top-3 right-3 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border border-slate-200">
                  <WishlistButton
                    pg={room}
                    onAuthOpen={() => setIsAuthModalOpen(true)}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              {/* Title */}
              <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                {room?.branch?.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <MapPin size={12} />
                <span className="truncate">{room?.branch?.address}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Star size={12} className="text-amber-400" fill="#fbbf24" />
                  <span className="font-medium">
                    {avgRating ? avgRating.toFixed(1) : "New"}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-slate-900 font-semibold text-sm">
                    ₹{room?.category === "Hotel" ? room?.rentperNight : room?.price}
                    <span className="text-[10px] text-slate-400">
                      /{room?.category === "Hotel" ? "night" : "month"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
});

export default RoomCard;
