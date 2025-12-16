import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function ShippingPolicy() {
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
              Shipping Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              This Shipping Policy explains the delivery mechanism applicable to
              services provided by ROOMGI.
            </p>
          </header>

          {/* Policy Content */}
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            <section>
              <p>
                ROOMGI is a service-based digital platform offering online PG,
                Hostel, Hotel, and Room booking services. As such, no physical
                goods are shipped or delivered.
              </p>
            </section>

            <section>
              <p>
                All bookings, confirmations, invoices, and payment receipts are
                delivered electronically through email, SMS, or WhatsApp to the
                registered contact details provided by the user.
              </p>
            </section>

            <section>
              <p className="font-semibold">
                Therefore, shipping charges, logistics, and delivery timelines
                are <span className="text-green-600">not applicable</span> to any
                service offered on the ROOMGI platform.
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
