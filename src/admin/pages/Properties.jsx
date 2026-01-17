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
  const [addManager, setAddManager] = useState(false);
  const [branchIdForManager, setBranchIdForManager] = useState(null);

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
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                  bg-white p-5 rounded-xl border shadow-sm">
    <div>
      <h1 className="text-[#1e3a5f] text-xl font-semibold">
        Property Management
      </h1>
      <p className="text-gray-500 text-sm">
        Manage your PG properties efficiently
      </p>
    </div>

    <div className="flex gap-2">
   
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                     text-white bg-orange-500 hover:bg-orange-600 transition shadow"
        >
          <Plus size={16} /> Add Property
        </button>
    

  {branchmanagerdata?.allbranch?.length > 0 && (
  <button
    onClick={() => navigate("/admin/addroom")}
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
               text-white bg-[#1e3a5f] hover:bg-[#162f4b] transition shadow"
  >
    <Plus size={16} /> Add Room
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
      <div key={property._id} className="relative">
        <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden h-full">
          {/* IMAGE */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={property?.Propertyphoto?.[0] || "/fallback-image.png"}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${getStatusColor(totalVacant)}`}
            >
              {totalVacant} Vacant
            </span>
          </div>

          {/* BODY */}
          <div className="p-4 flex flex-col h-[260px]">
            {/* Title */}
            <div className="mb-3">
              <h3 className="text-base font-semibold text-[#1e3a5f] truncate">{property.name}</h3>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                <MapPin size={12} />
                {property.address}, {property.city}
              </p>
            </div>

            {/* OCCUPANCY */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <StatBox label="Beds" value={`${occupiedBeds}/${totalpgbed}`} />
              <StatBox label="Rental" value={`${occupiedRental}/${property.totalrentalRoom}`} />
              {/* <StatBox label="Hotel" value={`${occupiedHotel}/${property.totelhotelroom}`} /> */}

              <div className="bg-orange-50 rounded-lg p-2 text-center border border-orange-300">
                <p className="text-[11px] text-orange-600 font-medium">Total</p>
                <p className="text-sm font-semibold text-orange-700">
                  {totalOccupied+occupiedRental}/{totalRooms
}
                </p>
                <div className="w-full h-1 bg-orange-200 rounded-full mt-1">
                  <div
                    className="h-1 bg-orange-500 rounded-full"
                    style={{ width: `${totalOccupancyRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-auto pt-3 border-t flex justify-end gap-2">
              <button
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                title="Edit Property"
              >
                <Edit size={14} className="text-gray-600" />
              </button>

              <button
                onClick={() => handleDeleteProperty(totalOccupied, property._id)}
                className="p-2 rounded-lg border border-red-400 hover:bg-red-50 transition"
                title="Delete Property"
              >
                {deletingPropertyId === property._id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                ) : (
                  <Trash2 size={14} className="text-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="col-span-3 text-center text-gray-500 py-12">
    No properties found
  </div>
)}
: (
  <div className="col-span-3 text-center text-gray-500 py-12">
    No properties found
  </div>
)

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

const AddPropertyModal = ({
  formData,
  setFormData,
  handleChange,
  handlePropertyChange,
  handleSaveProperty,
  addingBranch,
  close,
  setShowAddModal,
}) => {
  const onChange = handleChange || handlePropertyChange;
  const onClose = close || (() => setShowAddModal(false));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3">
      <form
        onSubmit={handleSaveProperty}
        className="bg-white rounded-2xl w-full max-w-xl shadow-xl
                   p-6 space-y-4 animate-fadeIn"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">
            Add New Property
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input name="name" label="PG Name" value={formData.name} onChange={onChange} />
          <Input name="city" label="City" value={formData.city} onChange={onChange} />
          <Input name="state" label="State" value={formData.state} onChange={onChange} />
          <Input name="pincode" label="Pincode" value={formData.pincode} onChange={onChange} />
        </div>

        <Input name="address" label="Address" value={formData.address} onChange={onChange} />
        <Input name="streetAdress" label="Street Address" value={formData.streetAdress} onChange={onChange} />
        <Input name="landmark" label="Landmark" value={formData.landmark} onChange={onChange} />

        {/* FILE INPUT */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Property Images
          </label>
          <input
            type="file"
            multiple
            className="w-full text-sm file:mr-3 file:px-4 file:py-2
                       file:rounded-lg file:border-0
                       file:bg-orange-500 file:text-white
                       hover:file:bg-orange-600 cursor-pointer"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setFormData((p) => ({
                ...p,
                images: files,
                previewImages: files.map((f) =>
                  URL.createObjectURL(f)
                ),
              }));
            }}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-300
                       text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-[#1e3a5f]
                       text-white font-medium hover:bg-[#162f4b]
                       transition flex justify-center"
          >
            {addingBranch ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 rounded-lg border
                 focus:ring-2 focus:ring-orange-400
                 focus:outline-none text-sm"
    />
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-2 text-center border">
    <p className="text-[11px] text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-[#1e3a5f]">
      {value}
    </p>
  </div>
);
