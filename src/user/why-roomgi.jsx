import React from "react";
import { Helmet } from "react-helmet";
import { ShieldCheck, Star, Users, MapPin, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function WhyRoomgi() {
  const benefits = [
    {
      id: "01",
      icon: <ShieldCheck size={32} />,
      title: "Verified Listings",
      description: "All properties are verified by our team to ensure you only get real listings without scams or hidden charges. We visit so you don't have to.",
    },
    {
      id: "02",
      icon: <Star size={32} />,
      title: "Zero Brokerage Model",
      description: "Enjoy a completely transparent experience. Connect directly with owners and save thousands on unnecessary middleman fees.",
    },
    {
      id: "03",
      icon: <Users size={32} />,
      title: "Trusted by Thousands",
      description: "Millions of students, professionals, and families have found safe PGs, flats, and offices through ROOMGI's secure ecosystem.",
    },
    {
      id: "04",
      icon: <MapPin size={32} />,
      title: "Pan-India Coverage",
      description: "From Noida to Bangalore, we cover major tech hubs and educational centers, offering diverse verified living spaces.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* SEO */}
      <Helmet>
        <title>Why ROOMGI | Trusted PGs & Flats in India</title>
        <meta name="description" content="Discover why ROOMGI is India’s most trusted rental platform." />
      </Helmet>

      {/* --- HERO HEADER --- */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-6">
          <div className="w-8 h-[2px] bg-emerald-600"></div> The Roomgi Advantage
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
          More than just <br />
          <span className="text-emerald-600">Rentals.</span>
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl max-w-3xl font-medium leading-tight">
          We’ve redesigned the rental experience from the ground up. 
          Focusing on safety, zero-brokerage, and 100% verified listings.
        </p>
      </header>

      {/* --- BENEFITS SECTION (OPEN LIST STYLE) --- */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="space-y-24">
          {benefits.map((item, idx) => (
            <section key={idx} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Numbering */}
              <div className="lg:col-span-1">
                <span className="text-emerald-100 font-black text-5xl group-hover:text-emerald-500 transition-colors duration-500 italic">
                  {item.id}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl w-fit group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                  {item.title}
                </h3>
              </div>

              {/* Description & Action */}
              <div className="lg:col-span-7 lg:pt-2">
                <p className="text-slate-500 text-xl font-medium leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all cursor-pointer">
                  Learn more <ArrowRight size={18} />
                </div>
              </div>

              {/* Divider */}
              <div className="absolute -bottom-12 left-0 w-full h-[1px] bg-slate-100"></div>
            </section>
          ))}
        </div>

        {/* --- TRUST STATS / CONTACT SECTION --- */}
        <section className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-slate-100 pt-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Ready to find your <br /> next <span className="text-emerald-600 underline underline-offset-8 decoration-4">Safe Space?</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium mb-10">
              Join over 50,000+ happy tenants who found their homes without the headache of brokers or hidden fees.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="font-black text-xs uppercase tracking-widest text-slate-400">Verified Daily</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="font-black text-xs uppercase tracking-widest text-slate-400">No Hidden Costs</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-emerald-100 relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-8">Direct Support</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold">support@roomgi.com</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold">Noida, Uttar Pradesh</span>
                  </div>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full"></div>
          </div>
        </section>
      </main>

      {/* --- MINIMALIST FOOTER --- */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} Roomgi Private Limited
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <a href="/faq" className="hover:text-emerald-600 transition-colors">FAQs</a>
             <a href="/safety" className="hover:text-emerald-600 transition-colors">Safety</a>
             <a href="/legal" className="hover:text-emerald-600 transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}