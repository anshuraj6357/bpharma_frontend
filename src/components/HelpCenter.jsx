import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (catIndex, faqIndex) => {
    setOpenFaq((prev) => ({
      ...prev,
      [`${catIndex}-${faqIndex}`]: !prev[`${catIndex}-${faqIndex}`],
    }));
  };

  const categories = [
    {
      title: "Rentals, PGs & Shared Stays",
      desc: "PGs, hostels, rooms, shared flats & long-term rentals.",
      faqs: [
        {
          q: "How do I book a PG, room, or rental flat?",
          a: "Search your city, apply filters, compare verified properties, view real photos, and contact the owner or book directly."
        },
        {
          q: "Does ROOMGI support monthly stays?",
          a: "Yes. Most PGs, hostels, and shared accommodations support monthly and long-term stays."
        },
        {
          q: "Can I visit the property before renting?",
          a: "Yes, if allowed by the owner, you can request a physical or virtual visit."
        }
      ]
    },

    {
      title: "Buying Property (Flats, Homes, Villas)",
      desc: "Help for buying residential properties.",
      faqs: [
        {
          q: "Can I buy a flat or home on ROOMGI?",
          a: "Yes. You can browse verified flats, houses, villas, and independent homes and directly connect with genuine sellers."
        },
        {
          q: "Are properties legally verified?",
          a: "We focus on owner verification, document checks (where applicable), and fraud prevention."
        },
        {
          q: "Can I schedule a visit before buying?",
          a: "Yes. Property visits and virtual tours are available when enabled by the seller."
        }
      ]
    },

    {
      title: "Selling Property",
      desc: "Help for owners selling homes, flats & land.",
      faqs: [
        {
          q: "Can I sell my property on ROOMGI?",
          a: "Yes. Owners can list flats, homes, villas, and plots for sale and reach genuine buyers."
        },
        {
          q: "How do I list my property?",
          a: "Sign up, go to List Property, add details, upload photos, and submit your listing."
        },
        {
          q: "Is there any brokerage?",
          a: "ROOMGI aims to reduce brokerage. Some service fees may apply depending on services used."
        }
      ]
    },

    {
      title: "Office & Commercial Properties",
      desc: "For startups, businesses & investors.",
      faqs: [
        {
          q: "Does ROOMGI list office spaces?",
          a: "Yes. You can find office spaces, coworking hubs, and commercial buildings."
        },
        {
          q: "Can I rent or buy commercial property?",
          a: "Yes. Both rental and sale listings are available for commercial spaces."
        }
      ]
    },

    {
      title: "Hotels & Short Stays",
      desc: "Short-term stays, hotels, business travel.",
      faqs: [
        {
          q: "Does ROOMGI offer hotel bookings?",
          a: "Yes. ROOMGI lists verified hotels and short-term stays."
        },
        {
          q: "Are hotel listings verified?",
          a: "We prioritize genuine properties, real photos, and transparency."
        }
      ]
    },

    {
      title: "Payments, Cancellations & Refunds",
      desc: "Payment, deposit & refund help.",
      faqs: [
        {
          q: "What payment methods are supported?",
          a: "UPI, debit cards, credit cards, net banking, and wallets."
        },
        {
          q: "How do refunds work?",
          a: "Refunds depend on the property’s cancellation policy."
        },
        {
          q: "Is there a security deposit?",
          a: "Some properties may require a refundable security deposit."
        }
      ]
    },

    {
      title: "Trust, Safety & Verification",
      desc: "Your safety is our priority.",
      faqs: [
        {
          q: "Are properties on ROOMGI verified?",
          a: "Yes. We focus on real photos, owner verification, and fraud prevention."
        },
        {
          q: "Is ROOMGI safe for students and professionals?",
          a: "Yes. ROOMGI is built for people moving to new cities."
        }
      ]
    },

    {
      title: "For Property Owners & Agents",
      desc: "List, manage & grow.",
      faqs: [
        {
          q: "How do I list my property?",
          a: "Sign up as an owner or agent and submit your property details."
        },
        {
          q: "How do I manage leads?",
          a: "All leads and inquiries are managed through your dashboard."
        }
      ]
    }
  ];

  const filtered = categories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter((f) =>
      f.q.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    )
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>Help Center | ROOMGI – Rentals, Buy & Sell, Hotels, Offices</title>
        <meta
          name="description"
          content="ROOMGI Help Center for PGs, rentals, buying & selling flats, homes, hotels, office spaces, refunds, safety, and verification."
        />
        <link rel="canonical" href="https://www.roomgi.com/help" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              ROOMGI Help Center
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              Rentals • Buy • Sell • Hotels • Offices
            </p>
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
              Support for renting, buying, selling homes, booking PGs, hotels, and commercial spaces.
            </p>
          </header>

          <div className="max-w-2xl mx-auto relative mb-16">
            <Search className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="space-y-10 max-w-5xl mx-auto">
            {filtered.map((cat, catIndex) => (
              <section key={catIndex} className="bg-gray-50 p-8 rounded-2xl border">
                <h2 className="text-2xl font-semibold text-green-700">{cat.title}</h2>
                <p className="text-gray-600 mt-1 mb-6">{cat.desc}</p>

                <ul className="space-y-5">
                  {cat.faqs.map((faq, faqIndex) => (
                    <li
                      key={faqIndex}
                      className="cursor-pointer border-b pb-4"
                      onClick={() => toggleFaq(catIndex, faqIndex)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">{faq.q}</p>
                        <span className="text-gray-500 text-xl">
                          {openFaq[`${catIndex}-${faqIndex}`] ? "−" : "+"}
                        </span>
                      </div>

                      {openFaq[`${catIndex}-${faqIndex}`] && (
                        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
