import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function ShippingPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth); // get user from redux
  const role = user?.role; // default role if no user

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content (takes up remaining height) */}
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-10 text-center">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8">
            Shipping Policy – ROOMGI
          </h1>

          {/* Content */}
          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            ROOMGI is a service-based platform that provides online PG Hotel, Hostel and Rooml booking services.
          </p>
          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            We do not ship any physical products.
          </p>
          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            All bookings, confirmations, and receipts are delivered digitally via email, SMS, or WhatsApp.
          </p>
          <p className="text-gray-700 text-lg sm:text-xl font-semibold">
            Therefore, shipping charges and delivery timelines are{" "}
            <span className="text-blue-600">not applicable</span> to our services.
          </p>
        </div>
      </main>

      {/* Footer fixed at bottom of layout (same logic as TermsConditions) */}
      {isAuthenticated && role !== "user" ? <Footer /> : null}
    </div>
  );
}
