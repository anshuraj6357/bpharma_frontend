import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ExistingManager() {
  const { id } = useParams(); // property id
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    // API call
    // axios.get("/api/managers?status=available")
    setManagers([
      { _id: "1", name: "Rahul", email: "rahul@gmail.com", available: true },
      { _id: "2", name: "Neha", email: "neha@gmail.com", available: false },
    ]);
  }, []);

  const appointManager = (managerId) => {
    console.log("Appoint manager:", managerId, "to property:", id);
    // POST /property/:id/appoint-existing
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Appoint Existing Manager</h1>

      {managers.map((m) => (
        <div
          key={m._id}
          className="border p-4 rounded mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-gray-500">{m.email}</p>
          </div>

          <button
            disabled={!m.available}
            onClick={() => appointManager(m._id)}
            className={`px-4 py-2 rounded ${
            "bg-blue-600 text-white"
                           }`}
          >
            Appoint
          </button>
        </div>
      ))}
    </div>
  );
}
