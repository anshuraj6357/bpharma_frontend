import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import WishlistButton from "../components/wishlist.jsx";

const RoomCard = memo(function ROOMCARD({
  pgData,
  setIsAuthModalOpen,
  wishlistItems,
}) {
  const navigate = useNavigate();
  const [wishlistedIds, setWishlistedIds] = useState([]);

  useEffect(() => {
    if (wishlistItems?.length) {
      setWishlistedIds(wishlistItems.map((w) => w.room?._id));
    }
  }, [wishlistItems]);

  if (!pgData || pgData.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-400 text-sm">
        No Rooms Available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {pgData.map((room) => {
        const reviews = room.personalreview || [];
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return (
          <div
            key={room._id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/pg/${room._id}`)}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none"
          >
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={room?.roomImages?.[0] || "/room-placeholder.jpg"}
                alt={room?.branch?.name || "Room Image"}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Wishlist */}
              <div
                className="absolute top-3 right-3 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <WishlistButton
                  pg={room}
                  onAuthOpen={() => setIsAuthModalOpen(true)}
                />
              </div>

              {/* Category Badge */}
              <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md">
                {room?.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2">
              {/* Rating */}
              {room.ratingcount > 0 && (
                <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fill = Math.min(Math.max(avgRating - i, 0), 1);
                    return (
                      <div key={i} className="relative w-4 h-4">
                        <Star size={14} stroke="#d1d5db" />
                        {fill > 0 && (
                          <div
                            className="absolute top-0 left-0 h-full overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                          >
                            <Star size={14} fill="#f43f5e" stroke="#f43f5e" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <span className="ml-1">({room.ratingcount})</span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-base font-semibold truncate">
                {room?.branch?.name} • Room {room?.roomNumber}
              </h3>

              {/* Address */}
              <p className="flex items-center gap-1 text-gray-500 text-sm truncate">
                <MapPin size={14} />
                {room?.branch?.address}
              </p>

              {/* Price & Occupancy */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-indigo-600 font-bold text-lg">
                  {room?.category === "Pg" || room?.category === "Rented-Room"
                    ? `₹${room?.price}/month`
                    : `₹${room?.rentperNight}/night`}
                </p>

                <p className="text-xs font-medium text-gray-500">
                  {room?.category === "Pg" &&
                    `${room?.occupied || 0}/${room.vacant + room.occupied} occupied`}
                  {room?.category === "Hotel" &&
                    `${room?.occupied || 0}/1 occupied`}
                  {room?.category === "Rented-Room" &&
                    `${room?.occupied || 0}/1 occupied`}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default RoomCard;
