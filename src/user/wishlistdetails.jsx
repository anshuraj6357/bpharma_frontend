import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetWishlistQuery,
    useToggleWishlistMutation,
} from "../backend-routes/userroutes/authapi";

import { useNavigate } from "react-router-dom";

import ROOMCARD from "../user/roomcard";

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
const navigate=useNavigate()
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
       <div className="bg-gray-50 min-h-screen py-12">
  <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-14">
    
    {/* Header */}
    <div className="mb-10 text-center sm:text-left">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
        My Wishlist
      </h1>
      <p className="text-gray-500 text-lg">
        Rooms you’ve saved for later. Find your favorite stays easily.
      </p>
      <div className="mt-6 h-1 w-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" />
    </div>

    {/* Content */}
    {wishlist.length === 0 ? (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center bg-white rounded-3xl shadow-lg border border-gray-200 p-8 sm:p-12 transition-transform transform hover:scale-105">
        
        {/* Heart Icon */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-50 mb-6 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343 3.172 10.828a4 4 0 010-5.656z"
            />
          </svg>
        </div>

        {/* Empty State Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Your wishlist is empty
        </h2>

        {/* Empty State Description */}
        <p className="text-gray-500 max-w-md mb-6 text-lg">
          Save rooms you like so you can easily find and compare them later.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
        >
          Explore Rooms
        </button>
      </div>
    ) : (
     
        <ROOMCARD
          pgData={wishlist}
          setIsAuthModalOpen={onAuthOpen}
          wishlistItems={wishlistData?.items || []}
          onRemove={handleRemove}
        />

    )}
  </div>
</div>

    );
}
