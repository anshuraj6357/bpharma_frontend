import { useState } from "react";
import { Search } from "lucide-react";

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is ROOMGI?",
      a: "ROOMGI is a PG, Hotel, Hostel, and Room booking platform offering verified stays across India.",
    },
    {
      q: "How do I book a room?",
      a: "Search your location, choose a property, select a room type, review details, and confirm your booking.",
    },
    {
      q: "Does ROOMGI support monthly PG, Hotel, Hostel, and Room bookings?",
      a: "Yes. Many listings support long-term stays with monthly rental options.",
    },
    {
      q: "What payment methods are available?",
      a: "UPI, credit/debit cards, net banking, and supported wallets depending on the payment gateway.",
    },
    {
      q: "How do cancellations and refunds work?",
      a: "Each property has its own cancellation policy. Refunds are processed to the original payment method.",
    },
    {
      q: "Can I contact the property owner?",
      a: "Yes. Contact or visit options are available on the listing page if enabled by the property owner.",
    },
  ];

  const filtered = faqs.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Quick answers to common questions about bookings, payments, PG
              stays, safety, and platform usage.
            </p>
          </header>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative mb-16">
            <Search className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
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

        </div>
      </main>
    </div>
  );
}
