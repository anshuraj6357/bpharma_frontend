import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function TermsConditions() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Terms & Conditions
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              These Terms & Conditions govern your access to and use of the
              ROOMGI platform. By using our services, you agree to comply with
              the terms outlined below.
            </p>
          </header>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                1. Platform Usage
              </h2>
              <p className="mt-3">
                ROOMGI acts as a technology platform connecting users with PGs,
                hostels, and hotels. ROOMGI does not own or operate these
                properties.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                2. Property Information
              </h2>
              <p className="mt-3">
                All property details are provided by owners or managers. Users
                are responsible for verifying information before confirming a
                booking.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                3. Liability Disclaimer
              </h2>
              <p className="mt-3">
                ROOMGI is not liable for disputes, service issues, or conflicts
                arising between users and accommodation providers.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                4. Payments
              </h2>
              <p className="mt-3">
                Payments made through ROOMGI are transferred to the respective
                property owners as per the booking terms.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                5. User Responsibilities
              </h2>
              <p className="mt-3">
                Users must provide accurate information and refrain from misuse,
                fraudulent activity, or violation of platform policies.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-xl font-semibold text-gray-900">
                6. Modifications to Terms
              </h2>
              <p className="mt-3">
                ROOMGI reserves the right to update or modify these Terms &
                Conditions at any time. Continued use of the platform indicates
                acceptance of revised terms.
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
