import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Filter, 
  Grid2X2, 
  LayoutList, 
  Plus, 
  Search,
  RefreshCcw,
  ChevronDown
} from "lucide-react";

import { useGetRoomsByBranchQuery } from "../backend-routes/ownerroutes/room";
import ROOMCARD from "./roomcard";

export default function BranchRoomsPage() {
  const { id: branchId } = useParams();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [viewType, setViewType] = useState("grid"); // grid vs list
  const [cursor, setCursor] = useState(null);

  const { data, isLoading, isFetching } = useGetRoomsByBranchQuery({
    branchId,
    cursor,
    limit: 12, // Increased for better grid fill
  });

  const rooms = data?.rooms || [];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 1. STICKY HEADER & CONTROLS */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Navigation & Title */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Room Inventory</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Branch ID: <span className="text-indigo-600">{branchId?.slice(-6)}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
               <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl mr-2">
                  <button 
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                  >
                    <LayoutList size={18} />
                  </button>
               </div>
               
              
            </div>
          </div>

          {/* 2. SUB-NAV FILTERS */}
          {/* <div className="flex items-center gap-6 mt-6 overflow-x-auto pb-1 no-scrollbar">
            {['all', 'available', 'occupied', 'maintenance'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`text-sm font-black uppercase tracking-widest pb-3 border-b-2 transition-all whitespace-nowrap ${
                  activeFilter === status 
                  ? 'border-indigo-600 text-slate-900' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div> */}
        </div>
      </header>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by room number or category..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm"
              />
           </div>
           
           <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
             <Filter size={16} />
             Advanced Filters
             <ChevronDown size={14} className="ml-1 opacity-50" />
           </button>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && rooms.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw size={32} className="text-slate-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-900">No rooms found</h3>
             <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or add your first room.</p>
          </div>
        )}

        {/* DATA DISPLAY */}
        <div className={viewType === 'grid' ? '' : 'max-w-4xl mx-auto'}>
           <ROOMCARD 
              pgData={rooms} 
              setIsAuthModalOpen={() => {}} 
              isLoading={isLoading || isFetching} 
           />
        </div>

        {/* LOAD MORE */}
        {data?.nextCursor && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setCursor(data.nextCursor)}
              disabled={isFetching}
              className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
            >
              {isFetching ? (
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Load More Inventory
                  <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}