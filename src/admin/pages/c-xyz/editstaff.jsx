import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetStaffByIdQuery, useUpdateStaffMutation } from "../../../Bothfeatures/features2/api/staffapi";
import { useGetAllBranchQuery } from "../../../Bothfeatures/features2/api/propertyapi";
export default function EditStaff() {
  const { data: AllStaffdata } = useGetAllBranchQuery();
  console.log("id")
  const navigate = useNavigate();
  const { id } = useParams();


  const { data, isLoading, error } = useGetStaffByIdQuery(id);
  const [updateStaff] = useUpdateStaffMutation();
  const [allbranch, setAllBranch] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: "",
    email: "",
    assignedProperties: "",
    permissions: "",
    branch: "",
  });

  // 🧠 When staff data arrives, update form
  useEffect(() => {
    if (data) {
      console.log(data)
      setFormData(data?.staff);
    }
    if (AllStaffdata) {
      console.log(AllStaffdata?.allbranch)
      setAllBranch(AllStaffdata?.allbranch)

    }
  }, [data, AllStaffdata]);

  // 🧩 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧩 Submit updated staff
  const handleSaveStaff = async (e) => {
    e.preventDefault();
    try {
      console.log("Updated Staff Data:", formData, id);
      await updateStaff({ formData, id });
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p>Loading staff details...</p>;
  if (error) return <p>Failed to load staff details 😢</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl text-[#1e3a5f] font-semibold">Update Staff</h2>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter staff name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="security">Security</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>

          {/* Contact & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            >
              <option value="">Select status</option>
              <option value="Active">active</option>
              <option value="In-active">In-active</option>


            </select>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Permissions</label>
            <input
              type="text"
              name="permissions"
              value={formData.permissions}
              onChange={handleChange}
              placeholder="e.g. view_reports, manage_staff"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>

          {/* Branch ID */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
            >
              <option value="">Select Branch</option>
              {allbranch?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.address || branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveStaff}
            className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
          >
            Update Staff
          </button>
        </div>
      </div>
    </div>
  );
}
