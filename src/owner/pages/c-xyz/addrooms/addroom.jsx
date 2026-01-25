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
  useGetAllRoomQuery
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
    branch: "", category: "", description: "", notAllowed: [], rules: [],advancedmonth:"",
    branchid:"",flattype:"",roomtype:"",renttype:"",
    allowedFor: "Anyone", furnishedType: "Semi Furnished",
    city: "", services: [{ name: "", price: "" }]
  });

  const { refetch } = useGetAllRoomQuery();
  const [addRoom, { isLoading, isSuccess }] = useAddRoomMutation();
  const { data: Allbranchdata, isLoading: AllBranchloading } = useGetAllBranchbybranchIdQuery();

  const facilityOptions = ["AC", "Non-AC", "WiFi", "Power Backup", "Laundry", "CCTV", "Parking", "Refrigerator"];

  // --- VALIDATION LOGIC ---
const isNonEmpty = (v) => v !== undefined && v !== null && String(v).trim() !== "";
const isPositiveNumber = (v) => Number(v) > 0;

const validateStep = () => {
  switch (step) {
    /* ================= STEP 1 ================= */
    case 1: {
      if (!isNonEmpty(roomData.branchid)) return false;
      if (!isNonEmpty(roomData.roomNumber)) return false;
      if (!isNonEmpty(roomData.category)) return false;
      if (!isNonEmpty(roomData.description)) return false;

      if (roomData.category === "Rented-Room") {
        if (!isNonEmpty(roomData.renttype)) return false;

        if (
          roomData.renttype === "Room-Rent" &&
          !isNonEmpty(roomData.roomtype)
        ) {
          return false;
        }

        if (
          roomData.renttype === "Flat-Rent" &&
          !isNonEmpty(roomData.flattype)
        ) {
          return false;
        }
      }

      return true;
    }

    /* ================= STEP 2 ================= */
    case 2: {
      // Advance / Security is mandatory
      if (!isPositiveNumber(roomData.advancedmonth)) return false;

      if (roomData.category === "Pg") {
        if (!isNonEmpty(roomData.type)) return false;
        if (!Array.isArray(roomData.services) || roomData.services.length === 0)
          return false;

        const validServices = roomData.services.every(
          (s) =>
            isNonEmpty(s.name) &&
            isPositiveNumber(s.price)
        );

        return validServices;
      }

      // Non-PG pricing
      return isPositiveNumber(roomData.price);
    }

    /* ================= STEP 3 ================= */
    case 3: {
      return (
        Array.isArray(roomData.images) &&
        roomData.images.length > 0 &&
        Array.isArray(roomData.facilities) &&
        roomData.facilities.length > 0
      );
    }

    default:
      return false;
  }
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
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-12"
  >
    {/* ================= BASIC DETAILS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Branch */}
      <InputWrapper label="Assign Branch *" icon={<Building2 size={18} />}>
        <select
          className="modern-input"
          value={roomData.branchid}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedBranch = Allbranchdata?.allbranch?.find(
              (b) => b._id === selectedId
            );

            setRoomData({
              ...roomData,
              branchid: selectedId,
              branch: selectedBranch?.name || "",
              city: selectedBranch?.city || "",
            });
          }}
        >
          <option value="">Select Branch</option>
          {Allbranchdata?.allbranch?.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </InputWrapper>

      {/* Room Number */}
      <InputWrapper label="Room / Unit Number *" icon={<Home size={18} />}>
        <input
          className="modern-input"
          placeholder="e.g. 101-B"
          value={roomData.roomNumber}
          onChange={(e) =>
            setRoomData({ ...roomData, roomNumber: e.target.value })
          }
        />
      </InputWrapper>

      {/* Category */}
      <InputWrapper label="Category *" icon={<Sparkles size={18} />}>
        <select
          className="modern-input"
          value={roomData.category}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              category: e.target.value,
              renttype: "",
              roomtype: "",
              flattype: "",
            })
          }
        >
          <option value="">Select Category</option>
          <option value="Pg">PG / Hostel</option>
          <option value="Rented-Room">Flat / Room</option>
        </select>
      </InputWrapper>

      {/* Rent Type */}
      {roomData.category === "Rented-Room" && (
        <InputWrapper label="Rent Type *">
          <select
            className="modern-input"
            value={roomData.renttype}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                renttype: e.target.value,
                roomtype: "",
                flattype: "",
              })
            }
          >
            <option value="">Select Rent Type</option>
            <option value="Room-Rent">Room Rent</option>
            <option value="Flat-Rent">Flat Rent</option>
          </select>
        </InputWrapper>
      )}

      {/* Flat Type */}
      {roomData.renttype === "Flat-Rent" && (
        <InputWrapper label="Flat Type *">
          <select
            className="modern-input"
            value={roomData.flattype}
            onChange={(e) =>
              setRoomData({ ...roomData, flattype: e.target.value })
            }
          >
            <option value="">Select Flat Type</option>
            {["1RK","1BHK","2BHK","3BHK","4BHK","5BHK"].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </InputWrapper>
      )}

      {/* Room Type */}
      {roomData.renttype === "Room-Rent" && (
        <InputWrapper label="Room Type *">
          <select
            className="modern-input"
            value={roomData.roomtype}
            onChange={(e) =>
              setRoomData({ ...roomData, roomtype: e.target.value })
            }
          >
            <option value="">Select Room Type</option>
            {["Single","Double","Triple"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </InputWrapper>
      )}
    </div>

    {/* ================= DESCRIPTION ================= */}
    <InputWrapper label="Property Description *" icon={<Info size={18} />}>
      <textarea
        className="modern-input min-h-[140px]"
        placeholder="Briefly describe the room, amenities, and who it’s ideal for..."
        value={roomData.description}
        onChange={(e) =>
          setRoomData({ ...roomData, description: e.target.value })
        }
      />
      <p className="text-[11px] text-slate-400 mt-1">
        This helps users understand your property better and improves conversions.
      </p>
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
  className="space-y-10"
>
  {/* ================= PG FLOW ================= */}
  {roomData.category === "Pg" ? (
    <>
      {/* Sharing Type */}
      <InputWrapper label="Sharing Configuration *" icon={<Users size={18} />}>
        <div className="grid grid-cols-3 gap-4">
          {["Single", "Double", "Triple"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setRoomData({ ...roomData, type: t })}
              className={`py-4 rounded-2xl font-black text-sm border-2 transition-all ${
                roomData.type === t
                  ? "border-orange-500 bg-orange-50 text-orange-600 shadow-md"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              {t}
              <div className="text-[10px] opacity-60">Sharing</div>
            </button>
          ))}
        </div>
      </InputWrapper>

      {/* Rent + Services */}
      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/60 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-slate-800 text-lg">
              Rent Breakdown *
            </h3>
            <p className="text-xs text-slate-500">
              Monthly rent & additional services
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setRoomData({
                ...roomData,
                services: [...roomData.services, { name: "", price: "" }],
              })
            }
            className="bg-orange-500 text-white p-3 rounded-xl shadow hover:bg-orange-600"
          >
            <Plus size={18} />
          </button>
        </div>

        {roomData.services.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border"
          >
            <input
              placeholder="Service name (e.g. Rent)"
              className="modern-input"
              value={s.name}
              onChange={(e) =>
                handleServiceChange(i, "name", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Price"
              min="0"
              className="modern-input"
              value={s.price}
              onKeyDown={(e) =>
                ["-", "e", "E"].includes(e.key) && e.preventDefault()
              }
              onChange={(e) =>
                handleServiceChange(i, "price", e.target.value)
              }
            />

            {roomData.services.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setRoomData({
                    ...roomData,
                    services: roomData.services.filter((_, idx) => idx !== i),
                  })
                }
                className="text-red-500 font-bold"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-6">
          <span className="text-xs font-bold uppercase text-slate-500">
            Total Monthly Rent
          </span>
          <span className="text-3xl font-black text-orange-500">
            ₹{roomData.price || 0}
          </span>
        </div>
      </div>

      {/* Advance Month */}
      <InputWrapper
        label="Advance / Security Deposit (Months) *"
        icon={<IndianRupee size={18} />}
      >
        <input
          type="number"
          min="0"
          placeholder="e.g. 1 or 2"
          className="modern-input"
          value={roomData.advancedmonth}
          onKeyDown={(e) =>
            ["-", "e", "E"].includes(e.key) && e.preventDefault()
          }
          onChange={(e) =>
            setRoomData({
              ...roomData,
              advancedmonth: e.target.value,
            })
          }
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Example: 1 = 1 month advance
        </p>
      </InputWrapper>
    </>
  ) : (
    /* ================= NON-PG FLOW ================= */
    <>
      <InputWrapper label="Base Pricing (₹) *" icon={<IndianRupee size={18} />}>
        <input
          type="number"
          min="0"
          className="modern-input text-2xl font-black h-20"
          value={roomData.price}
          onKeyDown={(e) =>
            ["-", "e", "E"].includes(e.key) && e.preventDefault()
          }
          onChange={(e) =>
            setRoomData({ ...roomData, price: e.target.value })
          }
        />
      </InputWrapper>

      <InputWrapper
        label="Advance / Security Deposit (Months) *"
        icon={<IndianRupee size={18} />}
      >
        <input
          type="number"
          min="0"
          className="modern-input"
          value={roomData.advancedmonth}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              advancedmonth: e.target.value,
            })
          }
        />
      </InputWrapper>
    </>
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