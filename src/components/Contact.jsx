import React, { useMemo } from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const structuredData = useMemo(() => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact ROOMGI",
        "url": "https://roomgi.com/contact",
        "description":
          "Contact ROOMGI for PG bookings, rental homes, buying, selling properties, and hotel stays across India.",
        "publisher": {
          "@type": "Organization",
          "name": "ROOMGI",
          "url": "https://roomgi.com",
          "logo": "https://roomgi.com/images/roomgi-logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9876543210",
          "contactType": "Customer Support",
          "availableLanguage": ["English", "Hindi"]
        }
      }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>Contact ROOMGI | PG, Rentals, Homes & Hotels Support</title>
        <meta
          name="description"
          content="Need help with PG booking, rental homes, buying or selling property, or hotel stays? Contact ROOMGI support team for quick assistance."
        />
        <meta
          name="keywords"
          content="contact ROOMGI, PG support, rental home help, buy sell property India, hotel booking support"
        />
        <link rel="canonical" href="https://roomgi.com/contact" />

        {structuredData.map((data, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Contact <span className="text-green-600">ROOMGI</span>
            </h1>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
              Have questions about PG bookings, rental homes, buying, selling, or
              hotel stays? Our team is here to help you every step of the way.
            </p>
          </header>

          {/* Trust Strip */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
            {[
              "Fast Support",
              "Verified Assistance",
              "No Spam, No Bots"
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-xl border font-semibold text-gray-700"
              >
                {item}
              </div>
            ))}
          </section>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Call Us
              </h3>
              <p className="text-gray-600">Speak to our support team</p>
              <p className="font-semibold text-green-600 mt-3">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">Drop us a message</p>
              <p className="font-semibold text-green-600 mt-3">
                support@roomgi.com
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Office
              </h3>
              <p className="text-gray-600">
                Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <section className="bg-gray-50 border rounded-2xl shadow-md p-10 max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us how we can help..."
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
              >
                Get Support
              </button>
            </form>
          </section>

          {/* Map Section */}
          <section className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Visit Our Office
            </h2>

            <iframe
              title="ROOMGI Location"
              src="https://maps.google.com/maps?q=Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-80 rounded-2xl shadow-lg border"
              loading="lazy"
            ></iframe>
          </section>

        </div>
      </main>
    </div>
  );
}
