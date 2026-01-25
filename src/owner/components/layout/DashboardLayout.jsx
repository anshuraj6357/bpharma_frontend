import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { menuIcons } from "../../../constants/menuIcon.jsx";
import DashboardHeader from "../../header";
import { ChevronRight, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mobile sidebar auto-close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { id: "properties", label: "Properties", path: "/admin/properties" },
    { id: "tenants", label: "Tenants", path: "/admin/tenants" },
    { id: "payments", label: "Payments", path: "/admin/payments" },
    { id: "rooms", label: "Rooms", path: "/admin/ShowRooms" },
    { id: "complaints", label: "Complaints", path: "/admin/complaints" },
    // { id: "subscription", label: "Subscription", path: "/admin/subscription" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-[100]
          bg-white border-r border-slate-200/60
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isSidebarOpen ? "w-72" : "w-24"}
        `}
      >
        <nav className="p-4 pt-8 space-y-1.5 h-full overflow-y-auto">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4 ${
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
                `
                group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all
                ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active bar */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full" />
                  )}

                  {/* ICON (THIS WILL RENDER NOW) */}
                  <div className="w-5 h-5 flex items-center justify-center">
                    {menuIcons[item.id]}
                  </div>

                  {/* Label */}
                  {isSidebarOpen && (
                    <span className="flex-1 text-sm font-bold">
                      {item.label}
                    </span>
                  )}

                  {/* Chevron */}
                  {isSidebarOpen && isActive && (
                    <ChevronRight size={14} className="opacity-60" />
                  )}

                  {/* Tooltip */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-xl z-[200]">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50">
            <LogOut size={20} />
            {isSidebarOpen && (
              <span className="text-sm font-black uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main
        className={`pt-16 transition-all ${
          isSidebarOpen ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="p-6 lg:p-12">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>

        {/* ADMIN FOOTER */}
        <footer className="py-4 text-center text-xs text-slate-400 border-t">
          © {new Date().getFullYear()} Roomgi Admin Panel
        </footer>
      </main>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
