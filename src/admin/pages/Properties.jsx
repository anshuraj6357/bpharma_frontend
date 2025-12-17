import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Plus,
  Edit,
  UserPlus,
  Trash2,
  Eye,
  MapPin,
  Users,
  BedDouble,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  useAddbranchMutation,
  useDeletePropertyMutation,
  useGetAllBranchQuery,
  useGetAllBranchByOwnerQuery,
  useAddbranchmanagerMutation,
  useGetAllBranchbybranchIdQuery,
} from "../../Bothfeatures/features2/api/propertyapi";

export default function Properties() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Branch queries
  const { data: allbranch, refetch: refetchAllBranch, isLoading: loadingAllBranch } =
    useGetAllBranchQuery(undefined, { skip: user?.role !== "branch-manager" });

  const { data: allbranchowner, refetch: refetchAllBranchOwner, isLoading: loadingAllBranchOwner } =
    useGetAllBranchByOwnerQuery(undefined, { skip: user?.role !== "owner" });

  const { data: branchmanagerdata, refetch: refetchBranchManagerData, isLoading: loadingBranchManagerData } =
    useGetAllBranchbybranchIdQuery(undefined, { skip: user?.role !== "branch-manager" });

  // Mutations
  const [addbranch, { isLoading: addingBranch }] = useAddbranchMutation();
  const [addbranchmanager, { isLoading: addingManager }] = useAddbranchmanagerMutation();
  const [deleteProperty] = useDeletePropertyMutation();

  // Local states
  const [branchfetched, setBranchFetched] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addManager, setAddManager] = useState(false);
  const [branchIdForManager, setBranchIdForManager] = useState(null);
  const [managerData, setManagerData] = useState({ name: "", email: "", phone: "" });
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

  // Handlers
  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleAppointManager = (id) => {
    setBranchIdForManager(id);
    setAddManager(true);
    setManagerData({ name: "", email: "", phone: "" });
  };

  const handleSaveManager = async (e) => {
    e.preventDefault();
    if (!managerData.name || !managerData.email || !managerData.phone) {
      toast.warn("Please fill all manager fields.");
      return;
    }
    try {
      const res = await addbranchmanager({ managerData, branchid: branchIdForManager }).unwrap();
      toast.success(res?.message || "Manager appointed successfully.");
      setAddManager(false);
      user?.role === "owner" ? refetchAllBranchOwner?.() : (refetchAllBranch?.(), refetchBranchManagerData?.());
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to appoint manager.");
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
      refetchAllBranch?.();
      refetchAllBranchOwner?.();
      refetchBranchManagerData?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete property.");
    } finally {
      setDeletingPropertyId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Redirect if password not changed */}
      {branchmanagerdata?.branch?.pwdchanged === false && <Navigate to="/admin/change-password" replace />}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl font-bold tracking-tight">Property Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your PG properties with ease & clarity</p>
        </div>
        <div className="flex gap-4">
          {user?.role === "owner" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
                        bg-gradient-to-r from-[#ff6b35] to-[#ff8c4a] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Plus size={18} /> Add Property
            </button>
          )}
          {user?.role === "branch-manager" && (
            <button
              onClick={() => navigate('/admin/addroom')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
                        bg-gradient-to-r from-[#1e3a5f] to-[#274a75] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Plus size={18} /> Add Room
            </button>
          )}
        </div>
      </div>

      {/* PROPERTIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Loading Skeleton */}
        {(loadingAllBranch || loadingAllBranchOwner || loadingBranchManagerData) && (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-96 rounded-3xl shadow-lg"></div>
          ))
        )}

        {/* Branch Cards */}
        {branchfetched?.length > 0 ? branchfetched.map((property) => {
          const occupiedBeds = property?.occupiedRoom?.length || 0;
          const occupiedRental = property?.occupiedRentalRoom || 0;
          const occupiedHotel = property?.occupiedhotelroom || 0;

          const bedsVacant = property.totalBeds - occupiedBeds;
          const rentalVacant = property.totalrentalRoom - occupiedRental;
          const hotelVacant = property.totelhotelroom - occupiedHotel;

          const bedsOccupancyRate = getOccupancyRate(occupiedBeds, property.totalBeds);
          const rentalOccupancyRate = getOccupancyRate(occupiedRental, property.totalrentalRoom);
          const hotelOccupancyRate = getOccupancyRate(occupiedHotel, property.totelhotelroom);

          // Total occupancy
          const totalRooms = property.totalBeds + property.totalrentalRoom + property.totelhotelroom;
          const totalOccupied = occupiedBeds + occupiedRental + occupiedHotel;
          const totalVacant = totalRooms - totalOccupied;
          const totalOccupancyRate = getOccupancyRate(totalOccupied, totalRooms);

          return (
            <div key={property._id} className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">

              {/* IMAGE SECTION */}
              <div className="relative h-60 overflow-hidden rounded-t-3xl">
                <img
                  src={property?.Propertyphoto?.[0] || '/fallback-image.png'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Manager Badge / Appoint */}
                <div className="absolute top-4 left-4">
                  {!property.branchmanager ? (
                    <button
                      onClick={() => handleAppointManager(property._id)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm hover:scale-105 transition"
                    >
                      <UserPlus size={16} />
                      Appoint Manager
                    </button>
                  ) : (
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm">
                      <UserPlus size={16} />
                      {property.branchmanager.name}
                    </div>
                  )}
                </div>


                {/* Vacant Badge */}
                <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium shadow-md ${getStatusColor(totalVacant)}`}>
                  {totalVacant} Vacant
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className="p-6 flex flex-col flex-1 justify-between">

                {/* PROPERTY INFO */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-[#1e3a5f] truncate">{property.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm truncate">
                    <MapPin size={18} className="text-gray-500" />
                    <span className="truncate">{property.address}, {property.city}, {property.state} - {property.pincode}</span>
                  </div>
                  <p className="text-sm text-gray-400">Landmark: {property.landmark}</p>
                </div>

                {/* OCCUPANCY METRICS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {[
                    { name: 'Beds', icon: <BedDouble size={20} />, occupied: occupiedBeds, total: property.totalBeds, rate: bedsOccupancyRate },
                    { name: 'Rental Rooms', icon: <Users size={20} />, occupied: occupiedRental, total: property.totalrentalRoom, rate: rentalOccupancyRate },
                    { name: 'Hotel Rooms', icon: <Users size={20} />, occupied: occupiedHotel, total: property.totelhotelroom, rate: hotelOccupancyRate },
                    { name: 'Total Occupancy', icon: <Users size={20} />, occupied: totalOccupied, total: totalRooms, rate: totalOccupancyRate },
                  ].map((room, idx) => (
                    <div key={idx} className="text-center p-4 bg-gray-50 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                      <div className="text-gray-600 mb-1">{room.icon}</div>
                      <p className="text-sm text-gray-600">{room.name}</p>
                      <p className="text-lg font-semibold text-[#1e3a5f]">{room.occupied} / {room.total}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-2 rounded-full bg-orange-500 transition-all duration-500" style={{ width: `${room.rate}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{room.rate}% Occupied</p>
                    </div>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-[#1e3a5f] text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-[#162f4b] transition-all">
                    <Eye size={18} /> View Layout
                  </button>

                  {user?.role !== "branch-manager" && (
                    <>
                      <button className="p-3 border rounded-2xl hover:bg-gray-100 transition flex items-center justify-center">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(occupiedBeds, property._id)}
                        className="p-3 border border-red-400 rounded-2xl hover:bg-red-50 transition flex items-center justify-center"
                      >
                        {deletingPropertyId === property._id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="text-red-500" size={18} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

          );
        }) : (
          <div className="text-gray-500 text-center col-span-3 p-8">
            <p className="text-lg font-medium">No branches found.</p>
            <p className="text-sm text-gray-400 mt-2">
              You can add a new property using the <span className="font-semibold">Add Property</span> button.
            </p>
          </div>
        )}
      </div>

      {/* Add Manager & Add Property Modals */}
      {addManager && <ManagerModal handleManagerChange={handleManagerChange} handleSaveManager={handleSaveManager} addingManager={addingManager} setAddManager={setAddManager} />}
      {showAddModal && <AddPropertyModal formData={formData} setFormData={setFormData} handlePropertyChange={handlePropertyChange} handleSaveProperty={handleSaveProperty} addingBranch={addingBranch} setShowAddModal={setShowAddModal} />}
    </div>
  );
}

// Manager Modal Component
const ManagerModal = ({ handleManagerChange, handleSaveManager, addingManager, setAddManager }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-200 animate-[fadeIn_0.25s_ease-out]">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Appoint Manager</h2>
        <p className="text-sm text-gray-500 mt-1">Fill out the details to appoint a new manager.</p>
      </div>
      <form onSubmit={handleSaveManager} className="p-6 space-y-5">
        <input type="text" name="name" placeholder="Name" onChange={handleManagerChange} className="w-full border p-3 rounded-xl" />
        <input type="email" name="email" placeholder="Email" onChange={handleManagerChange} className="w-full border p-3 rounded-xl" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleManagerChange} className="w-full border p-3 rounded-xl" />
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => setAddManager(false)} className="flex-1 border p-3 rounded-xl">Cancel</button>
          <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded-xl">
            {addingManager ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save Manager"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

// Add Property Modal Component
const AddPropertyModal = ({ formData, setFormData, handlePropertyChange, handleSaveProperty, addingBranch, setShowAddModal }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 animate-scaleIn max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl">
        <h2 className="text-2xl font-semibold text-white tracking-wide">Add New Property</h2>
      </div>
      <form onSubmit={handleSaveProperty} className="p-6 space-y-6">
        <input name="name" placeholder="PG Name" value={formData.name} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" placeholder="City" value={formData.city} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
          <input name="state" placeholder="State" value={formData.state} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        </div>
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        <input name="streetAdress" placeholder="Street Address" value={formData.streetAdress} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handlePropertyChange} className="w-full border p-3 rounded-xl" required />
        <input type="file" multiple accept="image/*" className="w-full border p-3 rounded-xl" onChange={(e) => {
          const files = Array.from(e.target.files);
          const previews = files.map(f => URL.createObjectURL(f));
          setFormData(prev => ({ ...prev, images: files, previewImages: previews }));
        }} />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {formData.previewImages.map((img, i) => <img key={i} src={img} className="w-full h-28 rounded-xl object-cover shadow-md" />)}
        </div>
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 border p-3 rounded-xl font-medium hover:bg-gray-100 transition">Cancel</button>
          <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md">
            {addingBranch ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
