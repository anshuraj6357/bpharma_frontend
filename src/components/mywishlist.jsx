import { useState, useEffect } from "react";
import { useGetWishlistQuery, useToggleWishlistMutation } from "../Bothfeatures/features/api/authapi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WishlistButton from "./wishlist";
import { Loader } from "lucide-react";

export default function WishlistDetails() {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { data: wishlistData, isLoading } = useGetWishlistQuery();
    const [toggleWishlist] = useToggleWishlistMutation();

    const [pgData, setPgData] = useState([]);

    // Sync wishlist from backend
    useEffect(() => {
        console.log("Branch ID ->", wishlistData?.items?.[0]?.room?._id);

        if (wishlistData?.items) {
            setPgData(wishlistData?.items);
        }
    }, [wishlistData]);

    // Remove from Wishlist
    const handleRemove = async (wishlistId) => {
        if (!isAuthenticated) {
            toast.warn("Please login to continue");
            return;
        }

        try {
            await toggleWishlist(wishlistId).unwrap();
            toast.warn("Removed from wishlist");

            // Update UI instantly
            setPgData((prev) => prev.filter((item) => item.room._id !== wishlistId));
        } catch (err) {
            toast.error("Failed to remove. Try again.");
        }
    };

    if (isLoading) return <Loader />;

    if (!pgData || pgData.length === 0) {
        return <div className="text-center mt-20 text-lg font-medium">Your wishlist is empty 💔</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Wishlist ❤️</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pgData.map((item) => {
                    const branch = item.pgId; // branch details
                    const room = item.room;   // room details

                    return (
                        <div
                            key={item._id}
                            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                            onClick={() => {
                                console.log("Navigating to Branch ID:", item?.room?._id);
                                navigate(`/pg/${room?._id}`);
                            }}
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={item?.room?.roomImages?.[0] || "/placeholder.jpg"}
                                    alt={branch?.name}
                                    className="h-40 w-full object-cover"
                                />

                                {/* Wishlist Heart Button */}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <WishlistButton pg={item} />
                                </div>

                                {/* Remove Button */}
                                <button
                                    className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-red-600 text-white rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(item.room._id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>

                            {/* Details Section */}
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{branch?.name}</p>
                                    <p className="text-sm bg-green-600 text-white px-2 py-0.5 rounded-lg">
                                        {room?.type}
                                    </p>
                                </div>

                                <p className="text-gray-500 text-sm mt-1">📍 {branch?.address}</p>

                                {/* Price */}
                                <p className="mt-1 font-semibold text-blue-700">
                                    ₹{room?.price}/month
                                </p>

                                {/* Facilities */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {room?.facilities?.slice(0, 4).map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
