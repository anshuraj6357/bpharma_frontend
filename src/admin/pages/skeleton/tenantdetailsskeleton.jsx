export function TenantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border animate-pulse">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gray-300" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-gray-200 rounded" />
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <div className="flex-1 h-10 bg-gray-300 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
