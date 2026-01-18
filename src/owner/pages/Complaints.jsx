import { useState, useEffect, useRef, useCallback } from "react";
import {
  AlertTriangle, Clock, CheckCircle, CircleDot, 
  Loader2, Filter, ChevronDown, MapPin, User, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  useGetAllComplainQuery,
  useGetComplainByStatusQuery,
  useChangeComplainStatusMutation,
} from "../../backend-routes/ownerroutes/complaints";

export default function Complaints() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [cursor, setCursor] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const observer = useRef();

  // 1. Stats for Top Bar
  const { data: statsData } = useGetAllComplainQuery();

  // 2. Fetch Paginated Data
  const { data: statusCompData, isLoading, isFetching } = 
    useGetComplainByStatusQuery({ 
      status: filterStatus, 
      cursor: cursor || undefined, // Send undefined for initial load
      limit: 10 
    });

  const [changeComplainStatus, { isLoading: statusMutationLoading }] = useChangeComplainStatusMutation();

  // 3. Reset when filter status changes
  useEffect(() => {
    setCombinedData([]);
    setCursor(null);
  }, [filterStatus]);

  // 4. Append new data safely (Avoid duplicates)
  useEffect(() => {
    if (statusCompData?.data) {
      setCombinedData((prev) => {
        const newData = statusCompData.data.filter(
          (newComp) => !prev.some((oldComp) => oldComp._id === newComp._id)
        );
        return cursor ? [...prev, ...newData] : statusCompData.data;
      });
    }
  }, [statusCompData, cursor]);

  // 5. Infinite Scroll Logic
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && statusCompData?.hasMore) {
          setCursor(statusCompData.nextCursor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, statusCompData]
  );

  const handleStatusChange = async (complaintId, status) => {
    try {
      await changeComplainStatus({ complaintId, newStatus: status }).unwrap();
      // Update local state so UI reflects change immediately
      setCombinedData(prev => 
        prev.map(c => c._id === complaintId ? { ...c, status } : c)
      );
    } catch (err) {
      console.error("Status Update Failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white p-6 shadow-2xl rounded-b-[2.5rem]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
            <h1 className="text-3xl font-black tracking-tighter italic">RESOLUTIONS.</h1>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Control Panel v2.0</p>
          </motion.div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
            <Filter size={20} className="text-indigo-300" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <StatsCard label="Pending" count={statsData?.stats?.pending} icon={<AlertTriangle />} color="amber" />
          <StatsCard label="Active" count={statsData?.stats?.InProgress} icon={<Clock />} color="indigo" />
          <StatsCard label="Resolved" count={statsData?.stats?.Resolved} icon={<CheckCircle />} color="emerald" />
        </div>

        {/* TAB FILTERS */}
        <div className="flex gap-3 mt-12 overflow-x-auto pb-4 no-scrollbar">
          {["all", "Pending", "In-Progress", "Resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                filterStatus === s 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-105" 
                : "bg-white text-slate-400 border-slate-100 hover:border-indigo-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* COMPLAINTS FEED */}
        <div className="mt-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {combinedData.map((complaint, index) => (
              <motion.div
                key={complaint._id}
                ref={combinedData.length === index + 1 ? lastElementRef : null}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ComplaintCard 
                  complaint={complaint} 
                  loading={statusMutationLoading} 
                  onAction={handleStatusChange} 
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* INFINITE LOADER */}
          {(isFetching) && (
            <div className="flex flex-col items-center py-12 gap-2">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fetching Batch...</span>
            </div>
          )}

          {!statusCompData?.hasMore && combinedData.length > 0 && (
            <div className="text-center py-16">
              <div className="h-[1px] bg-slate-200 w-24 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">Checkpoint Reached</p>
            </div>
          )}

          {combinedData.length === 0 && !isLoading && (
            <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-50">
               <CircleDot size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No entries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT: STATS CARD ================= */
function StatsCard({ label, count, icon, color }) {
  const colors = {
    amber: "text-amber-500 bg-amber-50 shadow-amber-100",
    indigo: "text-indigo-500 bg-indigo-50 shadow-indigo-100",
    emerald: "text-emerald-500 bg-emerald-50 shadow-emerald-100"
  };
  return (
    <div className={`bg-white p-8 rounded-[2.5rem] shadow-2xl ${colors[color]} flex items-center gap-6 border border-white`}>
      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${colors[color]} border-2 border-white`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-900 leading-none">{count || 0}</p>
      </div>
    </div>
  );
}

/* ================= COMPONENT: COMPLAINT CARD ================= */
function ComplaintCard({ complaint, loading, onAction }) {
  const [localLoading, setLocalLoading] = useState(false);

  const handleAction = async (id, status) => {
    setLocalLoading(true);
    await onAction(id, status);
    setLocalLoading(false);
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-500 group">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
             <StatusPill status={complaint.status} />
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ref: {complaint._id.slice(-6)}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-4">
            {complaint.title}
          </h2>
          <div className="flex flex-wrap gap-6">
            <InfoItem icon={<User size={14}/>} label="Tenant" value={complaint?.tenantId?.username} />
            <InfoItem icon={<MapPin size={14}/>} label="Branch" value={complaint?.branchId?.name} />
            <InfoItem icon={<Calendar size={14}/>} label="Created" value={new Date(complaint.createdAt).toLocaleDateString()} />
          </div>
        </div>

        <div className="w-full lg:w-72 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 self-stretch flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Internal Note</p>
            <p className="text-sm text-slate-600 font-medium line-clamp-4 italic">
              "{complaint.description}"
            </p>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Task: {complaint.category}</span>
        </div>

        {complaint.status !== "Resolved" && (
          <button
            disabled={localLoading || loading}
            onClick={() => handleAction(complaint._id, complaint.status === "Pending" ? "In-Progress" : "Resolved")}
            className={`w-full sm:w-auto px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${
                complaint.status === "Pending" 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700" 
                : "bg-emerald-500 text-white shadow-xl shadow-emerald-100 hover:bg-emerald-600"
            } disabled:opacity-50`}
          >
            {localLoading ? <Loader2 className="animate-spin" size={16}/> : 
             complaint.status === "Pending" ? "Promote to In-Progress" : "Finalize Resolution"}
          </button>
        )}
      </div>
    </div>
  );
}

/* UI HELPER COMPONENTS */
function StatusPill({ status }) {
  const styles = {
    Pending: "bg-amber-500",
    "In-Progress": "bg-indigo-600",
    Resolved: "bg-emerald-500"
  };
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full">
      <div className={`w-2 h-2 rounded-full ${styles[status]}`} />
      <span className="text-[9px] font-black text-white uppercase tracking-widest">{status}</span>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-indigo-400">{icon}</div>
      <div>
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter leading-none">{label}</p>
        <p className="text-xs font-bold text-slate-700">{value || '---'}</p>
      </div>
    </div>
  );
}