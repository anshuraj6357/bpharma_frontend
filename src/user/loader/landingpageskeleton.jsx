export default function LandingPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse space-y-12 px-4 py-12 max-w-7xl mx-auto">

      {/* HERO SECTION SKELETON */}
      <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] bg-gray-300 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gray-400/40 backdrop-blur-[1px]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="h-10 w-3/4 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded-full mt-2"></div>

          {/* Search Bar Skeleton */}
          <div className="mt-6 w-full max-w-xl sm:max-w-2xl h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* PG LISTING SKELETON */}
      <div className="space-y-6">
        <div className="h-8 w-1/4 bg-gray-300 rounded-full mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-[350px] flex flex-col">
              {/* Image */}
              <div className="h-52 bg-gray-300 w-full"></div>
              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-6 w-1/3 bg-gray-300 rounded-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPULAR CITIES SKELETON */}
      <div className="space-y-4 text-center">
        <div className="h-8 w-1/4 bg-gray-300 rounded-full mx-auto"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-full mx-auto"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="h-12 bg-gray-300 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
