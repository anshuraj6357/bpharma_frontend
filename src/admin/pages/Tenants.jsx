



import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  useAddTenantMutation,
  useChangeStatusMutation,
  useGetStatusQuery,
} from "../../Bothfeatures/features2/api/tenant";

import { useGetAllBranchbybranchIdQuery } from
  "../../Bothfeatures/features2/api/propertyapi";

import { TenantCardSkeleton } from "./skeleton/tenantdetailsskeleton";

export default function Tenants() {


  
  const [adding, setAdding] = useState(false);
  const [formdata, setformdata] = useState({
    contactNumber: "",
    name: "",
    Rent: "",
    dues: "",
    email:"",
    advanced: "",
    idProof: "",
    idProofType: "",
    emergencyContactNumber: "",
    documentsPhoto: "",
    roomNumber: "",
    branch: ""
  })


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save button
  const handleSaveTenant = async (e) => {
    e.preventDefault();
    try {
      console.log("🏠 Property Data:", formdata);

      await addTenant(formdata).unwrap();

      toast.success("Tenant added successfully! 🎉");

      setAdding(false);
      setformdata({
        contactNumber: "",
        name: "",
        Rent: "",
        email:"",
        dues: "",
        advanced: "",
        idProof: "",
        idProofType: "",
        emergencyContactNumber: "",
        documentsPhoto: "",
        roomNumber: "",
        branch: ""
      });

    } catch (error) {
      toast.error(error?.data?.message || "Failed to add tenant ❌");
    }
  };


  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { data: alldata } = useGetAllBranchbybranchIdQuery();
  const [addTenant, { isLoading: addloading }] = useAddTenantMutation();

  const [tenant, setTenant] = useState([]);
  // const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");


    const handleAddTenant = () => {
    setAdding(true)
  };


  const {
    data: statusdata,
    isLoading: statusQueryloading,
  } = useGetStatusQuery(filter);

  const [
    changeStatus,
    { isLoading: statusloading },
  ] = useChangeStatusMutation();

  useEffect(() => {
    if (statusdata?.tenants) {
      setTenant(statusdata.tenants);
    }
  }, [statusdata]);

  const handleCheckoutTenant = async (id) => {
    try {
      await changeStatus(id).unwrap();
      toast.success("Tenant removed successfully ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Status change failed ❌");
    }
  };

  const DetailofTenant = (id) => {
    navigate(`/tenaantdetail/${id}`);
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl shadow border">
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f]">
      Tenant Management
    </h1>
    <p className="text-gray-500 text-sm">
      Manage tenant profiles & status
    </p>
  </div>

  <button
    onClick={() => setAdding(true)}
    className="flex items-center justify-center gap-2 bg-[#ff6b35] text-white px-5 py-3 rounded-xl w-full sm:w-auto"
  >
    <Plus size={20} /> Add Tenant
  </button>
</div>


      {/* FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow border flex flex-col sm:flex-row gap-4">
  <div className="flex-1 relative">
    <Search className="absolute left-3 top-3 text-gray-400" />
    <input
      placeholder="Search tenant..."
      className="w-full pl-10 py-3 border rounded-xl text-sm"
    />
  </div>

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="px-4 py-3 border rounded-xl w-full sm:w-40"
  >
    <option value="all">All</option>
    <option value="Active">Active</option>
    <option value="In-Active">Inactive</option>
  </select>
</div>





 {/* Adding Tenant Modal */}
{adding && (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-[#1e3a5f] to-[#274c77] text-white">
        <h2 className="text-2xl font-bold">Add New Tenant</h2>
        <p className="text-sm text-white/80 mt-1">
          Enter tenant information carefully
        </p>
      </div>
      {/* BRANCH INFO */}
<div className="bg-gray-50 rounded-2xl p-5">
  <h3 className="font-semibold text-[#1e3a5f] mb-4">
    🏢 Branch Information
  </h3>

  <select
    name="branch"
    value={formdata.branch}
    onChange={handleChange}
    required
    className="input-ui"
  >
    <option value="">Select Branch *</option>
    {alldata?.allbranch?.map((branch) => (
      <option key={branch._id} value={branch._id}>
        {branch.address}
      </option>
    ))}
  </select>

  {!formdata.branch && (
    <p className="text-xs text-red-500 mt-1">
      Branch selection is required
    </p>
  )}
</div>


      {/* BODY */}
     {/* BASIC INFO */}
<div className="bg-gray-50 rounded-2xl p-5">
  <h3 className="font-semibold text-[#1e3a5f] mb-4">
    👤 Basic Information
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      className="input-ui"
      placeholder="Tenant Full Name"
      name="name"
      value={formdata.name}
      onChange={handleChange}
    />
     <input
  className="input-ui"
  placeholder="Email"
  name="email"         
  value={formdata.email}
  onChange={handleChange}
/>


    <input
      className="input-ui"
      placeholder="Contact Number"
      name="contactNumber"
      value={formdata.contactNumber}
      onChange={handleChange}
    />

    <input
      className="input-ui"
      placeholder="Emergency Contact"
      name="emergencyContactNumber"
      value={formdata.emergencyContactNumber}
      onChange={handleChange}
    />

    <input
      className="input-ui"
      placeholder="Room Number"
      name="roomNumber"
      value={formdata.roomNumber}
      onChange={handleChange}
    />
  </div>
</div>

{/* RENT INFO */}
<div className="bg-gray-50 rounded-2xl p-5">
  <h3 className="font-semibold text-[#1e3a5f] mb-4">
    💰 Rent Details
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <input
      className="input-ui"
      placeholder="Monthly Rent (₹)"
      name="Rent"
      value={formdata.Rent}
      onChange={handleChange}
    />

    <input
      className="input-ui"
      placeholder="Advance Amount (₹)"
      name="advanced"
      value={formdata.advanced}
      onChange={handleChange}
    />
   

    <input
      className="input-ui"
      placeholder="Pending Dues (₹)"
      name="dues"
      value={formdata.dues}
      onChange={handleChange}
    />
  </div>
</div>

{/* ID INFO */}
<div className="bg-gray-50 rounded-2xl p-5">
  <h3 className="font-semibold text-[#1e3a5f] mb-4">
    🪪 Identity Details
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <select
      className="input-ui"
      name="idProofType"
      value={formdata.idProofType}
      onChange={handleChange}
    >
      <option value="">Select ID Proof Type</option>
      <option value="Aadhar-Card">Aadhaar Card</option>
      <option value="Voter-Id-Card">Voter ID</option>
     
    </select>

    <input
      className="input-ui"
      placeholder="ID Proof Number"
      name="idProof"
      value={formdata.idProof}
      onChange={handleChange}
    />
  </div>
</div>


      

      {/* FOOTER */}
      <div className="px-6 py-4 border-t bg-white flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setAdding(false)}
          className="flex-1 py-3 rounded-xl border font-medium
                     hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveTenant}
          className="flex-1 py-3 rounded-xl bg-[#ff6b35] text-white font-semibold
                     hover:bg-[#e85c2a] transition shadow-lg"
        >
          Save Tenant
        </button>
      </div>
    </div>
  </div>
)}


     {/* TENANT GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-6">

  {statusQueryloading
    ? Array.from({ length: 6 }).map((_, i) => (
        <TenantCardSkeleton key={i} />
      ))
    : tenant.map((t) => (
        <div
          key={t._id}
          className="bg-white rounded-2xl p-6 border shadow-sm
                     hover:shadow-xl hover:-translate-y-1
                     transition-all duration-300 flex flex-col"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="text-lg font-bold text-[#1e3a5f] leading-tight">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Room No: <span className="font-semibold">{t.roomNumber}</span>
              </p>
            </div>

            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap
              ${
                t.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {t.status}
            </span>
          </div>

          {/* DETAILS */}
          <div className="space-y-2 text-sm text-gray-700 flex-1">
            <p className="flex items-center gap-2">
              📞 <span className="font-medium">Mobile:</span>
              <span>{t.contactNumber || "N/A"}</span>
            </p>

            <p className="flex items-center gap-2">
              💰 <span className="font-medium">Dues:</span>
              <span>₹{t.dues || "0"}</span>
            </p>

            <p className="flex items-center gap-2">
              🏠 <span className="font-medium">Rent:</span>
              <span>₹{t.rent || "0"}</span>
            </p>

            <p className="flex items-center gap-2">
              📅 <span className="font-medium">Joined:</span>
              <span>
                {t.checkInDate
                  ? new Date(t.checkInDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              🚪 <span className="font-medium">Leave:</span>
              <span>
                {t.checkedoutdate
                  ? new Date(t.checkedoutdate).toLocaleDateString()
                  : "—"}
              </span>
            </p>
          </div>

          {/* ACTION */}
          {t.status === "Active" && (
            <button
              onClick={() => handleCheckoutTenant(t._id)}
              disabled={statusloading}
              className="mt-6 w-full rounded-xl py-2.5 font-medium
                         bg-red-500 text-white
                         hover:bg-red-600 active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition"
            >
              {statusloading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                "Check-Out Tenant"
              )}
            </button>
          )}
        </div>
      ))}
</div>

    </div>
  );
}
