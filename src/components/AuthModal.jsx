import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useLoginUserMutation
} from "../Bothfeatures/features/api/authapi";
import { userLoggedin } from "../Bothfeatures/features/authSlice";
import "react-toastify/dist/ReactToastify.css";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });

  const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  // Automatically close modal if user is already authenticated


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
      let res; // declare res here

      if (isSignUp) {
        if (!formData.username || !formData.email || !formData.password || !formData.phone || !formData.role) {
          toast.error("Please fill all fields");
          return;
        }

        // Store the API response
        res = await registerUser(formData).unwrap();
        toast.success("Registered successfully! Logging you in...");

      } else {
        if (!formData.email || !formData.password) {
          toast.error("Please fill all fields");
          return;
        }

        // Store the API response
        res = await loginUser(formData).unwrap();
        toast.success(res.message || "Logged in successfully!");
      }

      // Dispatch user and save to localStorage
      dispatch(userLoggedin({ user: res.existingUser }));
      localStorage.setItem("user", JSON.stringify(res.existingUser));

      // Navigate based on role
      if (res?.existingUser?.role !== "user") navigate("/admin/properties");
      else navigate(-1);

      // Reset form
      setFormData({ username: "", email: "", password: "", phone: "", role: "" });

    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-gray-200 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={() => {
            // properly call the function
            navigate(-1); // navigate after closing
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Heading */}
        

        <div className="flex justify-center items-center gap-8 mb-4">

          
  <button
    onClick={() => setIsSignUp(false)}
    className={`text-lg font-semibold transition ${
      !isSignUp
        ? "text-indigo-700 border-b-4 border-indigo-700 pb-1"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    Login
  </button>

  <button
    onClick={() => setIsSignUp(true)}
    className={`text-lg font-semibold transition ${
      isSignUp
        ? "text-indigo-700 border-b-4 border-indigo-700 pb-1"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    Sign Up
  </button>

  
</div>
<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-wide">
          {isSignUp ? "Create Account" : "Login Now"}
        </h2>


        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm hover:shadow-md"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm hover:shadow-md"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="owner">PG Owner</option>
              <option value="branch-manager">Branch Manager</option>
            </select>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm hover:shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={registerLoading || loginLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-full hover:scale-105 hover:shadow-lg transition transform font-semibold flex justify-center items-center gap-2"
          >
            {(registerLoading || loginLoading) && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle SignUp/Login */}
        <div className="mt-5 text-center text-sm flex flex-col gap-2">
  {isSignUp ? (
    <span>
      Already have an account?{" "}
      <button
        onClick={() => setIsSignUp(false)}
        className="text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Login
      </button>
    </span>
  ) : (
    <>
      <span>
        Don't have an account?{" "}
        <button
          onClick={() => setIsSignUp(true)}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Sign Up
        </button>
      </span>
      <button
        onClick={() => toast.info("Forgot password clicked")}
        className="text-red-500 hover:underline mt-1"
      >
        Forgot Password?
      </button>
    </>
  )}
</div>

      </div>
    </div>
  );
}
