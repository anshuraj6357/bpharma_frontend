import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBranchQuery } from "../../../Bothfeatures/features2/api/propertyapi";
import {
    useAddStaffMutation,
    useGetAllStaffQuery,
} from "../../../Bothfeatures/features2/api/staffapi";


export default function AddStaff() {
    const {data:AllStaffdata}=useGetAllStaffQuery();
    const navigate = useNavigate();
    const { data: branchdata } = useGetAllBranchQuery();
    const [allbranch, setAllBranch] = useState([]);
    const [addstaff]=useAddStaffMutation()

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        contact: "",
        email: "",
        assignedProperties: "",
        permissions: "",
        branchId: "",
    });

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Submit
    const handleSaveStaff = async (e) => {
        e.preventDefault();
        try {
            await addstaff(formData).unwrap
            navigate(-1)
        
        } catch (error) {
            console.error(error);
            alert("Error adding staff ❌");
        }
    };

    // ✅ Load all branches
    useEffect(() => {
        if (branchdata?.allbranch) {
            setAllBranch(branchdata.allbranch);
        } else if (Array.isArray(branchdata)) {
            setAllBranch(branchdata);
        }
        if(AllStaffdata){
            console.log(AllStaffdata)
        }
    }, [branchdata,AllStaffdata]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                    <h2 className="text-2xl text-[#1e3a5f] font-semibold">Add New Staff</h2>
                </div>

                {/* Form Fields */}
                <div className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Staff Name"
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

                    {/* Contact */}
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

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter staff email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                        />
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

                    {/* Branch */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Branch</label>
                        <select
                            name="branchId"
                            value={formData.branchId}
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

                {/* Buttons */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveStaff}
                        className="flex-1 px-6 py-3 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#162d4a] transition-colors"
                    >
                        Save Staff
                    </button>
                </div>
            </div>
        </div>
    );
}
