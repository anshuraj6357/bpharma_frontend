import { Mail, Phone, MessageSquare, Clock, MapPin, Headphones } from "lucide-react";
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
      const res = await fetch("https://admin-backend-pgmega.onrender.com/api/support/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Customer Support</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          We're here to help! Reach out to ROOMGI Support for issues related to bookings, payments,
          PG Hotel, Hostel and Room stays, or property listings.
        </p>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition border text-center">
            <Phone className="mx-auto text-green-600" size={40} />
            <h3 className="text-lg font-semibold mt-4">Call Support</h3>
            <p className="text-gray-600 text-sm mt-1">Get instant help for urgent issues.</p>
            <p className="mt-3 font-bold text-gray-800">+91 8104 559889</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition border text-center">
            <Mail className="mx-auto text-blue-600" size={40} />
            <h3 className="text-lg font-semibold mt-4">Email Us</h3>
            <p className="text-gray-600 text-sm mt-1">We reply within 24 hours.</p>
            <p className="mt-3 font-bold text-gray-800">support@roomgi.com</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition border text-center">
            <MessageSquare className="mx-auto text-purple-600" size={40} />
            <h3 className="text-lg font-semibold mt-4">Live Chat</h3>
            <p className="text-gray-600 text-sm mt-1">Chat with our support team.</p>
            <p className="mt-3 font-bold text-gray-800">Coming Soon</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Headphones className="text-green-600" />
            Submit a Support Request
          </h2>

          <form onSubmit={submitForm} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={updateField}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={updateField}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Describe your issue..."
              value={form.message}
              onChange={updateField}
              required
              className="w-full p-3 border rounded-xl shadow-sm h-32 rounded-xl focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition"
            >
              Submit
            </button>
          </form>

          {sent && (
            <p className="text-green-600 mt-4 font-semibold text-center">Your request has been submitted!</p>
          )}
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
            <Clock className="mx-auto text-gray-700" size={36} />
            <h3 className="font-semibold mt-3 text-gray-900">Support Hours</h3>
            <p className="text-gray-600 text-sm">Mon - Sun, 9:00 AM - 10:00 PM</p>
          </div>

          <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
            <MapPin className="mx-auto text-red-600" size={36} />
            <h3 className="font-semibold mt-3 text-gray-900">Head Office</h3>
            <p className="text-gray-600 text-sm">Noida, Uttar Pradesh, India</p>
          </div>

          <div className="p-6 bg-white border rounded-2xl shadow-sm text-center">
            <Mail className="mx-auto text-blue-600" size={36} />
            <h3 className="font-semibold mt-3 text-gray-900">Support Email</h3>
            <p className="text-gray-600 text-sm">support@roomgi.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
