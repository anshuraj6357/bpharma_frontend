import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AppointNewManager() {
  const { id } = useParams(); // property id from URL
 const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phone: "",
  });



  const handleChange = (e) => {
    setManagerData({
      ...managerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Property ID:", id);
    console.log("New Manager Data:", managerData);

    // 🔹 API call here
    // axios.post(`/api/property/${id}/appoint-new`, managerData)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Appoint New Branch Manager</h1>

      { (
        <div className="bg-white p-6 rounded-xl shadow w-80 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Manager Name"
            value={managerData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={managerData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={managerData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create & Appoint Manager
          </button>
        </div>
      )}
    </div>
  );
}
