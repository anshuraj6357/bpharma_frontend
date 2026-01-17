import { Facebook, Instagram, Youtube, Linkedin, Twitter, Mail, Send, MapPin } from "lucide-react";
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
    <footer className="bg-slate-950 text-white pt-24 pb-12 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION (Subtle glow) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] pointer-events-none" />

    

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* BRAND INFO (3 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="text-3xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">R</div>
            RoomGi<span className="text-indigo-500">.</span>
          </div>
          <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
            India's most trusted broker-free house hunting platform. We help you find rooms that feel like home, minus the brokerage.
          </p>
          <div className="space-y-3">
             <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-indigo-500" />
                <span className="text-sm font-semibold">Noida, Uttar Pradesh, India</span>
             </div>
             <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-indigo-500" />
                <span className="text-sm font-semibold">support@roomgi.com</span>
             </div>
          </div>
        </div>

        {/* LINKS (6 Cols Total) */}
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="/aboutus" onClick={(e)=>handleNav(e,"/aboutus")} className={linkClass}>About Us</a></li>
              <li><a href="/careers" onClick={(e)=>handleNav(e,"/careers")} className={linkClass}>Careers</a></li>
              <li><a href="/blog" onClick={(e)=>handleNav(e,"/blog")} className={linkClass}>Our Blog</a></li>
              <li><a href="/media" onClick={(e)=>handleNav(e,"/media")} className={linkClass}>Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="/faqs" onClick={(e)=>handleNav(e,"/faqs")} className={linkClass}>FAQs</a></li>
              <li><a href="/helpcenter" onClick={(e)=>handleNav(e,"/helpcenter")} className={linkClass}>Help Center</a></li>
              <li><a href="/contactus" onClick={(e)=>handleNav(e,"/contactus")} className={linkClass}>Contact</a></li>
              <li><a href="/reportissue" onClick={(e)=>handleNav(e,"/reportissue")} className={linkClass}>Report Issue</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="/privacypolicy" onClick={(e)=>handleNav(e,"/privacypolicy")} className={linkClass}>Privacy</a></li>
              <li><a href="/termsandcondition" onClick={(e)=>handleNav(e,"/termsandcondition")} className={linkClass}>Terms</a></li>
              <li><a href="/CancellationPolicy" onClick={(e)=>handleNav(e,"/CancellationPolicy")} className={linkClass}>Refunds</a></li>
            </ul>
          </div>
        </div>

        {/* CONNECT (2 Cols) */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">Socials</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: Facebook, link: "https://facebook.com...", color: "hover:bg-blue-600" },
              { Icon: Instagram, link: "https://instagram.com...", color: "hover:bg-gradient-to-tr from-pink-500 to-yellow-500" },
              { Icon: Twitter, link: "https://x.com...", color: "hover:bg-black" },
              { Icon: Linkedin, link: "https://linkedin.com...", color: "hover:bg-blue-700" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 transition-all duration-300 ${social.color} hover:scale-110`}
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
        <p className="text-xs font-medium">
          © 2026 RoomGi Private Limited. CIN: U68100UP2026PTC240368
        </p>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
           <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
           <span className="text-gray-800">|</span>
           <span className="text-indigo-500">Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
}