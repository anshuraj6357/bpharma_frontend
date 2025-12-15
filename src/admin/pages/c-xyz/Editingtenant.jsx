import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery, useUpdateTenantMutation } from "../../../Bothfeatures/features2/api/tenant";

export default function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error } = useGetTenantByIdQuery(id);
  const [updateTenant] = useUpdateTenantMutation();

  const [formdata, setformdata] = useState({
    contactNumber: "",
    name: "",
    Rent: "",
    dues: "",
    advanced: "",
    idProof: "",
    idProofType: "",
    emergencyContactNumber: "",
    documentsPhoto: "",
    roomNumber: "",
    status:""
  });

  // 🧠 When tenant data arrives, update form
  useEffect(() => {
    if (data?.foundTenant) {
      setformdata(data.foundTenant);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTenant = async (e) => {
    e.preventDefault();
    try {
      console.log("Updated Tenant Data:", formdata);
      await updateTenant(formdata).unwrap();
      navigate(-1); // go back after update
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p>Loading tenant details...</p>;
  if (error) return <p>Failed to load tenant details 😢</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl text-[#1e3a5f] font-semibold">Update Tenant</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="Tenant Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Contact Number</label>
            <input
              type="number"
              name="contactNumber"
              value={formdata.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Rent & Dues */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Rent</label>
              <input
                type="number"
                name="Rent"
                value={formdata.Rent}
                onChange={handleChange}
                placeholder="Monthly Rent"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Dues</label>
              <input
                type="number"
                name="dues"
                value={formdata.dues}
                onChange={handleChange}
                placeholder="Pending Dues"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>

          {/* Advance Payment */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Advance Payment</label>
            <input
              type="number"
              name="advanced"
              value={formdata.advanced}
              onChange={handleChange}
              placeholder="Advance amount paid"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* ID Proof Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">ID Proof Type</label>
            <input
              type="text"
              name="idProofType"
              value={formdata.idProofType}
              onChange={handleChange}
              placeholder="Aadhaar, PAN, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* ID Proof Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">ID Proof Number</label>
            <input
              type="text"
              name="idProof"
              value={formdata.idProof}
              onChange={handleChange}
              placeholder="Enter ID proof number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Emergency Contact Number</label>
            <input
              type="number"
              name="emergencyContactNumber"
              value={formdata.emergencyContactNumber}
              onChange={handleChange}
              placeholder="Enter emergency contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={formdata.roomNumber}
              onChange={handleChange}
              placeholder="Enter room number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveTenant}
            className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
          >
            Update Tenant
          </button>
        </div>
      </div>
    </div>
  );
}
