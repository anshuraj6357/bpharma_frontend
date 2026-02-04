import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact ROOMGI Support",
      description:
        "Get expert assistance for PG bookings, rental houses, and commercial property deals across India.",
      publisher: {
        "@type": "Organization",
        name: "ROOMGI",
        logo: "https://roomgi.com/images/roomgi-logo.png"
      },
      mainEntity: {
        "@type": "LocalBusiness",
        name: "ROOMGI Headquarters",
        telephone: "+91-9876543210",
        email: "support@roomgi.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Raj Nagar District Centre",
          addressLocality: "Ghaziabad",
          addressRegion: "UP",
          postalCode: "201002",
          addressCountry: "IN"
        }
      }
    }),
    []
  );

  const handleForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      <Helmet>
        <title>Contact Us | ROOMGI - Property & Rental Support India</title>
        <meta
          name="description"
          content="Contact ROOMGI experts for PG rentals, flats, and commercial property support across India."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://roomgi.com/contact" />

        {/* OpenGraph */}
        <meta property="og:title" content="Contact ROOMGI Support" />
        <meta
          property="og:description"
          content="Get verified property assistance from ROOMGI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://roomgi.com/contact" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact ROOMGI Support" />
        <meta
          name="twitter:description"
          content="Fast, secure, verified rental support."
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-green-50/50 to-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full">
            Connect with us
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Let’s find your <span className="text-green-600">perfect</span> space.
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Our property consultants are ready to help you across India.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-10 mb-24">
          <ContactCard
            icon={<Phone className="w-6 h-6" />}
            title="Call Support"
            detail="+91 9217577327"
            desc="Available 10 AM - 7 PM"
            href="tel:+919217577327"
          />

          <ContactCard
            icon={<Mail className="w-6 h-6" />}
            title="Email Inquiries"
            detail="support@roomgi.com"
            desc="Response within 2 hours"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@roomgi.com"
          />

          <ContactCard
            icon={<MapPin className="w-6 h-6" />}
            title="Visit Office"
            detail="Ghaziabad, UP, India"
            desc="RDC Business Hub"
            href="https://www.google.com/maps/search/?api=1&query=RDC+Business+Hub+Ghaziabad"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why talk to us?</h2>
              <div className="space-y-6">
                <TrustItem
                  icon={<ShieldCheck className="text-green-600" />}
                  title="Verified Listings"
                  text="Every property is manually verified."
                />
                <TrustItem
                  icon={<Clock className="text-green-600" />}
                  title="Instant Response"
                  text="95% queries resolved within 24 hours."
                />
                <TrustItem
                  icon={<CheckCircle className="text-green-600" />}
                  title="Zero Spam"
                  text="No marketing calls. Ever."
                />
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border shadow-xl grayscale hover:grayscale-0 transition-all">
              <iframe
                title="ROOMGI Location"
                src="https://www.google.com/maps?q=Ghaziabad&output=embed"
                className="w-full h-72"
                loading="lazy"
              />
            </div>
          </div>

          {/* FORM */}
          <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold">Send a Message</h2>
            </div>

            <form onSubmit={handleForm} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Full Name" type="text" placeholder="Your Name" />
                <InputGroup
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 00000 00000"
                />
              </div>
              <InputGroup
                label="Email Address"
                type="email"
                placeholder="john@example.com"
              />

              <div>
                <label className="block text-sm font-bold mb-2 ml-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
                  placeholder="Tell us about your requirement..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function ContactCard({ icon, title, detail, desc, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      aria-label={title}
      className="block"
    >
      <div className="bg-white p-8 rounded-[2rem] border shadow-xl text-center flex flex-col items-center group hover:-translate-y-2 transition-transform cursor-pointer">
        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
          {icon}
        </div>
        <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
        <p className="text-xl font-bold text-gray-900 mb-2">{detail}</p>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </a>
  );
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="flex gap-5">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, type, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 ml-1">{label}</label>
      <input
        type={type}
        className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
