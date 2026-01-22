// src/pages/auth/ResetPassword.jsx
import { Lock, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetUserpasswordMutation } from "../backend-routes/userroutes/authapi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // route: /reset-password/:token

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetUserpassword, { isLoading }] = useResetUserpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset link");
      return;
    }

    try {
      await resetUserpassword({ token, password }).unwrap();
      toast.success("Password reset successfully. Please login with your new password.");
      navigate("/login"); // or wherever your login/AuthModal route is
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-200/40 backdrop-blur-xl flex items-center justify-center p-4 py-10">
      <div className="relative bg-white rounded-[2.5rem] max-w-md w-full flex flex-col overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 p-2 rounded-full shadow-md"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-black mb-2">Set New Password</h2>
          <p className="text-xs text-slate-500 mb-6">
            Create a strong password and keep it private. You will use this to sign in next time.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 border rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 border rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-slate-400 font-bold">
            Remembered your password?
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-indigo-600 underline hover:text-indigo-800"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
