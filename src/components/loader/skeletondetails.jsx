// SkeletonLoader.jsx
export default function SkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      
      {/* IMAGE SLIDER SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        <div className="col-span-1 md:col-span-2 bg-gray-300 rounded-2xl"></div>
        <div className="bg-gray-300 rounded-2xl"></div>
        <div className="bg-gray-300 rounded-2xl"></div>
        <div className="bg-gray-300 rounded-2xl"></div>
        <div className="bg-gray-300 rounded-2xl"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-300 rounded-full"></div>

          {/* Rating */}
          <div className="h-6 w-1/6 bg-gray-300 rounded-full"></div>

          {/* Room Info */}
          <div className="bg-gray-200 p-6 rounded-2xl space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded-full"></div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="h-16 bg-gray-300 rounded-xl"></div>
              <div className="h-16 bg-gray-300 rounded-xl"></div>
              <div className="h-16 bg-gray-300 rounded-xl"></div>
              <div className="h-16 bg-gray-300 rounded-xl"></div>
            </div>
          </div>

          {/* Description */}
          <div className="h-20 bg-gray-200 rounded-2xl"></div>

          {/* Allowed For */}
          <div className="h-12 w-1/2 bg-gray-300 rounded-xl"></div>

          {/* Rules */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded-full"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded-full"></div>
          </div>

          {/* Facilities */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="h-60 bg-gray-300 rounded-2xl"></div>
          <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
        </div>

      </div>
    </div>
  );
}
