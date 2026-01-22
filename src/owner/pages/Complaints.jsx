import { useState, useEffect, useRef, useCallback } from "react";
import {
  AlertTriangle, Clock, CheckCircle, CircleDot, 
  Loader2, Filter, ChevronDown, MapPin, User, Calendar,
  Search, Download, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  useGetAllComplainQuery,
  useGetComplainByStatusQuery,
  useChangeComplainStatusMutation,
} from "../../backend-routes/ownerroutes/complaints";

export default function Complaints() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const observer = useRef();

  // 1. Stats for Top Bar
  const { data: statsData } = useGetAllComplainQuery();

  // 2. Fetch Paginated Data
  const { data: statusCompData, isLoading, isFetching } = 
    useGetComplainByStatusQuery({ 
      status: filterStatus, 
      cursor: cursor || undefined,
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
  }, [statusCompData?.data, cursor]);

  // 5. Infinite Scroll Logic
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && statusCompData?.hasMore) {
          setCursor(statusCompData.nextCursor);
        }
      }, { threshold: 0.1 });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, statusCompData?.hasMore, statusCompData?.nextCursor]
  );

  const handleStatusChange = async (complaintId, status) => {
    try {
      await changeComplainStatus({ complaintId, newStatus: status }).unwrap();
      setCombinedData(prev => 
        prev.map(c => c._id === complaintId ? { ...c, status } : c)
      );
    } catch (err) {
      console.error("Status Update Failed:", err);
    }
  };

  // Filter data client-side for search
  const filteredData = combinedData.filter(complaint =>
    complaint.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.tenantId?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 sm:p-6 lg:p-8">
      {/* ENHANCED HEADER */}
     

      <main className="max-w-7xl mx-auto">
        {/* STATS CARDS */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            <StatsCard 
              label="Pending" 
              count={statsData?.stats?.pending || 0} 
              icon={<AlertTriangle size={28} />} 
              color="amber"
            />
            <StatsCard 
              label="Active" 
              count={statsData?.stats?.InProgress || 0} 
              icon={<Clock size={28} />} 
              color="indigo"
            />
            <StatsCard 
              label="Resolved" 
              count={statsData?.stats?.Resolved || 0} 
              icon={<CheckCircle size={28} />} 
              color="emerald"
            />
            <StatsCard 
              label="Total" 
              count={(statsData?.stats?.pending || 0) + (statsData?.stats?.InProgress || 0) + (statsData?.stats?.Resolved || 0)}
              icon={<CircleDot size={28} />} 
              color="violet"
            />
          </motion.div>
        </section>

        {/* FILTER TABS */}
        <nav className="flex flex-wrap gap-4 mb-12 -mx-2">
          {["all", "Pending", "In-Progress", "Resolved"].map((status) => (
            <FilterTab
              key={status}
              active={filterStatus === status}
              onClick={() => setFilterStatus(status)}
              label={status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            />
          ))}
        </nav>

        {/* COMPLAINTS LIST */}
        <section className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredData.map((complaint, index) => (
              <motion.article
                key={complaint._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                ref={filteredData.length === index + 1 ? lastElementRef : null}
              >
                <ComplaintCard
                  complaint={complaint}
                  loading={statusMutationLoading}
                  onAction={handleStatusChange}
                />
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Loading Spinner */}
          {isFetching && (
            <div className="flex flex-col items-center py-20 gap-4">
              <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
              <span className="text-lg font-semibold text-slate-600">Loading more complaints...</span>
            </div>
          )}

          {/* End of List */}
          {!isLoading && !isFetching && filteredData.length > 0 && !statusCompData?.hasMore && (
            <div className="text-center py-24">
              <div className="w-24 h-1 bg-gradient-to-r from-slate-200 to-slate-200/0 mx-auto mb-6 rounded-full" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">All Done!</h3>
              <p className="text-slate-500 text-lg">You've reached the end of the list</p>
            </div>
          )}

          {/* Empty State */}
          {filteredData.length === 0 && !isLoading && !isFetching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 
              rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-indigo-200/50">
                <CircleDot className="w-20 h-20 text-indigo-400" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">No Complaints Found</h2>
              <p className="text-xl text-slate-600 max-w-md mx-auto mb-8">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

// STATS CARD COMPONENT
function StatsCard({ label, count, icon, color }) {
  const colorClasses = {
    amber: "bg-amber-500/10 text-amber-600 border-amber-200/50 shadow-amber-100/50",
    indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-200/50 shadow-indigo-100/50",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 shadow-emerald-100/50",
    violet: "bg-violet-500/10 text-violet-600 border-violet-200/50 shadow-violet-100/50"
  };

  const classes = colorClasses[color] || colorClasses.indigo;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border 
      ${classes} hover:shadow-2xl hover:border-indigo-300/50 transition-all duration-500 cursor-pointer`}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" 
           style={{ background: `linear-gradient(135deg, var(--color-start), var(--color-end))` }} />
      <div className="relative z-10 flex items-center gap-6">
        <div className={`w-20 h-20 ${classes} rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50 group-hover:scale-110 transition-all`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2 opacity-80">{label}</p>
          <p className="text-4xl font-black text-slate-900">{count?.toLocaleString() || 0}</p>
        </div>
      </div>
    </motion.div>
  );
}

// FILTER TAB COMPONENT
function FilterTab({ active, onClick, label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-3xl font-black uppercase tracking-wide text-sm transition-all duration-300 
      border-4 shadow-lg relative overflow-hidden group
      ${active 
        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-transparent shadow-indigo-500/50 scale-105' 
        : 'bg-white/80 text-slate-700 border-slate-200/50 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-xl hover:bg-white'
      }`}
    >
      <span className="relative z-10">{label}</span>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 
        animate-shimmer" />
      )}
    </motion.button>
  );
}

// COMPLAINT CARD COMPONENT
function ComplaintCard({ complaint, loading, onAction }) {
  const [localLoading, setLocalLoading] = useState(false);

  const handleAction = async (id, status) => {
    setLocalLoading(true);
    try {
      await onAction(id, status);
    } finally {
      setLocalLoading(false);
    }
  };

  const statusConfig = {
    Pending: { gradient: "from-amber-500 to-orange-500", text: "text-amber-900" },
    "In-Progress": { gradient: "from-indigo-500 to-blue-500", text: "text-indigo-900" },
    Resolved: { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-900" }
  };

  const currentStatus = statusConfig[complaint.status] || statusConfig.Pending;

  return (
    <div className="group relative bg-white/90 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-slate-100/50 
    hover:shadow-2xl hover:border-indigo-200/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
      -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <StatusPill status={complaint.status} />
              <div className="px-4 py-2 bg-gradient-to-r from-slate-100 to-indigo-100 rounded-2xl 
              text-xs font-mono font-bold text-slate-700">
                {complaint._id?.slice(-8) || 'N/A'}
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-700 
            transition-all duration-500 leading-tight">
              {complaint.title || 'Untitled Complaint'}
            </h2>
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoItem icon={<User size={20} />} label="Tenant" value={complaint?.tenantId?.username || 'N/A'} />
              <InfoItem icon={<MapPin size={20} />} label="Branch" value={complaint?.branchId?.name || 'N/A'} />
              <InfoItem 
                icon={<Calendar size={20} />} 
                label="Created" 
                value={complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }) : 'N/A'} 
              />
            </div>
          </div>

          {/* Description Panel */}
          <div className="w-full lg:w-80 p-8 bg-gradient-to-b from-slate-50/80 to-white/60 
          backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-lg">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Description</h4>
            <p className="text-slate-700 font-medium leading-relaxed line-clamp-4 italic bg-white/70 p-4 rounded-2xl shadow-sm">
              "{complaint.description || 'No description provided'}"
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-slate-200/50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Task Status */}
            <div className="flex items-center gap-4">
              <div className="relative w-5 h-5">
                <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-slate-500">Current Task</p>
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 
                text-indigo-800 font-bold rounded-2xl mt-1">
                  {complaint.category || 'General'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {complaint.status !== "Resolved" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={localLoading || loading}
                onClick={() => handleAction(
                  complaint._id,
                  complaint.status === "Pending" ? "In-Progress" : "Resolved"
                )}
                className={`px-12 py-5 rounded-3xl font-black uppercase tracking-wide text-sm flex items-center gap-3 
                shadow-2xl transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed
                ${complaint.status === "Pending"
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-500/50"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/50"
                }`}
              >
                {localLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : complaint.status === "Pending" ? (
                  "Start Progress"
                ) : (
                  "Mark Complete"
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// HELPER COMPONENTS
function StatusPill({ status }) {
  const styles = {
    Pending: "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-300/50",
    "In-Progress": "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-indigo-300/50",
    Resolved: "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-300/50"
  };

  return (
    <div className={`px-6 py-3 ${styles[status] || styles.Pending} rounded-3xl shadow-xl flex items-center gap-3 font-black uppercase tracking-wide text-white text-sm`}>
      <div className="w-3 h-3 rounded-full bg-white/80 shadow-md" />
      {status}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50/50 to-indigo-50/20 
    rounded-3xl border border-slate-200/50 hover:shadow-md hover:border-indigo-300/50 transition-all duration-300">
      <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center 
      justify-center flex-shrink-0 shadow-lg group-hover:from-indigo-200 group-hover:to-purple-200">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-700">{value}</p>
      </div>
    </div>
  );
}
