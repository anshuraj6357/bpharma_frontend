import React,{useState} from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function AppointManager() {
  const { id } = useParams(); // property id
  const navigate = useNavigate();
    const [managerData, setManagerData] = useState({ name: "", email: "", phone: "" });
   
 
  const appointMe = () => {
    console.log("Appoint ME as Branch Manager for property:", id);

    // 🔹 API call yahan jayegi
    // axios.post(`/api/property/${id}/appoint-me`)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">
        Appoint Branch Manager
      </h1>

      <p className="text-gray-600">
        Property ID: <span className="font-semibold">{id}</span>
      </p>

      <p className="text-gray-600">
        Please choose how you want to appoint a manager
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {/* Existing Manager */}
        <button
          className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow hover:scale-105 transition"
          onClick={() => navigate(`/admin/appointexisting/${id}`)}
        >
          Appoint Existing Manager
        </button>

    

        {/* New Manager */}
        <button
          className="px-6 py-3 rounded-xl bg-green-600 text-white shadow hover:scale-105 transition"
          onClick={() => navigate(`/admin/appointnewmanager/${id}`)}
        >
          Appoint New Manager
        </button>
      </div>
    </div>
  );
}
