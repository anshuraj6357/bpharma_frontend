import { Star, BadgeCheck } from "lucide-react";

export default function Reviews({ reviews }) {
  if (!reviews?.length) {
    return (
      <div className="py-20 text-center text-gray-400 text-lg">
        No reviews yet ⭐
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="relative bg-white/70 backdrop-blur-xl
                     border border-gray-200 rounded-2xl p-6
                     shadow-md hover:shadow-xl
                     transition-all duration-300 hover:-translate-y-1"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {r.branchName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                📍 {r.city} • Room ID: {r.roomId}
              </p>
            </div>

            {/* Rating */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i <= r.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <p className="mt-5 text-gray-700 leading-relaxed text-sm">
            {r.review}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            {r.isVerified && (
              <span className="flex items-center gap-1 text-xs font-medium
                               text-green-600 bg-green-100
                               px-3 py-1 rounded-full">
                <BadgeCheck className="w-4 h-4" />
                Verified
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}