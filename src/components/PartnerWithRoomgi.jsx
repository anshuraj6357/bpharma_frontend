import { Building2, TrendingUp, ShieldCheck, Users, ArrowRight, CheckCircle } from "lucide-react";
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

  // FIXED - useSelector + role
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">



     <div className="flex-grow pt-28 pb-16 px-6">
      <div className="max-w-8xl mx-auto bg-white p-10 rounded-3xl shadow-xl border mb-16 ">
         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Partner with <span className="text-green-600">ROOMGI</span>
        </h1>
    
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Join ROOMGI and grow your PG Hotel, Hostel and Room business with increased visibility,
          higher occupancy, smart tools, and seamless property management.
        </p>
      </div>
        
        {/* Hero */}
       

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="p-6 bg-gray-50 rounded-2xl shadow border text-center hover:shadow-md transition">
            <TrendingUp className="text-green-600 mx-auto" size={46} />
            <h3 className="text-xl font-semibold mt-4">Increase Occupancy</h3>
            <p className="text-gray-600 text-sm mt-2">
              Get more bookings through ROOMGI’s high-traffic accommodation marketplace.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow border text-center hover:shadow-md transition">
            <ShieldCheck className="text-blue-600 mx-auto" size={46} />
            <h3 className="text-xl font-semibold mt-4">Verified & Trusted</h3>
            <p className="text-gray-600 text-sm mt-2">
              Become a verified partner and build trust with thousands of renters and travelers.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow border text-center hover:shadow-md transition">
            <Users className="text-purple-600 mx-auto" size={46} />
            <h3 className="text-xl font-semibold mt-4">Smart Property Tools</h3>
            <p className="text-gray-600 text-sm mt-2">
              Manage pricing, availability, occupancy, and bookings effortlessly.
            </p>
          </div>
        </div>

        {/* Why Choose Roomgi */}
        <div className="bg-gray-50 rounded-2xl border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose ROOMGI?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> 0% listing fee for partners</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Easy onboarding process</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Higher visibility & SERP ranking</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Support for PG, Hostel, and Hotel owners</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Owner dashboard similar to OYO & Airbnb</li>
          </ul>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl border shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Partnership</h2>

          <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={updateField} required className="p-3 border rounded-xl" />
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={updateField} required className="p-3 border rounded-xl" />
            <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={updateField} required className="p-3 border rounded-xl" />
            <input type="text" name="propertyType" placeholder="Property Type (PG Hotel, Hostel and Room)" value={form.propertyType} onChange={updateField} required className="p-3 border rounded-xl" />
            <input type="text" name="city" placeholder="City" value={form.city} onChange={updateField} required className="p-3 border rounded-xl" />
            <input type="text" name="propertyName" placeholder="Property Name" value={form.propertyName} onChange={updateField} required className="p-3 border rounded-xl" />

            <div className="md:col-span-2 mt-4">
              <button className="w-full py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
                Submit Request <ArrowRight size={18} />
              </button>
            </div>
          </form>

          {sent && (
            <p className="text-green-600 mt-4 font-semibold text-center">
              Your partnership request has been submitted!
            </p>
          )}
        </div>
      </div>

      {(isAuthenticated && role !== "user") ? <Footer /> : <></>}
    </div>
  );
}
