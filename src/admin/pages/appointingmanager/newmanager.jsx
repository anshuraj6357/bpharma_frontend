import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useAddbranchmanagerMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";

export default function AppointNewManager() {
  const { id } = useParams(); // branch / property id
  const navigate = useNavigate();

  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addbranchmanager, { isLoading: addingManager }] =
    useAddbranchmanagerMutation();

  /* 🔹 INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 🔹 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!managerData.name || !managerData.email || !managerData.phone) {
      toast.warn("Please fill all manager fields.");
      return;
    }

    try {
      const res = await addbranchmanager({
        branchid: id,
        managerData,
      }).unwrap();

      toast.success(res?.message || "Manager appointed successfully");

      navigate(-1); // go back
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to appoint manager");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-center">
          Appoint New Branch Manager
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Manager Name"
          value={managerData.name}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={managerData.email}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={managerData.phone}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <button
          type="submit"
          disabled={addingManager}
          className="bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          {addingManager ? "Appointing..." : "Create & Appoint Manager"}
        </button>
      </form>
    </div>
  );
}
