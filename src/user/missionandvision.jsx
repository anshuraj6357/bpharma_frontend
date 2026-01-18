import React from "react";
import { Helmet } from "react-helmet";
import { MapPin, Mail, Target, Eye, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function MissionVision() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* SEO Tags */}
      <Helmet>
        <title>Mission & Vision | ROOMGI - Trusted PGs & Flats</title>
        <meta name="description" content="Discover ROOMGI's mission to provide verified rental properties in India." />
      </Helmet>

      {/* --- HERO HEADER (OPEN STYLE) --- */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-6">
          <div className="w-8 h-[2px] bg-emerald-600"></div> Our Purpose
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
          Defining the <br />
          <span className="text-emerald-600 font-outline-2">Future</span> of Living.
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl max-w-3xl font-medium leading-tight">
          At ROOMGI, we don't just list properties; we build trust. We are simplifying 
          how India finds its next home, one verified listing at a time.
        </p>
      </header>

      {/* --- MAIN CONTENT (SPLIT LAYOUT) --- */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Left Column: Mission & Vision */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* Section 01: Mission */}
            <section id="mission" className="group">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-emerald-100 font-black text-5xl group-hover:text-emerald-500 transition-all duration-500">01</span>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Target className="w-8 h-8" /></span>
                Our Mission
              </h2>
              <p className="text-slate-600 text-2xl leading-relaxed font-medium">
                Our mission is to provide <span className="text-slate-900 font-bold">verified rental properties</span> across India to students, professionals, and families. 
                We eliminate the noise of hidden charges and intermediaries, ensuring a safe, transparent, and seamless rental journey for everyone.
              </p>
            </section>

            {/* Section 02: Vision */}
            <section id="vision" className="group">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-emerald-100 font-black text-5xl group-hover:text-emerald-500 transition-all duration-500">02</span>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Eye className="w-8 h-8" /></span>
                Our Vision
              </h2>
              <p className="text-slate-600 text-2xl leading-relaxed font-medium">
                To become India's most <span className="text-slate-900 font-bold">trusted real estate ecosystem</span>. 
                We strive to redefine property discovery by connecting seekers with verified owners directly, empowering users to find their ideal space with absolute confidence.
              </p>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar / Contact */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              
              {/* Trust Badge */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <ShieldCheck className="w-10 h-10 text-emerald-600 mb-4" />
                <h4 className="text-xl font-black text-slate-900 mb-2">Verified Only</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Every property on ROOMGI undergoes a rigorous verification process to prevent fraud.
                </p>
              </div>

              {/* Get in Touch */}
              <div className="space-y-6 px-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Get in Touch</p>
                
                <div className="group flex items-center gap-4 cursor-pointer">
                  <div className="p-3 bg-slate-900 text-white rounded-xl group-hover:bg-emerald-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-lg font-bold">support@roomgi.com</p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 cursor-pointer">
                  <div className="p-3 bg-slate-900 text-white rounded-xl group-hover:bg-emerald-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-bold">Noida, Uttar Pradesh</p>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <button className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100">
                Browse Properties <ArrowUpRight className="w-6 h-6" />
              </button>

            </div>
          </aside>
        </div>
      </main>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} Roomgi Private Limited
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <a href="/about" className="hover:text-emerald-600 transition-colors">About</a>
             <a href="/careers" className="hover:text-emerald-600 transition-colors">Careers</a>
             <a href="/contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}