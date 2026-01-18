import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function TermsConditions() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const termsSections = [
    {
      title: "1. Platform Overview",
      content:
        "ROOMGI is a technology platform that connects users with property owners, managers, agents, and service providers for PGs, hostels, rooms, rental homes, flats, villas, hotels, office spaces, and commercial properties. ROOMGI does not own or directly operate these properties."
    },
    {
      title: "2. Eligibility & Account Responsibility",
      content:
        "By using ROOMGI, you confirm that you are legally capable of entering into binding agreements. You are responsible for maintaining the confidentiality of your account and for all activities under your account."
    },
    {
      title: "3. Property Listings & Accuracy",
      content:
        "All property information, images, pricing, availability, and rules are provided by property owners or managers. ROOMGI does not guarantee absolute accuracy and users are advised to verify all details before booking, renting, buying, or selling."
    },
    {
      title: "4. Rentals, PGs & Short-Term Stays",
      content:
        "ROOMGI facilitates rental bookings for PGs, hostels, rooms, shared flats, hotels, and short stays. House rules, security deposits, entry/exit timings, and policies vary by property."
    },
    {
      title: "5. Buying & Selling Properties",
      content:
        "ROOMGI provides a platform for buyers and sellers to connect. We do not participate in property transactions, legal verification, or ownership transfer unless explicitly stated."
    },
    {
      title: "6. Office & Commercial Properties",
      content:
        "ROOMGI may list office spaces, coworking hubs, shops, and commercial units. Users must independently verify legal compliance, zoning, and suitability."
    },
    {
      title: "7. Payments & Fees",
      content:
        "All payments are processed via secure third-party gateways. ROOMGI does not store sensitive financial information. Service fees, if any, will be transparently disclosed."
    },
    {
      title: "8. Cancellations & Refunds",
      content:
        "Cancellation and refund policies vary by property. Users must review individual property policies before confirming bookings or transactions."
    },
    {
      title: "9. User Conduct",
      content:
        "Users must not engage in fraud, misrepresentation, abuse, illegal activity, or any behavior that harms other users or property owners."
    },
    {
      title: "10. Owner & Agent Responsibilities",
      content:
        "Owners and agents must ensure that their listings are genuine, legal, and accurately represented. Misleading or fraudulent listings may be removed."
    },
    {
      title: "11. Safety & Verification",
      content:
        "ROOMGI takes reasonable measures to promote verified listings. However, users are encouraged to perform their own due diligence."
    },
    {
      title: "12. Dispute Resolution",
      content:
        "ROOMGI is not a party to disputes between users and property owners. Disputes must be resolved directly between the involved parties."
    },
    {
      title: "13. Limitation of Liability",
      content:
        "ROOMGI shall not be liable for loss, damage, disputes, or service issues arising from property stays, purchases, or rentals."
    },
    {
      title: "14. Platform Availability",
      content:
        "ROOMGI does not guarantee uninterrupted access and may temporarily suspend services for maintenance or updates."
    },
    {
      title: "15. Intellectual Property",
      content:
        "All content, trademarks, and platform materials belong to ROOMGI unless otherwise stated."
    },
    {
      title: "16. Termination",
      content:
        "ROOMGI reserves the right to suspend or terminate accounts that violate these terms."
    },
    {
      title: "17. Changes to Terms",
      content:
        "ROOMGI may update these Terms & Conditions at any time. Continued use of the platform indicates acceptance."
    },
    {
      title: "18. Governing Law",
      content:
        "These terms are governed by the laws of India. Any legal disputes shall fall under Indian jurisdiction."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>Terms & Conditions | ROOMGI – Rentals, Homes, Hotels & Property Services</title>
        <meta
          name="description"
          content="Read ROOMGI’s Terms & Conditions for rentals, PGs, homes, flats, hotels, offices, commercial spaces, buying & selling property across India."
        />
      </Helmet>

      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="bg-white/70 backdrop-blur-xl border rounded-3xl shadow-xl px-12 py-16 text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Terms & Conditions
            </h1>
            <p className="text-green-600 text-lg font-semibold mt-3">
              ROOMGI Legal & Usage Policies
            </p>
            <p className="text-gray-600 mt-5 max-w-4xl mx-auto">
              These Terms & Conditions govern your access to and use of ROOMGI’s
              rental, buying, selling, hotel, PG, and commercial property services.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">Verified Platform</span>
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Secure Payments</span>
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">Legal Compliance</span>
            </div>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {termsSections.map((section, idx) => (
              <section
                key={idx}
                className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

        </div>
      </main>

      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
