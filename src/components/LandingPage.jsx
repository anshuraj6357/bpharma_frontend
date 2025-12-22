import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthModal from "../components/AuthModal";
import ROOMCARD from "../components/roomcard";
import LandingPageSkeleton from "./loader/landingpageskeleton";
import { useGetAllListedPgQuery } from "../Bothfeatures/features/api/allpg.js";
import { useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";

export default function LandingPage() {
  const navigate = useNavigate();
  const { data: pgApiData, isLoading: pgLoading } = useGetAllListedPgQuery();
  const { data: wishlistData } = useGetWishlistQuery();

  const [pgData, setPgData] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  // Sync PG Data
  useEffect(() => {
    if (pgApiData?.allrooms) setPgData(pgApiData.allrooms);
  }, [pgApiData]);

  // Search Handler
  const handleFindPG = () => {
    setSearchError("");
    if (!searchQuery.trim()) {
      setSearchError("Please enter a PG name or location");
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
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

          {/* Search Bar */}
          <div className="mt-8 w-full px-4 sm:px-0 max-w-xl sm:max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <input
                type="text"
                placeholder="Search by city, landmark, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFindPG()}
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
              <p className="text-red-400 text-sm mt-2 text-center sm:text-left">
                {searchError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PG LISTING */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Available Rooms & PGs
        </h2>

        {pgLoading ? (
          <LandingPageSkeleton />
        ) : (
          <ROOMCARD
            pgData={pgData}
            wishlistItems={wishlistData?.items || []}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        )}
      </div>

      {/* POPULAR CITIES */}
      <section className="w-full py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-3">Rooms in Popular Cities</h2>
        <p className="text-gray-600 mb-10">
          Choose your city and discover the best rooms near you.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl mx-auto">
          {[
            "Delhi",
            "Noida",
            "Gurgaon",
            "Bangalore",
            "Chennai",
            "Hyderabad",
            "Pune",
            "Mumbai",
          ].map((city) => (
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

      {/* AUTH MODAL */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}
