import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  ArrowRight,
  Download,
  Share,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShowInstall(false);
    setDeferredPrompt(null);
  };

  const navGroups = [
    {
      title: "Company",
      links: [
        { name: "About Roomgi", path: "/about" },
        { name: "Mission & Vision", path: "/mission" },
        { name: "Why Roomgi", path: "/why-roomgi" },
        { name: "Careers", path: "/career" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", path: "/faqs" },
        { name: "Help Center", path: "/helpcenter" },
        { name: "Report an Issue", path: "/reportissue" },
        { name: "Contact Support", path: "/contact" },
      ],
    },
    {
      title: "Trust & Legal",
      links: [
        { name: "Safety Guidelines", path: "/safety-guidelines" },
        { name: "Privacy Policy", path: "/privacypolicy" },
        { name: "Terms & Conditions", path: "/termsandcondition" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#020617] pt-24 pb-12 text-slate-300">
      {/* SEO: Hidden H2 for Document Structure */}
      <h2 className="sr-only">Roomgi Footer - Links and Contact Information</h2>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-full -translate-x-1/2 bg-indigo-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* 1. BRAND SECTION */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-black text-white shadow-lg shadow-indigo-500/20">
                R
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Roomgi<span className="text-indigo-500">.</span>
              </span>
            </Link>
            
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              India’s premier broker-free rental ecosystem. Discover verified PGs, flats, and commercial spaces with complete transparency and zero hidden costs.
            </p>

            <address className="mt-8 not-italic">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                    <MapPin size={16} className="text-indigo-400" />
                  </div>
                  <span className="text-sm">Noida, Uttar Pradesh, India</span>
                </div>
                <a href="mailto:support@roomgi.com" className="flex items-center gap-3 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                    <Mail size={16} className="text-indigo-400" />
                  </div>
                  <span className="text-sm hover:text-white transition-colors">support@roomgi.com</span>
                </a>
              </div>
            </address>
          </div>

          {/* 2. NAVIGATION LINKS */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6">
  {/* Column 1: Company */}
  <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
      Company
    </h3>
    <ul className="mt-6 space-y-4">
      <li><Link to="/about" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />About Roomgi
      </Link></li>
      <li><Link to="/mission" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Mission
      </Link></li>
      <li><Link to="/career" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Careers
      </Link></li>
    </ul>
  </div>

  {/* Column 2: Leadership (RESTORED) */}
  <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
      Leadership
    </h3>
    <ul className="mt-6 space-y-4">
      <li><Link to="/founder" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Meet the Founder
      </Link></li>
      <li><Link to="/why-roomgi" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Our Story
      </Link></li>
    </ul>
  </div>

  {/* Column 3: Support */}
  <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
      Support
    </h3>
    <ul className="mt-6 space-y-4">
      <li><Link to="/faqs" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />FAQs
      </Link></li>
      <li><Link to="/contact" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Contact
      </Link></li>
    </ul>
  </div>

  {/* Column 4: Legal */}
  <div>
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
      Legal
    </h3>
    <ul className="mt-6 space-y-4">
      <li><Link to="/privacypolicy" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Privacy
      </Link></li>
      <li><Link to="/termsandcondition" className="group flex items-center text-sm hover:text-indigo-400 transition-all">
        <span className="h-px w-0 bg-indigo-500 transition-all group-hover:mr-2 group-hover:w-3" />Terms
      </Link></li>
    </ul>
  </div>
</nav>
          {/* 2. NAVIGATION LINKS */}


          {/* 3. PWA & SOCIALS SECTION */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
              Connect
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { Icon: Facebook, href: "https://facebook.com/..." },
                { Icon: Instagram, href: "https://instagram.com/..." },
                { Icon: Youtube, href: "https://youtube.com/..." },
                { Icon: Linkedin, href: "https://linkedin.com/..." },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>

            {/* PWA INSTALL CARD */}
            {showInstall && !isIOS && (
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-5 shadow-2xl shadow-indigo-500/20 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Download size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Web App</span>
                </div>
                <p className="text-xs text-indigo-100 font-medium leading-relaxed mb-4">
                  Install Roomgi for a faster, app-like experience.
                </p>
                <button
                  onClick={handleInstallApp}
                  className="w-full rounded-xl bg-white py-2.5 text-xs font-black text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  INSTALL NOW
                </button>
              </div>
            )}

            {/* iOS INSTRUCTIONS */}
            {isIOS && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300 mb-2">
                   <Share size={14} className="text-indigo-400" /> ADD TO HOME SCREEN
                </div>
                <p className="text-[10px] leading-relaxed text-slate-500">
                  Tap <span className="text-indigo-400 font-bold">Share</span> then select <span className="text-white font-bold">"Add to Home Screen"</span> from your Safari browser.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Roomgi Private Limited • Built with ❤️ in India
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link to="/sitemap.xml" className="hover:text-indigo-400 transition-colors">Sitemap</Link>
            <Link to="/privacypolicy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}