import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function TermsConditions() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  // Terms sections
  const termsSections = [
    {
      title: "1. Platform Usage",
      content:
        "ROOMGI acts as a technology platform connecting users with PGs, hostels, and hotels. ROOMGI does not own or operate these properties.",
    },
    {
      title: "2. Property Information",
      content:
        "All property details are provided by owners or managers. Users are responsible for verifying information before confirming a booking.",
    },
    {
      title: "3. Liability Disclaimer",
      content:
        "ROOMGI is not liable for disputes, service issues, or conflicts arising between users and accommodation providers.",
    },
    {
      title: "4. Payments",
      content:
        "Payments made through ROOMGI are transferred to the respective property owners as per the booking terms.",
    },
    {
      title: "5. User Responsibilities",
      content:
        "Users must provide accurate information and refrain from misuse, fraudulent activity, or violation of platform policies.",
    },
    {
      title: "6. Modifications to Terms",
      content:
        "ROOMGI reserves the right to update or modify these Terms & Conditions at any time. Continued use of the platform indicates acceptance of revised terms.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Terms & Conditions | ROOMGI - Verified PGs & Rooms in India</title>
        <meta
          name="description"
          content="Read ROOMGI's Terms & Conditions to understand the rules, responsibilities, and policies for booking verified PGs, hostels, and hotels across India."
        />
        <meta name="keywords" content="ROOMGI, Terms and Conditions, PG booking India, Hostel booking India, Hotel booking India, Verified accommodation, Online booking rules" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Terms & Conditions | ROOMGI" />
        <meta property="og:description" content="Understand ROOMGI's Terms & Conditions for safe and verified PG, hostel, and hotel bookings in India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/terms-conditions" />
        <meta property="og:image" content="/images/roomgi-logo.png" />

        {/* Structured Data - WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms & Conditions",
            "description": "ROOMGI Terms & Conditions page detailing platform usage, user responsibilities, payments, and liabilities for PG, hostel, and hotel bookings in India.",
            "url": "https://yourdomain.com/terms-conditions",
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
          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Terms & Conditions
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              These Terms & Conditions govern your access to and use of the ROOMGI platform. By using our services, you agree to comply with the terms outlined below.
            </p>
          </header>

          {/* Terms Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            {termsSections.map((section, idx) => (
              <section key={idx} className="bg-gray-50 p-6 rounded-2xl border">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-3">{section.content}</p>
              </section>
            ))}
          </div>

        </div>
      </main>

     
    </div>
  );
}
