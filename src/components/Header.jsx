import { Home, User, Menu, Plus, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../Bothfeatures/features/api/authapi";
import { userLoggedout, hydrateUser } from "../Bothfeatures/features/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const dropdownRef = useRef(null);

  /* ---------------- HYDRATE USER ---------------- */
  useEffect(() => {
    const raw = localStorage.getItem("user");
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      parsed
        ? dispatch(hydrateUser({ user: parsed, isAuthenticated: true }))
        : dispatch(userLoggedout());
    } catch {
      localStorage.removeItem("user");
      dispatch(userLoggedout());
    }
  }, [dispatch]);

  /* ---------------- OUTSIDE CLICK (DESKTOP) ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch { }
    dispatch(userLoggedout());
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
    setMobileMenu(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT: MENU ICON + LOGO */}
          <div className="flex items-center gap-3">
            {/* MOBILE THREE DOT MENU */}
            <button
              className="md:hidden p-1 rounded-full hover:bg-gray-100 transition"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={24} />
            </button>

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <Link to="/about" className="hover:text-red-500">About</Link>
            <Link to="/contact" className="hover:text-red-500">Contact</Link>

          </nav>

          {/* RIGHT: AUTH / USER */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 font-medium hover:text-red-500"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600"
                >
                  Sign up
                </button>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <div
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">{user?.username}</span>
                </div>

                {openDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border py-2">
                    {[
                      { label: "My Profile", path: "/myprofile" },
                      { label: "Home", path: "/" },
                      { label: "Wishlist", path: "/Wishlistdetails" },
                      { label: "My Complaints", path: "/mycomplain" },
                      { label: "My Bookings", path: "/mybooking" },
                    ].map((i) => (
                      <button
                        key={i.label}
                        onClick={() => navigate(i.path)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {i.label}
                      </button>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-red-500 hover:bg-gray-100 flex justify-center"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileMenu && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenu(false)}
          />

          {/* SIDEBAR */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-xl z-50 shadow-2xl p-5 border-r animate-slideIn">
            {/* TOP */}
            <div className="flex justify-between items-center mb-6">
              <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
                <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
              </div>
              <X className="w-7 h-7 text-gray-600 hover:text-red-500 cursor-pointer" onClick={() => setMobileMenu(false)} />
            </div>

            {/* USER */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 mb-6 bg-gray-50 rounded-xl p-3">
                <div className="w-11 h-11 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md"
                  onClick={() => { navigate("/myprofile"), setMobileMenu(false) }}
                >
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user?.username}</p>
                  <p className="text-xs text-gray-500"
                    onClick={() => { navigate("/myprofile"), setMobileMenu(false) }}
                  >View profile</p>
                </div>
              </div>
            )}

            {/* LINKS */}
            <div className="space-y-3 text-gray-700 font-medium">
              <button onClick={() => { navigate("/"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><Home className="w-5 h-5" /> Home</button>
              <button onClick={() => { navigate("/about"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><User className="w-5 h-5" /> About</button>
              <button onClick={() => { navigate("/contact"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><Menu className="w-5 h-5" /> Contact</button>
              {isAuthenticated && (
                <>
                  <button onClick={() => { navigate("/Wishlistdetails"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><Plus className="w-5 h-5" /> Wishlist</button>
                  <button onClick={() => { navigate("/mycomplain"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><Plus className="w-5 h-5" /> My Complaints</button>
                  <button onClick={() => { navigate("/mybooking"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-2"><Plus className="w-5 h-5" /> My Bookings</button>
                </>
              )}
              {!isAuthenticated && (
                <button onClick={() => { navigate("/login"); setMobileMenu(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center gap-3"><Plus className="w-5 h-5" /> Add Property</button>
              )}
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-6 left-5 right-5 space-y-3">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => { navigate("/login"); setMobileMenu(false); }} className="w-full py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition">Log in</button>
                  <button onClick={() => { navigate("/login"); setMobileMenu(false); }} className="w-full py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition shadow-md">Sign up</button>
                </>
              ) : (
                <button onClick={handleLogout} className="w-full py-2.5 text-red-500 border border-red-200 rounded-xl font-medium hover:bg-red-50 transition">Logout</button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
