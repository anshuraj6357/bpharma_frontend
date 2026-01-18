import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

export default function ShippingPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  // Optional FAQ for structured data / rich snippets
  const faqs = [
    {
      question: "Does ROOMGI ship physical goods?",
      answer: "No. ROOMGI is a digital service platform for booking PGs, Hostels, Hotels, and Rooms. No physical goods are shipped.",
    },
    {
      question: "How are bookings and invoices delivered?",
      answer: "All bookings, confirmations, invoices, and payment receipts are delivered electronically via email, SMS, or WhatsApp to the registered contact details.",
    },
    {
      question: "Are shipping charges applicable?",
      answer: "No. Shipping charges, logistics, and delivery timelines are not applicable to any service offered on the ROOMGI platform.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>ROOMGI Shipping Policy | Online Booking Services India</title>
        <meta
          name="description"
          content="ROOMGI Shipping Policy explains the delivery mechanism for digital bookings. Learn how electronic confirmations, invoices, and receipts are delivered safely for PG, Hostel, Hotel, and Room bookings in India."
        />
        <meta
          name="keywords"
          content="ROOMGI, Shipping Policy, Online Booking India, PG booking, Hostel booking, Hotel booking, Room booking, Digital service delivery, Electronic invoices"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="ROOMGI Shipping Policy | Safe Digital Booking Services" />
        <meta
          property="og:description"
          content="Understand ROOMGI’s Shipping Policy. All bookings, confirmations, and invoices are delivered electronically for PGs, Hostels, Hotels, and Rooms in India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/shipping-policy" />
        <meta property="og:image" content="/images/roomgi-logo.png" />
        <meta property="og:site_name" content="ROOMGI" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "ROOMGI Shipping Policy",
            "url": "https://yourdomain.com/shipping-policy",
            "description": "ROOMGI Shipping Policy explains the electronic delivery of bookings, invoices, and receipts for digital services like PG, Hostel, Hotel, and Room bookings in India.",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto bg-white border rounded-3xl shadow-xl px-10 md:px-16 py-16">
          {/* Header */}
          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Shipping Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">ROOMGI</p>
            <p className="text-gray-600 mt-4 text-lg md:text-xl leading-relaxed">
              This Shipping Policy outlines the electronic delivery process for bookings and invoices for digital services provided by ROOMGI.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="space-y-10 text-gray-700 text-lg md:text-xl leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">1. Digital Service Delivery</h2>
              <p>
                ROOMGI is a digital platform offering online PG, Hostel, Hotel, and Room bookings. No physical goods are shipped or delivered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">2. Electronic Confirmations</h2>
              <p>
                All bookings, confirmations, invoices, and payment receipts are delivered electronically via email, SMS, or WhatsApp to the registered contact details provided by the user.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">3. No Shipping Charges</h2>
              <p className="font-semibold">
                Shipping charges, logistics, and delivery timelines are <span className="text-green-600">not applicable</span> to any services offered on the ROOMGI platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">4. Security & Reliability</h2>
              <p>
                All electronic communications and receipts are securely delivered. Users can rely on ROOMGI’s digital process for safe and transparent booking confirmations.
              </p>
            </section>
          </div>

          {/* Optional FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => (
                <details key={idx} className="border rounded-xl p-4 bg-gray-50">
                  <summary className="cursor-pointer font-medium text-green-600">{faq.question}</summary>
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      
    </div>
  );
}
