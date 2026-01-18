import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useToggleWishlistMutation,
  useGetWishlistQuery
} from "../backend-routes/userroutes/authapi";

export default function WishlistButton({ pg, onAuthOpen }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    data: wishlistData,
    refetch,
    isFetching
  } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated
  });

  const [toggleWishlist] = useToggleWishlistMutation();
  const [isFav, setIsFav] = useState(false);

  /* ---------- SYNC WISHLIST STATE ---------- */
  useEffect(() => {
    if (!isAuthenticated || isFetching) return;

    const wishlistItems = wishlistData?.items || [];

    const exists = wishlistItems.some(
      (item) =>
        item.room?._id === pg?._id &&
        item.pgId?._id === pg?.branch?._id
    );

    setIsFav(exists);
  }, [
    wishlistData,
    isAuthenticated,
    isFetching,
    pg?._id,
    pg?.branch?._id
  ]);

  /* ---------- HANDLE TOGGLE ---------- */
  const handleClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info("Please login to use wishlist ❤️");
      onAuthOpen?.();
      return;
    }

    try {
      // optimistic UI
      setIsFav((prev) => !prev);

      await toggleWishlist({
        roomId: pg?._id,
        branchId: pg?.branch?._id
      }).unwrap();

      await refetch();

      toast.success(
        !isFav ? "Saved to wishlist ❤️" : "Removed from wishlist"
      );
    } catch (error) {
      setIsFav((prev) => !prev);
      toast.error("Wishlist action failed");
    }
  };

  /* ---------- UI ---------- */
  return (
    <button
      onClick={handleClick}
      aria-label="Wishlist"
      className={`
        absolute top-3 right-3 z-20
        p-2 rounded-full
        backdrop-blur-md
        shadow-md
        transition-all duration-300
        hover:scale-110
        ${isFav
          ? "bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-red-400/40"
          : "bg-white/80 text-gray-500 hover:text-red-500"}
      `}
    >
      <Heart
        size={18}
        strokeWidth={2}
        className={`
          transition-all duration-300
          ${isFav ? "fill-white scale-110" : "fill-none"}
        `}
      />
    </button>
  );
}
