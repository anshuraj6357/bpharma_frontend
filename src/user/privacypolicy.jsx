import { Helmet } from "react-helmet";
import Footer from "./Footer";
import {
  ShieldCheck,
  Lock,
  Eye,
  Users,
  CreditCard,
  Bell,
  Database,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function PrivacyPolicy() {
  const year = new Date().getFullYear();

  const policies = [
    {
      id: "collection",
      title: "Information We Collect",
      icon: <Database />,
      text:
        "We collect personal information such as name, email address, phone number, location, and booking preferences to provide and improve our services.",
    },
    {
      id: "purpose",
      title: "Purpose of Data Use",
      icon: <Eye />,
      text:
        "Your data is used to process bookings, communicate with property owners, provide support, prevent fraud, and improve platform functionality.",
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: <Users />,
      text:
        "We share limited information only with verified property owners or partners when required to complete a transaction.",
    },
    {
      id: "payments",
      title: "Payments",
      icon: <CreditCard />,
      text:
        "Payments are processed through third-party payment gateways. ROOMGI does not store card numbers, CVV, or banking credentials.",
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: <Globe />,
      text:
        "Cookies are used to enhance user experience, analyze traffic, and personalize content. You may disable cookies via browser settings.",
    },
    {
      id: "security",
      title: "Data Security",
      icon: <Lock />,
      text:
        "We implement reasonable technical and organizational safeguards to protect personal data from unauthorized access or misuse.",
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: <ShieldCheck />,
      text:
        "You may request access, correction, deletion of your personal data, or withdraw consent, subject to applicable laws.",
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: <Database />,
      text:
        "Personal data is retained only as long as required to fulfill legal, regulatory, and business purposes.",
    },
    {
      id: "children",
      title: "Children’s Privacy",
      icon: <ShieldCheck />,
      text:
        "ROOMGI does not knowingly collect personal data from individuals under 18 years of age.",
    },
    {
      id: "jurisdiction",
      title: "Governing Law",
      icon: <ShieldCheck />,
      text:
        "This Privacy Policy is governed by Indian law. Courts located in Uttar Pradesh, India shall have exclusive jurisdiction.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Helmet>
        <title>Privacy Policy | ROOMGI</title>
        <meta
          name="description"
          content="ROOMGI Privacy Policy explains how we collect, use, protect, and manage your personal data."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://roomgi.com/privacy" />
        <meta property="og:title" content="ROOMGI Privacy Policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://roomgi.com/privacy" />
      </Helmet>

      {/* HERO */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black mb-6">
          Privacy <span className="text-emerald-600">Policy</span>
        </h1>
        <p className="text-slate-500 text-xl max-w-3xl">
          We respect your privacy and are committed to protecting your personal data.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Contents
              </p>
              {policies.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 font-bold"
                >
                  <ChevronRight className="w-4 h-4" />
                  {p.title}
                </a>
              ))}
              <div className="mt-12 p-6 bg-slate-50 rounded-2xl border">
                <Mail className="w-6 h-6 text-emerald-600 mb-3" />
                <p className="font-bold">Grievance Officer</p>
                <a
                  href="mailto:privacy@roomgi.com"
                  className="text-emerald-600 font-bold"
                >
                  privacy@roomgi.com
                </a>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-8 space-y-20">
            {policies.map((p, i) => (
              <section key={p.id} id={p.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-emerald-200 font-black text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <h2 className="text-3xl font-black flex items-center gap-3 mb-4">
                  <span className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    {p.icon}
                  </span>
                  {p.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {p.text}
                </p>
              </section>
            ))}

            {/* CTA */}
            <section className="pt-16 border-t">
              <h2 className="text-3xl font-black mb-6">
                Take control of your data
              </h2>
              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold"
                >
                  <Bell className="inline w-5 h-5 mr-2" />
                  Request Data Access
                </a>
                <a
                  href="/privacy.pdf"
                  download
                  className="border-2 px-8 py-4 rounded-2xl font-bold"
                >
                  Download PDF
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t text-center">
        <p className="text-slate-400 text-xs uppercase tracking-widest">
          © {year} ROOMGI • All Rights Reserved
        </p>
      </footer>

      <Footer />
    </div>
  );
}
