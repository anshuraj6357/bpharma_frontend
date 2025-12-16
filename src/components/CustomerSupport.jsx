import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Headphones,
} from "lucide-react";
import { useState } from "react";

export default function CustomerSupport() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://roomgi-backend-project-2.onrender.com/api/support/create-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to submit request");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Customer Support
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We’re here to help you with bookings, payments, PGs, hostels,
              hotels, rooms, and property listings on ROOMGI.
            </p>
          </header>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 bg-gray-50 rounded-2xl border text-center hover:shadow-md transition">
              <Phone className="mx-auto text-green-600" size={44} />
              <h3 className="text-lg font-semibold mt-4">
                Call Support
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Instant help for urgent issues
              </p>
              <p className="mt-4 font-bold text-gray-900">
                +91 8104 559889
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border text-center hover:shadow-md transition">
              <Mail className="mx-auto text-blue-600" size={44} />
              <h3 className="text-lg font-semibold mt-4">
                Email Support
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                We usually reply within 24 hours
              </p>
              <p className="mt-4 font-bold text-gray-900">
                support@roomgi.com
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border text-center hover:shadow-md transition">
              <MessageSquare className="mx-auto text-purple-600" size={44} />
              <h3 className="text-lg font-semibold mt-4">
                Live Chat
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Chat with our support team
              </p>
              <p className="mt-4 font-bold text-gray-900">
                Coming Soon
              </p>
            </div>
          </div>

          {/* Support Form */}
          <div className="bg-gray-50 p-10 rounded-2xl border shadow-md mb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Headphones className="text-green-600" />
              Submit a Support Request
            </h2>

            <form onSubmit={submitForm} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={updateField}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={updateField}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={updateField}
                required
                className="w-full p-3 border rounded-xl h-36 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition"
              >
                Submit Request
              </button>
            </form>

            {sent && (
              <p className="text-green-600 mt-6 font-semibold text-center">
                ✅ Your support request has been submitted successfully!
              </p>
            )}
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
              <Clock className="mx-auto text-gray-700" size={36} />
              <h3 className="font-semibold mt-3 text-gray-900">
                Support Hours
              </h3>
              <p className="text-gray-600 text-sm">
                Mon – Sun, 9:00 AM – 10:00 PM
              </p>
            </div>

            <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
              <MapPin className="mx-auto text-red-600" size={36} />
              <h3 className="font-semibold mt-3 text-gray-900">
                Head Office
              </h3>
              <p className="text-gray-600 text-sm">
                Noida, Uttar Pradesh, India
              </p>
            </div>

            <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
              <Mail className="mx-auto text-blue-600" size={36} />
              <h3 className="font-semibold mt-3 text-gray-900">
                Support Email
              </h3>
              <p className="text-gray-600 text-sm">
                support@roomgi.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
