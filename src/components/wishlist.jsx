import { Heart } from "lucide-react";
import {
  useToggleWishlistMutation,
  useGetWishlistQuery,
} from "../Bothfeatures/features/api/authapi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function WishlistButton({ pg, onAuthOpen }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Fetch wishlist from backend
  const { data: wishlistData, isLoading } = useGetWishlistQuery();
  const [toggleWishlist] = useToggleWishlistMutation();

  const [isFav, setIsFav] = useState(false);

  // Sync heart with backend wishlist
  useEffect(() => {
    if (wishlistData?.data && pg?._id && pg?.branch?._id) {
      const exists = wishlistData.data.some((item) => {
        // Handles both populated objects or plain ObjectIds
        const pgId = item.pgId?._id || item.pgId;
        const branchId = item.branchId?._id || item.branchId;

        return (
          pgId?.toString() === pg._id?.toString() &&
          branchId?.toString() === pg.branch?._id?.toString()
        );
      });

      setIsFav(exists);
    }
  }, [wishlistData, pg?._id, pg?.branch?._id]);

  // Add / Remove from wishlist
  const addToFav = async (e) => {
    e.stopPropagation();

    // 🔐 Open login modal if not authenticated
    if (!isAuthenticated) {
      toast.info("Please login to save PGs in wishlist");
      onAuthOpen();
      return;
    }

    // Instant UI toggle
    setIsFav((prev) => !prev);

    try {
      await toggleWishlist({
        pgId: pg._id,
        branchId: pg.branch._id,
      }).unwrap();

      if (!isFav) toast.success("Added to wishlist ❤️");
      else toast.warn("Removed from wishlist");
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      // Rollback UI toggle
      setIsFav((prev) => !prev);
      toast.error("Something went wrong. Try again.");
    }
  };

  if (isLoading) return null; // optionally show a spinner

  return (
    <button
      onClick={addToFav}
      className="absolute top-2 right-2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md"
    >
      <Heart
        className={`h-5 w-5 ${
          isFav ? "fill-red-600 text-red-600" : "text-white"
        }`}
      />
    </button>
  );
}
