import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllBranchbypropertyQuery,
  useRemovebranchmanagerMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";
import { Trash2, Search } from "lucide-react";

export default function ShowAllManager() {
  const { id } = useParams();

  // 🔹 Queries
  const {
    data: Allbranchdata,
    isLoading,
    isError,
  } = useGetAllBranchbypropertyQuery(id);

  const [
    Removebranchmanager,
    { isLoading: removing },
  ] = useRemovebranchmanagerMutation();

  const [search, setSearch] = useState("");

  // 🔹 Remove manager handler
  const removebranchmanager = async (managerId) => {
    if (!window.confirm("Are you sure you want to remove this manager?")) return;

    try {
      await Removebranchmanager(managerId).unwrap();
      alert("Branch manager removed successfully");
    } catch (error) {
      alert(error?.data?.message || "Failed to remove manager");
    }
  };

  // 🔹 Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  // 🔹 Error
  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Failed to load branch managers
      </p>
    );
  }

  // 🔹 Safe data fallback
  const branchManagers = Allbranchdata?.branchManagers ?? [];

  // 🔹 Search filter
  const filteredManagers = branchManagers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Branch Managers
        </h1>

        {/* 🔹 Search */}
        <div className="relative mt-4 md:mt-0 w-full md:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search manager..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 🔹 Manager List */}
      {filteredManagers.length === 0 ? (
        <div className="text-center py-14 bg-gray-50 rounded-xl border">
          <p className="text-gray-500">No branch managers found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredManagers.map((m) => (
            <div
              key={m._id}
              className="bg-white border rounded-xl p-4 shadow-sm
                         flex items-center justify-between
                         hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>

              {/* 🔹 Remove Button */}
              <button
                disabled={removing}
                onClick={() => removebranchmanager(m._id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm
                  rounded-lg transition
                  ${
                    removing
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
              >
                <Trash2 size={16} />
                {removing ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
