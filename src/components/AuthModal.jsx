import { X, Loader2, Mail, Lock, User, Phone, Briefcase, ChevronRight, Stars } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useLoginUserMutation
} from "../Bothfeatures/features/api/authapi";
import { userLoggedin } from "../Bothfeatures/features/authSlice";
import "react-toastify/dist/ReactToastify.css";

export default function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });

  const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) dispatch(userLoggedin({ user: JSON.parse(storedUser) }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isSignUp) {
        if (!formData.username || !formData.email || !formData.password || !formData.phone || !formData.role) {
          toast.error("All fields are required");
          return;
        }
        res = await registerUser(formData).unwrap();
        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem("user", JSON.stringify(res.existingUser));
        toast.success("Welcome to RoomGi!");
        navigate("/signup-success");
      } else {
        // Login: Only Email & Password
        if (!formData.email || !formData.password) {
          toast.error("Email and Password are required");
          return;
        }
        res = await loginUser({ email: formData.email, password: formData.password }).unwrap();
        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem("user", JSON.stringify(res.existingUser));
        toast.success("Logged in successfully");

        const role = res?.existingUser?.role || "";
        if (role.includes("owner") || role.includes("branch-manager")) {
          navigate("/admin/properties", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-200/40 backdrop-blur-xl flex items-center justify-center p-4 py-10 animate-in fade-in duration-500">
      
      {/* --- Main Card --- */}
      <div className="bg-white rounded-[2.5rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white animate-in zoom-in-95 duration-500">
        
        {/* --- LEFT SIDE: PICHLA WALA IMAGE --- */}
        <div className="md:w-[42%] relative min-h-[300px] md:min-h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Interior"
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          
          <div className="relative z-10 p-10 h-full flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-4">
              <Stars className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-200">Premium Living</span>
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight mb-2">
              Find Your <br /> Cozy Corner.
            </h1>
            <p className="text-slate-300 text-sm font-medium leading-relaxed opacity-90">
              Discover verified shared spaces that feel like home, managed with care.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: PICHLA WALA PREMIUM UI (#fdfdfd) --- */}
        <div className="flex-1 bg-[#fdfdfd] p-8 md:p-14 relative">
          
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 bg-slate-100/50 hover:bg-slate-100 p-2 rounded-full transition-all"
          >
            <X size={20} />
          </button>

          <div className="max-w-sm mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                {isSignUp ? "Join the Community" : "Welcome Back"}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {isSignUp ? "Enter your details to get started." : "Good to see you again!"}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* FULL NAME (Signup Only) */}
              {isSignUp && (
                <div className="space-y-1 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-semibold text-slate-800 shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL (Always) */}
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-semibold text-slate-800 shadow-sm"
                  />
                </div>
              </div>

              {/* PASSWORD (Always) */}
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-semibold text-slate-800 shadow-sm"
                  />
                </div>
              </div>

              {/* ROLE (Signup Only) - Yahi se problem aa rahi thi, ab login mein nahi dikhega */}
              {isSignUp && (
                <div className="space-y-1 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-semibold text-slate-800 appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">Select Role</option>
                      <option value="user">Looking for Room</option>
                      <option value="owner">Property Owner</option>
                      <option value="branch-manager">Manager</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PHONE (Signup Only) */}
              {isSignUp && (
                <div className="space-y-1 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-semibold text-slate-800 shadow-sm"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={registerLoading || loginLoading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70 mt-4"
              >
                {registerLoading || loginLoading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    {isSignUp ? "Register Now" : "Sign In"}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">
                {isSignUp ? "Already a member?" : "New to the platform?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800 transition-colors underline underline-offset-4"
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}