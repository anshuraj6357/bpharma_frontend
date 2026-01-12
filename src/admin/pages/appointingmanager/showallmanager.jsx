import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShowAllManager() {
  const { id } = useParams(); // property id

  const [managers, setManagers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);

        // 🔸 Dummy data (replace with API)
        const data = [
          { _id: "1", name: "Rahul Sharma", email: "rahul@gmail.com", assigned: false },
          { _id: "2", name: "Neha Singh", email: "neha@gmail.com", assigned: true },
        ];

        setManagers(data);
      } catch (err) {
        console.error("Failed to fetch managers");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  // 🔹 Appoint manager
  const appointManager = (managerId) => {
    console.log("Appoint manager:", managerId, "to property:", id);

    // axios.post(`/api/property/${id}/appoint-existing`, { managerId })

    alert("Manager appointed successfully!");

    setManagers((prev) =>
      prev.map((m) =>
        m._id === managerId ? { ...m, assigned: true } : m
      )
    );
  };

  // 🔹 Delete manager
  const deleteManager = (managerId) => {
    if (!window.confirm("Are you sure you want to delete this manager?")) return;

    console.log("Delete manager:", managerId);

    // axios.delete(`/api/manager/${managerId}`)

    setManagers((prev) => prev.filter((m) => m._id !== managerId));
  };

  // 🔹 Search filter
  const filteredManagers = managers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-10">Loading managers...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Manage Branch Managers
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search manager..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Manager List */}
      {filteredManagers.length === 0 ? (
        <p className="text-gray-500">No managers found</p>
      ) : (
        filteredManagers.map((m) => (
          <div
            key={m._id}
            className="border p-4 rounded mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-500">{m.email}</p>
            </div>

            <div className="flex gap-2">
              {/* Appoint */}
              <button
                disabled={m.assigned}
                onClick={() => appointManager(m._id)}
                className={`px-3 py-1 rounded text-sm ${
                  m.assigned
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {m.assigned ? "Assigned" : "Appoint"}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteManager(m._id)}
                className="px-3 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
