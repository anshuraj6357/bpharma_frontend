import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>ROOMGI Privacy Policy | Rentals, Homes, Hotels & Property Data Protection</title>
        <meta
          name="description"
          content="Read ROOMGI’s Privacy Policy to understand how we collect, use, and protect your personal data for PG stays, rental homes, buying & selling properties, hotels, and office spaces across India."
        />
        <meta
          name="keywords"
          content="ROOMGI privacy policy, data protection India, PG booking privacy, rent home privacy, buy sell property data, hotel booking privacy"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="ROOMGI Privacy Policy" />
        <meta
          property="og:description"
          content="Learn how ROOMGI protects your data across rentals, PGs, homes, hotels, and property services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.roomgi.com/privacy-policy" />
        <meta property="og:image" content="/images/roomgi-logo.png" />
        <meta property="og:site_name" content="ROOMGI" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "ROOMGI Privacy Policy",
            "url": "https://www.roomgi.com/privacy-policy",
            "description":
              "ROOMGI Privacy Policy explains how we collect, use, and protect your personal information across rentals, PGs, hotels, buying and selling properties, and office spaces.",
          })}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">
          
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
              This Privacy Policy explains how ROOMGI collects, uses, stores,
              and protects your personal information across rentals, PGs,
              hotels, property buying & selling, office spaces, and commercial
              listings.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                1. Information We Collect
              </h2>
              <p>
                We may collect your name, email, phone number, location,
                identity details, booking preferences, property inquiries,
                device information, and payment-related metadata when you use
                ROOMGI.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                2. Why We Collect Your Data
              </h2>
              <p>
                Your data helps us process bookings, enable rentals, assist
                property purchases & sales, provide customer support,
                improve listings, prevent fraud, and enhance platform
                performance.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                3. Property & Owner Interactions
              </h2>
              <p>
                To facilitate rentals, purchases, visits, and inquiries, we
                may share limited necessary information with property owners,
                agents, or managers—only to fulfill your request.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                4. Secure Payments
              </h2>
              <p>
                Payments on ROOMGI are processed using trusted third-party
                gateways. We do not store your sensitive card or banking
                details.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                5. Cookies & Tracking Technologies
              </h2>
              <p>
                Cookies help us personalize your experience, analyze traffic,
                improve listings, and provide relevant recommendations. You
                can control cookies via browser settings.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                6. Data Security & Protection
              </h2>
              <p>
                We use industry-standard security measures, encryption, and
                access controls to protect your personal information from
                unauthorized access or misuse.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                7. Student, Professional & Traveler Safety
              </h2>
              <p>
                ROOMGI prioritizes safety for students, job seekers,
                professionals, and travelers by enforcing verified listings
                and transparent property information.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                8. Data Sharing & Legal Compliance
              </h2>
              <p>
                We do not sell your personal data. We may disclose information
                only when legally required or to protect the safety and rights
                of our users.
              </p>
            </section>

            <section className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                9. Your Rights & Choices
              </h2>
              <p>
                You can access, modify, or delete your account and personal
                data by contacting our support team at any time.
              </p>
            </section>

            <section className="md:col-span-2 bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                10. Policy Updates
              </h2>
              <p>
                ROOMGI may update this Privacy Policy to reflect platform
                changes, legal requirements, or new features. Continued use
                of the platform means you accept the updated policy.
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
