import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Home, Banknote, ShieldCheck, 
  MapPin, AlertCircle, Save, ChevronRight 
} from 'lucide-react';

const AddTenantModal = ({ adding, setAdding, formdata, handleChange, alldata, handleSaveTenant }) => {
  return (
    <AnimatePresence>
      {adding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAdding(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#F8FAFC] w-full max-w-4xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            
            {/* --- MODERN HEADER --- */}
            <div className="px-8 py-6 bg-white border-b border-slate-100 flex justify-between items-center relative">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">
                    <User size={18} strokeWidth={3} />
                  </span>
                  <h2 className="text-xl font-[900] text-slate-800 tracking-tight">Onboard New Tenant</h2>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Digital Entry System</p>
              </div>
              <button
                onClick={() => setAdding(false)}
                className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* --- SCROLLABLE BODY --- */}
            <div className="overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: Branch & Basic */}
                <div className="space-y-6">
                  {/* Branch Selection */}
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <SectionLabel icon={<MapPin size={14} />} title="Branch Allocation" />
                    <div className="mt-4">
                      <select
                        name="branch"
                        value={formdata.branch}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-sm ${
                          !formdata.branch ? 'border-orange-100 focus:border-orange-500' : 'border-transparent focus:border-indigo-500'
                        }`}
                      >
                        <option value="">Choose a branch...</option>
                        {alldata?.allbranch?.map((branch) => (
                          <option key={branch._id} value={branch._id}>{branch.address}</option>
                        ))}
                      </select>
                      {!formdata.branch && (
                        <div className="flex items-center gap-1 mt-2 text-orange-500">
                          <AlertCircle size={12} />
                          <p className="text-[10px] font-black uppercase tracking-tighter">Required for allocation</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                    <SectionLabel icon={<User size={14} />} title="Personal Profile" />
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <CustomInput icon={<User size={16} />} name="name" placeholder="Full Legal Name" value={formdata.name} onChange={handleChange} />
                      <CustomInput icon={<Mail size={16} />} name="email" placeholder="Email Address" value={formdata.email} onChange={handleChange} type="email" />
                      <div className="grid grid-cols-2 gap-4">
                        <CustomInput icon={<Phone size={16} />} name="contactNumber" placeholder="Primary Phone" value={formdata.contactNumber} onChange={handleChange} />
                        <CustomInput icon={<Phone size={16} />} name="emergencyContactNumber" placeholder="Emergency No." value={formdata.emergencyContactNumber} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Rent & ID */}
                <div className="space-y-6">
                   {/* Accommodation Details */}
                   <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <SectionLabel icon={<Home size={14} />} title="Room Allocation" />
                    <div className="mt-4">
                       <CustomInput icon={<Home size={16} />} name="roomNumber" placeholder="Assign Room (e.g. 104-B)" value={formdata.roomNumber} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm bg-indigo-50/10">
                    <SectionLabel icon={<Banknote size={14} />} title="Financial Setup" color="text-indigo-600" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <CustomInput name="Rent" placeholder="Monthly Rent (₹)" value={formdata.Rent} onChange={handleChange} />
                      <CustomInput name="advanced" placeholder="Security Deposit (₹)" value={formdata.advanced} onChange={handleChange} />
                      <div className="sm:col-span-2">
                         <CustomInput name="dues" placeholder="Outstanding Balance (₹)" value={formdata.dues} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* ID Verification */}
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <SectionLabel icon={<ShieldCheck size={14} />} title="Verification" />
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <select
                        name="idProofType"
                        value={formdata.idProofType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-sm"
                      >
                        <option value="">Select ID Type</option>
                        <option value="Aadhar-Card">Aadhaar Card</option>
                        <option value="Voter-Id-Card">Voter ID</option>
                      </select>
                      <CustomInput name="idProof" placeholder="Enter ID Number" value={formdata.idProof} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ACTION FOOTER --- */}
            <div className="px-10 py-8 bg-white border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setAdding(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-[0.2em] transition-colors"
              >
                Discard Entry
              </button>
              
              <div className="flex gap-4">
                 <button
                  onClick={handleSaveTenant}
                  className="group flex items-center gap-3 bg-slate-900 hover:bg-orange-500 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95"
                >
                  Confirm & Save <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- HELPER COMPONENTS ---

const SectionLabel = ({ icon, title, color = "text-slate-400" }) => (
  <div className="flex items-center gap-2">
    <span className={`${color} bg-slate-50 p-1.5 rounded-lg`}>{icon}</span>
    <h3 className="text-[11px] font-[900] uppercase tracking-[0.15em] text-slate-500">{title}</h3>
  </div>
);

const CustomInput = ({ icon, ...props }) => (
  <div className="relative group">
    {icon && (
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
        {icon}
      </span>
    )}
    <input
      {...props}
      className={`w-full ${icon ? 'pl-12' : 'px-5'} py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm text-slate-700 placeholder:text-slate-300 shadow-sm`}
    />
  </div>
);

export default AddTenantModal;