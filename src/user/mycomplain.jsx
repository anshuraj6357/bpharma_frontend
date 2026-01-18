import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Trash2, Mail, Loader2, Inbox, Plus, AlertCircle, Calendar, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteComplainMutation,
} from "../backend-routes/userroutes/complaints";
import {
  useGetAllComplainByTenantQuery,
} from "../backend-routes/ownerroutes/complaints";


// --- Professional Toast Notification ---
const Toaster = ({ message }) => {
  if (!message.text) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border backdrop-blur-md
      ${message.type === "success" 
        ? "bg-emerald-500/90 border-emerald-400 text-white" 
        : "bg-rose-500/90 border-rose-400 text-white"}`}
    >
      <AlertCircle size={20} />
      <span className="font-semibold tracking-wide">{message.text}</span>
    </motion.div>
  );
};

export default function ComplaintsPage() {
  const [cursor, setCursor] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const observer = useRef();

  const { data, isLoading, isFetching } = useGetAllComplainByTenantQuery({ cursor, limit: 6 });
  const [deleteComplain] = useDeleteComplainMutation();
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (data?.data) {
      setCombinedData((prev) => (cursor ? [...prev, ...data.data] : data.data));
    }
  }, [data, cursor]);

  const lastElementRef = useCallback((node) => {
    if (isLoading || isFetching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data?.hasMore) {
        setCursor(data.nextCursor);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetching, data]);

  const showMsg = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this record?")) return;
    try {
      await deleteComplain(id).unwrap();
      showMsg("Ticket closed and removed", "success");
      setCombinedData(prev => prev.filter(c => c._id !== id));
    } catch {
      showMsg("Action failed. Try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 pb-20">
      <Toaster message={message} />

      {/* --- ELITE NAVIGATION SPACE --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Hash className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Support Hub</span>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
            <Plus size={18} /> New Ticket
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* --- HEADER SECTION --- */}
        <section className="mb-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-black tracking-tight mb-4">Activity Log</h1>
            <p className="text-slate-500 font-medium text-lg">Detailed overview of your active and resolved support requests.</p>
          </motion.div>
        </section>

        {/* --- COMPLAINTS GRID --- */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {isLoading && !combinedData.length ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              combinedData.map((comp, index) => (
                <ComplaintCard 
                  key={comp._id} 
                  comp={comp} 
                  isLast={combinedData.length === index + 1}
                  lastElementRef={lastElementRef}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* --- LOADING STATES --- */}
        {isFetching && combinedData.length > 0 && (
          <div className="flex flex-col items-center mt-16 gap-3">
            <Loader2 className="animate-spin text-indigo-600" size={32} />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing Data...</span>
          </div>
        )}

        {!data?.hasMore && combinedData.length > 0 && (
          <div className="mt-20 text-center">
            <div className="h-[1px] bg-slate-100 w-full mb-8" />
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">End of Records</p>
          </div>
        )}
      </main>
    </div>
  );
}

// --- CARD COMPONENT (Separated for Cleanliness) ---
function ComplaintCard({ comp, isLast, lastElementRef, handleDelete }) {
  const statusConfig = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    "In-Progress": "bg-blue-50 text-blue-700 border-blue-100",
    Resolved: "bg-emerald-50 text-emerald-700 border-emerald-100"
  };

  return (
    <motion.div
      ref={isLast ? lastElementRef : null}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-indigo-100/50 transition-all flex flex-col group relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusConfig[comp.status]}`}>
          {comp.status}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar size={12} />
          <span className="text-[10px] font-bold uppercase">{new Date(comp.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
        {comp.title}
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
        {comp.description}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
             <Hash size={14} />
          </div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{comp.category}</span>
        </div>

        <div className="flex gap-2">
          {comp.status === "Pending" ? (
            <button
              onClick={() => handleDelete(comp._id)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={18} />
            </button>
          ) : (
            <a
              href={`mailto:support@roomgi.com?subject=Ticket ${comp._id}`}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- SKELETON LOADER ---
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="w-20 h-6 bg-slate-100 rounded-full" />
        <div className="w-16 h-4 bg-slate-100 rounded-full" />
      </div>
      <div className="w-3/4 h-6 bg-slate-100 rounded-lg mb-4" />
      <div className="w-full h-20 bg-slate-50 rounded-2xl mb-6" />
      <div className="flex justify-between items-center mt-auto">
        <div className="w-24 h-4 bg-slate-100 rounded-full" />
        <div className="w-10 h-10 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}