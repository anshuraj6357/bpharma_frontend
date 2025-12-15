import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom"
export default function AddComplain({ onClose }) {
  const id =useParams()
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    category: "",
    branchId: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Complaint submitted successfully!");
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl text-[#1e3a5f] font-bold tracking-tight">
            Submit a Complaint
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Share your concern — our team will resolve it quickly ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Complaint Title</label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleChange}
              placeholder="Water leakage, room cleaning issue, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none shadow-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              placeholder="Explain the issue clearly so we can resolve it faster..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none shadow-sm resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formdata.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none shadow-sm"
              required
            >
              <option value="">Select Category</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Billing">Billing</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Branch ID */}
          {/* <div>
            <label className="block text-sm text-gray-700 mb-1">Branch ID</label>
            <input
              type="text"
              name="branchId"
              value={formdata.branchId}
              onChange={handleChange}
              placeholder="Enter branch ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none shadow-sm"
              required
            />
          </div> */}

        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 text-gray-700 transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
