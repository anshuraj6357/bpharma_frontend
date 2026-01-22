import React, { useEffect } from "react";
import { X, Upload, MapPin, Building2, Loader2, ChevronRight, Stars, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddPropertyModal = ({
  formData,
  setFormData,
  handleChange,
  handlePropertyChange,
  handleSaveProperty,
  addingBranch,
  setShowAddModal,
}) => {
  const onChange = handleChange || handlePropertyChange;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = formData.previewImages.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: updatedImages, previewImages: updatedPreviews }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop: Ultra Dark Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowAddModal(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[92vh] border border-white/20"
      >
        {/* HEADER: Bold & Dark */}
        <div className="px-10 py-8 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/40">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-[900] text-white tracking-tight">List Property</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map(i => <Stars key={i} className="text-amber-400 fill-amber-400" size={12} />)}
                </div>
                <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Elite Membership</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(false)}
            className="p-3 bg-white/10 hover:bg-red-500/20 rounded-2xl transition-all text-white/50 hover:text-red-400 border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSaveProperty} className="overflow-y-auto px-10 py-10 custom-scrollbar bg-[#fcfcfd]">
          <div className="space-y-12">
            
            {/* SECTION 1: Identity */}
            <div className="space-y-6">
              <SectionHeading number="01" title="Core Identity" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="name" label="Property Name" placeholder="The Grand Residency" value={formData.name} onChange={onChange} required />
                <Input name="city" label="City" placeholder="Mumbai" value={formData.city} onChange={onChange} required />
                <Input name="state" label="State" placeholder="Maharashtra" value={formData.state} onChange={onChange} required />
                <Input name="pincode" label="Pincode" placeholder="400001" value={formData.pincode} onChange={onChange} required />
              </div>
            </div>

            {/* SECTION 2: Location */}
            <div className="space-y-6">
              <SectionHeading number="02" title="Location Details" />
              <Input name="address" label="Primary Address" placeholder="Building, Wing & Flat Details" value={formData.address} onChange={onChange} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="streetAdress" label="Street Name" placeholder="Palm Beach Road" value={formData.streetAdress} onChange={onChange} />
                <Input name="landmark" label="Famous Landmark" placeholder="Opposite Central Mall" value={formData.landmark} onChange={onChange} />
              </div>
            </div>

            {/* SECTION 3: Visuals */}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center gap-6 mt-16 pt-8 border-t border-slate-100">
            <button
              type="button" onClick={() => setShowAddModal(false)}
              className="flex-1 py-5 text-xs font-[900] uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={addingBranch}
              className="flex-[2] bg-indigo-600 text-white py-5 px-10 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:bg-slate-900 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center gap-4"
            >
              {addingBranch ? <Loader2 className="animate-spin" size={20} /> : <>Publish Property <ChevronRight size={18} /></>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Helper Components ---

const SectionHeading = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-2">
    <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded-lg">{number}</span>
    <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">{title}</h3>
    <div className="flex-1 h-[1px] bg-slate-100 ml-2" />
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-[900] text-slate-800 uppercase tracking-wider ml-1 group-focus-within:text-indigo-600 transition-colors">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm"
    />
  </div>
);

export default AddPropertyModal;