import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAllBranchbypropertyQuery,
  useAddexistingbranchmanagerMutation
} from "../../../Bothfeatures/features2/api/propertyapi";
import { CheckCircle, AlertTriangle, UserPlus } from "lucide-react";

export default function AppointExistingManager() {
  const { id } = useParams();
  const [selectedManager, setSelectedManager] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllBranchbypropertyQuery();

  const [
    addexistingbranchmanager,
    { isLoading: appointingloading, isSuccess: existingSuccess, isError: appointError }
  ] = useAddexistingbranchmanagerMutation();

  const handleSubmit = async () => {
    if (!selectedManager) {
      alert("Please select a manager");
      return;
    }

    try {
      await addexistingbranchmanager({
        managerData: selectedManager,
        branchid: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (existingSuccess) {
      setTimeout(() => {
        navigate("/admin/properties");
      }, 800);
    }
  }, [existingSuccess]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center animate-pulse">
          <p className="text-gray-600 font-medium">Loading managers...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-2" />
          <p className="text-red-600 font-semibold">Something went wrong</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transition-all animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <UserPlus className="text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">
            Appoint Existing Manager
          </h1>
        </div>

        {/* Dropdown */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Select Manager
        </label>
        <select
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none transition disabled:bg-gray-100"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
          disabled={appointingloading}
        >
          <option value="">-- Choose Manager --</option>
          {data?.branchManagers?.map((manager) => (
            <option key={manager._id} value={manager.email}>
              {manager.name} ({manager.email})
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={appointingloading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex justify-center items-center gap-2 font-semibold"
        >
          {appointingloading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {appointingloading ? "Appointing..." : "Appoint Manager"}
        </button>

        {/* Success */}
        {existingSuccess && (
          <div className="flex items-center gap-2 text-green-600 mt-4 justify-center animate-fadeIn">
            <CheckCircle size={18} />
            <span>Manager appointed successfully!</span>
          </div>
        )}

        {/* Error */}
        {appointError && (
          <div className="flex items-center gap-2 text-red-600 mt-4 justify-center animate-fadeIn">
            <AlertTriangle size={18} />
            <span>Failed to appoint manager</span>
          </div>
        )}
      </div>
    </div>
  );
}
