import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is ROOMGI?",
      a: "ROOMGI is an all-in-one real estate and accommodation platform where you can rent PGs, hostels, rooms, and flats, buy and sell homes, book hotels, and discover office or commercial spaces across India. We focus on verified listings, transparency, and a stress-free property experience.",
    },
    {
      q: "What types of properties are available on ROOMGI?",
      a: "You can find PGs, hostels, shared rooms, rental flats, independent houses, villas, hotels, serviced apartments, office spaces, coworking hubs, shops, and commercial properties for rent, purchase, or sale.",
    },
    {
      q: "How do I book a PG, room, or rental home?",
      a: "Simply search your city or locality, apply filters, compare properties, check real photos, read details, and either book directly or contact the property owner or manager.",
    },
    {
      q: "Does ROOMGI support monthly stays?",
      a: "Yes. Most PGs, hostels, shared rooms, and rental homes on ROOMGI support monthly and long-term stays. The stay duration depends on each property’s rules.",
    },
    {
      q: "Can I buy a flat, house, or villa on ROOMGI?",
      a: "Yes. ROOMGI allows you to browse verified homes, flats, villas, and independent houses for purchase and directly connect with genuine sellers.",
    },
    {
      q: "Can I sell my property on ROOMGI?",
      a: "Yes. Property owners can list their flat, house, villa, or commercial property for sale or rent. This helps you reach genuine buyers and tenants faster.",
    },
    {
      q: "Does ROOMGI list office spaces and commercial properties?",
      a: "Yes. You can find office spaces, coworking hubs, shops, and commercial units suitable for startups, freelancers, and businesses.",
    },
    {
      q: "Does ROOMGI offer hotel bookings?",
      a: "Yes. ROOMGI lists verified hotels and short-stay accommodations for travelers, interns, business visitors, and tourists.",
    },
    {
      q: "Which cities does ROOMGI operate in?",
      a: "ROOMGI currently operates in Noida, Delhi, Ghaziabad, Mumbai, and Gurgaon, with rapid expansion planned across India.",
    },
    {
      q: "Are properties on ROOMGI verified?",
      a: "Yes. We focus on real photos, owner verification, and fraud prevention to ensure a safe and transparent experience.",
    },
    {
      q: "Can I visit a property before renting or buying?",
      a: "Yes. If allowed by the owner, you can request a physical visit or a virtual tour before making your decision.",
    },
    {
      q: "What payment methods are available?",
      a: "ROOMGI supports UPI, debit cards, credit cards, net banking, and wallets depending on the payment gateway and property settings.",
    },
    {
      q: "How do cancellations and refunds work?",
      a: "Each property follows its own cancellation and refund policy. Refunds are processed to the original payment method as per the property’s terms.",
    },
    {
      q: "Is ROOMGI safe for students and working professionals?",
      a: "Yes. ROOMGI is built with safety-first design, verified listings, and transparent information to help students and professionals find secure stays.",
    },
    {
      q: "Can I contact property owners directly?",
      a: "Yes. Direct contact options are available when enabled by the property owner, reducing dependency on brokers.",
    },
    {
      q: "Does ROOMGI charge brokerage?",
      a: "Our goal is to minimize unnecessary brokerage. Some listings may involve service charges depending on location and services provided.",
    },
    {
      q: "Can businesses use ROOMGI?",
      a: "Yes. Businesses can use ROOMGI to find office spaces, coworking hubs, and staff accommodations.",
    },
    {
      q: "How do I list my property on ROOMGI?",
      a: "Sign up, go to the list property section, upload details, photos, pricing, and rules. Our team may verify your listing before publishing.",
    },
    {
      q: "How is ROOMGI different from other platforms?",
      a: "ROOMGI focuses on verified content, transparency, multi-category properties, and a smooth user experience across renting, buying, selling, and short stays.",
    },
  ];

  const filtered = faqs.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase())
  );

  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>FAQs | ROOMGI – Rent, Buy, Sell Homes, PGs, Hotels & Offices</title>
        <meta
          name="description"
          content="Get detailed answers about PG bookings, room rentals, buying & selling flats, hotel stays, office spaces, refunds, safety, and verification on ROOMGI."
        />
        <meta
          name="keywords"
          content="ROOMGI FAQ, PG booking help, rent room FAQ, buy flat FAQ, sell property FAQ, hotel booking help, office space FAQ"
        />
        <link rel="canonical" href="https://www.roomgi.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI Help Center
            </p>
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
              Everything you need to know about renting, buying, selling homes,
              booking PGs, hotels, offices, and more on ROOMGI.
            </p>
          </header>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative mb-16">
            <Search className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-5 max-w-4xl mx-auto">
            {filtered.map((item, index) => (
              <div
                key={index}
                className="border rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900 text-lg">
                    {item.q}
                  </p>
                  <span className="text-2xl text-gray-600">
                    {open === index ? "−" : "+"}
                  </span>
                </div>

                {open === index && (
                  <p className="text-gray-600 mt-4 text-sm leading-relaxed border-t pt-4">
                    {item.a}
                  </p>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No FAQs matched your search.
              </p>
            )}
          </div>

          {/* CTA */}
          <section className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team can help you with PG bookings, rentals, buying,
              selling, hotels, and office spaces.
            </p>
            <a
              href="/contact"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Contact Support
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}
