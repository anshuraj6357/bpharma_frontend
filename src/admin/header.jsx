import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, Building2 } from "lucide-react";
import { useLogoutUserMutation } from "../Bothfeatures/features/api/authapi";
import { userLoggedout } from "../Bothfeatures/features/authSlice";
import { toast } from "react-toastify";

export default function DashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  

  const [logoutUser,{isSuccess}] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
        localStorage.removeItem("user");
      await logoutUser().unwrap();
      dispatch(userLoggedout());
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/");
    } 
    
    catch (err) {

       navigate("/")
      console.log(isSuccess);
      toast.error("Failed to logout");
     
      
    }
  };


 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  console.log("storedUser:", storedUser);

  if (!storedUser || !user) {
    // Force redirect to login
    window.location.href = "/";
  }
}, [user]);


  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b shadow-sm z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar toggle for desktop */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:block p-2 hover:bg-gray-200 rounded-lg transition"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/properties")}>
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Building2 className="text-white" size={18} />
          </div>
          <h1 className="font-semibold text-xl text-blue-900">Rooms Admin</h1>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Home button */}
        <button
          onClick={() => navigate("/admin/properties")}
          className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
        >
          Home
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* User info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0)?.toUpperCase()}
          </div>
          <span className="hidden sm:inline text-sm font-medium text-gray-700">
            {user?.role?.toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
