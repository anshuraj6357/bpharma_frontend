import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";


export default function ContactUs() {
  const { user,isAuthenticated } = useSelector((state) => state.auth); // get user from redux
  const role = user?.role; // default role if no user
  return (<>
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Contact Us – ROOMGI
      </h1>

      <p className="text-gray-600 mb-8 leading-relaxed">
        We're here to help you with bookings, refunds, support, or any service-related queries.
        Feel free to reach out through any of the contact options below.
      </p>

      <div className="space-y-6">

        {/* Email */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-600">support@roomgi.com</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Phone</h2>
              <p className="text-gray-600">+91-8104559889</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="text-gray-600">Patna, Bihar</p>
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition cursor-pointer">
          <a
            href="https://www.roomgi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Website</h2>
              <p className="text-gray-600">www.roomgi.com</p>
            </div>
          </a>
        </div>

        {/* Footer Message */}
        <p className="text-gray-600 mt-6 text-sm">
          For any support regarding refunds, cancellations, or bookings, contact us via email or WhatsApp.
        </p>

      </div>

    </div>

         {(isAuthenticated && role !== "user") ? <Footer /> : <></>}
    </>

  );
}
