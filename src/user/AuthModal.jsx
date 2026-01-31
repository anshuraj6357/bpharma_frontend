import {
  X,
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  Stars,
} from "lucide-react";
import { useState } from "react";
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
  const [loginUser, { isLoading: loginLoading }] =
    useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ---------- SUBMIT ---------- */
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
          return toast.error("Please fill all fields");
        }

        res = await registerUser(formData).unwrap();

        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem(
          "user",
          JSON.stringify(res.existingUser)
        );

        toast.success("Account created successfully 🎉");
        navigate("/");
      } else {
        res = await loginUser({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem(
          "user",
          JSON.stringify(res.existingUser)
        );

        toast.success("Logged in successfully");

        const role = res?.existingUser?.role || "";
        navigate(role === "owner" ? "/admin/properties" : "/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Authentication failed");
    }
  };

  return (
  <div className="min-h-screen w-full bg-slate-200/40 backdrop-blur-xl flex items-center justify-center p-4 py-10">
  <div className="relative bg-white rounded-[2.5rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-xl border border-white transition-transform duration-300 hover:scale-[1.01]">

    {/* CLOSE */}
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
    >
      <X size={20} />
    </button>

    {/* LEFT IMAGE */}
    <div className="md:w-[42%] relative min-h-[260px] md:min-h-full overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop"
        alt="Interior"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
        <div className="flex items-center gap-2 mb-3">
          <Stars className="text-yellow-400 fill-yellow-400" size={18} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase drop-shadow">
            Premium Living
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2 drop-shadow-lg">
          Find Your <br /> Cozy Corner
        </h1>
        <p className="text-slate-300 text-sm md:text-base drop-shadow">
          Verified rooms, trusted owners, stress-free living.
        </p>
      </div>
    </div>

    {/* RIGHT FORM */}
    <div className="flex-1 bg-[#fdfdfd] p-8 md:p-14">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">
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
              placeholder="Enter your name"
              className="transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            className="transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <Input
            icon={Lock}
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          {isSignUp && (
            <>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="owner">Property Owner</option>
              </select>

              <PhoneInput
                value={formData.phone}
                onChange={(val) =>
                  setFormData((p) => ({ ...p, phone: val }))
                }
                inputClass="w-full px-4 py-3.5 border rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </>
          )}

          <button
            type="submit"
            disabled={registerLoading || loginLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            {registerLoading || loginLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-slate-400 font-bold">
          {isSignUp ? "Already a member?" : "New here?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-indigo-600 underline hover:text-indigo-500 transition"
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

/* ---------- REUSABLE INPUTS ---------- */

function PhoneInput({ value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
        Phone
      </label>
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
          +91
        </span>
        <input
          type="tel"
          value={value}
          onChange={(e) =>
            onChange(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="9876543210"
          className="w-full pl-[4.75rem] pr-4 py-3.5 border rounded-2xl text-sm font-semibold outline-none"
        />
      </div>
    </div>
  );
}

function Input({ icon: Icon, label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input
          {...props}
          className="w-full pl-12 pr-4 py-3.5 border rounded-2xl text-sm font-semibold outline-none"
        />
      </div>
    </div>
  );
}
