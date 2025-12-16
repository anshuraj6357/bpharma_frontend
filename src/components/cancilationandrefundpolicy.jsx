import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function CancellationPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Cancellation & Refund Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Transparent and fair cancellation and refund policies to ensure a
              smooth and trustworthy booking experience.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                1. Platform Role
              </h2>
              <p className="mt-3 leading-relaxed">
                ROOMGI is a technology platform connecting users with PGs,
                hostels, and hotels. We do not own or operate the listed
                properties; each is managed independently by its respective
                owner or host.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                2. Cancellation Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                Cancellation terms vary by property. Users are advised to review
                the cancellation details mentioned on the property listing
                before confirming a booking.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                3. Refund Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                Refunds are issued only upon approval by the partner property.
                Eligible refunds are processed within{" "}
                <strong>5–7 working days</strong> and credited back to the
                original payment method.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                4. Non-Refundable Situations
              </h2>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>No-show by the guest</li>
                <li>Last-minute cancellations</li>
                <li>Violation of property rules</li>
                <li>Non-compliance with property-specific terms</li>
              </ul>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                5. Service & Convenience Charges
              </h2>
              <p className="mt-3 leading-relaxed">
                Any service fee or convenience charge (if applicable) is
                <strong> non-refundable</strong>.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">
                6. Need Help?
              </h2>
              <p className="mt-3">
                For assistance with cancellations or refunds, contact us at:
              </p>
              <div className="mt-4 space-y-1 font-medium text-gray-800">
                <p>📧 support@roomgi.com</p>
                <p>📞 +91 8104 559889</p>
              </div>
            </section>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-sm mt-16">
            © {new Date().getFullYear()} ROOMGI — All Rights Reserved.
          </p>

        </div>
      </main>

      {/* Footer */}
      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
