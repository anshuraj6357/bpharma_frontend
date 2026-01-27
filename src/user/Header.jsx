import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Menu,
  Loader2,
  X,
  LogOut,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import logo from "../assets/logofinal.png";
import { useLogoutUserMutation } from "../backend-routes/userroutes/authapi";
import { userLoggedout } from "../backend-routes/slice/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  /* ================= ROLE CHECK ================= */
  const isAdmin =
    user?.role === "owner" || user?.role === "branch-manager";

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {}
    localStorage.clear();
    dispatch(userLoggedout());
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
    setOpenDropdown(false);
    setMobileMenu(false);
  };

  /* ================= MENUS ================= */
  const navLinks = [
    { label: "Home", path: "/", icon: <Home size={18} /> },
    { label: "About", path: "/about", icon: <User size={18} /> },
    { label: "Contact", path: "/contact", icon: <MessageSquare size={18} /> },
  ];

  const userLinks = [
    { label: "My Profile", path: "/myprofile", icon: <User size={18} /> },
    { label: "Bookings", path: "/mybooking", icon: <Briefcase size={18} /> },
    { label: "Complaints", path: "/mycomplain", icon: <MessageSquare size={18} /> },
  ];

  const adminMenuItems = [
    { label: "Properties", path: "/admin/properties", icon: <Home size={18} /> },
    { label: "Tenants", path: "/admin/tenants", icon: <User size={18} /> },
    { label: "Payments", path: "/admin/payments", icon: <Briefcase size={18} /> },
    { label: "Rooms", path: "/admin/showrooms", icon: <Home size={18} /> },
    { label: "Complaints", path: "/admin/complaints", icon: <MessageSquare size={18} /> },
  ];

  /* ================= HEADER ================= */
  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg"
            : "bg-white"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between ${
            isScrolled ? "py-3" : "py-5"
          }`}
        >
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl bg-slate-50 hover:bg-indigo-50"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={20} />
            </button>

            <button onClick={() => navigate("/")}>
              <img src={logo} className="h-10 md:h-12" alt="Roomgi" />
            </button>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex gap-8 items-center">
            {(navLinks
            ).map((l) => (
              <Link
                key={l.label}
                to={l.path}
                className={`flex items-center gap-2 font-semibold text-sm ${
                  location.pathname === l.path
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ================= RIGHT ================= */}
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-slate-950 text-white px-6 py-2 rounded-2xl"
            >
              Login / Signup
            </button>
          ) : (
            <div ref={dropdownRef} className="relative hidden lg:block">
              <button
                onClick={() => setOpenDropdown((p) => !p)}
                className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full"
              >
                <span>{user?.username}</span>
                <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-xl">
                  {(isAdmin ? adminMenuItems : userLinks).map((u) => (
                    <button
                      key={u.label}
                      onClick={() => {
                        navigate(u.path);
                        setOpenDropdown(false);
                      }}
                      className="w-full px-5 py-3 flex gap-3 hover:bg-slate-50"
                    >
                      {u.icon}
                      {u.label}
                    </button>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 flex gap-3 text-red-500 hover:bg-red-50"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <LogOut />
                    )}
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <>
          <div
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
          />
          <aside className="fixed top-4 left-4 bottom-4 w-[280px] bg-white z-[120] rounded-3xl p-8 overflow-y-auto">
            <div className="flex justify-between mb-8">
              <img src={logo} className="h-10" alt="Roomgi" />
              <X onClick={() => setMobileMenu(false)} />
            </div>

            <div className="space-y-1">
              {(
                !isAuthenticated
                  ? navLinks
                  : isAdmin
                  ? adminMenuItems
                  : [...navLinks, ...userLinks]
              ).map((l) => (
                <button
                  key={l.label}
                  onClick={() => {
                    navigate(l.path);
                    setMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
                             text-slate-700 hover:bg-slate-100"
                >
                  {l.icon}
                  {l.label}
                </button>
              ))}

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
                             text-red-500 hover:bg-red-50 mt-4"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
