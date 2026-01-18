import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  Home, User, Menu, Loader2, X, Heart, 
  LogOut, MessageSquare, Briefcase 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import logo from "../assets/roomgilogo.png";
import { useLogoutUserMutation } from "../Bothfeatures/features/api/authapi";
import { userLoggedout } from "../Bothfeatures/features/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dropdownRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      console.log("Backend logout failed");
    }
    localStorage.clear();
    dispatch(userLoggedout());
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
    setMobileMenu(false);
    setOpenDropdown(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const userLinks = [
    { label: "My Profile", path: "/myprofile", icon: <User size={16} /> },
    { label: "Wishlist", path: "/Wishlistdetails", icon: <Heart size={16} /> },
    { label: "Bookings", path: "/mybooking", icon: <Briefcase size={16} /> },
    { label: "Complaints", path: "/mycomplain", icon: <MessageSquare size={16} /> },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg h-16" : "bg-white h-20"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-600 transition"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>

            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer group"
              title="Roomgi – Smart Property & Stay Platform"
            >
              <img
                src={logo}
                alt="Roomgi – Rent, Buy, PGs, Hotels, Homes & Commercial Properties"
                width="120"
                height="48"
                loading="eager"
                decoding="async"
                className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  title={link.label}
                  className={`relative text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:block px-6 py-2.5 text-sm font-semibold text-slate-900 hover:text-indigo-600 transition"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 bg-slate-950 text-white text-sm font-semibold rounded-2xl hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  aria-haspopup="menu"
                  aria-expanded={openDropdown}
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-3 p-1.5 pl-4 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all"
                >
                  <span className="hidden md:block text-sm font-semibold text-slate-900">
                    {user?.username}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow-md ring-2 ring-white">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-4 w-60 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-50 py-3 overflow-hidden">
                    <div className="px-5 py-3 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.username}
                      </p>
                    </div>

                    {userLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { navigate(item.path); setOpenDropdown(false); }}
                        className="w-full px-5 py-3 text-left hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-medium text-sm flex items-center gap-3 transition-colors"
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}

                    <div className="h-px bg-slate-50 my-2 mx-4" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-5 py-3 text-left text-red-500 hover:bg-red-50 font-semibold text-sm flex items-center gap-3 transition-all"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><LogOut size={16} /> Logout</>}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[110]"
            onClick={() => setMobileMenu(false)}
          />

          <div className="fixed top-4 left-4 bottom-4 w-[280px] bg-white z-[120] rounded-[2.5rem] shadow-2xl p-8 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div
                onClick={() => { navigate("/"); setMobileMenu(false); }}
                className="cursor-pointer"
              >
                <img src={logo} alt="Roomgi" className="h-10 w-auto" />
              </div>

              <button
                onClick={() => setMobileMenu(false)}
                className="p-2 rounded-full bg-slate-50 text-slate-500 hover:text-red-500 transition"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
              {[...navLinks, ...(isAuthenticated ? userLinks : [])].map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.path); setMobileMenu(false); }}
                  className={`w-full text-left px-5 py-4 rounded-2xl font-semibold text-sm flex items-center gap-4 transition-all ${
                    location.pathname === link.path
                      ? "bg-slate-950 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {link.icon || <Home size={18} />} {link.label}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 space-y-3">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => { navigate("/login"); setMobileMenu(false); }}
                    className="w-full py-4 rounded-2xl font-semibold text-slate-900 border border-slate-100 transition hover:bg-slate-50"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => { navigate("/login"); setMobileMenu(false); }}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-semibold shadow-lg shadow-slate-200"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-4 text-red-500 bg-red-50 rounded-2xl font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
