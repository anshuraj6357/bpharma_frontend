import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function ContactUs() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

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
      {/* SEO / Meta */}
      <Helmet>
        <title>Contact Us | Roomgi Private Limited</title>
        <meta
          name="description"
          content="Contact Roomgi Private Limited for bookings, refunds, cancellations, partnerships, or any service-related queries. Official support email, phone, and office address."
        />
        <link rel="canonical" href="https://www.roomgi.com/contact" />
        <meta property="og:title" content="Contact Us | Roomgi Pvt Ltd" />
        <meta
          property="og:description"
          content="Reach out to Roomgi Pvt Ltd for support regarding bookings, refunds, cancellations, or partnerships."
        />
        <meta property="og:url" content="https://www.roomgi.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Roomgi" />
      </Helmet>

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Roomgi Contact Page",
          "url": "https://www.roomgi.com/contact",
          "description":
            "Official contact page of Roomgi Private Limited for queries related to bookings, refunds, cancellations, and partnerships.",
          "contactOption": [
            {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "support@roomgi.com",
              "telephone": "+918104559889"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Patna",
            "addressRegion": "Bihar",
            "addressCountry": "IN"
          }
        })}
      </script>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Contact Us
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">ROOMGI</p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We’re here to help you with bookings, refunds, cancellations,
              partnerships, or any service-related queries.
            </p>
          </header>

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
                <p className="text-gray-600">Patna, Bihar, India</p>
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
                  Website
                </h2>
                <p className="text-gray-600">www.roomgi.com</p>
              </div>
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-gray-600 text-sm text-center mt-14 max-w-3xl mx-auto">
            For refunds, cancellations, or booking-related issues, please reach
            out to us via email or phone. Our support team is happy to assist you.
          </p>
        </div>
      </main>

      
    </div>
  );
}
