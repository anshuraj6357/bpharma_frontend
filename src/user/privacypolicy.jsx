import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ShieldCheck, Lock, Eye, Users, CreditCard, Bell, Database, Globe, ChevronRight, Mail } from "lucide-react";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const policies = [
    { id: "collection", title: "Information We Collect", icon: <Database />, text: "We collect your name, email, phone number, location, and booking preferences to provide a personalized property search experience." },
    { id: "purpose", title: "Purpose of Collection", icon: <Eye />, text: "Your data helps us process bookings, facilitate rentals, enable property sales, and prevent fraudulent listings." },
    { id: "interactions", title: "Data Interactions", icon: <Users />, text: "We share limited data with verified property owners or agents only when you explicitly express interest in a listing." },
    { id: "payments", title: "Secure Payments", icon: <CreditCard />, text: "Payments are handled by PCI-DSS compliant gateways. ROOMGI does not store sensitive card or bank login details." },
    { id: "tracking", title: "Cookies & Tracking", icon: <Globe />, text: "Cookies help us remember your preferences and analyze traffic to improve our property recommendation engine." },
    { id: "security", title: "Data Security", icon: <Lock />, text: "We use AES-256 encryption and industry-standard security protocols to safeguard your personal information." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Helmet>
        <title>Privacy Policy | ROOMGI</title>
      </Helmet>

      {/* --- HERO SECTION (OPEN LAYOUT) --- */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-6">
          <ShieldCheck className="w-4 h-4" /> Updated Jan 2026
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8">
          Privacy <span className="text-emerald-600">First.</span>
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl max-w-3xl font-medium leading-tight">
          At ROOMGI, we protect your personal space—both online and offline. 
          This policy explains how we handle your data with transparency.
        </p>
      </header>

      {/* --- MAIN CONTENT (SIDEBAR + TEXT) --- */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Sidebar: Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Contents</p>
              <nav className="flex flex-col gap-4">
                {policies.map((p) => (
                  <a 
                    key={p.id}
                    href={`#${p.id}`} 
                    className="group flex items-center gap-3 text-slate-500 hover:text-emerald-600 font-bold transition-all"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-emerald-600 transition-all"></span>
                    {p.title}
                  </a>
                ))}
              </nav>

              <div className="mt-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <Mail className="w-8 h-8 text-emerald-600 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Privacy Concerns?</h4>
                <p className="text-sm text-slate-500 mb-6 font-medium">Contact our DPO for any data-related queries.</p>
                <a href="mailto:privacy@roomgi.com" className="text-emerald-600 font-black text-sm hover:underline">privacy@roomgi.com</a>
              </div>
            </div>
          </aside>

          {/* Right Column: Policy Details */}
          <div className="lg:col-span-8 space-y-24">
            {policies.map((p, i) => (
              <section key={p.id} id={p.id} className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-emerald-200 font-black text-4xl group-hover:text-emerald-500 transition-colors">0{i + 1}</span>
                  <div className="h-[1px] flex-1 bg-slate-100"></div>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">{p.icon}</span>
                  {p.title}
                </h2>

                <div className="space-y-6">
                  <p className="text-slate-600 text-xl leading-relaxed font-medium">
                    {p.text} ROOMGI ensures that all data collection is compliant with Indian Digital Personal Data Protection (DPDP) standards. We implement multi-layered encryption to ensure your private details remain secure.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {["End-to-end encryption", "Zero-party data focus", "Audit-ready logs", "AES-256 standards"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-400 font-bold text-sm uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Final CTA Strip (No card, just big impact) */}
            <section className="pt-20 border-t border-slate-100">
              <h2 className="text-4xl font-black mb-8">Take control of your data.</h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200">
                  <Bell className="w-5 h-5" /> Request Data Access
                </button>
                <button className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:border-emerald-600 transition-all">
                  Download PDF
                </button>
              </div>
            </section>
          </div>

        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">ROOMGI Legal Dashboard • 2026</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <a href="/terms" className="hover:text-emerald-600">Terms of Service</a>
             <a href="/cookies" className="hover:text-emerald-600">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}