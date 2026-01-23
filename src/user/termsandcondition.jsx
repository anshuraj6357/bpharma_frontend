import { Helmet } from "react-helmet";
import Footer from "./Footer";
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ScrollText,
  ChevronRight,
} from "lucide-react";

export default function TermsConditions() {
  const currentYear = new Date().getFullYear();

  const termsSections = [
    {
      id: "overview",
      title: "Platform Overview",
      icon: <ScrollText className="w-5 h-5 text-emerald-600" />,
      content:
        "ROOMGI is a technology platform that connects users with property owners, managers, and agents. ROOMGI does not own, control, or operate any listed properties and acts only as an intermediary.",
    },
    {
      id: "eligibility",
      title: "Eligibility & Account Responsibility",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      content:
        "You must be legally capable of entering into binding contracts under Indian law. You are responsible for safeguarding your account credentials and all activities conducted under your account.",
    },
    {
      id: "listings",
      title: "Property Listings & Accuracy",
      icon: <AlertCircle className="w-5 h-5 text-emerald-600" />,
      content:
        "All listings are provided by property owners or agents. ROOMGI does not warrant or guarantee the completeness, accuracy, or reliability of any listing. Users must independently verify all details.",
    },
    {
      id: "payments",
      title: "Payments & Fees",
      icon: <Scale className="w-5 h-5 text-emerald-600" />,
      content:
        "Payments are processed via third-party payment gateways. ROOMGI does not store card or banking details. Refunds, chargebacks, and cancellations are subject to the property owner’s policies.",
    },
    {
      id: "conduct",
      title: "User Conduct",
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />,
      content:
        "Users must not engage in fraud, misrepresentation, harassment, illegal activity, or misuse of the platform. Violations may result in suspension or permanent termination.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <Scale className="w-5 h-5 text-emerald-600" />,
      content:
        "ROOMGI shall not be liable for any indirect, incidental, consequential, or punitive damages arising from use of the platform, including disputes between users and property owners.",
    },
    {
      id: "indemnity",
      title: "Indemnification",
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />,
      content:
        "You agree to indemnify and hold ROOMGI harmless from claims, damages, losses, or expenses arising from your use of the platform or violation of these terms.",
    },
    {
      id: "termination",
      title: "Termination of Access",
      icon: <AlertCircle className="w-5 h-5 text-emerald-600" />,
      content:
        "ROOMGI reserves the right to suspend or terminate accounts at its discretion, without prior notice, for violations of these terms or applicable laws.",
    },
    {
      id: "jurisdiction",
      title: "Governing Law & Jurisdiction",
      icon: <Scale className="w-5 h-5 text-emerald-600" />,
      content:
        "These terms shall be governed by Indian law. Courts located in Uttar Pradesh, India shall have exclusive jurisdiction over disputes.",
    },
    {
      id: "changes",
      title: "Modification of Terms",
      icon: <ScrollText className="w-5 h-5 text-emerald-600" />,
      content:
        "ROOMGI may update these terms from time to time. Continued use of the platform constitutes acceptance of revised terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased">
      <Helmet>
        <title>Terms & Conditions | ROOMGI</title>
        <meta
          name="description"
          content="Read the official Terms and Conditions governing the use of ROOMGI property services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://roomgi.com/terms" />
        <meta property="og:title" content="ROOMGI Terms & Conditions" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://roomgi.com/terms" />
      </Helmet>

      {/* HERO */}
      <section className="pt-28 pb-32 px-6 bg-gradient-to-b from-emerald-50/60 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Terms & <span className="text-emerald-600">Conditions</span>
          </h1>
          <p className="text-slate-500 text-xl">
            These terms define your legal relationship with ROOMGI.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border shadow">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                On this page
              </p>
              {termsSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-3 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600"
                >
                  <ChevronRight className="w-4 h-4" />
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <div className="lg:w-3/4 space-y-8">
            {termsSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="bg-white p-10 rounded-3xl border shadow scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  {section.icon}
                  <h2 className="text-2xl font-black">{section.title}</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t text-center">
        <p className="text-slate-400 text-xs uppercase tracking-widest">
          © {currentYear} ROOMGI • All Rights Reserved
        </p>
      </footer>

      <Footer />
    </div>
  );
}
