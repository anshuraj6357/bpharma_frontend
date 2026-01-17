import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, Building2, LogOut, Home, Bell, ChevronDown, UserCircle } from "lucide-react";
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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      await logoutUser().unwrap();
      dispatch(userLoggedout());
      toast.success("Security session ended");
      navigate("/");
    } catch (err) {
      navigate("/");
      toast.error("Logout process interrupted");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || !user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-[100] flex items-center justify-between px-6 transition-all duration-300">
      
      {/* LEFT: Navigation Control & Branding */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all active:scale-95"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Sidebar Toggle (Desktop) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all active:scale-95"
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Branding */}
        <div 
          className="group flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => navigate("/admin/properties")}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200 group-hover:bg-orange-500 transition-all duration-300 rotate-3 group-hover:rotate-0">
            <Building2 className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div className="hidden md:block">
            <h1 className="font-black text-lg text-slate-900 tracking-tight leading-none">
              Rooms<span className="text-orange-500">Admin</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Management Suite</p>
          </div>
        </div>
      </div>

      {/* RIGHT: User Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Quick Utilities */}
        <div className="hidden sm:flex items-center gap-2 border-r border-slate-100 pr-6">
          <button 
            onClick={() => navigate("/admin/properties")}
            className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative group"
          >
            <Home size={20} />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
          </button>
          
          <button className="p-2.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Profile Dropdown Component */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pl-3 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl transition-all"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 leading-none">
                {user?.username || "Admin"}
              </p>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter mt-1">
                {Array.isArray(user?.role) ? user.role[0] : user?.role}
              </p>
            </div>
            
            <div className="w-10 h-10 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-black border-2 border-white shadow-sm overflow-hidden">
               {user?.avatar ? (
                 <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
               ) : (
                 user?.username?.charAt(0)?.toUpperCase()
               )}
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* DROPDOWN MENU */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] z-20 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                   <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                </div>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <UserCircle size={18} /> Profile Settings
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold"
                >
                  <LogOut size={18} /> Logout Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}