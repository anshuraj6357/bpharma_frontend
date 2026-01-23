import React from "react";
import { Helmet } from "react-helmet";
import { ShieldCheck, MapPin, Mail, AlertTriangle } from "lucide-react";

export default function SafetyGuidelinesPage() {
  const guidelines = [
    {
      title: "Verified Listings Only",
      description:
        "All properties listed on ROOMGI go through physical verification and document audits. Only 100% verified properties are shown to users to prevent rental scams.",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Transparent Pricing",
      description:
        "ROOMGI promotes direct-from-owner listings. No hidden brokerage charges. Users always know the final rental cost upfront.",
      icon: <MapPin className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Secure Transactions",
      description:
        "Payments are made through secure gateways with encryption, protecting users’ financial information.",
      icon: <Mail className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Report Suspicious Listings",
      description:
        "If you encounter a suspicious listing or owner, report it immediately via our 'Report an Issue' form. Our team responds within 24 hours.",
      icon: <AlertTriangle className="w-6 h-6 text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Helmet>
        <title>Safety Guidelines | ROOMGI - Verified Rentals in India</title>
        <meta
          name="description"
          content="ROOMGI ensures safe and verified rentals in India. Follow our safety guidelines for secure property discovery, transparent pricing, and fraud prevention."
        />
        <meta
          name="keywords"
          content="ROOMGI safety, verified PGs, secure rentals India, rental safety tips, property verification"
        />
        <link rel="canonical" href="https://www.roomgi.com/safety-guidelines" />
      </Helmet>

      {/* HERO */}
      <header className="bg-green-50 py-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Safety Guidelines
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          ROOMGI prioritizes your safety. Learn how we verify properties and protect our users.
        </p>
      </header>

      {/* GUIDELINES */}
      <main className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {guidelines.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-6 rounded-3xl shadow-md bg-green-50 border-l-4 border-green-600 hover:shadow-xl transition-all"
          >
            <div>{item.icon}</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </main>

      {/* REPORT AN ISSUE CTA */}
      <section className="bg-green-600 text-white py-16 px-6 text-center rounded-3xl mx-6 md:mx-auto max-w-4xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Encountered a Problem?</h2>
        <p className="mb-6 text-lg">
          Report any suspicious listings, owners, or safety concerns. Our team responds promptly to ensure secure rentals.
        </p>
        <a
          href="/reportissue"
          className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 transition-all shadow-lg"
        >
          Report an Issue
        </a>
      </section>


    </div>
  );
}
