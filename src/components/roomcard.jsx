
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import WishlistButton from "../components/wishlist.jsx";

export default function ROOMCARD({ pgData, setIsAuthModalOpen, wishlistItems }) {
    const navigate = useNavigate();
    const [wishlistedIds, setWishlistedIds] = useState([]);

    useEffect(() => {
        if (wishlistItems?.length) {
            console.log(wishlistItems)
            setWishlistedIds(wishlistItems.map((w) => w.room._id)); // Use room._id from backend
        }
    }, [wishlistItems]);

    if (!pgData || pgData.length === 0)
        return <p className="text-center col-span-full text-gray-500">No Rooms Available</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pgData.map((room) => {
                const reviews = room.personalreview || [];
                const avgRating =
                    reviews.length > 0
                        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                        : 0;

                const isWishlisted = wishlistedIds.includes(room._id);

                return (
                    <div
                        key={room._id}
                        onClick={() => navigate(`/pg/${room._id}`)}
                        className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
                    >
                        {/* IMAGE */}
                        <div className="relative h-56 sm:h-52 md:h-60 lg:h-64 overflow-hidden rounded-t-3xl">
                            <img
                                src={room?.roomImages?.[0] || "/room-placeholder.jpg"}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <WishlistButton
                                pg={room}
                                onAuthOpen={() => setIsAuthModalOpen(true)}
                            />
                            {/* Category Badge */}
                            <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold text-white 
                bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105">
                                {room?.category}
                            </span>
                        </div>

                        {/* CARD CONTENT */}
                        <div className="p-4 flex flex-col gap-2 relative">
                            {/* Rating */}
                            {room.ratingcount > 0 && (
                                <div className="flex items-center gap-1 text-xs font-semibold mb-1">
                                    <span className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const fillPercentage = Math.min(Math.max(avgRating - i, 0), 1);
                                            return (
                                                <div key={i} className="relative w-4 h-4">
                                                    <Star size={14} fill="none" stroke="#d1d5db" />
                                                    {fillPercentage > 0 && (
                                                        <div
                                                            className="absolute top-0 left-0 overflow-hidden h-full"
                                                            style={{ width: `${fillPercentage * 100}%` }}
                                                        >
                                                            <Star size={14} fill="#ef4444" stroke="#ef4444" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </span>
                                    <span>({room.ratingcount})</span>
                                </div>
                            )}

                            <h3 className="text-lg font-semibold truncate">
                                {room?.branch?.name} – Room {room?.roomNumber}
                            </h3>
                            <p className="text-gray-500 text-sm truncate">📍 {room?.branch?.address}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-blue-600 font-bold text-base sm:text-lg">
                                    {room?.category === "Pg" || room?.category === "Rented-Room"
                                        ? `₹${room?.price}/month`
                                        : `₹${room?.rentperNight}/night`}
                                </p>
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                                    {room?.category === "Pg" &&
                                        `${room?.occupied || 0}/${room.vacant + room.occupied} occupied`}
                                    {room?.category === "Hotel" && `${room?.occupied || 0}/1 occupied`}
                                    {room?.category === "Rented-Room" &&
                                        (room?.renttype === "Flat-Rent"
                                            ? `${room?.occupied || 0}/1 occupied`
                                            : room?.renttype === "Room-Rent"
                                                ? `${room?.occupied || 0}/1 occupied`
                                                : "")}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
