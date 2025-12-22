import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetWishlistQuery,
    useToggleWishlistMutation,
} from "../Bothfeatures/features/api/authapi";
import ROOMCARD from "../components/roomcard";

/* =======================
   Skeleton Loader
======================= */
const WishlistSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm p-4 animate-pulse"
                >
                    <div className="h-44 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
            ))}
        </div>
    );
};

/* =======================
   Wishlist Page
======================= */
export default function WishlistPage({ onAuthOpen }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const {
        data: wishlistData,
        isFetching,
        refetch,
    } = useGetWishlistQuery(undefined, {
        skip: !isAuthenticated,
    });

    const [toggleWishlist] = useToggleWishlistMutation();
    const [wishlist, setWishlist] = useState([]);

    /* =======================
       Sync Wishlist Data
    ======================= */
    useEffect(() => {
        if (!isAuthenticated || isFetching) return;

        const mapped =
            wishlistData?.items?.map((item) => ({
                ...item.room,
                branch: item.pgId,
            })) || [];

        setWishlist(mapped);
    }, [wishlistData, isAuthenticated, isFetching]);

    /* =======================
       Remove from Wishlist
    ======================= */
    const handleRemove = async (roomId, branchId) => {
        if (!isAuthenticated) {
            toast.info("Please login to manage wishlist ❤️");
            onAuthOpen?.();
            return;
        }

        try {
            await toggleWishlist({ roomId, branchId }).unwrap();
            toast.success("Removed from wishlist");
            refetch();
        } catch {
            toast.error("Failed to remove item");
        }
    };

    /* =======================
       Auth Guard
    ======================= */
    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
                Please login to view your wishlist.
            </div>
        );
    }

    /* =======================
       Loading State
    ======================= */
    if (isFetching) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-14 py-10">
                    <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                    <p className="text-gray-500 mb-8">
                        Rooms you’ve saved for later
                    </p>
                    <WishlistSkeleton />
                </div>
            </div>
        );
    }

    /* =======================
       Main UI
    ======================= */
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-14 py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1">My Wishlist</h1>
                    <p className="text-gray-500">
                        Rooms you’ve saved for later
                    </p>
                    <div className="mt-4 h-px bg-gray-200" />
                </div>

                {/* Content */}
                {wishlist.length === 0 ? (
                    <div className="min-h-[45vh] flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-sm border border-gray-100">

                        {/* Icon */}
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-50 mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343 3.172 10.828a4 4 0 010-5.656z"
                                />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Your wishlist is empty
                        </h2>

                        {/* Description */}
                        <p className="text-gray-500 max-w-md mb-6">
                            Save rooms you like so you can easily find and compare them later.
                        </p>

                        {/* CTA */}
                        <button
                            onClick={() => window.location.href = "/"}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                        >
                            Explore Rooms
                        </button>
                    </div>
                ) : (
                    <div className="ml-12 sm:ml-16 lg:ml-24 xl:ml-32">
                        <ROOMCARD
                            pgData={wishlist}
                            setIsAuthModalOpen={onAuthOpen}
                            wishlistItems={wishlistData?.items || []}
                            onRemove={handleRemove}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}
