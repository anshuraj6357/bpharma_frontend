import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// Reusable Policy Navigation
function PolicyNav() {
  const policies = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Cancellation & Refund Policy", href: "/cancellation-policy" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-4 mt-6">
      {policies.map((policy) => (
        <Link
          key={policy.href}
          to={policy.href}
          className="text-green-600 hover:text-green-800 hover:underline font-medium transition"
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
      title: "1. Platform Role",
      content:
        "ROOMGI is a technology platform connecting users with PGs, hostels, and hotels. We do not own or operate the listed properties; each is managed independently by its respective owner or host.",
    },
    {
      title: "2. Cancellation Policy",
      content:
        "Cancellation terms vary by property. Users are advised to review the cancellation details mentioned on the property listing before confirming a booking.",
    },
    {
      title: "3. Refund Policy",
      content:
        "Refunds are issued only upon approval by the partner property. Eligible refunds are processed within 5–7 working days and credited back to the original payment method.",
    },
    {
      title: "4. Non-Refundable Situations",
      content: [
        "No-show by the guest",
        "Last-minute cancellations",
        "Violation of property rules",
        "Non-compliance with property-specific terms",
      ],
    },
    {
      title: "5. Service & Convenience Charges",
      content:
        "Any service fee or convenience charge (if applicable) is non-refundable.",
    },
    {
      title: "6. Need Help?",
      content: [
        "For assistance with cancellations or refunds, contact us at:",
        "📧 support@roomgi.com",
        "📞 +91 8104 559889",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Cancellation & Refund Policy | ROOMGI - Verified PGs & Rooms in India</title>
        <meta
          name="description"
          content="Read ROOMGI's Cancellation & Refund Policy for clear and fair booking rules. Understand property-specific cancellation, refund timelines, and non-refundable situations."
        />
        <meta
          name="keywords"
          content="ROOMGI, Cancellation Policy, Refund Policy, PG booking India, Hostel booking India, Hotel booking India, Booking terms"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Cancellation & Refund Policy | ROOMGI" />
        <meta property="og:description" content="Transparent cancellation and refund policies for verified PG, hostel, and hotel bookings in India via ROOMGI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/cancellation-policy" />
        <meta property="og:image" content="/images/roomgi-logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cancellation & Refund Policy",
            "description": "ROOMGI Cancellation & Refund Policy page describing platform role, booking cancellations, refund timelines, and non-refundable situations.",
            "url": "https://yourdomain.com/cancellation-policy",
            "publisher": {
              "@type": "Organization",
              "name": "ROOMGI",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/images/roomgi-logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6">
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
              Transparent and fair cancellation and refund policies to ensure a smooth and trustworthy booking experience.
            </p>

            {/* Policy Navigation */}
            <PolicyNav />
          </header>

          {/* Policy Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            {sections.map((section, idx) => (
              <section key={idx} className="bg-gray-50 p-8 rounded-2xl border">
                <h2 className="text-2xl font-semibold text-green-700">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-relaxed">{section.content}</p>
                )}
              </section>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-sm mt-16">
            © {new Date().getFullYear()} ROOMGI — All Rights Reserved.
          </p>

        </div>
      </main>

    </div>
  );
}
