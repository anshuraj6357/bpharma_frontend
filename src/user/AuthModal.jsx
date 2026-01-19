import {
  X,
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  Stars,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../backend-routes/userroutes/authapi";
import { userLoggedin } from "../backend-routes/slice/authSlice";
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
    role: "",
  });

  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(userLoggedin({ user: JSON.parse(storedUser) }));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (isSignUp) {
        if (
          !formData.username ||
          !formData.email ||
          !formData.password ||
          !formData.phone ||
          !formData.role
        ) {
          toast.error("All fields are required");
          return;
        }

        if (formData.phone.length !== 10) {
          toast.error("Enter valid 10-digit phone number");
          return;
        }

        res = await registerUser(formData).unwrap();
        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem("user", JSON.stringify(res.existingUser));
        toast.success("Welcome to RoomGi!");
        navigate("/signup-success");
      } else {
        if (!formData.email || !formData.password) {
          toast.error("Email & Password required");
          return;
        }

        res = await loginUser({
          email: formData.email,
          password: formData.password,
        }).unwrap();

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
    <div className="min-h-screen w-full bg-slate-200/40 backdrop-blur-xl flex items-center justify-center p-4 py-10">
      {/* MAIN MODAL */}
      <div className="relative bg-white rounded-[2.5rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white">

        {/* ✅ FIXED CLOSE BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 
                     bg-white/90 backdrop-blur-md
                     text-slate-700 hover:text-slate-900
                     p-2 rounded-full shadow-md"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="md:w-[42%] relative min-h-[260px] md:min-h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop"
            alt="Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-3">
              <Stars className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                Premium Living
              </span>
            </div>
            <h1 className="text-3xl font-black leading-tight mb-2">
              Find Your <br /> Cozy Corner
            </h1>
            <p className="text-slate-300 text-sm">
              Verified rooms, trusted owners, stress-free living.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 bg-[#fdfdfd] p-8 md:p-14">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-black mb-6">
              {isSignUp ? "Join the Community" : "Welcome Back"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <Input
                  icon={User}
                  label="Full Name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              )}

              <Input
                icon={Mail}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />

              <Input
                icon={Lock}
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              {isSignUp && (
                <>
                  {/* ROLE */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border rounded-2xl text-sm font-semibold"
                    >
                      <option value="">Select Role</option>
                      <option value="user">Looking for Room</option>
                      <option value="owner">Property Owner</option>
                      <option value="branch-manager">Manager</option>
                    </select>
                  </div>

                  {/* PHONE */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          const num = e.target.value.replace(/\D/g, "");
                          if (num.length <= 10) {
                            setFormData((p) => ({ ...p, phone: num }));
                          }
                        }}
                        className="w-full pl-[4.75rem] pr-4 py-3.5 border rounded-2xl text-sm font-semibold"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={registerLoading || loginLoading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
              >
                {registerLoading || loginLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : isSignUp ? (
                  "Register Now"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-center text-slate-400 font-bold">
              {isSignUp ? "Already a member?" : "New here?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-indigo-600 underline"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({ icon: Icon, label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
          size={18}
        />
        <input
          {...props}
          className="w-full pl-12 pr-4 py-3.5 border rounded-2xl text-sm font-semibold"
        />
      </div>
    </div>
  );
}
