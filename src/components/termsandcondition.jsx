import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function TermsConditions() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-14">

          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Terms & Conditions – ROOMGI
          </h1>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">1. Platform Usage</h2>
              <p className="mt-3 text-gray-600">
                ROOMGI connects users with PGs, hostels and hotels. We do not own these properties.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">2. Property Details</h2>
              <p className="mt-3 text-gray-600">
                All information is provided by property owners. Users must verify details before booking.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">3. Liability</h2>
              <p className="mt-3 text-gray-600">
                ROOMGI is not responsible for disputes or issues between users and accommodation providers.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">4. Payments</h2>
              <p className="mt-3 text-gray-600">
                Payments are transferred directly to the respective property after booking.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">5. User Responsibility</h2>
              <p className="mt-3 text-gray-600">
                Users must not misuse the platform or provide incorrect information.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold">6. Modifications</h2>
              <p className="mt-3 text-gray-600">
                ROOMGI reserves the right to update or modify terms anytime.
              </p>
            </section>
          </div>

        </div>
      </main>

      {/* FOOTER FIXED AT BOTTOM */}
      {isAuthenticated && role !== "user" ? <Footer /> : null}

    </div>
  );
}
