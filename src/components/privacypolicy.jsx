import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">
          
          {/* Header */}
          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              This Privacy Policy explains how ROOMGI collects, uses, protects,
              and manages your personal information when you use our platform.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                1. Information We Collect
              </h2>
              <p>
                We collect personal details such as name, email address, phone
                number, and booking-related information during platform usage.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                2. Purpose of Data Collection
              </h2>
              <p>
                Collected data is used for bookings, verification, customer
                support, communication, and service improvement.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                3. Data Sharing & Disclosure
              </h2>
              <p>
                ROOMGI does not sell user data. Information is shared only with
                relevant property owners or when legally required.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                4. Secure Payments
              </h2>
              <p>
                Payments are processed securely via trusted gateways like
                Razorpay. ROOMGI never stores sensitive payment details.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                5. Cookies & Tracking
              </h2>
              <p>
                Cookies help personalize experience and analyze usage. Users can
                disable cookies through browser settings.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                6. Account Deletion & Data Removal
              </h2>
              <p>
                Users may request deletion of their account and data by
                contacting ROOMGI support at any time.
              </p>
            </section>

            <section className="md:col-span-2 bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                7. Policy Updates
              </h2>
              <p>
                ROOMGI may update this Privacy Policy periodically. Continued use
                of the platform implies acceptance of the updated terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
