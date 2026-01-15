import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserPlus, Users } from "lucide-react";

export default function AppointManager() {
  const { id } = useParams(); // property id
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl shadow-xl border p-6 sm:p-8 text-center">
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Appoint Branch Manager
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Choose how you want to assign a manager for this property
        </p>

        <div className="bg-gray-50 p-3 rounded-md text-xs sm:text-sm text-gray-600 mb-6 break-all">
          Property ID: <span className="font-semibold">{id}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Existing Manager */}
          <div
            onClick={() => navigate(`/admin/appointexisting/${id}`)}
            className="cursor-pointer p-5 rounded-lg border shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-3">
              <Users className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Existing Manager
            </h3>
            <p className="text-sm text-gray-500">
              Assign a manager who already exists
            </p>
          </div>

          {/* New Manager */}
          <div
            onClick={() => navigate(`/admin/appointnewmanager/${id}`)}
            className="cursor-pointer p-5 rounded-lg border shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-3">
              <UserPlus className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              New Manager
            </h3>
            <p className="text-sm text-gray-500">
              Create & assign a new manager
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
