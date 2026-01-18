import { useState, useMemo } from "react";
import { Search, ChevronDown, MessageCircle, ArrowRight, Home, MapPin, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet";

// 1. DATA LAYER - Moved out of component to prevent re-renders
const FAQ_CATEGORIES = [
  {
    category: "General & Services",
    id: "general",
    icon: <Home className="w-5 h-5" />,
    items: [
      {
        q: "What is ROOMGI and how does it help property seekers?",
        a: "ROOMGI is India’s fastest-growing real estate aggregator. We provide a seamless platform to find PGs, hostels, flats for rent, and commercial office spaces in Noida, Delhi, and Mumbai."
      },
      {
        q: "Does ROOMGI charge brokerage on rentals?",
        a: "Many of our listings are 'Direct from Owner' and 100% brokerage-free. We help you save on high real estate commissions while finding verified homes."
      }
    ]
  },
  {
    category: "Local Real Estate (Noida, Delhi, Mumbai)",
    id: "local",
    icon: <MapPin className="w-5 h-5" />,
    items: [
      {
        q: "In which areas of Delhi-NCR does ROOMGI operate?",
        a: "We have a massive inventory in Noida Sector 62, 126, 150, South Delhi, Laxmi Nagar, and Gurgaon. We specialize in areas near IT parks and universities."
      },
      {
        q: "Can I find commercial office spaces in Mumbai?",
        a: "Yes, ROOMGI features verified commercial listings in Mumbai's hubs like BKC and Andheri, from startup cabins to large corporate floors."
      }
    ]
  },
  {
    category: "Payments & Safety",
    id: "safety",
    icon: <ShieldCheck className="w-5 h-5" />,
    items: [
      {
        q: "How does ROOMGI verify property listings?",
        a: "Our team performs physical verification and document audits for top-tier listings to ensure real photos and prevent rental scams."
      }
    ]
  }
];

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  // 2. SEARCH OPTIMIZATION - Memoized for zero-lag filtering
  const filteredData = useMemo(() => {
    if (!query) return FAQ_CATEGORIES;
    const lowerQuery = query.toLowerCase();
    return FAQ_CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(i => 
        i.q.toLowerCase().includes(lowerQuery) || i.a.toLowerCase().includes(lowerQuery)
      )
    })).filter(cat => cat.items.length > 0);
  }, [query]);

  // 3. SEO SCHEMA - Static generation
  const allItems = FAQ_CATEGORIES.flatMap(c => c.items);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": allItems.map(i => ({
          "@type": "Question",
          "name": i.q,
          "acceptedAnswer": { "@type": "Answer", "text": i.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.roomgi.com" },
          { "@type": "ListItem", "position": 2, "name": "FAQs", "item": "https://www.roomgi.com/faq" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      <Helmet>
        <title>Help Center & FAQs | ROOMGI - Verified PGs, Flats & Offices</title>
        <meta name="description" content="Find answers to PG rentals in Noida, flats in Delhi, and offices in Mumbai. Official ROOMGI support for zero-brokerage property search." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* HERO SECTION - Optimized for LCP (Largest Contentful Paint) */}
      <section className="bg-gray-50 border-b border-gray-100 pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            How can we help <span className="text-green-600">you</span>?
          </h1>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics (e.g. 'Noida', 'Safety')..."
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all text-lg"
            />
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {filteredData.length > 0 ? (
          filteredData.map((cat, catIdx) => (
            <section key={cat.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-green-600">{cat.icon}</div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">{cat.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isOpen = openId === id;
                  return (
                    <div key={id} className="py-2">
                      <button
                        onClick={() => setOpenId(isOpen ? null : id)}
                        className="w-full flex justify-between items-center py-4 text-left group"
                        aria-expanded={isOpen}
                      >
                        <h3 className={`text-[17px] font-semibold transition-colors ${isOpen ? 'text-green-600' : 'text-gray-700 group-hover:text-black'}`}>
                          {item.q}
                        </h3>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-green-600' : ''}`} />
                      </button>
                      
                      {/* CSS-BASED ANIMATION - Faster than JS for high traffic */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600 leading-relaxed text-[16px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No results found for your search.</p>
          </div>
        )}

        {/* CTA SECTION - High Contrast for Conversion */}
        <div className="mt-20 p-8 md:p-12 bg-gray-900 rounded-3xl text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Our local experts in Noida, Delhi, and Mumbai are here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Chat Support
              </a>
              <a href="tel:+91XXXXXXXXXX" className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-bold transition-all border border-white/20">
                Call Expert
              </a>
            </div>
          </div>
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/20 blur-[80px]" />
        </div>
      </main>
    </div>
  );
}