import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { ShieldCheck, RefreshCcw, FileText, HelpCircle, ArrowRight, Clock } from "lucide-react";

function PolicyNav() {
  const location = useLocation();
  const policies = [
    { name: "Privacy Policy", href: "/privacypolicy" },
    { name: "Terms & Conditions", href: "/termsandcondition" },
    { name: "Refund Policy", href: "/CancellationPolicy" },
    { name: "Career", href: "/career" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-3 mt-10">
      {policies.map((policy) => {
        const isActive = location.pathname === policy.href;
        return (
          <Link
            key={policy.href}
            to={policy.href}
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-sm border ${
              isActive 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200" 
                : "bg-white text-slate-600 border-slate-100 hover:border-emerald-200 hover:text-emerald-600"
            }`}
          >
            {policy.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function CancellationPolicy() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Platform Role",
      content: "ROOMGI acts as a digital bridge connecting you with property owners and managers. We facilitate the platform, but the ultimate service delivery and property-specific rules are managed by the respective owners."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Property-Specific Rules",
      content: "Cancellation terms are not one-size-fits-all. Each PG, Hotel, or Office space has its own 'Cancellation Window'. Always check the 'House Rules' section on the listing page before paying."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Refund Timeline",
      content: "Once a refund is approved by the property owner, ROOMGI initiates the transfer. It typically takes 5–7 working days for the amount to reflect in your original payment method (UPI/Bank/Card)."
    }
  ];

  const nonRefundable = [
    "No-show by the guest or tenant",
    "Last-minute/Same-day cancellations",
    "Violation of property conduct rules",
    "Incorrect information provided during booking",
    "Partial stays or early check-outs"
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased">
      <Helmet>
        <title>Refund & Cancellation Policy | ROOMGI</title>
        <meta name="description" content="Transparent refund policies for PGs, Flats, and Hotels on ROOMGI." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 px-6 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent opacity-70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-4 py-1.5 rounded-full text-emerald-700 text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
            <Clock className="w-4 h-4" /> Policy Version 2.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Cancellation & <span className="text-emerald-600">Refunds</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Clear, honest, and transparent rules. We ensure your money is handled with the same care as your stay.
          </p>

          <PolicyNav />
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-12 pb-32 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 group hover:border-emerald-500 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">{section.title}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Non-Refundable Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <HelpCircle className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold italic tracking-tight">Non-Refundable Scenarios</h2>
              </div>
              
              <ul className="space-y-4">
                {nonRefundable.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Need Help?</p>
                <p className="text-sm text-slate-300 mb-4 italic">Our support team is available 24/7 for refund disputes.</p>
                <Link to="/contact" className="text-emerald-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Contact Support <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- REFUND PROCESS TIMELINE --- */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-black mb-12">How the Refund Process <span className="text-emerald-600">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { label: "Request", desc: "Initiate via Dashboard" },
              { label: "Verification", desc: "Owner reviews request" },
              { label: "Approval", desc: "Refund is authorized" },
              { label: "Credit", desc: "Amount hits your bank" }
            ].map((step, i) => (
              <div key={i} className="relative p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {i + 1}
                </span>
                <h3 className="font-bold text-slate-800 mt-2">{step.label}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER STRIP --- */}
      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
          ROOMGI Financial Protection • Secured Transactions
        </p>
        <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full" />
      </footer>

      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}