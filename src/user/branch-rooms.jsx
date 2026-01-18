import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Bed, ArrowLeft, MoreVertical, Maximize2, 
  Loader2, Plus, LayoutGrid, Search 
} from "lucide-react";
import { useGetRoomsByBranchQuery } from "../backend-routes/ownerroutes/room";

export default function BranchRoomsPage() {
  const { id: branchId } = useParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [cursor, setCursor] = useState(null);

  const { data, isLoading, isFetching } = useGetRoomsByBranchQuery({
    branchId,
    cursor,
    limit: 9,
  });

  const rooms = data?.rooms || [];

  // Filter logic
  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    return room.status === filter;
  });

  // Load more handler
  const handleLoadMore = () => {
    if (data?.nextCursor) {
      setCursor(data.nextCursor);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* --- TOP BAR (MNC Style Sticky) --- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95"
            >
              <ArrowLeft size={20} className="text-slate-900" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Inventory <span className="text-slate-300 font-medium">/ Branch</span>
              </h1>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                {branchId}
              </p>
            </div>
          </div>
          
          <button className="hidden md:flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
            <Plus size={18} /> ADD ROOM
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* --- FILTERS & STATS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-200 shadow-sm w-full md:w-fit">
            {["all"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === tab
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">{filteredRooms.length}</span> Rooms
          </div>
        </div>

        {/* --- ROOMS GRID --- */}
        {isLoading && !cursor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[350px] bg-slate-100 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="group bg-white rounded-[2.8rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden relative"
              >
                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                      room.status === "available"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-indigo-50 text-indigo-600 border-indigo-100"
                    }`}>
                      {room.status}
                    </span>
                    <button className="text-slate-200 hover:text-slate-900 transition-colors">
                      <MoreVertical size={22} />
                    </button>
                  </div>

                  <h3 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">
                    {room.roomNumber || `R-${room._id.slice(-3)}`}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                    <LayoutGrid size={16} className="text-indigo-500" />
                    {room.type || "Premium Suite"}
                  </div>

                  {/* Price Block */}
                  <div className="mt-10 flex justify-between items-center pt-8 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Rent / Mo</p>
                      <p className="text-3xl font-black text-slate-950 tracking-tight">₹{room.price}</p>
                    </div>
                    <button className="w-14 h-14 bg-slate-950 text-white rounded-[1.5rem] flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200">
                      <Maximize2 size={20} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {/* Status Indicator Bar */}
                <div className={`h-2 w-full absolute bottom-0 ${
                  room.status === "available" ? "bg-emerald-500" : "bg-indigo-500"
                }`} />
              </div>
            ))}
          </div>
        )}

        {/* --- PAGINATION CONTROL --- */}
        {data?.nextCursor && (
          <div className="mt-20 flex flex-col items-center gap-4">
            <button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="group flex items-center gap-3 bg-white border-2 border-slate-950 px-12 py-5 rounded-[2rem] font-black text-sm tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              {isFetching ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  LOAD MORE UNITS 
                  <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                </>
              )}
            </button>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              More rooms available in this branch
            </p>
          </div>
        )}

        {/* --- EMPTY STATE --- */}
        {!isLoading && filteredRooms.length === 0 && (
          <div className="py-20 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <Search size={40} />
             </div>
             <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Units Found</p>
          </div>
        )}
      </div>
    </div>
  );
}