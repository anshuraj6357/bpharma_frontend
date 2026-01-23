import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  ShieldCheck,
  Star,
  Users,
  MapPin,
  Mail,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function WhyRoomgi() {
  const [openId, setOpenId] = useState(null);

  const benefits = [
    {
      id: "01",
      icon: <ShieldCheck size={32} />,
      title: "Verified & Safer Listings",
      short:
        "Listings go through multiple checks to reduce fake or misleading properties.",
      long:
        "ROOMGI applies a layered verification process including document review, owner validation, and location checks where feasible. While verification standards evolve, our goal is to continuously reduce fraud and improve trust across the platform.",
    },
    {
      id: "02",
      icon: <Star size={32} />,
      title: "Transparent Pricing Model",
      short:
        "Many properties are listed directly by owners to reduce brokerage costs.",
      long:
        "ROOMGI focuses on transparency. Wherever possible, we enable direct owner connections and clearly display any applicable fees upfront—no surprise charges, no hidden conditions.",
    },
    {
      id: "03",
      icon: <Users size={32} />,
      title: "Growing User Community",
      short:
        "Students, professionals, and families increasingly trust ROOMGI.",
      long:
        "ROOMGI is being adopted by a fast-growing community across India. As we scale, user feedback directly shapes product improvements, safety measures, and listing quality.",
    },
    {
      id: "04",
      icon: <MapPin size={32} />,
      title: "Expanding Across India",
      short:
        "Currently active in select regions, with nationwide expansion underway.",
      long:
        "We are onboarding new cities in phases. Our focus is on building depth and trust in every location before scaling further across India.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* SEO */}
      <Helmet>
        <title>Why ROOMGI | Smarter & Safer Rental Discovery</title>
        <meta
          name="description"
          content="ROOMGI helps people discover safer, transparent rental homes with verified listings and an expanding nationwide presence."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* HERO */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-6">
          <div className="w-8 h-[2px] bg-emerald-600" />
          The ROOMGI Advantage
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          More than just <br />
          <span className="text-emerald-600">Rentals.</span>
        </h1>

        <p className="text-slate-500 text-xl md:text-2xl max-w-3xl font-medium">
        ROOMGI is building a transparent, technology-driven real estate ecosystem for renting, buying, and selling flats, houses, PGs, hostels, hotels, and commercial properties—designed to scale responsibly across India.

        </p>
      </header>

      {/* BENEFITS */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="space-y-24">
          {benefits.map((item) => {
            const isOpen = openId === item.id;
            return (
              <section
                key={item.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-emerald-100 font-black text-5xl italic">
                    {item.id}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black">{item.title}</h3>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <p className="text-slate-500 text-xl font-medium mb-4">
                    {item.short}
                  </p>

                  {isOpen && (
                    <p className="text-slate-600 text-lg leading-relaxed mb-4">
                      {item.long}
                    </p>
                  )}

                  <button
                    onClick={() =>
                      setOpenId(isOpen ? null : item.id)
                    }
                    className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    {isOpen ? "Show less" : "Learn more"}
                    <ChevronDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      size={18}
                    />
                  </button>
                </div>

                <div className="absolute -bottom-12 left-0 w-full h-px bg-slate-100" />
              </section>
            );
          })}
        </div>

        {/* TRUST / CONTACT */}
        <section className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t pt-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to find your{" "}
              <span className="text-emerald-600 underline underline-offset-8">
                safe space?
              </span>
            </h2>

            <p className="text-slate-500 text-lg font-medium mb-10">
              We’re building this platform step by step—focused on trust,
              transparency, and long-term value.
            </p>

            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Continuous Verification
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Transparent Policies
                </span>
              </div>
            </div>
          </div>

          {/* SUPPORT */}
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <h4 className="text-2xl font-bold mb-8">Direct Support</h4>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6" />
                <span className="text-xl font-bold">support@roomgi.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6" />
                <span className="text-xl font-bold">
                  India • Expanding Soon
                </span>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} ROOMGI Private Limited
          </p>
        </div>
      </footer>
    </div>
  );
}
