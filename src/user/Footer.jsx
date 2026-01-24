import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Download,
  Share,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDeferredPrompt(null);
    } else {
      alert("To install: Tap your browser menu and select 'Add to Home Screen'");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#020617] pt-24 pb-10 text-slate-400">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-full -translate-x-1/2 bg-indigo-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 1. BRAND & IDENTITY (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-black text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                  R
                </div>
                <span className="text-3xl font-black tracking-tighter text-white">
                  Roomgi<span className="text-indigo-500">.</span>
                </span>
              </Link>
              <p className="mt-6 text-sm leading-relaxed text-slate-400 max-w-sm">
                India’s most transparent rental ecosystem. We connect people with 
                verified PGs, flats, and offices with **zero brokerage**.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-all">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-bold text-xs uppercase tracking-widest">Headquarters</p>
                  <p>Noida, Uttar Pradesh, India</p>
                </div>
              </div>

              <a href="mailto:support@roomgi.com" className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-all">
                  <Mail size={18} className="text-indigo-400" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-bold text-xs uppercase tracking-widest">Email Support</p>
                  <p className="group-hover:text-white transition-colors">support@roomgi.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* 2. NAVIGATION (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
              <div className="space-y-10">
                {/* Company Section */}
                <nav>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Company</h3>
                  <ul className="mt-6 space-y-4 text-sm font-medium">
                    {["About Roomgi", "Mission", "Careers"].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-indigo-400 transition-all flex items-center group">
                          <span className="h-[2px] w-0 bg-indigo-500 transition-all group-hover:w-3 group-hover:mr-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {/* Leadership Section */}
                <nav>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Leadership</h3>
                  <ul className="mt-6 space-y-4 text-sm font-medium">
                    <li><Link to="/founder" className="hover:text-indigo-400 transition-all flex items-center group">
                      <span className="h-[2px] w-0 bg-indigo-500 transition-all group-hover:w-3 group-hover:mr-2" />Founder
                    </Link></li>
                    <li><Link to="/why-roomgi" className="hover:text-indigo-400 transition-all flex items-center group">
                      <span className="h-[2px] w-0 bg-indigo-500 transition-all group-hover:w-3 group-hover:mr-2" />Our Story
                    </Link></li>
                  </ul>
                </nav>
              </div>

              <div className="space-y-10">
                {/* Support Section */}
                <nav>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Support</h3>
                  <ul className="mt-6 space-y-4 text-sm font-medium">
                    {["FAQs", "Contact", "Help Center"].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-indigo-400 transition-all flex items-center group">
                          <span className="h-[2px] w-0 bg-indigo-500 transition-all group-hover:w-3 group-hover:mr-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {/* Legal Section */}
                <nav>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Trust & Legal</h3>
                  <ul className="mt-6 space-y-4 text-sm font-medium">
                    {["Privacy Policy", "Terms and Condition"].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-indigo-400 transition-all flex items-center group">
                          <span className="h-[2px] w-0 bg-indigo-500 transition-all group-hover:w-3 group-hover:mr-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* 3. PWA & SOCIALS (3 Cols) */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-6">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* PWA CARD */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-6 border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <ShieldCheck size={40} className="text-indigo-400" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg">
                    <Download size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest">Experience App</span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Get real-time alerts and manage your bookings on the go.
                </p>

                {!isIOS ? (
                  <button
                    onClick={handleInstallApp}
                    className="w-full rounded-xl bg-white py-3 text-xs font-black text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all shadow-lg shadow-white/5"
                  >
                    INSTALL NOW
                  </button>
                ) : (
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white mb-1 uppercase tracking-tighter">
                      <Share size={12} className="text-indigo-400" /> Safari Instructions
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Tap <b className="text-indigo-400">Share</b> then <b className="text-white">Add to Home Screen</b>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. COPYRIGHT BAR */}
        <div className="mt-20 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <span>© {new Date().getFullYear()} Roomgi Private Limited</span>
            <span className="hidden md:block">•</span>
            <span className="text-indigo-500/80">Made with pride in India</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <Link to="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            <Link to="/privacypolicy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}