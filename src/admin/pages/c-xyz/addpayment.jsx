import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useCreatePaymentMutation,
} from "../../../Bothfeatures/features2/api/paymentapi.js";

import {
  useGetAllBranchbybranchIdQuery,
} from "../../../Bothfeatures/features2/api/propertyapi";

import {
  useGetallactivetenantQuery,
} from "../../../Bothfeatures/features2/api/tenant";

export default function AddPayment({ onClose }) {
  const navigate = useNavigate();

  const { data: branchData } = useGetAllBranchbybranchIdQuery();

  const [selectedBranch, setSelectedBranch] = useState(null);

  const { data: tenantData, isLoading: tenantLoading } = useGetallactivetenantQuery(
    selectedBranch,
    { skip: !selectedBranch }
  );

  const [createPayment, { isLoading: paymentLoading, isSuccess, isError }] =
    useCreatePaymentMutation();

  const [formData, setFormData] = useState({
    tenantId: "",
    branch: "",
    amountpaid: "",
  });

  const [branches, setBranches] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    if (branchData?.allbranch) setBranches(branchData.allbranch);
    if (tenantData?.findAllTenant) setTenants(tenantData.findAllTenant);

    if (isSuccess) {
      toast.success("Payment added successfully!");
      navigate(-1);
    }

    if (isError) {
      toast.error("Failed to add payment!");
    }
  }, [branchData, tenantData, isSuccess, isError]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setFormData({ ...formData, branch: branchId, tenantId: "" });
  };

  const handleTenantChange = (e) => {
    setFormData({ ...formData, tenantId: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.branch || !formData.tenantId) {
      toast.error("Please select branch & tenant.");
      return;
    }

    try {
      await createPayment(formData).unwrap();

      setFormData({ tenantId: "", branch: "", amountpaid: "" });
      setSelectedBranch(null);

    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/40 animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#3b5b96] bg-clip-text text-transparent">
            Add Payment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Branch */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Select Branch</label>
            <select
              onChange={handleBranchChange}
              value={formData.branch}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-4 focus:ring-[#1e3a5f]/30 transition-all"
              required
            >
              <option value="">Choose a branch...</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.address}
                </option>
              ))}
            </select>
          </div>

          {/* Tenant */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Select Tenant</label>
            <select
              onChange={handleTenantChange}
              value={formData.tenantId}
              disabled={!selectedBranch || tenantLoading}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-4 focus:ring-[#1e3a5f]/30 transition-all disabled:bg-gray-100"
              required
            >
              <option value="">
                {tenantLoading ? "Loading..." : "Choose tenant..."}
              </option>
              {tenants.map((tenant) => (
                <option value={tenant._id} key={tenant._id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Amount Paid (₹)</label>
            <input
              type="number"
              name="amountpaid"
              value={formData.amountpaid}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-4 focus:ring-[#1e3a5f]/30 transition-all"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={paymentLoading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1e3a5f] to-[#3b5b96] text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {paymentLoading ? <span className="loader"></span> : "Add Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
