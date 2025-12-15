import { useState,useEffect } from "react";
import {useRegisterUserMutation} from "../../../Bothfeatures/features2/api/authapi"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [registerUser,{isSuccess}]=useRegisterUserMutation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await registerUser(formData).unwrap
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  useEffect(()=>{
    if(isSuccess){
        navigate("/")
    }

  },[isSuccess])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        >
          <option value="">Select Role</option>
          <option value="branch-manager">Branch-Manager</option>
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
