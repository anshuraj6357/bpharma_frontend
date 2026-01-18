import { useState, useMemo } from "react";
import { Search, ChevronDown, Home, Building, Key, CreditCard, ShieldCheck, Briefcase, Hotel, Tag } from "lucide-react";
import { Helmet } from "react-helmet";

const HELP_DATA = [
  {
    title: "Rentals & Shared Stays",
    icon: <Home className="w-6 h-6" />,
    desc: "PGs, hostels, rooms, and shared flats.",
    faqs: [
      { q: "How do I book a PG or rental flat?", a: "Search your city, apply filters, compare verified properties, view real photos, and contact the owner or book directly." },
      { q: "Does ROOMGI support monthly stays?", a: "Yes. Most PGs, hostels, and shared accommodations support monthly and long-term stays." },
      { q: "Can I visit the property before renting?", a: "Yes, if allowed by the owner, you can request a physical or virtual visit." }
    ]
  },
  {
    title: "Buying Property",
    icon: <Key className="w-6 h-6" />,
    desc: "Flats, villas, and residential homes.",
    faqs: [
      { q: "Can I buy a flat or home on ROOMGI?", a: "Yes. Browse verified flats, houses, villas, and independent homes and connect with genuine sellers." },
      { q: "Are properties legally verified?", a: "We focus on owner verification, document checks, and fraud prevention for all sales listings." }
    ]
  },
  {
    title: "Selling Property",
    icon: <Tag className="w-6 h-6" />,
    desc: "For owners and developers.",
    faqs: [
      { q: "Can I sell my property on ROOMGI?", a: "Yes. Owners can list flats, homes, villas, and plots to reach thousands of genuine buyers." },
      { q: "How do I list my property?", a: "Sign up, go to 'List Property', add your details, upload HD photos, and submit for verification." }
    ]
  },
  {
    title: "Office & Commercial",
    icon: <Briefcase className="w-6 h-6" />,
    desc: "Startups and business spaces.",
    faqs: [
      { q: "Does ROOMGI list office spaces?", a: "Yes. Find office spaces, coworking hubs, and full commercial buildings for rent or sale." }
    ]
  },
  {
    title: "Hotels & Short Stays",
    icon: <Hotel className="w-6 h-6" />,
    desc: "Travel and business stays.",
    faqs: [
      { q: "Does ROOMGI offer hotel bookings?", a: "Yes. ROOMGI lists verified hotels and serviced apartments for short-term stays." }
    ]
  },
  {
    title: "Payments & Refunds",
    icon: <CreditCard className="w-6 h-6" />,
    desc: "Security deposits and billing.",
    faqs: [
      { q: "What payment methods are supported?", a: "We support UPI, Debit/Credit cards, Net Banking, and major Digital Wallets." },
      { q: "How do refunds work?", a: "Refunds are processed according to the specific property's cancellation policy." }
    ]
  }
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  // Instant filtering for high-traffic performance
  const filtered = useMemo(() => {
    if (!query) return HELP_DATA;
    const q = query.toLowerCase();
    return HELP_DATA.map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    })).filter(cat => cat.faqs.length > 0);
  }, [query]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": HELP_DATA.flatMap(cat => cat.faqs.map(f => ({
      "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a }
    })))
  }), []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      <Helmet>
        <title>Help Center | ROOMGI – Real Estate & Rental Support</title>
        <meta name="description" content="Find support for PGs, flats, commercial offices, and hotel bookings. Official ROOMGI Help Center." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* 1. HERO SEARCH SECTION */}
      <section className="bg-gray-50 pt-24 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6">
            Help <span className="text-green-600">Center</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-medium">
            Everything you need to know about renting, buying, and selling on ROOMGI.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5">
              <Search className="ml-4 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for 'Refunds', 'PGs in Noida', 'Selling'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-4 focus:outline-none text-lg rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* 2. CATEGORY GRID (Visible when not searching) */}
        {!query && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {HELP_DATA.map((cat, i) => (
              <a 
                key={i} 
                href={`#cat-${i}`}
                className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-green-100 transition-all group"
              >
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
              </a>
            ))}
          </div>
        )}

        {/* 3. FAQ LISTINGS */}
        <div className="max-w-4xl mx-auto space-y-16">
          {filtered.map((cat, catIdx) => (
            <div key={catIdx} id={`cat-${catIdx}`} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-8 border-l-4 border-green-500 pl-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-900">{cat.title}</h2>
              </div>
              
              <div className="space-y-3">
                {cat.faqs.map((faq, faqIdx) => {
                  const id = `${catIdx}-${faqIdx}`;
                  const isOpen = openId === id;
                  return (
                    <div 
                      key={id} 
                      className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-green-200 bg-green-50/20' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    >
                      <button
                        onClick={() => setOpenId(isOpen ? null : id)}
                        className="w-full flex justify-between items-center p-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-[17px] font-bold ${isOpen ? 'text-green-800' : 'text-gray-700'}`}>
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-600' : 'text-gray-300'}`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-green-100/50 pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed">
              <p className="text-xl text-gray-400 font-medium">No help topics found matching "{query}"</p>
            </div>
          )}
        </div>

        {/* 4. PREMIUM CTA BOX */}
        <section className="mt-32 bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Still confused?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Our 24/7 support team is just a message away. We help thousands of seekers daily.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-600/20">
                Talk to Support
              </a>
              <a href="https://wa.me/yournumber" className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold transition-all border border-white/10">
                WhatsApp Us
              </a>
            </div>
          </div>
          {/* Background Glow */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full" />
        </section>
      </main>
    </div>
  );
}