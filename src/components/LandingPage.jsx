import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, MapPin, Shield, CreditCard, Sparkles } from "lucide-react"; // Install lucide-react

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

  useEffect(() => {
    if (pgApiData?.allrooms) setPgData(pgApiData.allrooms);
  }, [pgApiData]);

  const handleFindPG = () => {
    setSearchError("");
    if (!searchQuery.trim()) {
      setSearchError("Please enter a location to begin your search");
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 scale-105 transform hover:scale-100 transition-transform duration-[10s] ease-linear">
          <img
            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260"
            alt="Premium Room"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Advanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#F8FAFC]"></div>

        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full">
            The Future of Rental Living
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Find Your <span className="text-blue-400">Perfect</span> Stay.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
            Discover verified PGs and Rooms with zero brokerage, premium amenities, and a community that feels like home.
          </p>

         {/* Search Bar UI */}
<div className="relative max-w-3xl mx-auto group">
  <div className={`flex items-center p-2 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${searchError ? 'ring-2 ring-red-500' : 'focus-within:ring-2 ring-blue-500'}`}>
    <div className="flex-1 flex items-center px-4">
      <Search className="w-5 h-5 text-gray-400 mr-2 sm:mr-3 shrink-0" />
      <input
        type="text"
        placeholder="City, Area or PG Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleFindPG()}
        className="w-full py-3 sm:py-4 bg-transparent text-gray-800 placeholder-gray-400 text-base sm:text-lg outline-none"
      />
    </div>
    
    {/* Fixed Button: Removed 'hidden sm:block' so it shows every time */}
    <button
      onClick={handleFindPG}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-500/30 whitespace-nowrap text-sm sm:text-base"
    >
      Find Rooms
    </button>
  </div>
  {searchError && (
    <p className="absolute -bottom-7 left-6 text-red-400 text-sm font-medium">
      {searchError}
    </p>
  )}
</div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Shield className="w-6 h-6" />, title: "Verified Listings", desc: "Every property is physically inspected." },
          { icon: <CreditCard className="w-6 h-6" />, title: "Zero Brokerage", desc: "No hidden costs. Direct deals only." },
          { icon: <Sparkles className="w-6 h-6" />, title: "Premium Living", desc: "Curated rooms with top-tier amenities." },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 italic">
              {feature.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* --- PG LISTING --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Popular Stay Options</h2>
            <p className="text-gray-500">Handpicked properties based on comfort and ratings.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4">
            View all properties →
          </button>
        </div>

        {pgLoading ? (
          <LandingPageSkeleton />
        ) : (
          <div className="transition-opacity duration-500 ease-in">
             <ROOMCARD
                pgData={pgData}
                wishlistItems={wishlistData?.items || []}
                setIsAuthModalOpen={setIsAuthModalOpen}
              />
          </div>
        )}
      </section>

      {/* --- POPULAR CITIES --- */}
      <section className="bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Explore by City</h2>
            <p className="text-gray-400 max-w-xl mx-auto">We are rapidly expanding across India. Find your spot in these top-tier locations.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {["Delhi", "Noida", "Gurgaon", "Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai"].map((city) => (
              <button
                key={city}
                onClick={() => toast.info(`Pre-booking starting soon in ${city}!`)}
                className="group relative h-32 rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="relative h-full flex flex-col items-center justify-center">
                  <MapPin className="w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-lg font-bold group-hover:scale-110 transition-transform">{city}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AUTH MODAL */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}