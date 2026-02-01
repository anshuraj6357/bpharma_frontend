import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Loader2,Home ,ShieldCheck
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
      <div
        className="
          bg-gradient-to-br from-white/90 via-white to-orange-50/80
          rounded-3xl border border-orange-100/40 shadow-xl
          backdrop-blur-sm transition-all duration-500 overflow-hidden h-full flex flex-col
          active:scale-[0.99]
        "
      >
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-start p-5 pt-6">
          <div className="inline-flex items-center gap-2 bg-orange-50/80 px-4 py-2 rounded-2xl border border-orange-200/50 backdrop-blur-sm shadow-sm">
            <MapPin size={14} className="text-orange-600" />
            <span className="text-xs font-black uppercase tracking-widest text-orange-700">
              {property.city}
            </span>
          </div>

          <div
            className={`
              px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm
              ${totalVacant > 0
                ? "bg-orange-100 text-orange-800 border border-orange-300/60"
                : "bg-slate-100 text-red-800 border border-red-300/60"
              }
            `}
          >
            {totalVacant} Vacant
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 pl-8 pb-8 flex flex-col flex-1">
          {/* TITLE */}
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-2 line-clamp-2">
              {property.name}
            </h3>

            <div className="flex items-center gap-2 text-sm font-bold text-orange-800 bg-orange-50/60 px-4 py-2 rounded-xl border border-orange-200/50 backdrop-blur-sm shadow-sm">
              <MapPin size={16} className="text-orange-600" />
              <span className="truncate">{property.landmark || "Prime Location"}</span>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/70 p-5 rounded-2xl border border-orange-100/50 shadow-sm backdrop-blur-sm transition-all">
              <p className="text-xs font-black uppercase tracking-wider text-orange-700 mb-2">
                Beds Status
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{occupiedBeds}</span>
                <span className="text-lg font-bold text-slate-500">/{totalpgbed}</span>
              </div>
            </div>

            <div className="bg-white/70 p-5 rounded-2xl border border-orange-100/50 shadow-sm backdrop-blur-sm transition-all">
              <p className="text-xs font-black uppercase tracking-wider text-orange-700 mb-2">
                Rooms Rented
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{occupiedRental}</span>
                <span className="text-lg font-bold text-slate-500">/{property.totalrentalRoom}</span>
              </div>
            </div>
          </div>

          {/* OCCUPANCY BAR */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 pl-8 border border-orange-200/50 shadow-sm mb-8 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-orange-700 mb-1">
                  Occupancy Rate
                </p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">
                  {totalOccupied + occupiedRental}
                </p>
                <p className="text-lg font-bold text-slate-500">
                  of {totalRooms} total
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-xl border border-orange-200 shadow-md text-sm font-black text-orange-700">
                {Math.round(totalOccupancyRate)}%
              </div>
            </div>

            <div className="w-full h-3 bg-orange-100/60 rounded-2xl overflow-hidden border border-orange-200/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalOccupancyRate}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl" />
              </motion.div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="mt-auto pt-6 flex items-center justify-between gap-3">
            {/* Occupancy Avatar Stack */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg border-4 border-white ring-2 ring-orange-100/50">
                +{Math.max(0, occupiedBeds - 4)}
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 text-white rounded-2xl flex items-center justify-center text-xs font-bold shadow-lg border-4 border-white ring-2 ring-slate-100/50">
                +2
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="p-3 rounded-2xl bg-orange-50 border border-orange-200 text-orange-700 transition-all flex items-center justify-center">
                <Edit size={16} />
              </button>

              <button
                onClick={() => onDelete(totalOccupied, property._id)}
                disabled={deletingPropertyId === property._id}
                className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
<div className="space-y-5 min-h-screen mt-8">



    {/* =====================
        ACTION BUTTONS
        ===================== */}
  {/* =====================
    ACTION BUTTONS
    ===================== */}
{/* =====================
    ACTION BUTTONS
    ===================== */}
<div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap mb-6">

  {/* Add Property */}
  <button
    onClick={() => setShowAddModal(true)}
    disabled={addingBranch}
    className="flex-1 sm:flex-none flex items-center justify-center gap-3 
               px-8 py-5 lg:px-10 lg:py-6 rounded-3xl 
               text-sm lg:text-base font-black uppercase tracking-[0.1em] text-white
               bg-gradient-to-r from-orange-600 via-orange-700 to-amber-700
               shadow-2xl shadow-orange-300/40
               border border-orange-500/30 backdrop-blur-sm
               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg
               relative overflow-hidden"
  >
    <Plus size={20} strokeWidth={3} />
    <span>Add Property</span>
  </button>

  {/* Add Room */}
  {showAddRoom && (
    <button
      onClick={() => navigate("/admin/addroom")}
      className="flex-1 sm:flex-none flex items-center justify-center gap-3 
                 px-8 py-5 lg:px-10 lg:py-6 rounded-3xl 
                 text-sm lg:text-base font-black uppercase tracking-[0.1em] text-gray-900
                 bg-gradient-to-r from-white/70 via-white to-amber-50/80
                 border-2 border-orange-200/60
                 shadow-xl shadow-orange-100/40
                 backdrop-blur-xl transition-all duration-300 relative overflow-hidden"
    >
      <Home size={20} strokeWidth={2.5} className="text-orange-600" />
      <span>Add Room</span>
    </button>
  )}
</div>



  {/* =====================
      PROPERTIES GRID
      ===================== */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
    {isLoading ? (
      // Loading Skeletons
      Array.from({ length: 3 }, (_, i) => (
        <div key={`skeleton-${i}`} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
      ))
    ) : processedProperties.length === 0 ? (
      // Empty State
      <div className="col-span-full text-center text-gray-500 py-12 md:col-span-3">
        No properties found.{" "}
        <button onClick={() => setShowAddModal(true)} className="text-orange-500 font-bold hover:underline">
          Add your first property →
        </button>
      </div>
    ) : (
      // Properties
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

  {/* =====================
      MODAL
      ===================== */}
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
