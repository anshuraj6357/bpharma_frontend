import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useDeleteRoomImageMutation,
  useAddRoomImagesMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";
import { Toaster, toast } from "react-hot-toast";
import { 
  Trash2, Upload, ArrowLeft, X, Plus, 
  Info, IndianRupee, Settings, ShieldAlert, Image as ImageIcon 
} from "lucide-react";

// Constants (Keep these outside to prevent re-renders)
const FACILITIES = ["AC", "Non-AC", "Bathroom", "WiFi", "Power Backup", "Laundry", "CCTV", "Parking", "Refrigerator", "24x7 Electricity"];
const RULES = ["Keep room clean", "No loud music", "Maintain hygiene", "No outside guests", "Respect timings"];
const NOT_ALLOWED = ["Smoking", "Alcohol", "Pets", "Visitors", "Loud Music"];
const GENDER_OPTIONS = ["Boys", "Girls", "Family", "Anyone"];
const FURNISHED_OPTIONS = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
const HOTEL_TYPES = ["Standard-Single", "Standard-Double", "Twin-Room", "Triple-Room", "Family-Room", "Deluxe-Room", "Super-Deluxe-Room", "Executive-Room", "Suite"];
const FLAT_TYPES = ["1Rk", "1BHK", "2BHK", "3BHK", "4BHK", "5BHK"];

export default function EditRoomForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetRoomByIdQuery(roomId);
  const [updateRoom, { isSuccess, isLoading: isUpdating }] = useUpdateRoomMutation();
  const [deleteImageAPI] = useDeleteRoomImageMutation();
  const [addImagesAPI] = useAddRoomImagesMutation();

  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    price: "",
    category: "Pg",
    type: "Single",
    hoteltype: "",
    flattype: "",
    renttype: "Room-Rent",
    description: "",
    comment: "",
    allowedFor: "Anyone",
    furnishedType: "Unfurnished",
    facilities: [],
    rules: [],
    notAllowed: [],
    rentperday: "",
    rentperhour: "",
    rentperNight: "",
    advancedmonth: "",
    services: []
  });

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (data?.room) {
      setFormData({
        ...data.room,
        services: data.room.services || [],
        facilities: data.room.facilities || [],
        rules: data.room.rules || [],
        notAllowed: data.room.notAllowed || []
      });
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Room Updated Successfully");
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  const handleUpdateRoom = async () => {
    try {
      await updateRoom({ id: roomId, data: formData }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update room!");
    }
  };

  const handleToggleArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleAddImages = async () => {
    if (selectedImages.length === 0) return toast.error("Please select images");
    const imgData = new FormData();
    imgData.append("id", roomId);
    selectedImages.forEach(file => imgData.append("roomImages", file));
    
    try {
      await addImagesAPI(imgData).unwrap();
      toast.success("Images uploaded");
      setSelectedImages([]);
      refetch();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
      <p className="text-gray-500 font-medium">Loading room details...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen pb-20">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-2 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm font-semibold uppercase tracking-wider">Back to List</span>
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Edit Room <span className="text-blue-600">#{formData.roomNumber}</span>
          </h1>
        </div>
        <div className="flex gap-3">
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${formData.category === 'Hotel' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                Category: {formData.category}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Media & Config */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Images */}
          <SectionCard title="Room Gallery" icon={<ImageIcon size={20}/>}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {data?.room?.roomImages?.map((img, idx) => (
                <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={() => deleteImageAPI({ id: roomId, imageurl: img }).unwrap().then(() => refetch())}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center aspect-video cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-600">
                <Upload size={24} />
                <span className="text-xs font-bold mt-2">Add New</span>
                <input type="file" multiple className="hidden" onChange={(e) => setSelectedImages(Array.from(e.target.files))} />
              </label>
            </div>
            {selectedImages.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 font-medium">{selectedImages.length} images ready to upload</p>
                    <button onClick={handleAddImages} className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md font-bold hover:bg-blue-700">Upload Now</button>
                </div>
            )}
          </SectionCard>

          {/* Section: Extra Services */}
          <SectionCard title="Premium Services" icon={<Plus size={20}/>} badge={formData.services.length}>
            <div className="space-y-3">
              {formData.services.map((service, idx) => (
                <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                  <input placeholder="Service (e.g. Breakfast)" value={service.name} onChange={(e) => {
                     const s = [...formData.services]; s[idx].name = e.target.value; setFormData({...formData, services: s});
                  }} className="flex-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input type="number" placeholder="0" value={service.price} onChange={(e) => {
                         const s = [...formData.services]; s[idx].price = e.target.value; setFormData({...formData, services: s});
                    }} className="w-28 p-2.5 pl-7 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" />
                  </div>
                  <button onClick={() => setFormData({...formData, services: formData.services.filter((_, i) => i !== idx)})} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button onClick={() => setFormData({...formData, services: [...formData.services, {name: "", price: 0}]})} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                <Plus size={18} /> Add Service Item
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Pricing & Controls */}
        <div className="space-y-8">
          
          {/* Section: Pricing */}
          <SectionCard title="Pricing Model" icon={<IndianRupee size={20}/>}>
            <div className="space-y-4">
              {formData.category === "Hotel" ? (
                <div className="grid grid-cols-1 gap-4">
                  <InputGroup label="Daily Rate (Day)" type="number" prefix="₹" value={formData.rentperday} onChange={v => setFormData({...formData, rentperday: v})} />
                  <InputGroup label="Nightly Rate" type="number" prefix="₹" value={formData.rentperNight} onChange={v => setFormData({...formData, rentperNight: v})} />
                  <InputGroup label="Hourly Rate" type="number" prefix="₹" value={formData.rentperhour} onChange={v => setFormData({...formData, rentperhour: v})} />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <InputGroup label="Monthly Rent" type="number" prefix="₹" value={formData.price} onChange={v => setFormData({...formData, price: v})} />
                  <InputGroup label="Security Deposit (Months)" type="number" value={formData.advancedmonth} onChange={v => setFormData({...formData, advancedmonth: v})} />
                </div>
              )}
            </div>
          </SectionCard>

          {/* Section: Visibility & Rules */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><Info size={18}/> Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
                <SelectGroup label="Suitable For" value={formData.allowedFor} options={GENDER_OPTIONS} onChange={v => setFormData({...formData, allowedFor: v})} />
                <SelectGroup label="Furnishing State" value={formData.furnishedType} options={FURNISHED_OPTIONS} onChange={v => setFormData({...formData, furnishedType: v})} />
            </div>
          </div>

          <CheckboxList title="Facilities" items={FACILITIES} selected={formData.facilities} onToggle={v => handleToggleArray("facilities", v)} />
          <CheckboxList title="House Rules" items={RULES} selected={formData.rules} onToggle={v => handleToggleArray("rules", v)} />
          <CheckboxList title="Restrictions" items={NOT_ALLOWED} selected={formData.notAllowed} onToggle={v => handleToggleArray("notAllowed", v)} color="red" />

        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-500">Editing Room {formData.roomNumber}</p>
                <p className="text-xs text-gray-400">All changes must be saved to go live.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <button onClick={() => navigate(-1)} className="flex-1 md:flex-none px-8 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-all">Cancel</button>
                <button 
                    onClick={handleUpdateRoom} 
                    disabled={isUpdating} 
                    className="flex-[2] md:flex-none px-12 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-extrabold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3"
                >
                    {isUpdating ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> : "SAVE CHANGES"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

// UI Utility Components
function SectionCard({ title, icon, children, badge }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="text-blue-500">{icon}</span> {title}
        </h2>
        {badge !== undefined && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-black">{badge}</span>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InputGroup({ label, type, value, onChange, prefix }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>}
        <input 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className={`w-full p-3 ${prefix ? 'pl-8' : 'pl-4'} bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-700 shadow-sm`}
        />
      </div>
    </div>
  );
}

function SelectGroup({ label, value, options, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-700 shadow-sm cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function CheckboxList({ title, items, selected, onToggle, color = "blue" }) {
  const accentClass = color === "red" ? "text-red-600 bg-red-50 border-red-200" : "text-blue-600 bg-blue-50 border-blue-200";
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-black text-gray-400 uppercase tracking-widest text-[10px] mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => {
          const isSelected = selected.includes(item);
          return (
            <button 
                key={item} 
                onClick={() => onToggle(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? accentClass : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}