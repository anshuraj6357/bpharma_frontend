
import { useSelector } from "react-redux";
import Footer from "./Footer";



export default function CancellationPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth); // get user from redux
  const role = user?.role; // default role if no user
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-5">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Cancellation & Refund Policy
          </h1>
          <p className="text-gray-600 mt-3 text-md">
            Transparent and fair policies for a better booking experience.
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="space-y-8">

          {/* Section */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">
              1. Platform Role
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              ROOMGI is a booking platform connecting users to PGs, hostels, and hotels.
              We do not own or manage the listed properties; each one is operated
              independently by its respective owner/host.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">
              2. Cancellation Policy
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Cancellation terms vary by property. Please check the cancellation details
              mentioned on the specific listing before confirming your booking.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">
              3. Refund Policy
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Refunds are provided only when approved by the partner property.
              Eligible refunds are processed within **5–7 working days**,
              directly to your original payment method.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">
              4. Non-Refundable Situations
            </h2>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
              <li>No-show by the guest</li>
              <li>Last-minute cancellations</li>
              <li>Violation of property rules</li>
              <li>Ignoring property-specific cancellation terms</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">
              5. Service & Convenience Charges
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Any service fee or convenience charge (if applied) is **non-refundable**.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700">6. Need Help?</h2>
            <p className="mt-3 text-gray-700">For any cancellation or refund concerns:</p>

            <div className="mt-4 space-y-1 text-gray-800 font-medium">
              <p>📧 support@roomgi.com</p>
              <p>📞 +91-8104559889</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} ROOMGI — All Rights Reserved.
        </p>
      </div>
      {(isAuthenticated && role !== "user") ? <Footer /> : <></>}

    </div>
  );
}
