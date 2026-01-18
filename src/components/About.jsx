import React, { useMemo } from "react";
import { Helmet } from "react-helmet";

const FAQS = [
  {
    question: "What can I rent on ROOMGI?",
    answer:
      "On ROOMGI, you can rent verified PGs, hostels, rooms, shared flats, and rental homes ideal for students and working professionals."
  },
  {
    question: "Can I buy or sell property on ROOMGI?",
    answer:
      "Yes. You can buy and sell flats, houses, villas, and independent homes directly with genuine owners."
  },
  {
    question: "Does ROOMGI offer hotels and short stays?",
    answer:
      "Yes. ROOMGI also lists verified hotels and short-term stays for travelers, interns, and professionals."
  },
  {
    question: "Which cities does ROOMGI operate in?",
    answer:
      "We currently serve Noida, Delhi, Ghaziabad, Mumbai, and Gurgaon, and are expanding rapidly across India."
  }
];

const About = () => {
  const structuredData = useMemo(() => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "ROOMGI",
        "url": "https://roomgi.com",
        "logo": "https://roomgi.com/images/roomgi-logo.png",
        "description":
          "ROOMGI is India’s trusted platform to rent PGs, rooms & flats, buy & sell homes, and book verified hotels.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-green-100">
      <Helmet>
        <title>
          About ROOMGI | Rent PGs, Buy & Sell Homes, Book Hotels in India
        </title>
        <meta
          name="description"
          content="ROOMGI helps you rent PGs, rooms & flats, buy & sell homes, and book verified hotels in Noida, Delhi, Ghaziabad, Mumbai & Gurgaon."
        />
        <meta
          name="keywords"
          content="PG in Noida, PG in Delhi, PG in Ghaziabad, PG in Mumbai, PG in Gurgaon, rent flats, buy home India, sell property, hotel booking"
        />
        <link rel="canonical" href="https://roomgi.com/about" />

        {structuredData.map((data, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Hero */}
        <header className="mb-20">
          <span className="text-green-600 font-bold tracking-widest text-sm uppercase">
            About ROOMGI
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 mb-6 tracking-tight text-slate-950">
            India’s All-in-One Platform for{" "}
            <span className="text-green-600 italic">Rent, Buy & Sell</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            ROOMGI helps students, working professionals, families, and travelers
            find verified PGs, rental homes, flats, hotels, and properties for
            buying and selling — without scams, fake photos, or broker stress.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/rent" className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold">
              Find a Rental
            </a>
            <a href="/buy" className="px-6 py-3 border rounded-full font-semibold">
              Buy a Home
            </a>
            <a href="/sell" className="px-6 py-3 border rounded-full font-semibold">
              Sell Property
            </a>
          </div>
        </header>

        {/* Who We Serve */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-6">Who ROOMGI Is Built For</h2>
          <p className="text-slate-600 mb-10 max-w-3xl">
            ROOMGI is designed for people who move cities for studies, jobs,
            business, or lifestyle upgrades. Whether you need a PG near your
            college or a home to buy, we make it simple and safe.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Students", desc: "Affordable PGs, hostels & rooms near colleges." },
              { title: "Working Professionals", desc: "Shared flats & rental homes near offices." },
              { title: "Families", desc: "Flats, villas & independent homes." },
              { title: "Buyers", desc: "Verified homes with genuine owners." },
              { title: "Sellers", desc: "List & sell your property easily." },
              { title: "Travelers", desc: "Hotels & short-term stays." }
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border border-slate-200 rounded-2xl bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* City SEO */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Available in Major Cities
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "PGs & Rentals in Noida",
              "PGs & Rentals in Delhi",
              "PGs & Rentals in Ghaziabad",
              "PGs & Rentals in Mumbai",
              "PGs & Rentals in Gurgaon"
            ].map((city, i) => (
              <div
                key={i}
                className="p-6 border border-slate-200 rounded-2xl bg-white text-center hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{city}</h3>
                <p className="text-slate-600 text-sm mt-2">
                  Verified homes near colleges & offices
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="mb-24 bg-slate-50 p-10 rounded-3xl border border-slate-200">
          <h2 className="text-3xl font-bold mb-4">Why Trust ROOMGI?</h2>
          <p className="text-slate-600 max-w-3xl mb-8">
            Finding a safe place to live in a new city is stressful. ROOMGI removes
            this stress by verifying every property and showing only real listings.
          </p>

          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Verified PGs, rooms, flats & hotels",
              "Real photos only",
              "No fake listings",
              "Direct owner contact",
              "Transparent pricing",
              "Dedicated support"
            ].map((point, i) => (
              <li key={i} className="flex items-center text-slate-700 font-medium">
                <span className="text-green-500 mr-2">✔</span> {point}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-slate-200 pt-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <summary className="list-none cursor-pointer p-6 flex justify-between items-center font-semibold text-slate-800 group-open:bg-green-50/50">
                  {faq.question}
                  <div className="bg-slate-100 group-open:bg-green-500 group-open:text-white rounded-full p-1">
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-slate-600 text-sm bg-white">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(About);
