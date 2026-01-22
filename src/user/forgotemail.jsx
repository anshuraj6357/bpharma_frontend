// src/pages/auth/ForgotPassword.jsx
import { Mail, Stars, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendOtpMutation,useForgotUserpasswordMutation } from "../backend-routes/userroutes/authapi"; // or useForgotPasswordMutation if you have a separate endpoint

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
 
  const [ForgotUserpassword,{isLoading}]=useForgotUserpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await  ForgotUserpassword({ email }).unwrap();
      toast.success("If this email is registered, a reset link has been sent.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-200/40 backdrop-blur-xl flex items-center justify-center p-4 py-10">
      <div className="relative bg-white rounded-[2.5rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 p-2 rounded-full shadow-md"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE / INFO SECTION */}
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
                Secure Access
              </span>
            </div>
            <h1 className="text-3xl font-black leading-tight mb-2">
              Reset Your <br /> Password
            </h1>
            <p className="text-slate-300 text-sm">
              Enter your email and we will send a link to safely reset your password.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION (EMAIL ONLY) */}
        <div className="flex-1 bg-[#fdfdfd] p-8 md:p-14">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-black mb-6">Forgot Password</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-center text-slate-400 font-bold">
              Remembered your password?
              <button
                onClick={() => navigate("/")} // or your login/AuthModal route
                className="ml-2 text-indigo-600 underline hover:text-indigo-800"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
