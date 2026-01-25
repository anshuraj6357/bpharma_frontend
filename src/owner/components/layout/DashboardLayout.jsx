import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { menuIcons } from "../../../constants/menuIcon.jsx";
import DashboardHeader from "../../header";
import Footer from "../../../user/footer";  // ✅ Imported footer रखा
import { ChevronRight, LogOut, Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mobile sidebar auto-close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { id: "properties", label: "Properties", path: "/admin/properties" },
    { id: "tenants", label: "Tenants", path: "/admin/tenants" },
    { id: "payments", label: "Payments", path: "/admin/payments" },
    { id: "rooms", label: "Rooms", path: "/admin/showrooms" },
    { id: "complaints", label: "Complaints", path: "/admin/complaints" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[120] bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* 🔥 MOVABLE SIDEBAR TOGGLE BUTTON */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* 🔥 MOBILE MENU BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-xl hover:bg-slate-100 transition-all lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-slate-900">Roomgi Admin</h1>
          </div>
        </div>
        
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </header>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-[95]"
          onClick={toggleMobileMenu}
        />
      )}

      {/* 🔥 MOVABLE & RESPONSIVE SIDEBAR */}
      <aside
        className={`
          fixed top-[80px] left-0 bottom-0
          bg-white/95 backdrop-blur-sm border-r border-slate-200/60 shadow-2xl
          transition-all duration-500 ease-out z-[110]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isSidebarOpen ? "w-72" : "w-20 hover:w-72"}
          hover:lg:w-72
        `}
      >
        {/* DRAG HANDLE */}
        <div 
          className="h-1 bg-gradient-to-r from-orange-500 to-orange-400 cursor-col-resize mx-2 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity lg:hidden"
        />

        <nav className="p-4 pt-8 space-y-2 h-full overflow-y-auto">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4 ${
              !isSidebarOpen && "opacity-0"
            }`}
          >
            Main Menu
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 shadow-sm
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-orange-500/25"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:scale-[1.02]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-white/30 rounded-r-full" />
                  )}
                  
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {menuIcons[item.id]}
                  </div>

                  {isSidebarOpen && (
                    <span className="flex-1 text-sm font-semibold truncate">
                      {item.label}
                    </span>
                  )}

                  {isSidebarOpen && isActive && (
                    <ChevronRight size={14} className="opacity-70 ml-auto" />
                  )}

                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900/95 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-2xl z-[200] border border-slate-700/50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-6 left-0 right-0 p-4 border-t border-slate-200/50">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50/50 hover:text-red-600 transition-all shadow-sm">
            <LogOut size={20} />
            {isSidebarOpen && (
              <span className="text-sm font-black uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          pt-[140px] transition-all duration-500
          ${isSidebarOpen ? "lg:pl-72" : "lg:pl-20"}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="p-6 lg:p-12">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>

        {/* 🔥 IMPORTED USER FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
