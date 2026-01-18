import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function PartnerWithRoomgi() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    city: "",
    propertyName: "",
  });
  const [sent, setSent] = useState(false);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  // Redux auth
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-white">
      {/* Page Content */}
      <div className="flex-grow pt-12 pb-20 px-6">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-10 py-14 mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Partner with <span className="text-green-600">ROOMGI</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Grow your PG, Hostel, or Hotel business with higher visibility,
            increased occupancy, smart property tools, and seamless management —
            all on one powerful platform.
          </p>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <div className="p-8 bg-gray-50 rounded-2xl border shadow-sm text-center hover:shadow-md transition">
            <TrendingUp className="text-green-600 mx-auto" size={48} />
            <h3 className="text-xl font-semibold mt-5">
              Increase Occupancy
            </h3>
            <p className="text-gray-600 text-sm mt-3">
              Reach more customers and fill rooms faster through ROOMGI’s
              high-traffic accommodation marketplace.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl border shadow-sm text-center hover:shadow-md transition">
            <ShieldCheck className="text-blue-600 mx-auto" size={48} />
            <h3 className="text-xl font-semibold mt-5">
              Verified & Trusted
            </h3>
            <p className="text-gray-600 text-sm mt-3">
              Get verified on ROOMGI and build credibility with thousands of
              renters, students, and travelers.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl border shadow-sm text-center hover:shadow-md transition">
            <Users className="text-purple-600 mx-auto" size={48} />
            <h3 className="text-xl font-semibold mt-5">
              Smart Property Tools
            </h3>
            <p className="text-gray-600 text-sm mt-3">
              Manage pricing, availability, tenants, and bookings effortlessly
              from a unified dashboard.
            </p>
          </div>
        </div>

        {/* Why Choose ROOMGI */}
        <div className="max-w-7xl mx-auto bg-gray-50 border rounded-2xl p-10 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose ROOMGI?
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              0% listing fee for verified partners
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Simple and fast onboarding process
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Higher visibility and search ranking
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Dedicated support for PG, Hostel & Hotel owners
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Owner dashboard inspired by OYO & Airbnb
            </li>
          </ul>
        </div>

        {/* Registration Form */}
        <div className="max-w-7xl mx-auto bg-white border rounded-2xl shadow-lg p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Start Your Partnership
          </h2>

          <form
            onSubmit={submitForm}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="text"
              name="propertyType"
              placeholder="Property Type (PG / Hostel / Hotel / Room)"
              value={form.propertyType}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="text"
              name="propertyName"
              placeholder="Property Name"
              value={form.propertyName}
              onChange={updateField}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="md:col-span-2 mt-6">
              <button className="w-full py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                Submit Partnership Request <ArrowRight size={18} />
              </button>
            </div>
          </form>

          {sent && (
            <p className="text-green-600 mt-6 font-semibold text-center">
              ✅ Your partnership request has been submitted successfully!
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
