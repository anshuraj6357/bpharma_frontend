import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, Phone, Mail, Hash, Home, Layers, Calendar, Banknote, ShieldCheck, 
  ChevronLeft, Edit3, MapPin, ClipboardList, X, Download, Clock, DollarSign,
  CheckCircle, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetTenantByIdQuery } from "../../../backend-routes/ownerroutes/tenant";

export default function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetTenantByIdQuery(id);
  const tenant = data?.foundTenant;

  // SEO: Dynamic Page Title
  useEffect(() => {
    if (tenant?.name) {
      document.title = `${tenant.name} - Tenant Profile | Property Management`;
    }
    return () => {
      document.title = "Property Management Suite";
    };
  }, [tenant]);

  const handleEditTenant = useCallback(() => navigate(`/edittenant/${id}`), [id, navigate]);
  const handleClose = useCallback(() => navigate(-1), [navigate]);
  const handleDownload = useCallback(() => {
    // PDF download logic here
    console.log("Download tenant profile PDF");
  }, []);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message="Failed to load tenant data." refetch={refetch} />;
  if (!tenant) return <ErrorMessage message="Tenant record not found." refetch={refetch} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Floating Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="p-3 bg-white/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft size={24} className="text-slate-700" />
          </motion.button>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={handleDownload}
            >
              <Download size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl shadow-2xl hover:shadow-3xl font-bold uppercase tracking-wide text-sm transition-all duration-300"
              onClick={handleEditTenant}
            >
              <Edit3 size={18} className="inline mr-2" />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto">
        {/* Profile Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 mb-12 shadow-2xl border border-white/50"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-4xl flex items-center justify-center text-4xl font-black text-white shadow-2xl border-8 border-white/20">
                  {tenant.name?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                  <CheckCircle size={16} className="text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                  {tenant.name || "Tenant Name"}
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl text-sm font-bold flex items-center gap-2 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {tenant.status || "Active"}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-mono bg-slate-100 px-3 py-1 rounded-2xl text-slate-700">
                    <Hash size={14} />
                    TN{tenant._id?.slice(-6)?.toUpperCase() || "0000"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Personal & Contact Info */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl">
                <User size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Identity Details</h2>
            </div>
            
            <div className="space-y-6">
              <InfoCard 
                icon={<User size={20} />}
                label="Full Name"
                value={tenant.name || "N/A"}
                gradient="from-indigo-500 to-purple-500"
              />
              <InfoCard 
                icon={<Phone size={20} />}
                label="Mobile Number"
                value={tenant.contactNumber || "N/A"}
                gradient="from-emerald-500 to-teal-500"
              />
              <InfoCard 
                icon={<Mail size={20} />}
                label="Email Address"
                value={tenant.email || "N/A"}
                gradient="from-amber-500 to-orange-500"
              />
            </div>
          </motion.section>

          {/* Property & Occupancy */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Home size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Occupancy Details</h2>
            </div>
            
            <div className="space-y-6">
              <InfoCard 
                icon={<Layers size={20} />}
                label="Property"
                value={tenant.property || "N/A"}
                gradient="from-purple-500 to-pink-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl border border-slate-200/50">
                <InfoCard 
                  icon={<MapPin size={20} />}
                  label="Room"
                  value={`Room ${tenant.roomNumber || "N/A"}`}
                  gradient="from-blue-500 to-cyan-500"
                  compact
                />
                <InfoCard 
                  icon={<Hash size={20} />}
                  label="Floor"
                  value={`${tenant.floor || "N/A"} Floor`}
                  gradient="from-violet-500 to-indigo-500"
                  compact
                />
              </div>
            </div>
          </motion.section>
        </div>

        {/* Financial & Timeline */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Financial Summary */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-4xl p-10 text-white shadow-2xl border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl">
                  <DollarSign size={24} className="text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Financial Summary</h3>
                  <p className="text-indigo-100 text-sm opacity-90">Monthly Lease Amount</p>
                </div>
              </div>
              <div className="text-5xl lg:text-6xl font-black leading-none">
                ₹{tenant.Rent?.toLocaleString('en-IN') || "0"}
              </div>
              <p className="text-indigo-100 mt-4 text-lg opacity-80 font-medium">Active Lease Amount</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Calendar size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lease Timeline</h3>
            </div>
            
            <div className="space-y-4">
              <InfoCard 
                icon={<Clock size={20} />}
                label="Check-In Date"
                value={tenant.createdAt ? new Date(tenant.createdAt).toLocaleDateString('en-IN', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                }) : "N/A"}
                gradient="from-green-500 to-emerald-500"
              />
              <div className="p-6 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-3xl border border-emerald-200/50">
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Lease Status
                </p>
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-3xl font-black uppercase tracking-wide text-sm ${
                  tenant.status === "Active" 
                    ? "bg-emerald-500/10 text-emerald-700 border border-emerald-200/50" 
                    : "bg-amber-500/10 text-amber-700 border border-amber-200/50"
                }`}>
                  {tenant.status || "Active"} Lease
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}

// Enhanced Reusable Components
function InfoCard({ icon, label, value, gradient, compact = false }) {
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
        compact ? 'p-5' : 'p-6'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity" 
           style={{ background: `linear-gradient(135deg, ${gradient})` }} />
      <div className="relative z-10 flex items-start gap-4">
        <div className={`w-14 h-14 ${compact ? 'w-12 h-12' : 'w-14 h-14'} bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 group-hover:scale-110 transition-all duration-300`}>
          {React.cloneElement(icon, { className: "text-white drop-shadow-lg" })}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 group-hover:text-indigo-600 transition-colors">{label}</p>
          <p className={`font-bold text-lg lg:text-xl ${compact ? 'text-base' : 'text-xl'} text-slate-900 truncate group-hover:text-slate-800`}>
            {value || "N/A"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl overflow-hidden animate-pulse">
          {/* Header Skeleton */}
          <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-300" />
          
          {/* Content Skeleton */}
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl" />
                <div className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl" />
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl" />
                <div className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div className="h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-4xl" />
              <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ErrorMessage({ message, refetch }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 flex items-center justify-center p-4"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-white rounded-4xl p-12 shadow-2xl border border-rose-200/50 max-w-md w-full text-center"
      >
        <AlertCircle className="mx-auto text-rose-500 mb-6" size={64} />
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{message}</h2>
        <p className="text-slate-600 mb-8 text-lg">Please check your connection and try again.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={refetch}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-wide text-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Retry
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleClose}
            className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-black uppercase tracking-wide text-sm rounded-3xl hover:bg-slate-50 transition-all duration-300"
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
