import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  MapPin,
  Mail,
  Target,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function MissionVision() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* SEO */}
      <Helmet>
        <title>Mission & Vision | ROOMGI – Real Estate for Rent, Buy & Sell</title>
        <meta
          name="description"
          content="ROOMGI is building a transparent real estate platform for renting, buying, and selling flats, houses, PGs, hostels, hotels, and commercial properties across India."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* HERO */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-6">
          <div className="w-8 h-[2px] bg-emerald-600" /> Our Purpose
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          Building the <br />
          <span className="text-emerald-600">Future of Real Estate.</span>
        </h1>

        <p className="text-slate-500 text-xl md:text-2xl max-w-3xl font-medium">
          ROOMGI is building a transparent, technology-driven real estate
          ecosystem for renting, buying, and selling residential, shared,
          hospitality, and commercial properties—designed to scale responsibly
          across India.
        </p>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-32">
            {/* MISSION */}
            <section>
              <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Target />
                </span>
                Our Mission
              </h2>

              <p className="text-slate-600 text-2xl leading-relaxed font-medium">
                Our mission is to simplify how people{" "}
                <strong className="text-slate-900">
                  rent, buy, and sell
                </strong>{" "}
                flats, houses, PGs, hostels, hotels, and commercial properties by
                improving trust, transparency, and access to reliable
                information—without unnecessary intermediaries.
              </p>
            </section>

            {/* VISION */}
            <section>
              <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Eye />
                </span>
                Our Vision
              </h2>

              <p className="text-slate-600 text-2xl leading-relaxed font-medium">
                To become India’s most trusted and scalable real estate
                ecosystem—where individuals and businesses can discover,
                evaluate, and transact property with confidence.
              </p>

              {/* INLINE EXPAND (NO REDIRECT) */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-6 flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-sm"
              >
                {showMore ? "Show Less" : "Learn More"}
                <ChevronDown
                  className={`transition-transform ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMore && (
                <p className="mt-6 text-slate-500 text-lg leading-relaxed">
                  We are expanding city by city with a focus on quality,
                  compliance, and user trust. Verification standards, property
                  categories, and platform capabilities will continue to evolve
                  as ROOMGI scales nationwide.
                </p>
              )}
            </section>
          </div>

          {/* RIGHT */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border">
                <ShieldCheck className="w-10 h-10 text-emerald-600 mb-4" />
                <h4 className="text-xl font-black mb-2">
                  Trust-First Approach
                </h4>
                <p className="text-slate-500 text-sm font-medium">
                  Properties and partners are reviewed through evolving
                  verification and quality checks as the platform grows.
                </p>
              </div>

              <div className="space-y-6 px-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-slate-700" />
                  <span className="font-bold">support@roomgi.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-slate-700" />
                  <span className="font-bold">India • Expanding Soon</span>
                </div>
              </div>

              <div className="bg-emerald-600 text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3">
                Platform Rolling Out <ArrowUpRight />
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} ROOMGI Private Limited
          </p>
        </div>
      </footer>
    </div>
  );
}
