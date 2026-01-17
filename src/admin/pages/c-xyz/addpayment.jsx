import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  X, 
  IndianRupee, 
  Building2, 
  User, 
  Loader2, 
  ArrowRightCircle,
  CreditCard
} from "lucide-react";

import { useCreatePaymentMutation } from "../../../Bothfeatures/features2/api/paymentapi.js";
import { useGetAllBranchbybranchIdQuery } from "../../../Bothfeatures/features2/api/propertyapi";
import { useGetallactivetenantQuery } from "../../../Bothfeatures/features2/api/tenant";

export default function AddPayment({ onClose }) {
  const navigate = useNavigate();
  
  // Queries
  const { data: branchData } = useGetAllBranchbybranchIdQuery();
  const [selectedBranch, setSelectedBranch] = useState("");
  
  const { data: tenantData, isLoading: tenantLoading } = useGetallactivetenantQuery(
    selectedBranch,
    { skip: !selectedBranch }
  );

  const [createPayment, { isLoading: paymentLoading }] = useCreatePaymentMutation();

  // Local State
  const [formData, setFormData] = useState({
    tenantId: "",
    branch: "",
    amountpaid: "",
  });

  // Derived Data
  const branches = useMemo(() => branchData?.allbranch || [], [branchData]);
  const tenants = useMemo(() => tenantData?.findAllTenant || [], [tenantData]);
  const selectedTenantName = tenants.find(t => t._id === formData.tenantId)?.name;

  // Handlers
  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setFormData(prev => ({ ...prev, branch: branchId, tenantId: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.branch || !formData.tenantId || !formData.amountpaid) {
      return toast.error("All fields are required");
    }

    try {
      await createPayment(formData).unwrap();
      toast.success("Payment recorded successfully!");
      onClose ? onClose() : navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to process payment");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4 z-50 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="bg-[#1e3a5f] p-6 text-white relative">
          <button 
            onClick={onClose || (() => navigate(-1))}
            className="absolute right-6 top-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-2xl border border-white/10">
              <CreditCard className="text-blue-300" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Record Payment</h2>
              <p className="text-blue-200/70 text-sm">Add manual collection to tenant ledger</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Branch Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Building2 size={16} className="text-slate-400" /> Select Branch
            </label>
            <select
              onChange={handleBranchChange}
              value={formData.branch}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Select which branch collected payment</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name || branch.address}
                </option>
              ))}
            </select>
          </div>

          {/* Tenant Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <User size={16} className="text-slate-400" /> Select Tenant
            </label>
            <div className="relative">
              <select
                onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                value={formData.tenantId}
                disabled={!selectedBranch || tenantLoading}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                required
              >
                <option value="">
                  {tenantLoading ? "Loading tenants..." : "Search for tenant name"}
                </option>
                {tenants.map((tenant) => (
                  <option value={tenant._id} key={tenant._id}>
                    {tenant.name} ({tenant.roomNumber || 'No Room'})
                  </option>
                ))}
              </select>
              {tenantLoading && <Loader2 className="absolute right-4 top-3.5 animate-spin text-blue-500" size={18} />}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <IndianRupee size={16} className="text-slate-400" /> Amount Collected
            </label>
            <div className="relative">
              <input
                type="number"
                name="amountpaid"
                value={formData.amountpaid}
                onChange={(e) => setFormData({ ...formData, amountpaid: e.target.value })}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-lg"
                required
              />
              <span className="absolute left-4 top-3.5 font-bold text-slate-400">₹</span>
            </div>
          </div>

          {/* Summary Box (Contextual UI) */}
          {formData.amountpaid > 0 && formData.tenantId && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedTenantName?.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Payment Summary</p>
                  <p className="text-sm text-emerald-800">Recording <b>₹{formData.amountpaid}</b> for <b>{selectedTenantName}</b></p>
                </div>
              </div>
              <ArrowRightCircle className="text-emerald-400" />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose || (() => navigate(-1))}
              className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={paymentLoading}
              className="flex-[2] py-3.5 rounded-2xl bg-[#1e3a5f] text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-[#2a4d7a] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {paymentLoading ? <Loader2 className="animate-spin" size={20} /> : "Confirm & Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}