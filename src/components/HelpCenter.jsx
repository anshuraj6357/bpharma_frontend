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
      desc: "Help related to PG Hotel, Hostel and Room bookings.",
      faqs: [
        { q: "How do I make a booking?", a: "Search → Select property → Choose room → Confirm booking." },
        { q: "Can I book monthly PG stays?", a: "Yes, ROOMGI supports monthly and long-term stays." },
      ],
    },
    {
      title: "Payments & Refunds",
      desc: "Know how payments, UPI, and refunds work.",
      faqs: [
        { q: "What payment methods are available?", a: "UPI, Cards, Wallets, and Netbanking." },
        { q: "How do refunds work?", a: "Refunds depend on the property's cancellation policy." },
      ],
    },
    {
      title: "PG Hotel, Hostel and Room Rules",
      desc: "Everything about PG Hotel, Hostel and Room stay policies.",
      faqs: [
        { q: "Is there a security deposit?", a: "Deposits depend on the specific PG/Hostel." },
        { q: "Can I visit before booking?", a: "Some properties allow visits, check details on the listing." },
      ],
    },
    {
      title: "Property Owners",
      desc: "Help for partners listing their properties.",
      faqs: [
        { q: "How to list my property?", a: "Register as a Partner and upload property details." },
        { q: "How do I manage bookings?", a: "Use the ROOMGI Partner Dashboard to manage bookings." },
      ],
    },
  ];

  const filtered = categories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase())),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">Help Center</h1>
        <p className="text-center text-gray-600 mb-10">Find answers related to bookings, payments, PG rules, hosting, and more.</p>

        <div className="w-full max-w-xl mx-auto relative mb-12">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search help topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-8">
          {filtered.map((cat, catIndex) => (
            <section key={catIndex} className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="text-2xl font-semibold text-green-700">{cat.title}</h2>
              <p className="text-gray-600 mb-4">{cat.desc}</p>

              <ul className="space-y-4">
                {cat.faqs.map((faq, faqIndex) => (
                  <li
                    key={faqIndex}
                    className="cursor-pointer border-b pb-3"
                    onClick={() => toggleFaq(catIndex, faqIndex)}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800">{faq.q}</p>
                      <span className="text-gray-500">{openFaq[`${catIndex}-${faqIndex}`] ? "−" : "+"}</span>
                    </div>

                    {openFaq[`${catIndex}-${faqIndex}`] && (
                      <p className="text-gray-600 mt-2 text-sm">{faq.a}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}