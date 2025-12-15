function ComplaintSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border animate-pulse space-y-4">
      <div className="h-5 bg-gray-200 rounded w-1/3" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-14 bg-gray-200 rounded-xl" />
        <div className="h-14 bg-gray-200 rounded-xl" />
        <div className="h-14 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-16 bg-gray-200 rounded-xl" />
      <div className="flex gap-3">
        <div className="h-10 w-36 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
