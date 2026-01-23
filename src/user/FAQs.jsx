import { useState, useMemo } from "react";
import { Search, ChevronDown, MessageCircle, Home, MapPin, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet";

// DATA LAYER
const FAQ_CATEGORIES = [
  {
    category: "General & Services",
    id: "general",
    icon: <Home className="w-5 h-5" />,
    items: [
      {
        q: "What is ROOMGI and how does it help property seekers?",
        a: "ROOMGI is a fast-growing real estate discovery platform in India that helps users find PGs, hostels, rental homes, flats, and commercial spaces through a simple and transparent experience."
      },
      {
        q: "Does ROOMGI charge brokerage on rentals?",
        a: "Many listings on ROOMGI are directly posted by property owners and may not involve brokerage. Any applicable service fees are clearly disclosed before booking."
      }
    ]
  },
  {
    category: "Locations & Availability",
    id: "locations",
    icon: <MapPin className="w-5 h-5" />,
    items: [
      {
        q: "Which cities does ROOMGI currently operate in?",
        a: "ROOMGI currently features listings in major Indian cities including Noida, Delhi NCR, and Mumbai. We are rapidly expanding and will be launching in more cities soon."
      },
      {
        q: "Can I expect ROOMGI services in my city?",
        a: "Yes. Our platform is designed to scale across India, and new cities are continuously being onboarded."
      }
    ]
  },
  {
    category: "Safety & Trust",
    id: "safety",
    icon: <ShieldCheck className="w-5 h-5" />,
    items: [
      {
        q: "How does ROOMGI ensure listing authenticity?",
        a: "ROOMGI applies multiple verification checks, including documentation review and on-ground validation where applicable, to reduce the risk of fraudulent listings."
      }
    ]
  }
];

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const filteredData = useMemo(() => {
    if (!query) return FAQ_CATEGORIES;
    const q = query.toLowerCase();
    return FAQ_CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(i =>
        i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)
      )
    })).filter(cat => cat.items.length > 0);
  }, [query]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_CATEGORIES.flatMap(c =>
      c.items.map(i => ({
        "@type": "Question",
        "name": i.q,
        "acceptedAnswer": { "@type": "Answer", "text": i.a }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      <Helmet>
        <title>FAQs & Help Center | ROOMGI – Rental & Property Platform India</title>
        <meta
          name="description"
          content="Get answers about PGs, rental homes, flats, and commercial spaces on ROOMGI. Learn about locations, safety, payments, and platform features."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.roomgi.com/faq" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* HERO */}
      <section className="bg-gray-50 border-b border-gray-100 pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            How can we help <span className="text-green-600">you</span>?
          </h1>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs (locations, safety, payments...)"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 outline-none text-lg"
            />
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {filteredData.map((cat, catIdx) => (
          <section key={cat.id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-green-600">{cat.icon}</div>
              <h2 className="text-xl font-bold">{cat.category}</h2>
            </div>

            <div className="divide-y border-t">
              {cat.items.map((item, itemIdx) => {
                const id = `${catIdx}-${itemIdx}`;
                const isOpen = openId === id;
                return (
                  <div key={id} className="py-2">
                    <button
                      onClick={() => setOpenId(isOpen ? null : id)}
                      className="w-full flex justify-between py-4 text-left"
                    >
                      <h3 className={`font-semibold ${isOpen ? "text-green-600" : ""}`}>
                        {item.q}
                      </h3>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <div className={`transition-all ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                      <p className="text-gray-600 pb-4">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="mt-20 p-10 bg-gray-900 rounded-3xl text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">Our support team is here to help you.</p>
          <a href="/contact" className="bg-green-600 px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Contact Support
          </a>
        </div>
      </main>
    </div>
  );
}
