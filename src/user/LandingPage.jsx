import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Search, MapPin, Shield, ShieldCheck, CreditCard, Zap, Sparkles,
  ArrowRight, Star, Users, Clock, Filter, ChevronDown 
} from "lucide-react";
import AuthModal from "../user/AuthModal";
import ROOMCARD from "../user/roomcard";
import LandingPageSkeleton from "./loader/landingpageskeleton";
import { useGetAllListedPgQuery } from "../backend-routes/userroutes/allpg.js";
import { useGetWishlistQuery } from "../backend-routes/userroutes/authapi";
import heroimg from "../assets/heroimg.webp";

export default function LandingPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  const { data: pgApiData, isLoading: pgLoading, error: pgError } = useGetAllListedPgQuery();
  const { data: wishlistData, isLoading: wishlistLoading } = useGetWishlistQuery();

  // Optimized state management
  const [pgData, setPgData] = useState([]);
  const [supportedCities, setSupportedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Memoized PG data processing
  const processedPgData = useMemo(() => {
    if (!pgData.length) return [];
    
    const filtered = pgData.filter(pg => {
      switch(activeFilter) {
        case "Popular": return pg.rating >= 4.2;
        case "Newest": return pg.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000;
        case "Budget": return pg.price < 15000;
        default: return true;
      }
    });

    return filtered.sort((a, b) => {
      if (activeFilter === "Popular") return (b.rating || 0) - (a.rating || 0);
      if (activeFilter === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [pgData, activeFilter]);

  /* ---------------- PERFORMANCE OPTIMIZED EFFECTS ---------------- */
  useEffect(() => {
    if (pgApiData?.allrooms) {
      setPgData(pgApiData.allrooms);
    }
  }, [pgApiData]);

  useEffect(() => {
    fetch("/api/service-cities", { 
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
    })
      .then(res => res.json())
      .then(data => setSupportedCities(data.filter(c => c.isActive)))
      .catch(() => toast.error("Failed to load cities"));
  }, []);

  // Fixed Google Autocomplete with proper cleanup
  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const token = new window.google.maps.places.AutocompleteSessionToken();
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
        sessionToken: token,
      }
    );

    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (!place?.address_components) return;

      let city = "", area = "";
      place.address_components.forEach(c => {
        if (c.types.includes("locality")) city = c.long_name;
        if (c.types.includes("sublocality") || c.types.includes("sublocality_level_1"))
          area = c.long_name;
      });

      const allowed = supportedCities.find(c => c.city === city);
      if (!allowed) {
        toast.info(`RoomGi is not available in ${city} yet`);
        return;
      }

      navigate(`/search/${city}/${area || "all"}`);
    };

    autocomplete.addListener("place_changed", handlePlaceChanged);

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [supportedCities, navigate]);

  // Optimized debounced search
  const handleFreeTextSearch = useCallback((value) => {
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
  }, []);

  const handleFindPG = useCallback(() => {
    setSearchError("");
    if (!searchQuery.trim()) {
      setSearchError("Please enter a location to begin your search");
      return;
    }
    navigate(`/search/${searchQuery}`);
  }, [searchQuery, navigate]);

  const filterOptions = [
    { key: "All", label: "All Stays", count: pgData.length },
    { key: "Popular", label: "Popular", count: pgData.filter(p => p.rating >= 4.2).length },
    { key: "Newest", label: "Newest", count: pgData.filter(p => p.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000).length },
    { key: "Budget", label: "Budget", count: pgData.filter(p => p.price < 15000).length }
  ];

  // SEO Optimized Meta Tags
  useEffect(() => {
    const title = "RoomGi - Premium PG & Rooms Without Brokerage | Verified Stays";
    const description = "Discover verified PGs, rooms & shared accommodations with zero brokerage. High-speed WiFi, modern amenities, instant booking. Live better, pay less.";
    
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    return () => {
      document.title = "RoomGi - Find Your Perfect Stay";
    };
  }, []);

  if (pgLoading || wishlistLoading) return <LandingPageSkeleton />;
  if (pgError) {
    toast.error("Failed to load properties. Please refresh.");
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-inter selection:bg-indigo-100/60">
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "RoomGi",
          "url": "https://roomgi.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://roomgi.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }} />

      {/* Hero Section - Optimized for Core Web Vitals */}
    <section
  aria-labelledby="hero-heading"
  className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"
>
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={heroimg}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="w-full h-full object-cover brightness-50"
      alt="Modern luxury living spaces for rent"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
  </div>

  {/* Floating Trust Badges */}
  <div className="absolute top-4 left-4 right-4 lg:top-8 lg:left-12 lg:right-auto flex flex-row lg:flex-col justify-center lg:justify-start gap-2 lg:gap-4 z-20">
    {[
      { icon: ShieldCheck, text: "100% Verified", color: "emerald" },
      { icon: CreditCard, text: "Zero Brokerage", color: "indigo" },
      { icon: Zap, text: "Instant Booking", color: "amber" },
    ].map((badge, i) => (
      <div
        key={i}
        className="flex items-center gap-1.5 lg:gap-2 bg-white/10 backdrop-blur-md p-1.5 lg:p-4 rounded-lg lg:rounded-2xl border border-white/20 shadow-xl"
      >
        <badge.icon
          className={`text-${badge.color}-400 shrink-0 w-3 h-3 lg:w-4 lg:h-4`}
        />

        <p className="text-[8px] lg:text-xs font-black text-white uppercase tracking-tighter lg:tracking-wider whitespace-nowrap">
          {badge.text}
        </p>
      </div>
    ))}
  </div>

  {/* Main Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Premium Badge */}
    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-indigo-400/30 rounded-full shadow-xl">
      <span className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" />
      <span className="text-xs font-black tracking-[0.3em] uppercase text-indigo-100">
        Premium Direct Rentals
      </span>
    </div>

    {/* H1 */}
    <h1
      id="hero-heading"
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight"
    >
      Find Your{" "}
      <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Perfect Stay
      </span>
    </h1>

    {/* Subheading */}
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
      Zero brokerage • 100% verified • Modern amenities • Instant booking
    </p>

    {/* Search Box */}
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-3xl rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/50">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex items-center flex-1 px-4 py-3 border border-slate-100 rounded-xl">
            <MapPin size={22} className="text-indigo-500 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFreeTextSearch(e.target.value);
              }}
              placeholder="Enter city or area (Delhi, Mumbai, Bangalore...)"
              className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-base sm:text-lg font-semibold"
              aria-label="Search PG rooms and rental properties"
              autoComplete="off"
            />
          </div>

          <button
            onClick={handleFindPG}
            className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-purple-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            aria-label="Search properties"
          >
            <Search size={20} />
            <span>Find Rooms</span>
          </button>
        </div>

        {searchError && (
          <p className="mt-3 text-sm text-red-500 font-semibold">
            {searchError}
          </p>
        )}
      </div>
    </div>

    {/* Live Count */}
    {processedPgData.length > 0 && (
      <p className="text-indigo-200 mt-8 text-base sm:text-lg font-medium">
        ✨ {processedPgData.length} premium stays available
      </p>
    )}
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
    <div className="w-6 h-10 border-2 border-white/50 rounded-3xl flex justify-center">
      <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce" />
    </div>
  </div>
</section>



      {/* Trust Signals Section */}
     <section
  aria-labelledby="trust-section-title"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28"
>
  <h2 id="trust-section-title" className="sr-only">
    Why Choose RoomGi
  </h2>

  {/* Feature Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mb-20">
  {[
    {
      icon: ShieldCheck,
      title: "100% Verified",
      desc: "Every property undergoes a 25-point physical inspection",
      stat: "10K+",
      gradient: "from-indigo-500 to-indigo-600",
      text: "text-indigo-500",
    },
    {
      icon: CreditCard,
      title: "Zero Brokerage",
      desc: "Direct owner deals, save ₹15K–30K instantly",
      stat: "100%",
      gradient: "from-emerald-500 to-emerald-600",
      text: "text-emerald-500",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      desc: "Book & move in within 24 hours",
      stat: "24 hrs",
      gradient: "from-amber-500 to-amber-600",
      text: "text-amber-500",
    },
  ].map((feature, i) => (
    <article
      key={i}
      className={`group relative bg-white/90 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 ${
        i === 1 ? "ring-2 ring-emerald-100/60" : ""
      }`}
    >
      {/* Decorative Index - Mobile par size chotta kiya (text-2xl) */}
      <span
        aria-hidden="true"
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-4xl font-black opacity-[0.06] ${feature.text}`}
      >
        0{i + 1}
      </span>

      {/* Icon Container - Mobile par size w-12 h-12 */}
      <div
        className={`w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.gradient} text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transition-transform duration-300 group-hover:scale-105`}
      >
        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>

      {/* Title - Mobile par text-lg, Desktop par text-2xl */}
      <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors">
        {feature.title}
      </h3>

      {/* Description - Mobile par text-sm aur line-clamp taaki height barabar rahe */}
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
        {feature.desc}
      </p>

      {/* Stat Badge - Mobile par padding aur text chotta */}
      <span className="inline-block text-sm sm:text-lg font-black bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl shadow-md">
        {feature.stat}
      </span>
    </article>
  ))}
</div>

  {/* Stats Row */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 sm:p-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl">
    {[
      { label: "Cities", value: "12+", icon: Users },
      { label: "Properties", value: "5K+", icon: Star },
      { label: "Happy Movers", value: "12K+", icon: Users },
      { label: "Avg Rating", value: "4.8⭐", icon: Star },
    ].map((stat, i) => (
      <div key={i} className="text-center">
        <stat.icon
          aria-hidden="true"
          className="w-12 h-12 sm:w-14 sm:h-14 text-indigo-500 mx-auto mb-4 opacity-70"
        />

        <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-3 rounded-2xl shadow-lg mx-auto w-fit">
          {stat.value}
        </div>

        <p className="text-slate-600 font-bold mt-3 uppercase tracking-wide text-xs sm:text-sm">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</section>



      {/* Featured Properties - SEO Optimized */}
      <section
  aria-labelledby="featured-properties-title"
  className="max-w-7xl mx-auto px-6 pb-24 sm:pb-32"
>
  <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
    <div>
      <h2
        id="featured-properties-title"
        className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight"
      >
        Featured{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Properties
        </span>
      </h2>

      <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-lg">
        Handpicked premium stays • Verified quality • Ready to move-in
      </p>
    </div>

    {/* Filter Pills */}
    <nav
      aria-label="Property Filters"
      className="flex flex-wrap gap-3"
    >
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.key;

        return (
          <button
            key={option.key}
            onClick={() => setActiveFilter(option.key)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/50"
                : "bg-white/80 text-slate-600 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-xl"
            }`}
          >
            {option.label}
            <span
              className={`px-2 py-1 rounded-xl text-xs font-black ${
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </nav>
  </header>

  {/* Listings */}
  {processedPgData.length > 0 ? (
    <ROOMCARD
      pgData={processedPgData}
      wishlistItems={wishlistData?.items || []}
      setIsAuthModalOpen={setIsAuthModalOpen}
    />
  ) : (
    <div
      role="status"
      className="py-32 sm:py-40 text-center bg-gradient-to-br from-slate-50 to-indigo-50 rounded-4xl border-2 border-dashed border-indigo-200/50"
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-4xl flex items-center justify-center mx-auto mb-10 sm:mb-12 shadow-2xl animate-pulse">
        <Search className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
      </div>

      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
        No matches found
      </h3>

      <p className="text-lg sm:text-xl text-slate-600 mb-10 sm:mb-12 max-w-lg mx-auto">
        Try adjusting your filters or search for popular cities like Mumbai,
        Bangalore, Gurgaon
      </p>

      <button
        onClick={() => setActiveFilter("All")}
        className="px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-black text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all"
      >
        Show All Properties
      </button>
    </div>
  )}
</section>

      {/* CTA Section - Above the fold priority */}
<section
  aria-labelledby="cta-title"
  className="relative w-full py-20 sm:py-28 overflow-hidden"
>
  {/* Unified premium background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#2B2F6C] via-[#6D6EEA] to-[#9B8CFF]" />

  {/* Soft top fade */}
  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent" />

  {/* Ambient glows */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.25),transparent_60%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.25),transparent_60%)]" />

  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative rounded-[2.75rem] bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.45)] px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center">

      {/* Glass edge ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-white/10" />

      <h2
        id="cta-title"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight"
      >
        Ready to upgrade your living?
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
        Join 12K+ professionals living brokerage-free. Book your premium stay today.
      </p>

      <div
        role="group"
        aria-label="Call to action"
        className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center"
      >
        {/* Primary CTA */}
        <button
          onClick={() => navigate("/all-listings")}
          className="group relative flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-white shadow-[0_15px_40px_rgba(124,58,237,0.45)] overflow-hidden transition-all duration-300 hover:scale-[1.03]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />

          <span className="relative z-10 flex items-center gap-2">
            Start Searching
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>

        {/* Secondary CTA */}
        <button
          className="px-8 py-4 rounded-full border border-white/25 text-white/90 backdrop-blur-md hover:bg-white/10 transition-all font-medium text-sm sm:text-base"
        >
          List Your Property
        </button>
      </div>
    </div>
  </div>
</section>

{/* White separation before footer */}
<div className="w-full h-16 sm:h-20 bg-white" />




      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}