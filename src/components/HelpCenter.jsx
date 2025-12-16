import { useState } from "react";
import { Search } from "lucide-react";

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
      title: "Bookings",
      desc: "Help related to PG, Hotel, Hostel and Room bookings.",
      faqs: [
        {
          q: "How do I make a booking?",
          a: "Search → Select property → Choose room → Confirm booking.",
        },
        {
          q: "Can I book monthly PG stays?",
          a: "Yes, ROOMGI supports monthly and long-term stays.",
        },
      ],
    },
    {
      title: "Payments & Refunds",
      desc: "Information about payments, UPI, and refunds.",
      faqs: [
        {
          q: "What payment methods are available?",
          a: "UPI, Cards, Wallets, and Netbanking are supported.",
        },
        {
          q: "How do refunds work?",
          a: "Refunds depend on the property’s cancellation policy.",
        },
      ],
    },
    {
      title: "PG, Hotel, Hostel & Room Rules",
      desc: "Stay rules, deposits, and visit policies.",
      faqs: [
        {
          q: "Is there a security deposit?",
          a: "Security deposits depend on the individual property.",
        },
        {
          q: "Can I visit before booking?",
          a: "Some properties allow visits. Please check the listing details.",
        },
      ],
    },
    {
      title: "Property Owners",
      desc: "Help for partners listing and managing properties.",
      faqs: [
        {
          q: "How do I list my property?",
          a: "Register as a Partner and submit your property details.",
        },
        {
          q: "How do I manage bookings?",
          a: "Bookings can be managed from the ROOMGI Partner Dashboard.",
        },
      ],
    },
  ];

  const filtered = categories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter((f) =>
      f.q.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Help Center
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Find quick answers to common questions about bookings, payments,
              PG rules, hosting, and more.
            </p>
          </header>

          {/* Search */}
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

          {/* FAQ Categories */}
          <div className="space-y-10 max-w-5xl mx-auto">
            {filtered.map((cat, catIndex) => (
              <section
                key={catIndex}
                className="bg-gray-50 p-8 rounded-2xl border"
              >
                <h2 className="text-2xl font-semibold text-green-700">
                  {cat.title}
                </h2>
                <p className="text-gray-600 mt-1 mb-6">
                  {cat.desc}
                </p>

                <ul className="space-y-5">
                  {cat.faqs.map((faq, faqIndex) => (
                    <li
                      key={faqIndex}
                      className="cursor-pointer border-b pb-4"
                      onClick={() => toggleFaq(catIndex, faqIndex)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">
                          {faq.q}
                        </p>
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
