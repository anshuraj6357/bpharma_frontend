import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuIcons } from "../../../constants/menuIcon.jsx";
import Footer from "../../../components/Footer";
import DashboardHeader from "../../header"; // <-- import here

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
    { id: "complaints", label: "complaints", path: "/admin/complaints" },
    { id: "subscription", label: "subscription", path: "/admin/subscription" },
    // { id: "staff", label: "Staff & Utilities", path: "/admin/staff" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* HEADER */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* MAIN AREA */}
      <div className="flex flex-1 pt-16">
        {/* SIDEBAR */}
        <aside
          className={`
    ${isMobileMenuOpen ? "flex" : "hidden"}     // Mobile toggle
    lg:flex                                      // Always visible on laptop
    flex-col fixed top-16 bottom-0 z-50
    bg-white border-r shadow-sm 
    transition-all duration-300
    ${isSidebarOpen ? "w-64" : "w-20"}
  `}
        >
          <nav className="p-4 space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive(item.path)
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {menuIcons[item.id]}
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>


        {/* CONTENT + FOOTER */}
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
            }`}
        >
          <div className="flex-1 p-6 lg:p-10 overflow-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
