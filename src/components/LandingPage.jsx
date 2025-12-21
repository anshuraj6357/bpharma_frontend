import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from "../components/wishlist.jsx";
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { toast } from "react-toastify";
import { useGetAllListedPgQuery } from "../Bothfeatures/features/api/allpg.js";
import { useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";
import LandingPageSkeleton from "./loader/landingpageskeleton";
import { Star } from "lucide-react";

export default function LandingPage() {

  const navigate = useNavigate();
  const { data: wishlistData } = useGetWishlistQuery();
  const { data: pgApiData, isLoading } = useGetAllListedPgQuery();

  const [pgData, setPgData] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (pgApiData?.allrooms) setPgData(pgApiData.allrooms);
    if (wishlistData?.data) {
      const ids = wishlistData.data.map(item => item.pgId);
      setWishlistIds(ids);
    }
  }, [pgApiData, wishlistData]);

  const handleFindPG = () => {
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name or location');
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ---------------------- HERO SECTION ---------------------- */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt="Room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
            Find Your Perfect Stay
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-white/80 font-medium">
            Safe • Comfortable • Affordable — Just Like Home
          </p>

          {/* Search bar */}
          <div className="mt-8 w-full px-4 sm:px-0 max-w-xl sm:max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">

              <input
                type="text"
                placeholder="Search by city, landmark, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFindPG()}
                className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/70 text-base sm:text-lg outline-none"
              />

              <button
                onClick={handleFindPG}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 text-white rounded-full text-sm sm:text-lg font-semibold shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105"
              >
                Search
              </button>
            </div>

            {searchError && (
              <p className="text-red-400 text-sm mt-2 text-center sm:text-left">{searchError}</p>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------- PG LISTING ---------------------- */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Available Rooms & PGs</h2>

        {isLoading ? (
          <LandingPageSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pgData.length > 0 ? pgData.map((pg) => {
              const reviews = pg.personalreview || [];
              const avgRating =
                reviews.length > 0
                  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                  : 0;

              return (
                <div
                  key={pg._id}
                  onClick={() => navigate(`/pg/${pg._id}`)}
                  className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  {/* IMAGE */}
                  {/* IMAGE */}
                  <div className="relative h-56 sm:h-52 md:h-60 lg:h-64 overflow-hidden rounded-t-3xl">
                    <img
                      src={pg?.roomImages?.[0] || '/room-placeholder.jpg'}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />

                    {/* Wishlist Heart - Top Right */}
                    <div
                      className="absolute top-3 right-3 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WishlistButton pg={pg} onAuthOpen={() => setIsAuthModalOpen(true)} />
                    </div>

                    {/* Category Badge - Top Left */}
                    <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold text-white 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                 shadow-lg backdrop-blur-sm transform transition-all duration-300 
                 hover:scale-105">
                      {pg?.category}
                    </span>

                  </div>


                  {/* CARD CONTENT */}
                  <div className="p-4 flex flex-col gap-2 relative">

                    {/* Rating Badge - Above Branch Name */}
                    {pg.ratingcount > 0 && (
                      <div className="flex items-center gap-1 text-xs font-semibold mb-1">
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const avgRating = pg.totalrating / pg.ratingcount;
                            const fillPercentage = Math.min(Math.max(avgRating - i, 0), 1);

                            return (
                              <div key={i} className="relative w-4 h-4">
                                {/* Gray Star Background */}
                                <Star size={14} fill="none" stroke="#d1d5db" />

                                {/* Filled Star Overlay */}
                                {fillPercentage > 0 && (
                                  <div
                                    className="absolute top-0 left-0 overflow-hidden h-full"
                                    style={{ width: `${fillPercentage * 100}%` }}
                                  >
                                    <Star size={14} fill="#ef4444" stroke="#ef4444" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </span>
                        <span>({pg.ratingcount})</span>
                      </div>
                    )}

                    <h3
                      className="text-lg font-semibold truncate"
                      title={`${pg?.branch?.name} – Room ${pg?.roomNumber}`}
                    >
                      {pg?.branch?.name} – Room {pg?.roomNumber}
                    </h3>

                    <p className="text-gray-500 text-sm truncate">📍 {pg?.branch?.address}</p>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-blue-600 font-bold text-base sm:text-lg">
                        {pg?.category === "Pg" || pg?.category === "Rented-Room"
                          ? `₹${pg?.price}/month`
                          : `₹${pg?.rentperNight}/night`}
                      </p>

                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {pg?.category === "Pg" && `${pg?.occupied || 0}/${pg.vacant + pg.occupied} occupied`}
                        {pg?.category === "Hotel" && `${pg?.occupied || 0}/1 occupied`}
                        {pg?.category === "Rented-Room" && (
                          pg?.renttype === "Flat-Rent"
                            ? `${pg?.occupied || 0}/1 occupied`
                            : pg?.renttype === "Room-Rent"
                              ? `${pg?.occupied || 0}/1 occupied`
                              : ""
                        )}
                      </p>
                    </div>
                  </div>

                </div>
              );
            }) : (
              <p className="text-center col-span-full text-gray-500">No Rooms Available</p>
            )}
          </div>
        )}
      </div>









      {/* ---------------------- POPULAR CITIES ---------------------- */}
      <section className="w-full py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-3">Rooms in Popular Cities</h2>
        <p className="text-gray-600 mb-10">Choose your city and discover the best rooms near you.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl mx-auto">
          {["Delhi", "Noida", "Gurgaon", "Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai"].map((city) => (
            <button
              key={city}
              onClick={() => toast.success(`We are coming soon in ${city}`)}
              className="bg-white shadow-md rounded-xl py-4 text-sm font-semibold hover:shadow-xl transition"
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      
    </div>
  );
}
