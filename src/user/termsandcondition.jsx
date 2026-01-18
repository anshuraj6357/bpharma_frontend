import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Scale, CheckCircle2, AlertCircle, ShieldAlert, ScrollText, ChevronRight } from "lucide-react";

export default function TermsConditions() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const termsSections = [
    { title: "1. Platform Overview", icon: <ScrollText className="w-5 h-5 text-emerald-600" />, content: "ROOMGI is a technology platform that connects users with property owners, managers, agents, and service providers for PGs, hostels, rooms, rental homes, flats, villas, hotels, office spaces, and commercial properties. ROOMGI does not own or directly operate these properties." },
    { title: "2. Eligibility & Account Responsibility", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, content: "By using ROOMGI, you confirm that you are legally capable of entering into binding agreements. You are responsible for maintaining the confidentiality of your account and for all activities under your account." },
    { title: "3. Property Listings & Accuracy", icon: <AlertCircle className="w-5 h-5 text-emerald-600" />, content: "All property information, images, pricing, availability, and rules are provided by property owners or managers. ROOMGI does not guarantee absolute accuracy and users are advised to verify all details before booking." },
    { title: "4. Payments & Fees", icon: <Scale className="w-5 h-5 text-emerald-600" />, content: "All payments are processed via secure third-party gateways. ROOMGI does not store sensitive financial information. Service fees, if any, will be transparently disclosed." },
    { title: "5. User Conduct", icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />, content: "Users must not engage in fraud, misrepresentation, abuse, illegal activity, or any behavior that harms other users or property owners. Violation may lead to account termination." },
    { title: "6. Dispute Resolution", icon: <Scale className="w-5 h-5 text-emerald-600" />, content: "ROOMGI is not a party to disputes between users and property owners. Disputes must be resolved directly between the involved parties under Indian jurisdiction." }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased">
      <Helmet>
        <title>Terms & Conditions | ROOMGI Legal</title>
        <meta name="description" content="Official Terms and Conditions for using ROOMGI property services." />
      </Helmet>

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-28 pb-40 px-6 bg-gradient-to-b from-emerald-50/60 to-white overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-4 py-1.5 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <Scale className="w-4 h-4" /> Legal Framework 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
            Terms of <span className="text-emerald-600">Service</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Please read these terms carefully before using ROOMGI. By accessing our platform, you agree to be bound by these legal policies.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: STICKY NAVIGATION (UX UPGRADE) */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 space-y-2 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-3">On this page</p>
              {termsSections.map((s, i) => (
                <a 
                  key={i} 
                  href={`#section-${i}`} 
                  className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {s.title.split('. ')[1]}
                </a>
              ))}
            </div>
          </aside>

          {/* RIGHT: CONTENT BLOCKS */}
          <div className="lg:w-3/4 space-y-8">
            {termsSections.map((section, idx) => (
              <section 
                key={idx} 
                id={`section-${idx}`}
                className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/20 hover:border-emerald-100 transition-all scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 transition-colors">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {section.content}
                  </p>
                  <p className="mt-4 text-slate-500 text-sm italic">
                    Refer to our internal compliance documentation for specific sub-clauses related to {section.title.split('. ')[1]}.
                  </p>
                </div>
              </section>
            ))}

            {/* ACCEPTANCE CARD */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  By clicking "Sign Up" or using any part of the ROOMGI platform, 
                  you acknowledge that you have read and agreed to these terms.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20">
                    I Agree to Terms
                  </button>
                  <a href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/10">
                    Contact Legal Dept
                  </a>
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </main>

      {/* MINIMAL FOOTER STRIP */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
            ROOMGI Intellectual Property • All Rights Reserved 2026
          </p>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
        </div>
      </footer>

      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}