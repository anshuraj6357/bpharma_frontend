import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchPage from "./search.jsx";
import {
  Search, MapPin, ShieldCheck, CreditCard, Zap, ArrowRight, Star, Users,
  ChevronRight, Loader2, ArrowUp
} from "lucide-react";
import { useSelector } from "react-redux";
import AuthModal from "../user/AuthModal";
import ROOMCARD from "../user/roomcard";
import LandingPageSkeleton from "./loader/landingpageskeleton";
import { useGetAllListedPgQuery } from "../backend-routes/userroutes/allpg.js";
import { useGetWishlistQuery } from "../backend-routes/userroutes/authapi";

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Infinite Scroll State
  const [allRooms, setAllRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const observer = useRef();
  const loadMoreRef = useRef();
  
  // RTK Queries
  const { data: pgApiData, isLoading: pgLoading, isFetching } = useGetAllListedPgQuery({
    page,
    limit: 12
  });
  
  const { data: wishlistData } = useGetWishlistQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  // Load data into state
  useEffect(() => {
    if (pgApiData?.allrooms && pgApiData?.allrooms.length > 0) {
      setAllRooms(prev => {
        if (page === 1) return pgApiData.allrooms;
        return [...prev, ...pgApiData.allrooms];
      });
      setHasMore(pgApiData.pagination.hasNext);
      setIsLoadingMore(false);
    }
  }, [pgApiData, page]);

  // Infinite scroll observer
  useEffect(() => {
    if (loadMoreRef.current && hasMore && !isLoadingMore) {
      const currentObserver = observer.current;
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
            setPage(prev => prev + 1);
            setIsLoadingMore(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.current.observe(loadMoreRef.current);
      return () => currentObserver?.disconnect();
    }
  }, [hasMore, isLoadingMore]);

  // Reset on filter change
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    setPage(1);
    setAllRooms([]);
    setHasMore(true);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SEO Meta
  useEffect(() => {
    document.title = "RoomGi - Premium PG & Rooms Without Brokerage | Verified Stays";
  }, []);

  if (pgLoading && page === 1) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-inter selection:bg-indigo-100/60">
      
      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
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
        }} 
      />

      {/* Search Hero */}
      <SearchPage />

      {/* Trust Signals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <h2 className="sr-only">Why Choose RoomGi</h2>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-20">
          {[
            {
              icon: ShieldCheck, title: "100% Verified", 
              desc: "Every property undergoes a 25-point physical inspection", 
              stat: "10K+", gradient: "from-indigo-500 to-indigo-600", text: "text-indigo-500"
            },
            {
              icon: CreditCard, title: "Zero Brokerage", 
              desc: "Direct owner deals, save ₹15K–30K instantly", 
              stat: "100%", gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-500"
            },
            {
              icon: Zap, title: "Instant Booking", 
              desc: "Book & move in within 24 hours", 
              stat: "24 hrs", gradient: "from-amber-500 to-amber-600", text: "text-amber-500"
            }
          ].map((feature, i) => (
            <article
              key={i}
              className={`group relative bg-white/90 p-6 lg:p-10 rounded-2xl lg:rounded-3xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 ${i === 1 ? "ring-2 ring-emerald-100/60" : ""}`}
            >
              <span className={`absolute top-4 right-4 text-2xl lg:text-4xl font-black opacity-5 ${feature.text}`}>
                0{i + 1}
              </span>
              <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${feature.gradient} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform mx-auto`}>
                <feature.icon className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 text-center group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-8 text-center">
                {feature.desc}
              </p>
              <span className="block mx-auto text-lg font-black bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-3 rounded-2xl shadow-xl">
                {feature.stat}
              </span>
            </article>
          ))}
        </div>

        {/* Stats Row */}
        <div className="relative overflow-hidden p-10 lg:p-16 bg-slate-900 rounded-3xl shadow-2xl mx-4 lg:mx-0">
          <div className="absolute top-0 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-xl" />
          <div className="absolute bottom-0 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-xl" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { label: "Partner Cities", value: "12", suffix: "+", icon: MapPin, color: "text-indigo-400" },
              { label: "Verified Properties", value: "5", suffix: "K+", icon: Star, color: "text-amber-400" },
              { label: "Happy Residents", value: "12", suffix: "K+", icon: Users, color: "text-emerald-400" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-${stat.color.replace('text-', '')}-500 blur-xl opacity-20 rounded-full`} />
                  <stat.icon className={`w-12 h-12 ${stat.color} relative z-10 transition-transform group-hover:scale-110`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-black text-white">{stat.value}</span>
                  <span className={`text-3xl font-black ${stat.color}`}>{stat.suffix}</span>
                </div>
                <p className="mt-3 text-slate-400 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-6 pb-24 lg:pb-32">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-slate-600 font-medium">Handpicked premium stays • Scroll to load more</p>
          </div>
          
          {/* Filters */}
          <div className="flex bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-lg border">
            {[
              { key: "All", label: "All", count: allRooms.length },
              { key: "Newest", label: "New", count: pgApiData?.pagination?.total || 0 }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => handleFilterChange(option.key)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-md flex-1 ${
                  activeFilter === option.key
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {option.label}
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  activeFilter === option.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* Listings */}
        {allRooms.length > 0 ? (
          pgLoading ? <LandingPageSkeleton /> : (
            <ROOMCARD
              pgData={allRooms}
              wishlistItems={wishlistData?.items || []}
              setIsAuthModalOpen={setIsAuthModalOpen}
            />
          )
        ) : (
          <div className="py-32 sm:py-40 text-center bg-gradient-to-br from-slate-50 to-indigo-50 rounded-4xl border-2 border-dashed border-indigo-200/50">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-4xl flex items-center justify-center mx-auto mb-12 shadow-2xl animate-pulse">
              <Search className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">No matches found</h3>
            <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto">
              Try adjusting filters or search popular cities like Mumbai, Bangalore, Gurgaon
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all"
            >
              Show All Properties
            </button>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={loadMoreRef} className="flex justify-center py-20">
          {isLoadingMore ? (
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-12 py-6 rounded-3xl shadow-xl border font-bold text-indigo-700">
              <Loader2 className="w-6 h-6 animate-spin" />
              Loading more stays...
            </div>
          ) : hasMore ? (
            <div className="text-slate-500 text-xl font-bold opacity-60">
              ↓ Scroll for more
            </div>
          ) : (
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-16 py-8 rounded-3xl font-bold shadow-2xl text-xl">
              🎉 All {allRooms.length} properties loaded!
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden mx-6 lg:mx-12 mb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B2F6C] via-[#6D6EEA] to-[#9B8CFF]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.3),transparent_60%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl px-12 py-20 lg:px-24 lg:py-28">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to upgrade your living?
            </h2>
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join 12K+ professionals living brokerage-free. Book your premium stay today.
            </p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/");
                }}
                className="group relative flex items-center gap-3 px-12 py-5 rounded-3xl font-bold text-lg text-white shadow-2xl overflow-hidden transition-all hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
                <span className="absolute inset-0 bg-white/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Searching
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="px-12 py-5 rounded-3xl border-2 border-white/30 backdrop-blur-md text-white hover:bg-white/10 transition-all font-bold text-lg"
                >
                  List Your Property
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-2xl border-4 border-white flex items-center justify-center transition-all hover:scale-110 z-50 shadow-lg"
        title="Scroll to top"
      >
        <ArrowUp size={20} className="rotate-[-90deg]" />
      </button>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}
