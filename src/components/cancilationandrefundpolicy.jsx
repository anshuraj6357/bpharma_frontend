import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ShieldCheck, RefreshCcw, FileText, HelpCircle } from "lucide-react";

function PolicyNav() {
  const policies = [
    { name: "Privacy Policy", href: "/privacypolicy" },
    { name: "Terms & Conditions", href: "/termsandcondition" },
    { name: "Cancellation & Refund Policy", href: "/CancellationPolicy" },
    { name: "Career", href: "/career" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-4 mt-8">
      {policies.map((policy) => (
        <Link
          key={policy.href}
          to={policy.href}
          className="px-4 py-2 rounded-full border bg-white text-green-600 hover:bg-green-50 hover:text-green-800 font-medium transition shadow-sm"
        >
          {policy.name}
        </Link>
      ))}
    </nav>
  );
}

export default function CancellationPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "Platform Role",
      content:
        "ROOMGI is a technology platform connecting users with property owners, managers, and agents for PGs, hostels, rental homes, flats, villas, hotels, office spaces, and commercial properties. ROOMGI does not own or operate these properties directly."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Property-Specific Cancellation Rules",
      content:
        "Each property listed on ROOMGI follows its own cancellation and refund policy. Users must carefully review the policy displayed on the property listing before confirming any booking, rental, or transaction."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-green-600" />,
      title: "Refund Eligibility",
      content:
        "Refund eligibility depends on the individual property’s policy. Once approved, refunds are typically processed within 5–7 working days and credited back to the original payment method."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-green-600" />,
      title: "Non-Refundable Scenarios",
      content: [
        "No-show by the guest or tenant",
        "Last-minute or same-day cancellations",
        "Violation of property rules",
        "Incorrect user information",
        "Early check-out or early move-out",
      ],
    },
  ];

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do cancellations work on ROOMGI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancellations depend on the individual property's policy. Please review the listing before booking."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a refund take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Refunds are usually processed within 5–7 working days after approval."
        }
      }
    ]
  }), []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>Cancellation & Refund Policy | ROOMGI</title>
        <meta
          name="description"
          content="ROOMGI Cancellation & Refund Policy for PGs, rentals, hotels, homes, flats, offices, and commercial properties."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="bg-white/70 backdrop-blur-xl border rounded-3xl shadow-xl px-12 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Cancellation & Refund Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Transparent cancellation and refund rules for rentals, PGs, hotels,
              homes, offices, and commercial properties.
            </p>

            <PolicyNav />
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {Array.isArray(section.content) ? (
                  <ul className="list-disc ml-6 space-y-2 text-gray-600">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-20">
            © {new Date().getFullYear()} ROOMGI — All Rights Reserved.
          </p>

        </div>
      </main>

      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
