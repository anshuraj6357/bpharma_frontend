import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass =
    "text-sm text-gray-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-1";

  return (
    <footer className="bg-slate-950 text-white pt-28 pb-14 px-6 sm:px-12 lg:px-24 relative overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-black">
              R
            </div>
            <span className="text-3xl font-black tracking-tight">
              Roomgi<span className="text-indigo-500">.</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Roomgi is India’s trusted real estate and rental discovery platform —
            helping students, professionals, families, and travelers find verified
            PGs, rooms, flats, homes, hotels, offices, and commercial spaces without brokers or hidden charges.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={18} className="text-indigo-500" />
              <span className="text-sm font-medium">
                Noida, Uttar Pradesh, India
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={18} className="text-indigo-500" />
              <span className="text-sm font-medium">
                support@roomgi.com
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300 mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li><a href="/about" onClick={(e) => handleNav(e, "/about")} className={linkClass}>About Roomgi</a></li>
              <li><a href="/career" onClick={(e) => handleNav(e, "/career")} className={linkClass}>Career</a></li>
              <li><a href="/blog" onClick={(e) => handleNav(e, "/blog")} className={linkClass}>Blog & Guides</a></li>
              <li><a href="/media" onClick={(e) => handleNav(e, "/media")} className={linkClass}>Press & Media</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300 mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              <li><a href="/faqs" onClick={(e) => handleNav(e, "/faqs")} className={linkClass}>FAQs</a></li>
              <li><a href="/helpcenter" onClick={(e) => handleNav(e, "/helpcenter")} className={linkClass}>Help Center</a></li>
              <li><a href="/contact" onClick={(e) => handleNav(e, "/contact")} className={linkClass}>Contact Support</a></li>
              <li><a href="/reportissue" onClick={(e) => handleNav(e, "/reportissue")} className={linkClass}>Report an Issue</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300 mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              <li><a href="/privacypolicy" onClick={(e) => handleNav(e, "/privacypolicy")} className={linkClass}>Privacy Policy</a></li>
              <li><a href="/termsandcondition" onClick={(e) => handleNav(e, "/termsandcondition")} className={linkClass}>Terms & Conditions</a></li>
              <li><a href="/cancellationpolicy" onClick={(e) => handleNav(e, "/cancellationpolicy")} className={linkClass}>Refund & Cancellation</a></li>
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300 mb-6">
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: Facebook, link: "https://facebook.com" },
              { Icon: Instagram, link: "https://instagram.com" },
              { Icon: Twitter, link: "https://x.com" },
              { Icon: Linkedin, link: "https://linkedin.com" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
        <p className="text-xs font-medium">
          © {new Date().getFullYear()} Roomgi Private Limited. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-semibold uppercase tracking-widest">
          <a href="/sitemap.xml" className="hover:text-white transition-colors">
            Sitemap
          </a>
          <span className="text-gray-800">|</span>
          <span className="text-indigo-500">
            Built with trust in India
          </span>
        </div>
      </div>
    </footer>
  );
}
