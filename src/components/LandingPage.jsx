import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, MapPin, Shield,ShieldCheck, CreditCard, Zap, Sparkles } from "lucide-react";

import AuthModal from "../components/AuthModal";
import ROOMCARD from "../components/roomcard";
import LandingPageSkeleton from "./loader/landingpageskeleton";
import { useGetAllListedPgQuery } from "../Bothfeatures/features/api/allpg.js";
import { useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";

export default function LandingPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  const { data: pgApiData, isLoading: pgLoading } = useGetAllListedPgQuery();
  const { data: wishlistData } = useGetWishlistQuery();

  const [pgData, setPgData] = useState([]);
  const [supportedCities, setSupportedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  /* ---------------- LOAD PG DATA ---------------- */
  useEffect(() => {
    if (pgApiData?.allrooms) setPgData(pgApiData.allrooms);
  }, [pgApiData]);

  /* ---------------- LOAD SUPPORTED CITIES ---------------- */
  useEffect(() => {
    fetch("/api/service-cities")
      .then(res => res.json())
      .then(data => setSupportedCities(data.filter(c => c.isActive)))
      .catch(() => toast.error("Failed to load cities"));
  }, []);

  /* ---------------- GOOGLE AUTOCOMPLETE ---------------- */
  useEffect(() => {
    if (!window.google ) return;

    const token = new window.google.maps.places.AutocompleteSessionToken();

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
        sessionToken: token,
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place?.address_components) return;

      let city = "";
      let area = "";

      place.address_components.forEach(c => {
        if (c.types.includes("locality")) city = c.long_name;
        if (
          c.types.includes("sublocality") ||
          c.types.includes("sublocality_level_1")
        ) area = c.long_name;
      });

      const allowed = supportedCities.find(c => c.city === city);

      if (!allowed) {
        toast.info(`RoomGi is not available in ${city} yet`);
        return;
      }

      navigate(`/search/${city}/${area || "all"}`);
    });
  }, [ navigate]);

  /* ---------------- FREE TEXT (GEMINI READY) ---------------- */
  const handleFreeTextSearch = (value) => {
    clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(() => {
      if (!value.trim()) return;

      fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freeText: value }),
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success && data.nearestCity) {
            toast.info(`Available near ${data.nearestCity}`);
          }
        });
    }, 600);
  };

  /* ---------------- MANUAL SEARCH BUTTON ---------------- */
  const handleFindPG = () => {
    setSearchError("");
    if (!searchQuery.trim()) {
      setSearchError("Please enter a location to begin your search");
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

 return (
  <div className="min-h-screen bg-[#FBFCFE] font-sans selection:bg-indigo-100">
    
    {/* ---------------- HERO SECTION ---------------- */}
  {/* ---------------- HERO SECTION ---------------- */}
<section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-[#FBFCFE]">
  {/* --- Background Section with Zoom Effect --- */}
  <div className="absolute inset-0 scale-105 animate-subtle-zoom">
    <img
      src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
      className="w-full h-full object-cover"
      alt="Luxury Living"
    />
    {/* Dual Gradient Overlay for Text Readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FBFCFE]"></div>
    <div className="absolute inset-0 bg-black/20"></div>
  </div>

  {/* --- Visual Decorations --- */}
  <div className="absolute top-1/4 left-10 hidden lg:block animate-bounce-slow">
     <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
        <ShieldCheck className="text-emerald-400 mb-1" size={24} />
        <p className="text-white text-[10px] font-black uppercase tracking-tighter">100% Verified</p>
     </div>
  </div>
  <div className="absolute bottom-1/3 right-12 hidden lg:block animate-pulse">
     <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
        <Zap className="text-amber-400 mb-1" size={24} />
        <p className="text-white text-[10px] font-black uppercase tracking-tighter">Instant Booking</p>
     </div>
  </div>

  {/* --- Content Container --- */}
  <div className="relative z-10 max-w-5xl px-6 text-center">
    <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-indigo-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-full shadow-2xl animate-fade-in-up">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
      <span className="text-[10px] font-black tracking-[0.2em] text-indigo-100 uppercase">
        Premium Broker-Free Living
      </span>
    </div>

    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
      Live <span className="relative">
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Better.</span>
        <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none"><path d="M2 10C60 2 140 2 198 10" stroke="#818cf8" strokeWidth="4" strokeLinecap="round"/></svg>
      </span>
    </h1>

    <p className="text-lg md:text-2xl text-gray-200 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
      Ditch the brokerage. Discover curated, high-end rooms designed for the modern achiever.
    </p>

    {/* --- ADVANCED SEARCH BAR --- */}
    <div className="relative max-w-4xl mx-auto group">
      <div className={`relative flex flex-col md:flex-row items-center bg-white rounded-[2.8rem] p-2.5 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_40px_120px_-15px_rgba(99,102,241,0.3)] ${searchError ? "ring-4 ring-red-500/20" : ""}`}>
        
        {/* Location Icon & Input */}
        <div className="flex items-center flex-1 w-full px-6 py-2 border-r-0 md:border-r border-slate-100">
          <div className="bg-indigo-50 p-3 rounded-2xl mr-4 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-colors">
            <MapPin size={22} />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</label>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              placeholder="Ex: Gurgaon, Sector 45"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFindPG()}
              className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-300 font-bold text-lg"
            />
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={handleFindPG}
          className="w-full md:w-auto mt-4 md:mt-0 bg-slate-950 hover:bg-indigo-600 text-white px-14 py-5 rounded-[2.3rem] font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:translate-x-1"
        >
          <Search size={22} strokeWidth={3} />
          <span>Find My Space</span>
        </button>
      </div>

      {/* Error Message Tooltip */}
      {searchError && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg animate-bounce">
          {searchError}
        </div>
      )}
    </div>
  </div>

  {/* --- BOTTOM BLUR GRADIENT (Smooth transition to next section) --- */}
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFCFE] to-transparent z-[5]"></div>
</section>

    {/* ---------------- FLOATING FEATURES ---------------- */}
 <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      { 
        icon: <Shield />, 
        title: "Verified Stays", 
        desc: "Every property undergoes a 20-point physical inspection check.",
        color: "from-blue-500 to-cyan-400" 
      },
      { 
        icon: <CreditCard />, 
        title: "Zero Brokerage", 
        desc: "Deal directly with owners and save up to a month's rent instantly.",
        color: "from-indigo-600 to-purple-500" 
      },
      { 
        icon: <Sparkles />, 
        title: "Premium Lifestyle", 
        desc: "Access curated spaces with high-speed WiFi and modern cooling.",
        color: "from-amber-400 to-orange-500" 
      },
    ].map((f, i) => (
      <div 
        key={i} 
        className="group relative bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
      >
        {/* Background Decorative Glow (appears on hover) */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
        
        {/* Step Number Watermark */}
        <span className="absolute right-8 top-6 text-8xl font-black text-gray-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          0{i + 1}
        </span>

        {/* Icon Container with Floating Animation */}
        <div className={`w-16 h-16 bg-gradient-to-br ${f.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-200/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {f.icon}
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
          {f.title}
        </h3>
        <p className="text-gray-500 leading-relaxed font-medium">
          {f.desc}
        </p>

        {/* Bottom Progress Bar Decoration */}
        <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-700" />
      </div>
    ))}
  </div>
</section>
<section className="max-w-7xl mx-auto px-6 py-20 mb-10">
        <div className="bg-slate-950 rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">The RoomGi <span className="text-indigo-400">Promise.</span></h2>
            <p className="text-slate-400 font-bold mb-10 text-lg leading-relaxed">
              Humne RoomGi shuru kiya kyunki humein pata hai ek naye sheher mein ghar dhundna kitna mushkil hai. Hum har property ko khud verify karte hain taaki aapko wahi mile jo aap screen par dekh rahe hain.
            </p>
            <div className="space-y-4">
              {["100% Verified Owners", "No Hidden Charges", "Instant Deposit Refund Support"].map((txt) => (
                <div key={txt} className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 p-1 rounded-full"><ShieldCheck className="text-indigo-400" size={18} /></div>
                  <span className="font-bold text-white text-sm uppercase tracking-wider">{txt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
             <div className="h-64 bg-slate-800 rounded-[2.5rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="h-64 mt-12 bg-slate-800 rounded-[2.5rem] overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg" className="w-full h-full object-cover opacity-80" />
             </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px]" />
        </div>
      </section>

    {/* ---------------- LISTINGS SECTION ---------------- */}
<section className="max-w-7xl mx-auto px-6 py-24">
  {/* ---------------- HEADER & FILTERS ---------------- */}
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
    <div className="space-y-4">
     
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Stays</span>
      </h2>
      <p className="text-gray-500 text-lg max-w-md leading-relaxed font-medium">
        Handpicked properties verified for quality and comfort.
      </p>
    </div>

    {/* Modern Pill Filters */}
    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
      {["All", "Popular", "Newest", "Budget"].map((tab) => (
        <button
          key={tab}
          className={`px-8 py-3 rounded-[1.2rem] text-sm font-bold transition-all duration-300 whitespace-nowrap ${
            tab === "All" 
            ? "bg-gray-900 text-white shadow-xl shadow-gray-200" 
            : "bg-white text-gray-500 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 hover:text-indigo-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

  {/* ---------------- LISTINGS GRID (FIXED: GRID REMOVED) ---------------- */}
  <div className="relative">
    {pgLoading ? (
      <LandingPageSkeleton />
    ) : pgData.length > 0 ? (
      /* FIX: Yahan se 'grid' class hata di gayi hai. 
         Ab ROOMCARD ka internal grid (grid-cols-4) block nahi hoga 
         aur cards 'chipta' nahi dikhenge.
      */
      <div className="w-full">
        <ROOMCARD
          pgData={pgData}
          wishlistItems={wishlistData?.items || []}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />
      </div>
    ) : (
      /* --- Elegant Empty State --- */
      <div className="py-32 text-center bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-200/60 max-w-3xl mx-auto">
        <div className="bg-white w-24 h-24 rounded-3xl shadow-soft flex items-center justify-center mx-auto mb-8 rotate-12 transition-transform">
          <Search className="text-indigo-500 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">No rooms found</h3>
        <p className="text-gray-500 mt-3 font-medium max-w-xs mx-auto text-lg">
          We couldn't find any stays. Try changing your filters.
        </p>
      </div>
    )}
  </div>
  
  <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-indigo-600 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-indigo-200">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Are you a Property Owner?</h2>
            <p className="text-indigo-100 font-bold mb-12 max-w-2xl mx-auto text-lg">
              List your property for free and reach thousands of verified tenants. No brokerage, no middleman, direct bookings.
            </p>
            <button className="bg-white text-indigo-600 px-14 py-6 rounded-2xl font-black text-xl hover:bg-slate-950 hover:text-white transition-all shadow-xl">
              Register As Owner
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-slate-950/20 rounded-full blur-3xl" />
        </div>
      </section>

  {/* ---------------- FOOTER ACTION ---------------- */}
  <div className="mt-20 text-center">
    <button 
      onClick={() => navigate('/all-listings')}
      className="group relative inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-[1.8rem] font-bold shadow-2xl shadow-indigo-200 hover:shadow-indigo-400/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
    >
      <span className="relative z-10 text-lg">Explore Nearby Properties</span>
      <div className="absolute inset-0 bg-gray-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      <svg 
        className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-500" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
</section>

    {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
  </div>
);
}
