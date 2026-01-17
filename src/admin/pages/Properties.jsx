import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPropertyModal from "./property/addproperty"
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,

  Trash2,

  MapPin,

  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  useAddbranchMutation,
  useDeletePropertyMutation,
  useGetAllBranchQuery,
  useGetAllBranchByOwnerQuery,

  useGetAllBranchbybranchIdQuery,
} from "../../Bothfeatures/adminfeatures/api/propertyapi";

export default function Properties() {
  
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
   

  // Branch queries
  const { data: allbranch, refetch: refetchAllBranch, isLoading: loadingAllBranch } =
    useGetAllBranchQuery(undefined, { skip: user?.role !== "branch-manager" });

  const { data: allbranchowner, refetch: refetchAllBranchOwner, isLoading: loadingAllBranchOwner } =
    useGetAllBranchByOwnerQuery(undefined, { skip: user?.role !== "owner" });


  const { data: branchmanagerdata, refetch: refetchBranchManagerData, isLoading: loadingBranchManagerData } =
    useGetAllBranchbybranchIdQuery();

    console.log("branchmanagerdata",branchmanagerdata)

  // Mutations
  const [addbranch, { isLoading: addingBranch }] = useAddbranchMutation();

  const [deleteProperty] = useDeletePropertyMutation();

  // Local states
  const [branchfetched, setBranchFetched] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
 
  const [deletingPropertyId, setDeletingPropertyId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    streetAdress: "",
    landmark: "",
    images: [],
    previewImages: [],
  });

  // Sync branches
  useEffect(() => {
    if (allbranch?.allbranch?.length > 0) setBranchFetched(allbranch.allbranch);
    else if (allbranchowner?.allbranch?.length > 0) setBranchFetched(allbranchowner.allbranch);
    else if (branchmanagerdata?.allbranch?.length > 0) setBranchFetched(branchmanagerdata.allbranch);
    else setBranchFetched([]);
  }, [allbranch, allbranchowner, branchmanagerdata]);

  // Cleanup image URLs
  useEffect(() => {
    return () => {
      formData.previewImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [formData.previewImages]);

  // Helpers
  const getStatusColor = (vacancy) => {
    if (vacancy === 0) return "bg-red-100 text-red-600";
    if (vacancy <= 5) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };
  const getOccupancyRate = (occupied, total) => (!total ? 0 : Math.round((occupied / total) * 100));
const handleAppointManager = async (branchid) => {
  try {
    const res = await addbranchmanager({ managerData: {}, branchid }).unwrap();
    toast.success(res?.message || "Manager appointed successfully.");
  } catch (err) {
    toast.error(err?.data?.message || "Failed to appoint manager");
  }
};


  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      toast.warn("Please provide at least name and address.");
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "previewImages") {
        if (key === "images") formData.images.forEach((f) => payload.append("images", f));
        else payload.append(key, formData[key]);
      }
    });

    try {
      const res = await addbranch(payload).unwrap();
      toast.success(res?.message || "Property added successfully.");
      setShowAddModal(false);
      setFormData({
        name: "", address: "", city: "", state: "", pincode: "", streetAdress: "", landmark: "", images: [], previewImages: []
      });
      user?.role === "owner" ? refetchAllBranchOwner?.() : (refetchAllBranch?.(), refetchBranchManagerData?.());
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to add property.");
    }
  };
  
    console.log("branchmanagerdata",allbranch?.allbranch)


  const handleDeleteProperty = async (occupiedLength, id) => {
    if (occupiedLength !== 0) {
      toast.warn("Can't delete property: rooms are occupied.");
      return;
    }
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      setDeletingPropertyId(id);
      const res = await deleteProperty(id).unwrap();
      toast.success(res?.message || "Property deleted.");
   
      refetchAllBranchOwner?.();
      
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete property.");
    } finally {
      setDeletingPropertyId(null);
    }
  };

 return (
  
 <div className="space-y-5">

  {/* HEADER */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 
                bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden">
  
  {/* Background Subtle Pattern (Optional) */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 z-0" />

  <div className="relative z-10">
    <div className="flex items-center gap-3 mb-1">
      <div className="w-2 h-8 bg-orange-500 rounded-full hidden sm:block" /> 
      <h1 className="text-slate-900 text-2xl md:text-3xl font-[900] tracking-tight">
        Property <span className="text-orange-500">Hub</span>
      </h1>
    </div>
    <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.1em] ml-0 sm:ml-5">
      Streamline your real estate operations
    </p>
  </div>

  <div className="flex items-center gap-3 relative z-10">
    {/* Add Property Button */}
    <button
      onClick={() => setShowAddModal(true)}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl 
                 text-xs font-black uppercase tracking-widest text-white 
                 bg-gradient-to-r from-orange-500 to-orange-600 
                 shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] 
                 hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] 
                 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
    >
      <Plus size={18} strokeWidth={3} /> 
      <span>Add Property</span>
    </button>

    {/* Add Room Button (Conditional) */}
    {branchmanagerdata?.allbranch?.length > 0 && (
      <button
        onClick={() => navigate("/admin/addroom")}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl 
                   text-xs font-black uppercase tracking-widest text-white 
                   bg-slate-900 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] 
                   hover:bg-indigo-600 hover:shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] 
                   hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
      >
        <Plus size={18} strokeWidth={3} /> 
        <span>Add Room</span>
      </button>
    )}
  </div>
</div>

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    {(loadingAllBranch || loadingAllBranchOwner || loadingBranchManagerData) &&
      Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
      ))}
{ branchmanagerdata?.allbranch?.length > 0 ? (
   branchmanagerdata?.allbranch?.map((property) => {
    // Sum up occupancy from each room
    const occupiedRental = property.rooms?.reduce(
      (acc, room) => acc + (room.occupiedRentalRoom || 0),
      0
    );
    const occupiedHotel = property.rooms?.reduce(
      (acc, room) => acc + (room.occupiedhotelroom || 0),
      0
    );
   const occupiedBeds = property?.rooms?.reduce(
  (acc, room) => acc + (room.occupied || 0),
  0
);

  

    const totalpgbed = property?.totalCapacity-property.
totalrentalRoom-property.totelhotelroom



    console.log("property",property)
    const totalRooms = property?.totalCapacity

    const totalOccupied = property.totalOccupied
    const totalVacant = totalRooms - totalOccupied;
    const totalOccupancyRate = getOccupancyRate(totalOccupied, totalRooms);

   return (
  <motion.div
    key={property._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative"
  >
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden h-full flex flex-col">
      
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property?.Propertyphoto?.[0] || "/fallback-image.png"}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]"
          alt={property.name}
        />
        
        {/* Status Badge: Glass Effect */}
        <div className="absolute top-4 right-4 backdrop-blur-md bg-white/80 px-3 py-1.5 rounded-xl border border-white/40 shadow-sm">
          <p className={`text-[10px] font-black uppercase tracking-widest ${totalVacant > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {totalVacant} Vacant
          </p>
        </div>

        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* --- BODY SECTION --- */}
      <div className="p-6 flex flex-col flex-1 bg-[#fdfdfd]">
        
        {/* Header Info */}
        <div className="mb-5">
          <h3 className="text-lg font-black text-slate-800 truncate mb-1 group-hover:text-indigo-600 transition-colors">
            {property.name}
          </h3>
          <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
            <MapPin size={14} className="text-indigo-500" />
            {property.city} <span className="text-slate-200">|</span> {property.landmark || "Prime Area"}
          </p>
        </div>

        {/* STATS GRID: Modern Minimalism */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Beds Occupied</p>
            <p className="text-sm font-black text-slate-700">{occupiedBeds}<span className="text-slate-300 font-medium">/{totalpgbed}</span></p>
          </div>
          <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Rooms Rented</p>
            <p className="text-sm font-black text-slate-700">{occupiedRental}<span className="text-slate-300 font-medium">/{property.totalrentalRoom}</span></p>
          </div>
        </div>

        {/* PROGRESS SECTION: High Visibility */}
        <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 mb-2">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Occupancy</p>
              <p className="text-lg font-black text-indigo-900">
                {totalOccupied + occupiedRental}<span className="text-indigo-300 text-sm font-bold">/{totalRooms}</span>
              </p>
            </div>
            <p className="text-xs font-black text-indigo-600 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm">
              {Math.round(totalOccupancyRate)}%
            </p>
          </div>
          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalOccupancyRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]"
            />
          </div>
        </div>

        {/* --- ACTIONS: Contextual & Minimal --- */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex -space-x-2">
             {/* Profile pics of occupants could go here for UX */}
             <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+4</div>
          </div>
          
          <div className="flex gap-2">
            <button
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all active:scale-90"
              title="Edit Property"
            >
              <Edit size={16} />
            </button>

            <button
              onClick={() => handleDeleteProperty(totalOccupied, property._id)}
              disabled={deletingPropertyId === property._id}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all active:scale-90 disabled:opacity-50"
              title="Delete Property"
            >
              {deletingPropertyId === property._id ? (
                <Loader2 className="w-4 h-4 animate-spin text-red-500" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  </motion.div>
);
  })
) : (
  <div className="col-span-3 text-center text-gray-500 py-12">
    No properties found
  </div>
)}

  </div>
  {showAddModal && (
  <AddPropertyModal
    formData={formData}
    setFormData={setFormData}
    handlePropertyChange={handlePropertyChange}
    handleSaveProperty={handleSaveProperty}
    addingBranch={addingBranch}
    setShowAddModal={setShowAddModal}
  />
)}
</div>

);

}


