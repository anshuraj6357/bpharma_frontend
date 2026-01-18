import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Bed, Zap, ShieldCheck } from "lucide-react";
import WishlistButton from "../components/wishlist.jsx";

const RoomCard = memo(function RoomCard({
  pgData = [],
  setIsAuthModalOpen,
}) {
  const navigate = useNavigate();

  if (!pgData.length) {
    return (
      <div className="col-span-full py-24 text-center">
        <p className="text-gray-400 text-sm">
          No premium rooms available
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Available rooms"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full"
    >
      {pgData.map((room) => {
        const reviews = room?.personalreview || [];
        const avgRating =
          reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) /
                reviews.length
              ).toFixed(1)
            : null;

        const price =
          room?.category === "Hotel"
            ? room?.rentperNight
            : room?.price;

        const priceSuffix =
          room?.category === "Hotel" ? "night" : "month";

        return (
          <article
            key={room?._id}
            onClick={() => navigate(`/pg/${room?._id}`)}
            itemScope
            itemType="https://schema.org/Hotel"
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden
            border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={room?.roomImages?.[0] || "/room-placeholder.jpg"}
                alt={`${room?.branch?.name || "Room"} in ${room?.branch?.address || "city"}`}
                loading="lazy"
                itemProp="image"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Verified */}
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-black/70 backdrop-blur text-white text-[11px] font-medium">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  Verified
                </span>
              </div>

              {/* Wishlist */}
              <div
                className="absolute top-4 right-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-md">
                  <WishlistButton
                    pg={room}
                    onAuthOpen={() => setIsAuthModalOpen(true)}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur px-4 py-3 rounded-2xl
                flex items-center justify-between shadow-md">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-500">
                      Starting from
                    </p>
                    <p
                      className="text-gray-900 text-lg font-semibold"
                      itemProp="priceRange"
                    >
                      ₹{price}
                      <span className="text-sm text-gray-400">
                        /{priceSuffix}
                      </span>
                    </p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gray-900 text-white
                  flex items-center justify-center">
                    <Zap size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pt-4 pb-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-sm">
                  <Star size={14} className="text-amber-400" />
                  <span className="font-medium text-gray-900">
                    {avgRating || "New"}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wide text-gray-400">
                  {room?.category || "Standard"}
                </span>
              </div>

              <h3
                itemProp="name"
                className="text-gray-900 font-semibold text-base leading-tight mb-1 line-clamp-1"
              >
                {room?.branch?.name}
              </h3>

              <div
                itemProp="address"
                className="flex items-center gap-1.5 text-gray-500 text-sm mb-4"
              >
                <MapPin size={14} />
                <span className="truncate">
                  {room?.branch?.address}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500 text-xs">
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    AC
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={14} />
                    WiFi
                  </div>
                </div>

                <span className="text-xs font-medium text-gray-900">
                  View details →
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
});

export default RoomCard;
