import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Bed, Users, Zap, ShieldCheck } from "lucide-react";
import WishlistButton from "../components/wishlist.jsx";

const RoomCard = memo(function ROOMCARD({
  pgData,
  setIsAuthModalOpen,
  wishlistItems,
}) {
  const navigate = useNavigate();

  if (!pgData || pgData.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <p className="text-gray-400 font-medium">No Premium Rooms Available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-10 w-full justify-start">
      {pgData.map((room) => {
        const reviews = room.personalreview || [];
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
return (
  <div
    key={room._id}
    onClick={() => navigate(`/pg/${room._id}`)}
    /* 1. DARKER BASE: Bina hover ke bhi card ka background solid Slate-50 hai 
       2. TEXT COLOR: slate-950 (Extremely dark for high readability)
    */
    className="group relative flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] 
    bg-slate-50 rounded-[2.2rem] transition-all duration-500 cursor-pointer 
    border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
    hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2"
  >
    {/* --- IMAGE SECTION (White Bento Frame) --- */}
    <div className="relative aspect-[4/5] m-2.5 overflow-hidden rounded-[1.8rem] bg-white shadow-inner">
      <img
        src={room?.roomImages?.[0] || "/room-placeholder.jpg"}
        alt={room?.branch?.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Badges - Darker Overlay for Visibility */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
        </div>
      </div>

      {/* Wishlist - Sharp Design */}
      <div className="absolute top-4 right-4 z-20" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 active:scale-90 transition-transform">
           <WishlistButton pg={room} onAuthOpen={() => setIsAuthModalOpen(true)} />
        </div>
      </div>

      {/* Price: White Card on Darker Background Effect */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white p-4 rounded-[1.5rem] flex items-center justify-between shadow-2xl border border-slate-100">
          <div className="flex flex-col">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">Price starts at</p>
            <p className="text-slate-950 font-black text-xl leading-none tracking-tighter">
              ₹{room?.category === "Hotel" ? room?.rentperNight : room?.price}
              <span className="text-xs font-bold text-slate-400">/{room?.category === "Hotel" ? 'nt' : 'mo'}</span>
            </p>
          </div>
          <div className="h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
             <Zap size={16} fill="white" />
          </div>
        </div>
      </div>
    </div>

    {/* --- CONTENT SECTION (High Contrast Dark Text) --- */}
    <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1.5 py-1 px-2.5 bg-slate-950 rounded-lg">
          <Star size={12} fill="#fbbf24" className="text-amber-400" />
          <span className="text-white text-[11px] font-black">{avgRating > 0 ? avgRating.toFixed(1) : "NEW"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-950 font-black text-[9px] uppercase tracking-widest opacity-80">
            <Users size={14} className="text-indigo-600" />
            {room?.category || 'Standard'}
        </div>
      </div>

      {/* Extremely Dark & Bold Title */}
      <h3 className="text-[18px] font-black text-slate-950 leading-tight mb-1 line-clamp-1">
        {room?.branch?.name}
      </h3>
      
      <div className="flex items-center gap-1.5 text-slate-700 mb-5">
        <MapPin size={13} className="text-indigo-600 shrink-0" />
        <span className="text-[12px] font-extrabold truncate tracking-tight">{room?.branch?.address}</span>
      </div>

      {/* Footer Details - Darker Border */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
                <Bed size={15} className="text-slate-950" />
                <span className="text-[10px] font-black text-slate-950 uppercase">AC</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Zap size={15} className="text-slate-950" />
                <span className="text-[10px] font-black text-slate-950 uppercase">WIFI</span>
            </div>
         </div>
         <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
            <span className="text-[10px] font-black text-slate-950 uppercase tracking-tighter">View Detail</span>
         </div>
      </div>
    </div>
  </div>
);
      })}
    </div>
  );
});

export default RoomCard;