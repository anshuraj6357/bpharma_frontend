import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass =
    "block text-sm text-gray-300 hover:text-white transition-all duration-200 cursor-pointer";

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10 px-6 sm:px-12 lg:px-24">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* COMPANY */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Company</h2>
          <ul className="space-y-2">
            <li><a href="/aboutus" onClick={(e)=>handleNav(e,"/aboutus")} className={linkClass}>About Us</a></li>
            <li><a href="/founder" onClick={(e)=>handleNav(e,"/founder")} className={linkClass}>Founder</a></li>
            <li><a href="/careers" onClick={(e)=>handleNav(e,"/careers")} className={linkClass}>Careers</a></li>
            <li><a href="/media" onClick={(e)=>handleNav(e,"/media")} className={linkClass}>Media / Press</a></li>
            <li><a href="/blog" onClick={(e)=>handleNav(e,"/blog")} className={linkClass}>Blog</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Support</h2>
          <ul className="space-y-2">
            <li><a href="/helpcenter" onClick={(e)=>handleNav(e,"/helpcenter")} className={linkClass}>Help Center</a></li>
            <li><a href="/faqs" onClick={(e)=>handleNav(e,"/faqs")} className={linkClass}>FAQs</a></li>
            <li><a href="/customersupport" onClick={(e)=>handleNav(e,"/customersupport")} className={linkClass}>Customer Support</a></li>
            <li><a href="/contactus" onClick={(e)=>handleNav(e,"/contactus")} className={linkClass}>Contact Us</a></li>
            <li><a href="/reportissue" onClick={(e)=>handleNav(e,"/reportissue")} className={linkClass}>Report an Issue</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Services</h2>
          <ul className="space-y-2">
            <li><a href="/partnerwithroomgi" onClick={(e)=>handleNav(e,"/partnerwithroomgi")} className={linkClass}>Partner with Roomgi</a></li>
            <li><a href="/listproperty" onClick={(e)=>handleNav(e,"/listproperty")} className={linkClass}>List Your Property</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Legal</h2>
          <ul className="space-y-2">
            <li><a href="/privacypolicy" onClick={(e)=>handleNav(e,"/privacypolicy")} className={linkClass}>Privacy Policy</a></li>
            <li><a href="/termsandcondition" onClick={(e)=>handleNav(e,"/termsandcondition")} className={linkClass}>Terms & Conditions</a></li>
            <li><a href="/shippingpolicy" onClick={(e)=>handleNav(e,"/shippingpolicy")} className={linkClass}>Shipping Policy</a></li>
            <li><a href="/CancellationPolicy" onClick={(e)=>handleNav(e,"/CancellationPolicy")} className={linkClass}>Cancellation & Refund</a></li>
            <li><a href="/disclaimer" onClick={(e)=>handleNav(e,"/disclaimer")} className={linkClass}>Disclaimer</a></li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Connect With Us</h2>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/share/17Pg2nzg3s/" target="_blank" rel="noreferrer"
              className="p-3 rounded-full bg-blue-600 hover:brightness-125 transition">
              <Facebook className="w-5 h-5"/>
            </a>
            <a href="https://www.instagram.com/roomgi_officials" target="_blank" rel="noreferrer"
              className="p-3 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 hover:scale-110 transition">
              <Instagram className="w-5 h-5"/>
            </a>
            <a href="https://youtube.com/@goroomgi" target="_blank" rel="noreferrer"
              className="p-3 rounded-full bg-red-600 hover:brightness-125 transition">
              <Youtube className="w-5 h-5"/>
            </a>
            <a href="https://www.linkedin.com/company/roomgi" target="_blank" rel="noreferrer"
              className="p-3 rounded-full bg-blue-700 hover:brightness-125 transition">
              <Linkedin className="w-5 h-5"/>
            </a>
            <a href="https://x.com/teamroomgi" target="_blank" rel="noreferrer"
              className="p-3 rounded-full bg-sky-400 hover:brightness-125 transition">
              <Twitter className="w-5 h-5"/>
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-14 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © 2026 Roomgi Private Limited | CIN: U68100UP2026PTC240368  
        <br />
        <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
      </div>
    </footer>
  );
}
