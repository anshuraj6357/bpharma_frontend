import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-white">
      
      {/* MAIN CONTENT (flex-1 ensures footer stays bottom) */}
      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border">

          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Privacy Policy
            <span className="block text-green-600 text-2xl mt-2">ROOMGI</span>
          </h1>

          <div className="space-y-8 text-gray-700">

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">1. Data We Collect</h2>
              <p className="mt-2">
                We collect basic user details like name, email, phone number, and booking information.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">2. Purpose of Collection</h2>
              <p className="mt-2">
                Your data is used only for booking purposes, verification, and customer support.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">3. Data Sharing</h2>
              <p className="mt-2">
                We do not share user data with third parties except property owners involved in the booking.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">4. Secure Payments</h2>
              <p className="mt-2">
                Payments on ROOMGI are processed securely through trusted gateways like Razorpay.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">5. Cookies</h2>
              <p className="mt-2">
                Cookies help improve user experience by personalizing platform features.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">6. Data Deletion</h2>
              <p className="mt-2">
                Users can request account deletion anytime by contacting ROOMGI support.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER FIXED AT PAGE BOTTOM */}
      {isAuthenticated && role !== "user" ? <Footer /> : null}
    </div>
  );
}
