import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { menuIcons } from "../../../constants/menuIcon.jsx";
import Footer from "../../../components/Footer";
import DashboardHeader from "../../header";
import { ChevronRight, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "properties", label: "Properties", path: "/admin/properties" },
    { id: "tenants", label: "Tenants", path: "/admin/tenants" },
    { id: "payments", label: "Payments", path: "/admin/payments" },
    { id: "rooms", label: "Rooms", path: "/admin/ShowRooms" },
    { id: "complaints", label: "Complaints", path: "/admin/complaints" },
    { id: "subscription", label: "Subscription", path: "/admin/subscription" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-1 pt-16">
        {/* --- SIDEBAR --- */}
        <aside
          className={`
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0 lg:flex
            flex-col fixed top-16 bottom-0 z-[60]
            bg-white border-r border-slate-200/60 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.02)]
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? "w-72" : "w-24"}
          `}
        >
          {/* Menu Section */}
          <nav className="p-4 pt-8 space-y-1.5 flex-1 custom-scrollbar overflow-y-auto">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
              Main Menu
            </p>
            
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300
                    ${active 
                      ? "bg-slate-900 text-white shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] shadow-slate-900/30" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                  `}
                >
                  {/* Active Indicator Pin */}
                  {active && (
                    <div className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full" />
                  )}
                  
                  <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {menuIcons[item.id]}
                  </div>

                  {isSidebarOpen && (
                    <span className={`flex-1 text-left text-sm font-bold tracking-tight transition-all duration-300`}>
                      {item.label}
                    </span>
                  )}

                  {isSidebarOpen && active && (
                    <ChevronRight size={14} className="opacity-50" />
                  )}

                  {/* Tooltip for collapsed mode */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[70] whitespace-nowrap shadow-xl">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Action (Logout/Profile) */}
          <div className="p-4 border-t border-slate-100">
             <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors group">
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                {isSidebarOpen && <span className="text-sm font-black uppercase tracking-widest">Logout</span>}
             </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main
          className={`
            flex-1 flex flex-col min-w-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? "lg:pl-72" : "lg:pl-24"}
          `}
        >
          <div className="flex-1 p-6 lg:p-12">
            {/* Page Container with subtle entry animation background */}
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}