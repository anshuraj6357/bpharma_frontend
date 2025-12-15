import { useState } from "react";
import { useSelector } from "react-redux";
import { Trash2, Mail } from "lucide-react";
import {
  useGetAllComplainByTenantQuery,
  useDeleteComplainMutation,
} from "../Bothfeatures/features2/api/complainapi";

// Simple Toaster
const Toaster = ({ message }) => {
  if (!message.text) return null;
  return (
    <div className={`fixed top-5 right-5 px-6 py-3 rounded-xl font-medium z-50 transition-all
      ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
      {message.text}
    </div>
  );
};

export default function ComplaintsPage() {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetAllComplainByTenantQuery();
  const [deleteComplain] = useDeleteComplainMutation();
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMsg = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await deleteComplain(id).unwrap();
      showMsg("Complaint deleted!", "success");
      refetch();
    } catch {
      showMsg("Delete failed!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <Toaster message={message} />

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Complaint Dashboard</h1>
        <p className="text-gray-600 mt-2 md:text-lg">
          Track, edit, delete & resolve complaints seamlessly
        </p>
      </div>

      {/* Complaints Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-center text-gray-500 col-span-full py-10">Loading complaints...</p>
        ) : data?.data?.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full py-10">No complaints found.</p>
        ) : (
          data.data.map((comp) => (
            <div
              key={comp._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3 flex-wrap">
                <h2 className="text-lg font-semibold text-gray-900 break-words">{comp.title}</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full
                  ${comp.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    comp.status === "In-Progress" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"}`}>
                  {comp.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3">{comp.description}</p>

              {/* Info Tags */}
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{comp.category}</span>
                <span className="text-xs text-gray-400">Created: {new Date(comp.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-auto">
                {comp.status === "Pending" && (
                  <button
                    onClick={() => handleDelete(comp._id)}
                    className="flex items-center justify-center gap-1 bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}

                {/* Not Satisfied CTA */}
                {comp.status === "Resolved" && (
                  <a
                    href="mailto:support@yourcompany.com?subject=Complaint%20Issue&body=I%20am%20not%20satisfied%20with%20my%20resolved%20complaint."
                    className="flex items-center justify-center gap-1 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow hover:bg-gray-200 transition"
                  >
                    <Mail size={14} /> Not Satisfied? Contact Support
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
