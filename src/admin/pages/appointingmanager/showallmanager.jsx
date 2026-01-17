import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllBranchbypropertyQuery,
  useRemovebranchmanagerMutation,
} from "../../../Bothfeatures/adminfeatures/api/propertyapi";
import { Trash2, Search } from "lucide-react";

export default function ShowAllManager() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null); // ⭐ only this controls loading

  const {
    data: Allbranchdata,
    isLoading,
    isError,
  } = useGetAllBranchbypropertyQuery(id);

  // ❌ DO NOT destructure isLoading from mutation
  const [Removebranchmanager] = useRemovebranchmanagerMutation();

  const removebranchmanager = async (managerId) => {
    if (!window.confirm("Are you sure you want to remove this manager?")) return;

    try {
      setDeletingId(managerId); // ⭐ only this button loads
      await Removebranchmanager(managerId).unwrap();
      alert("Branch manager removed successfully");
    } catch (error) {
      alert(error?.data?.message || "Failed to remove manager");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Failed to load branch managers ❌
      </p>
    );
  }

  const branchManagers = Allbranchdata?.branchManagers ?? [];

  const filteredManagers = branchManagers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Branch Managers
        </h1>

        <div className="relative w-full sm:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search manager..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {filteredManagers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border">
          <p className="text-gray-500">No branch managers found</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {filteredManagers.map((m) => (
            <div
              key={m._id}
              className="bg-white border rounded-xl p-4 shadow-sm
                         flex flex-col sm:flex-row sm:items-center sm:justify-between
                         gap-3 sm:gap-0
                         hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{m.name}</p>
                <p className="text-sm text-gray-500 break-all">{m.email}</p>
              </div>

              <button
                disabled={deletingId === m._id}
                onClick={() => removebranchmanager(m._id)}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-sm
                  rounded-lg transition w-full sm:w-auto
                  ${
                    deletingId === m._id
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100 active:scale-95"
                  }`}
              >
                {deletingId === m._id ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Remove
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
