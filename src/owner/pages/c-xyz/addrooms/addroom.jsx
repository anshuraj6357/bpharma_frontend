import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, IndianRupee, ClipboardCheck, Image as ImageIcon, 
  Plus, Trash2, ArrowLeft, ArrowRight, MapPin, 
  Users, Info, Sparkles, X, Home, ShieldAlert
} from "lucide-react";
import {
  useAddRoomMutation,

  useGetAllRoomownerQuery
} from "../../../../backend-routes/ownerroutes/room";
import {

  useGetAllBranchbybranchIdQuery
 
} from "../../../../backend-routes/ownerroutes/branch";
import { useNavigate } from "react-router-dom";

function AddRoomForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    roomNumber: "", type: "", price: "", facilities: [], images: [],
    branch: "", category: "", description: "", notAllowed: [], rules: [],
    allowedFor: "Anyone", furnishedType: "Semi Furnished",
    city: "", services: [{ name: "", price: "" }]
  });

  const { refetch } = useGetAllRoomQuery();
  const [addRoom, { isLoading, isSuccess }] = useAddRoomMutation();
  const { data: Allbranchdata, isLoading: AllBranchloading } = useGetAllBranchbybranchIdQuery();

  const facilityOptions = ["AC", "Non-AC", "WiFi", "Power Backup", "Laundry", "CCTV", "Parking", "Refrigerator"];

  // --- VALIDATION LOGIC ---
  const validateStep = () => {
    if (step === 1) {
      return roomData.branch && roomData.roomNumber && roomData.city && roomData.category && roomData.description;
    }
    if (step === 2) {
      if (roomData.category === "Pg") {
        return roomData.type && roomData.services.length > 0 && roomData.services.every(s => s.name !== "" && s.price !== "");
      }
      return roomData.price > 0;
    }
    if (step === 3) {
      return roomData.images.length > 0 && roomData.facilities.length > 0;
    }
    return false;
  };

  const isNextDisabled = !validateStep();

  // --- HANDLERS ---
  const handleCheckboxArray = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setRoomData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setRoomData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...roomData.services];
    updatedServices[index][field] = value;
    // Calculate total if category is PG
    const total = updatedServices.reduce((sum, s) => sum + Number(s.price || 0), 0);
    setRoomData(prev => ({ 
      ...prev, 
      services: updatedServices, 
      price: prev.category === "Pg" ? total : prev.price 
    }));
  };

  const handleAddRoom = async () => {
    const formData = new FormData();
    Object.keys(roomData).forEach(key => {
      if (['facilities', 'notAllowed', 'rules'].includes(key)) {
        roomData[key].forEach(val => formData.append(key, val));
      } else if (key === 'services') {
        formData.append(key, JSON.stringify(roomData.services.filter(s => s.name && s.price)));
      } else if (key === 'images') {
        roomData.images.forEach(img => formData.append("images", img));
      } else { formData.append(key, roomData[key]); }
    });
    try { 
      await addRoom(formData).unwrap(); 
    } catch (err) { 
      toast.error(err?.data?.message || "Failed to list property"); 
    }
  };
const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};
  useEffect(() => {
    if (isSuccess) {
      toast.success("Property listed successfully!");
      refetch();
      setTimeout(() => navigate(-1), 2000);
    }
  }, [isSuccess]);

  if (AllBranchloading) return (
    <div className="h-screen flex items-center justify-center bg-white animate-pulse">
      <div className="text-orange-500 font-bold">Setting up workspace...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto py-12 px-4">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-12 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex gap-4">
             {[1, 2, 3].map(i => (
               <div key={i} className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-500' : 'bg-slate-100'}`} />
             ))}
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Step 0{step} of 03</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputWrapper label="Assign Branch *" icon={<Building2 size={18}/>}>
                          <select className="modern-input" value={roomData.branch} onChange={e => setRoomData({ ...roomData, branch: e.target.value })}>
                            <option value="">Select Branch</option>
                            {Allbranchdata?.allbranch?.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                          </select>
                        </InputWrapper>
                        <InputWrapper label="Room/Suite Number *" icon={<Home size={18}/>}>
                          <input className="modern-input" placeholder="e.g. 101-B" value={roomData.roomNumber} onChange={e => setRoomData({ ...roomData, roomNumber: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="City *" icon={<MapPin size={18}/>}>
                          <input className="modern-input" placeholder="Location" value={roomData.city} onChange={e => setRoomData({ ...roomData, city: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="Category *" icon={<Sparkles size={18}/>}>
                          <select className="modern-input" value={roomData.category} onChange={e => setRoomData({ ...roomData, category: e.target.value })}>
                            <option value="">Select Category</option>
                            <option value="Pg">PG / Hostel</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Rented-Room">Flat / Room</option>
                          </select>
                        </InputWrapper>
                      </div>
                      <InputWrapper label="Property Description *">
                        <textarea className="modern-input min-h-[120px]" placeholder="Briefly describe the room..." value={roomData.description} onChange={e => setRoomData({ ...roomData, description: e.target.value })} />
                      </InputWrapper>
                    </motion.div>
                  )}

                  {step === 2 && (
  <motion.div 
    key="step2" 
    variants={slideVariants} 
    initial="hidden" 
    animate="visible" 
    exit="exit" 
    className="space-y-8"
  >
    {roomData.category === "Pg" ? (
      <div className="space-y-8">
        {/* Sharing Type Selection */}
        <InputWrapper label="Sharing Configuration *" icon={<Users size={18} />}>
          <div className="grid grid-cols-3 gap-4">
            {['Single', 'Double', 'Triple'].map(t => (
              <button
                key={t}
                onClick={() => setRoomData({ ...roomData, type: t })}
                className={`py-4 rounded-2xl font-black text-sm border-2 transition-all flex flex-col items-center gap-1 ${
                  roomData.type === t 
                  ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md shadow-orange-100' 
                  : 'border-slate-100 text-slate-400 bg-white hover:border-slate-200'
                }`}
              >
                {t}
                <span className="text-[10px] font-medium opacity-60">Sharing</span>
              </button>
            ))}
          </div>
        </InputWrapper>

        {/* Services & Rent Breakdown */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-[2.5rem] border border-slate-200/60 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-black text-slate-800 text-lg">Rent Breakdown *</h3>
                <p className="text-slate-500 text-xs font-medium">Add room rent and additional service charges.</p>
              </div>
              <button 
                type="button"
                onClick={() => setRoomData({ ...roomData, services: [...roomData.services, { name: "", price: "" }] })}
                className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {roomData.services.map((s, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Service Name</label>
                    <div className="relative">
                      <input 
                        placeholder="e.g. Monthly Rent" 
                        className="modern-input bg-slate-50/50 border-transparent focus:bg-white" 
                        value={s.name} 
                        onChange={e => handleServiceChange(i, "name", e.target.value)} 
                      />
                      {/* Quick Suggestions - Only show if empty */}
                      {s.name === "" && (
                        <div className="flex gap-2 mt-2">
                          {['Rent', 'Food', 'WiFi', 'Laundry'].map(tag => (
                            <button 
                              key={tag}
                              type="button"
                              onClick={() => handleServiceChange(i, "name", tag)}
                              className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md hover:bg-orange-100 hover:text-orange-600 transition-colors"
                            >
                              +{tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-40 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input 
                        type="number" 
                        placeholder="0" 
                        className="modern-input pl-8 bg-slate-50/50 border-transparent focus:bg-white" 
                        value={s.price} 
                        onChange={e => handleServiceChange(i, "price", e.target.value)} 
                      />
                    </div>
                  </div>

                  {roomData.services.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => setRoomData({ ...roomData, services: roomData.services.filter((_, idx) => idx !== i) })} 
                      className="self-end md:self-center p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Total Display */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Total Monthly Rent</span>
              <div className="text-right">
                <span className="text-3xl font-black text-slate-900">₹{roomData.price || 0}</span>
                <p className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter">Auto-Calculated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputWrapper label="Base Pricing (₹) *" icon={<IndianRupee size={18} />}>
          <input 
            type="number" 
            className="modern-input text-2xl font-black h-20 px-8" 
            placeholder="0.00" 
            value={roomData.price} 
            onChange={e => setRoomData({ ...roomData, price: e.target.value })} 
          />
        </InputWrapper>
        <div className="bg-orange-50 rounded-3xl p-6 flex flex-col justify-center border border-orange-100">
           <p className="text-orange-800 text-xs font-bold uppercase mb-1">Pricing Note</p>
           <p className="text-orange-600 text-xs leading-relaxed">This will be shown as the primary price for your listing.</p>
        </div>
      </div>
    )}
  </motion.div>
)}


                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center gap-2"><Sparkles size={16}/> Facilities *</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {facilityOptions.map(f => (
                            <button key={f} onClick={() => handleCheckboxArray("facilities", f)} className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${roomData.facilities.includes(f) ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-100 text-slate-400'}`}>{f}</button>
                          ))}
                        </div>
                      </section>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="space-y-3">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><ClipboardCheck size={14} className="text-blue-500"/> House Rules</h3>
                          <div className="flex flex-wrap gap-2">
                            {["Keep clean", "No noise", "Timings"].map(r => (
                              <button key={r} onClick={() => handleCheckboxArray("rules", r)} className={`px-3 py-2 rounded-lg border text-[10px] font-bold ${roomData.rules.includes(r) ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white text-slate-400'}`}>{r}</button>
                            ))}
                          </div>
                        </section>
                        <section className="space-y-3">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><ShieldAlert size={14} className="text-red-500"/> Restrictions</h3>
                          <div className="flex flex-wrap gap-2">
                            {["Smoking", "Alcohol", "Pets"].map(r => (
                              <button key={r} onClick={() => handleCheckboxArray("notAllowed", r)} className={`px-3 py-2 rounded-lg border text-[10px] font-bold ${roomData.notAllowed.includes(r) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white text-slate-400'}`}>{r}</button>
                            ))}
                          </div>
                        </section>
                      </div>

                      <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center gap-2"><ImageIcon size={16}/> Gallery (Min 1 Photo) *</h3>
                        <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-dashed border-slate-200">
                          {roomData.images.map((img, i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                              <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" />
                              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                            </div>
                          ))}
                          <label className="aspect-square bg-white rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-orange-500">
                            <Plus className="text-slate-300" />
                            <input type="file" multiple hidden onChange={handleImageUpload} />
                          </label>
                        </div>
                      </section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="font-bold text-slate-400 hover:text-slate-900">
                  {step === 1 ? "Cancel" : "Back"}
                </button>
                <button 
                  disabled={isNextDisabled || isLoading} 
                  onClick={() => step < 3 ? setStep(step + 1) : handleAddRoom()} 
                  className={`px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all ${isNextDisabled ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white shadow-xl hover:bg-orange-600 shadow-slate-200'}`}
                >
                  {isLoading ? "Publishing..." : step === 3 ? "Launch Listing" : "Continue"}
                  <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Preview */}
          <div className="lg:col-span-4 sticky top-12 h-fit">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6">
              <h3 className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.2em]">Live Preview</h3>
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                {roomData.images.length > 0 ? (
                  <img src={URL.createObjectURL(roomData.images[0])} className="w-full h-full object-cover" />
                ) : <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon size={40}/></div>}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black truncate">{roomData.roomNumber || "Unit Title"}</h2>
                <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin size={12}/> {roomData.city || "Location"}</p>
              </div>
              <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Total Rent</p>
                  <p className="text-2xl font-black text-orange-500">₹{roomData.price || 0}</p>
                </div>
                <div className="bg-slate-800 px-3 py-1 rounded-lg text-[10px] font-bold text-orange-100">{roomData.category || "Type"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-input { width: 100%; padding: 0.8rem 1.2rem; background: #F8FAFC; border: 2px solid #F1F5F9; border-radius: 1rem; font-weight: 600; outline: none; transition: 0.2s; }
        .modern-input:focus { border-color: #f97316; background: white; box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); }
      `}</style>
    </div>
  );
}

function InputWrapper({ label, children, icon }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

export default AddRoomForm;