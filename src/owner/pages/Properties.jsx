import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
// Removed react-helmet-async - install with: npm i react-helmet-async or use basic meta in index.html [web:11]
import {
  useAddbranchMutation,
  useGetAllBranchByOwnerQuery,
  useGetAllBranchbybranchIdQuery,
  useDeleteBranchMutation,
} from "../../backend-routes/ownerroutes/branch";
import AddPropertyModal from "./property/addproperty";

// Memoized PropertyCard component
const PropertyCard = React.memo(
  ({
    property,
    onDelete,
    deletingPropertyId,
    totalOccupancyRate,
    totalVacant,
    occupiedBeds,
    occupiedRental,
    totalpgbed,
    totalRooms,
    totalOccupied,
  }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
     <div className="bg-gradient-to-br from-white via-white to-indigo-50 
rounded-[2rem] border border-slate-200 
shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] 
hover:shadow-[0_40px_80px_-25px_rgba(79,70,229,0.25)] 
transition-all duration-500 overflow-hidden h-full flex flex-col">

  {/* TOP STATUS BAR */}
  <div className="flex justify-end p-4">
    <div
      className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest
      border shadow-sm
      ${
        totalVacant > 0
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      {totalVacant} Vacant
    </div>
  </div>

  {/* CONTENT */}
  <div className="px-6 pb-6 flex flex-col flex-1">
    {/* TITLE */}
    <div className="mb-5">
      <h3 className="text-lg font-black text-slate-900 truncate mb-1">
        {property.name}
      </h3>

      <p className="text-xs text-slate-600 font-bold flex items-center gap-1.5 uppercase tracking-wider">
        <MapPin size={14} className="text-indigo-600" />
        {property.city}
        <span className="text-slate-300">|</span>
        {property.landmark || "Prime Area"}
      </p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
          Beds Occupied
        </p>
        <p className="text-sm font-black text-slate-900">
          {occupiedBeds}
          <span className="text-slate-400 font-semibold">/{totalpgbed}</span>
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
          Rooms Rented
        </p>
        <p className="text-sm font-black text-slate-900">
          {occupiedRental}
          <span className="text-slate-400 font-semibold">
            /{property.totalrentalRoom}
          </span>
        </p>
      </div>
    </div>

    {/* OCCUPANCY */}
    <div className="bg-indigo-100 rounded-2xl p-4 border border-indigo-200 mb-2">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">
            Occupancy
          </p>
          <p className="text-lg font-black text-indigo-900">
            {totalOccupied + occupiedRental}
            <span className="text-indigo-500 text-sm font-bold">
              /{totalRooms}
            </span>
          </p>
        </div>

        <p className="text-xs font-black text-indigo-700 bg-white px-2 py-1 rounded-lg border border-indigo-300 shadow-sm">
          {Math.round(totalOccupancyRate)}%
        </p>
      </div>

      <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${totalOccupancyRate}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-indigo-700 rounded-full shadow-[0_0_12px_rgba(67,56,202,0.6)]"
        />
      </div>
    </div>

    {/* ACTIONS */}
    <div className="mt-auto pt-6 flex items-center justify-between">
      <div className="flex -space-x-2">
        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
          +4
        </div>
      </div>

      <div className="flex gap-2">
        <button className="p-2.5 rounded-xl bg-white border border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all active:scale-90">
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(totalOccupied, property._id)}
          disabled={deletingPropertyId === property._id}
          className="p-2.5 rounded-xl bg-white border border-slate-300 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all active:scale-90 disabled:opacity-50"
        >
          {deletingPropertyId === property._id ? (
            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </div>
  </div>
</div>

    </motion.div>
  )
);


export default function Properties() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { data: allbranchowner, refetch: refetchAllBranchOwner, isLoading: loadingAllBranchOwner } =
    useGetAllBranchByOwnerQuery(undefined, { skip: user?.role !== "owner" });

  const { data: branchmanagerdata, refetch: refetchBranchManagerData, isLoading: loadingBranchManagerData } =
    useGetAllBranchbybranchIdQuery();

  const [addbranch, { isLoading: addingBranch }] = useAddbranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

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

  const branchFetched = useMemo(() => {
    if (allbranchowner?.allbranch?.length > 0) return allbranchowner.allbranch;
    return [];
  }, [ allbranchowner?.allbranch, branchmanagerdata?.allbranch]);

const processedProperties = useMemo(() => 
  branchFetched.map((property) => {
    const { occupiedBeds, occupiedRental, totalRooms, totalOccupied } = 
      property.rooms?.reduce((acc, room) => {
        acc.occupiedBeds += room.occupied || 0;
        acc.occupiedRental += room.occupiedRentalRoom || 0;
        acc.totalRooms += room.capacity || 0;
        acc.totalOccupied += room.occupied || 0;
        return acc;
      }, { occupiedBeds: 0, occupiedRental: 0, totalRooms: 0, totalOccupied: 0 }) || 
      { occupiedBeds: 0, occupiedRental: 0, totalRooms: 0, totalOccupied: 0 };

    const totalVacant = totalRooms - totalOccupied;
    const totalOccupancyRate = totalRooms ? Math.round((totalOccupied / totalRooms) * 100) : 0;
    const totalpgbed = totalRooms - (property.totalrentalRoom || 0) - (property.totelhotelroom || 0);

    return { ...property, occupiedBeds, occupiedRental, totalpgbed, totalRooms, totalOccupied, totalVacant, totalOccupancyRate };
  }),
  [branchFetched]
);


  const handleDeleteProperty = useCallback(async (occupiedLength, id) => {
    if (occupiedLength !== 0) return toast.warn("Can't delete property: rooms are occupied.");
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      setDeletingPropertyId(id);
      await deleteBranch(id).unwrap();
      toast.success("Property deleted.");
      refetchAllBranchOwner?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete property.");
    } finally {
      setDeletingPropertyId(null);
    }
  }, [deleteBranch, refetchAllBranchOwner]);

  const handleSaveProperty = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return toast.warn("Please provide at least name and address.");
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "previewImages") {
        if (key === "images") formData.images.forEach((f) => payload.append("images", f));
        else payload.append(key, formData[key]);
      }
    });
    try {
      await addbranch(payload).unwrap();
      toast.success("Property added successfully.");
      setShowAddModal(false);
      setFormData({ name: "", address: "", city: "", state: "", pincode: "", streetAdress: "", landmark: "", images: [], previewImages: [] });
      user?.role === "owner" ? refetchAllBranchOwner?.() : (refetchAllBranch?.(), refetchBranchManagerData?.());
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add property.");
    }
  }, [formData, addbranch, user?.role, refetchAllBranchOwner, refetchBranchManagerData]);

  const handlePropertyChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    return () => formData.previewImages.forEach(url => URL.revokeObjectURL(url));
  }, [formData.previewImages]);

  const showAddRoom = !!branchmanagerdata?.allbranch?.length;
  const isLoading =   loadingAllBranchOwner || loadingBranchManagerData;

  return (
    <div className="space-y-5 min-h-screen">
      {/* Basic SEO - Add to public/index.html for full effect */}
      {/* <title>Property Hub Dashboard</title> in index.html */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden">
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
        <div className="flex items-center gap-3 relative z-10 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            disabled={addingBranch}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add Property</span>
          </button>
          {showAddRoom && (
            <button
              onClick={() => navigate("/admin/addroom")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-slate-900 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] hover:bg-indigo-600 hover:shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <Plus size={18} strokeWidth={3} />
              <span>Add Room</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div key={`skeleton-${i}`} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
          ))
        ) : processedProperties.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12 md:col-span-3">
            No properties found. <button onClick={() => setShowAddModal(true)} className="text-orange-500 font-bold hover:underline">Add your first property →</button>
          </div>
        ) : (
          processedProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDeleteProperty}
              deletingPropertyId={deletingPropertyId}
              {...property}
            />
          ))
        )}
      </div>

      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
}
