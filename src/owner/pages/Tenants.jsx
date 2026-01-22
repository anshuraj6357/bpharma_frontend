



import { useState, useEffect } from "react";
import { Plus,MoreHorizontal ,Users,Home,Phone ,LogOut  ,Filter,Search,ChevronDown, Loader2 ,X,MapPin,User, Banknote ,ShieldCheck,Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { motion } from 'framer-motion';
import {
  useAddTenantMutation,
  useChangeStatusMutation,
  useGetStatusQuery,
} from "../../backend-routes/ownerroutes/tenant";

import { useGetAllBranchbybranchIdQuery } from
  "../../backend-routes/ownerroutes/branch";

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

    <div className="space-y-6">
  {/* --- HEADER SECTION --- */}
 <header className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 
bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 
p-8 md:p-10 rounded-[2.5rem] 
shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] 
overflow-hidden text-white"
>
  {/* Ambient Gradient Blobs */}
  <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-500/20 blur-[120px] rounded-full" />
  <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 blur-[120px] rounded-full" />

  {/* Left Content */}
  <div className="relative z-10">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3.5 rounded-2xl shadow-lg shadow-orange-500/30">
        <Users size={26} className="text-white" />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Tenants<span className="text-orange-500">.</span>
      </h1>
    </div>

    <p className="text-slate-400 font-semibold uppercase tracking-[0.25em] text-[11px] ml-1">
      Occupancy & Resident Intelligence
    </p>
  </div>

  {/* CTA Button */}
  <button
    onClick={() => setAdding(true)}
    aria-label="Add new resident"
    className="relative z-10 flex items-center justify-center gap-3 
    bg-gradient-to-r from-orange-500 to-orange-600 
    hover:from-orange-600 hover:to-orange-500
    text-white px-8 py-4 rounded-2xl 
    text-xs font-black uppercase tracking-widest 
    transition-all shadow-xl shadow-orange-500/30 
    active:scale-95 group"
  >
    <Plus
      size={20}
      strokeWidth={3}
      className="group-hover:rotate-90 transition-transform duration-300"
    />
    Add New Resident
  </button>
</header>


  {/* --- FILTER & SEARCH BAR --- */}
  <section
  role="search"
  aria-label="Tenant search and filters"
  className="bg-gradient-to-br from-white via-slate-50 to-white 
  p-4 md:p-5 rounded-[2rem] border border-slate-200/60 
  shadow-[0_20px_60px_-25px_rgba(0,0,0,0.08)] 
  flex flex-col md:flex-row gap-3 items-stretch"
>
  {/* Search Input */}
  <div className="flex-1 relative group">
    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
      <Search
        size={18}
        className="text-slate-400 group-focus-within:text-orange-500 transition-colors"
      />
    </div>

    <input
      type="text"
      placeholder="Search by name, room, or phone..."
      aria-label="Search tenants"
      className="w-full pl-14 pr-6 py-4 
      bg-slate-50 border-2 border-transparent 
      focus:border-orange-500/30 focus:bg-white 
      rounded-[1.5rem] outline-none transition-all 
      font-semibold text-sm text-slate-700 
      placeholder:text-slate-400
      shadow-inner focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
    />
  </div>

  {/* Filter Dropdown */}
  <div className="relative min-w-[170px]">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
      <Filter size={16} className="text-slate-400" />
    </div>

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      aria-label="Filter tenants"
      className="w-full pl-12 pr-10 py-4 
      bg-slate-50 border-2 border-transparent 
      focus:border-slate-300 
      rounded-[1.5rem] outline-none appearance-none cursor-pointer 
      font-bold uppercase text-[10px] tracking-widest 
      text-slate-500 transition-all 
      hover:bg-slate-100 focus:bg-white"
    >
      <option value="all">All Records</option>
      <option value="Active">🟢 Active</option>
      <option value="In-Active">🔴 Inactive</option>
    </select>

    {/* Custom Arrow */}
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-300">
      <ChevronDown size={16} />
    </div>
  </div>
</section>

</div>




 {/* Adding Tenant Modal */}
{adding && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    {/* Backdrop with Blur */}
    <div 
      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      onClick={() => setAdding(false)}
    />

    {/* Modal Card */}
    <div className="relative bg-[#f8fafc] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      
      {/* HEADER: Gradient & Icons */}
      <div className="px-8 py-6 bg-gradient-to-r from-[#1e3a5f] to-[#274c77] text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Add New Tenant</h2>
          <p className="text-blue-100/80 text-xs font-bold uppercase tracking-widest mt-1">
            Tenant Digital Onboarding
          </p>
        </div>
        <button 
          onClick={() => setAdding(false)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* BODY: Scrollable with Grid Layout */}
      <div className="overflow-y-auto p-8 space-y-8 custom-scrollbar">
        
        {/* 1. BRANCH INFO */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><MapPin size={18} /></div>
            <h3 className="font-black text-slate-700 uppercase text-[11px] tracking-widest">Branch Allocation</h3>
          </div>
          <select
            name="branch"
            value={formdata.branch}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-sm text-slate-600"
          >
            <option value="">Select Target Branch *</option>
            {alldata?.allbranch?.map((branch) => (
              <option key={branch._id} value={branch._id}>{branch.address}</option>
            ))}
          </select>
          {!formdata.branch && (
            <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase tracking-tighter italic">Selection Required</p>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 2. BASIC INFO */}
          <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><User size={18} /></div>
              <h3 className="font-black text-slate-700 uppercase text-[11px] tracking-widest">Personal Profile</h3>
            </div>
            <input className="input-new-ui" placeholder="Tenant Full Name" name="name" value={formdata.name} onChange={handleChange} />
            <input className="input-new-ui" placeholder="Email Address" name="email" value={formdata.email} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-3">
               <input className="input-new-ui" placeholder="Primary Contact" name="contactNumber" value={formdata.contactNumber} onChange={handleChange} />
               <input className="input-new-ui" placeholder="Emergency No." name="emergencyContactNumber" value={formdata.emergencyContactNumber} onChange={handleChange} />
            </div>
            <input className="input-new-ui border-blue-100 bg-blue-50/30" placeholder="Room Number (e.g. 102)" name="roomNumber" value={formdata.roomNumber} onChange={handleChange} />
          </section>

          {/* 3. RENT & ID INFO */}
          <div className="space-y-8">
            {/* Rent Details */}
            <section className="bg-emerald-50/30 p-6 rounded-[2rem] border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Banknote size={18} /></div>
                <h3 className="font-black text-slate-700 uppercase text-[11px] tracking-widest">Financial Setup</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="input-new-ui bg-white" placeholder="Monthly Rent (₹)" name="Rent" value={formdata.Rent} onChange={handleChange} />
                <input className="input-new-ui bg-white" placeholder="Advance (₹)" name="advanced" value={formdata.advanced} onChange={handleChange} />
              </div>
              <input className="input-new-ui bg-white" placeholder="Pending Dues (₹)" name="dues" value={formdata.dues} onChange={handleChange} />
            </section>

            {/* ID Info */}
            <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><ShieldCheck size={18} /></div>
                <h3 className="font-black text-slate-700 uppercase text-[11px] tracking-widest">KYC Verification</h3>
              </div>
              <select name="idProofType" value={formdata.idProofType} onChange={handleChange} className="input-new-ui">
                <option value="">Select ID Proof</option>
                <option value="Aadhar-Card">Aadhaar Card</option>
                <option value="Voter-Id-Card">Voter ID</option>
              </select>
              <input className="input-new-ui" placeholder="ID Number" name="idProof" value={formdata.idProof} onChange={handleChange} />
            </section>
          </div>
        </div>
      </div>

      {/* FOOTER: Sticky Actions */}
      <div className="px-8 py-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setAdding(false)}
          className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-50 transition-all"
        >
          Discard Entry
        </button>

        <button
          onClick={handleSaveTenant}
          className="flex-[2] py-4 rounded-2xl bg-orange-500 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save size={16} /> Save Tenant Profile
        </button>
      </div>
    </div>
  </div>
)}


     {/* TENANT GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 px-4 sm:px-8 py-10 max-w-7xl mx-auto">
  {statusQueryloading
    ? Array.from({ length: 6 }).map((_, i) => <TenantCardSkeleton key={i} />)
    : tenant.map((t) => (
        <motion.article
          key={t._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="group relative flex flex-col justify-between rounded-[2rem] border border-slate-200/60 
          bg-gradient-to-br from-white via-white to-slate-50 
          p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Gradient Orb */}
          <div
            className={`absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-20 transition-all duration-500
            ${t.status === "Active" ? "bg-emerald-400" : "bg-slate-400"}`}
          />

          {/* Header */}
          <header className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {t.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-500">
                <Home size={12} />
                <span>
                  Unit: <span className="text-slate-800">{t.roomNumber}</span>
                </span>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur
              ${
                t.status === "Active"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {t.status}
            </span>
          </header>

          {/* Content */}
          <section className="relative z-10 space-y-5">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">
                  {t.contactNumber || "N/A"}
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Current Dues
                </p>
                <p
                  className={`text-lg font-bold ${
                    t.dues > 0 ? "text-red-500" : "text-slate-700"
                  }`}
                >
                  ₹{t.dues || "0"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Fixed Rent
                </p>
                <p className="text-lg font-bold text-slate-700">
                  ₹{t.rent || "0"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-slate-200 flex justify-between text-xs">
              <div>
                <p className="uppercase text-slate-400 font-semibold">
                  Check-In
                </p>
                <p className="font-bold text-slate-700">
                  {t.checkInDate
                    ? new Date(t.checkInDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="text-right">
                <p className="uppercase text-slate-400 font-semibold">
                  Checkout
                </p>
                <p className="font-bold text-slate-700">
                  {t.checkedoutdate
                    ? new Date(t.checkedoutdate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <footer className="relative z-10 flex gap-2 mt-6">
            {t.status === "Active" ? (
              <button
                onClick={() => handleCheckoutTenant(t._id)}
                disabled={statusloading}
                className="flex-1 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 
                text-white py-3 text-xs font-bold uppercase tracking-wider
                hover:from-red-600 hover:to-red-500 transition-all active:scale-95"
              >
                {statusloading ? (
                  <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                ) : (
                  "Process Checkout"
                )}
              </button>
            ) : (
              <div className="flex-1 py-3 text-center rounded-xl bg-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                Inactive
              </div>
            )}

            <button className="rounded-xl p-3 bg-slate-100 text-slate-500 hover:bg-slate-200 transition">
              <MoreHorizontal size={18} />
            </button>
          </footer>
        </motion.article>
      ))}
</div>



    </div>
  );
}
