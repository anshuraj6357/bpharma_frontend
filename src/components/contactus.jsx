import { Mail, Phone, MapPin, Globe, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { useMemo } from "react";

export default function ContactUs() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const structuredData = useMemo(() => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact ROOMGI",
        "url": "https://www.roomgi.com/contact",
        "description":
          "Official contact page of ROOMGI for PG bookings, rental homes, buying, selling, and hotel stays.",
        "publisher": {
          "@type": "Organization",
          "name": "ROOMGI",
          "url": "https://www.roomgi.com",
          "logo": "https://www.roomgi.com/images/roomgi-logo.png"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@roomgi.com",
            "telephone": "+918104559889",
            "availableLanguage": ["English", "Hindi"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Patna",
          "addressRegion": "Bihar",
          "addressCountry": "IN"
        }
      }
    ];
  }, []);

  // GA4 event tracking function
  const trackClick = (eventName, label) => {
    if (window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Contact",
        event_label: label,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* SEO */}
      <Helmet>
        <title>Contact ROOMGI | PG, Rentals, Homes & Hotels Support</title>
        <meta
          name="description"
          content="Need help with PG bookings, rental homes, buying, selling or hotel stays? Contact ROOMGI for fast and verified customer support."
        />
        <meta
          name="keywords"
          content="contact ROOMGI, PG support, rental help, buy sell property India, hotel booking support"
        />
        <link rel="canonical" href="https://www.roomgi.com/contact" />

        <meta property="og:title" content="Contact ROOMGI" />
        <meta
          property="og:description"
          content="Get support for PG bookings, rentals, buying, selling & hotel stays on ROOMGI."
        />
        <meta property="og:url" content="https://www.roomgi.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ROOMGI" />

        {structuredData.map((data, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Contact <span className="text-green-600">ROOMGI</span>
            </h1>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
              Have questions about PG bookings, rental homes, buying, selling, or
              hotel stays? Our support team is here to help.
            </p>
          </header>

          {/* Trust Strip */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
            {["Fast Response", "Human Support", "Verified Assistance"].map(
              (item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-xl border font-semibold text-gray-700 flex flex-col items-center"
                >
                  <ShieldCheck className="text-green-600 mb-2" />
                  {item}
                </div>
              )
            )}
          </section>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Email */}
            <a
              href="mailto:support@roomgi.com"
              onClick={() => trackClick("email_click", "support@roomgi.com")}
              className="bg-gray-50 p-8 rounded-2xl border hover:shadow-md transition flex items-center gap-5"
            >
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Email Support
                </h2>
                <p className="text-gray-600">support@roomgi.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+918104559889"
              onClick={() => trackClick("phone_click", "+918104559889")}
              className="bg-gray-50 p-8 rounded-2xl border hover:shadow-md transition flex items-center gap-5"
            >
              <div className="p-4 bg-green-100 text-green-600 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Phone Support
                </h2>
                <p className="text-gray-600">+91 8104 559889</p>
              </div>
            </a>

            {/* Address */}
            <div className="bg-gray-50 p-8 rounded-2xl border hover:shadow-md transition flex items-center gap-5">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Office Address
                </h2>
                <p className="text-gray-600">Noida, Delhi-NCR, India</p>
              </div>
            </div>

            {/* Website */}
            <a
              href="https://www.roomgi.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("website_click", "www.roomgi.com")}
              className="bg-gray-50 p-8 rounded-2xl border hover:shadow-md transition flex items-center gap-5"
            >
              <div className="p-4 bg-orange-100 text-orange-600 rounded-full">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Official Website
                </h2>
                <p className="text-gray-600">www.roomgi.com</p>
              </div>
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-gray-600 text-sm text-center mt-14 max-w-3xl mx-auto">
            For bookings, refunds, cancellations, or property-related assistance,
            please reach out via phone or email. Our support team typically
            responds within 24 hours.
          </p>
        </div>
      </main>
    </div>
  );
}
