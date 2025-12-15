import { useState } from "react";
import { Search } from "lucide-react";

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is ROOMGI?",
      a: "ROOMGI is a PG Hotel, Hostel and Room booking platform offering verified stays across India.",
    },
    {
      q: "How do I book a room?",
      a: "Search your location, choose a property, select room type, review details, and confirm booking.",
    },
    {
      q: "Does ROOMGI support monthly PG Hotel, Hostel and Room bookings?",
      a: "Yes. Many PG Hotel, Hostel and Room and hostel listings support long‑term stays with monthly rent options.",
    },
    {
      q: "What payment methods are available?",
      a: "UPI, credit/debit cards, netbanking, and supported wallets depending on the payment gateway.",
    },
    {
      q: "How do cancellations and refunds work?",
      a: "Each property has its own cancellation policy. Refunds are credited back to your original payment method.",
    },
    {
      q: "Can I contact the property owner?",
      a: "Yes. On each listing page, contact/visit options are available if allowed by the owner.",
    },
  ];

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Quick answers to common questions about bookings, payments, PG stays, safety, and more.
        </p>

        {/* Search */}
        <div className="w-full max-w-xl mx-auto relative mb-12">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border shadow-sm focus:outline-none"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900 text-lg">{item.q}</p>
                <span className="text-2xl text-gray-600">{open === index ? "−" : "+"}</span>
              </div>

              {open === index && (
                <p className="text-gray-600 mt-3 text-sm leading-relaxed border-t pt-3">{item.a}</p>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 text-sm">No FAQs matched your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
