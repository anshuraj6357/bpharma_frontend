import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllBranchbypropertyQuery,
   useAddbranchmanagerMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";

export default function AppointExistingManager() {
  const { id } = useParams(); // branchId
  const [selectedManager, setSelectedManager] = useState("");

  const { data, isLoading, isError } = useGetAllBranchbypropertyQuery();
  console.log(data)
  const [addbranchmanager, { isLoading: appointing }] =
    useAddbranchmanagerMutation();

  const handleSubmit = async () => {
    if (!selectedManager) {
      alert("Please select a manager");
      return;
    }

    try {
      await addbranchmanager({
           managerId: selectedManager,
        branchid: id,
     
      }).unwrap();

      alert("Manager appointed successfully ✅");
      setSelectedManager("");
    } catch (error) {
      alert("Failed to appoint manager ❌");
    }
  };

  if (isLoading) return <p className="p-4">Loading managers...</p>;
  if (isError) return <p className="p-4 text-red-500">Something went wrong</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">
          Appoint Existing Manager
        </h1>

        <select
          className="w-full border p-2 rounded mb-4"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="">-- Select Manager --</option>
          {data?.managers?.map((manager) => (
            <option key={manager._id} value={manager._id}>
              {manager.name} ({manager.email})
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={appointing}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {appointing ? "Appointing..." : "Appoint Manager"}
        </button>
      </div>
    </div>
  );
}
  