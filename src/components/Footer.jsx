import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goto = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = (path) =>
    `cursor-pointer text-sm transition-all duration-200 ${
      location.pathname === path
        ? "text-rose-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  // Professional social icon wrapper with gradient hover
  const socialClass = (colorFrom, colorTo) =>
    `p-3 rounded-full bg-gray-800 hover:bg-gradient-to-tr hover:from-${colorFrom} hover:to-${colorTo} text-white shadow-lg transition-all duration-300 flex items-center justify-center`;

  return (
    <footer className="relative bg-gray-900 text-white pt-16 pb-10 px-6 sm:px-12 lg:px-24">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Company
          </h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li onClick={() => goto("/aboutus")} className={linkClass("/aboutus")}>About Us</li>
            <li onClick={() => goto("/shippingpolicy")} className={linkClass("/shippingpolicy")}>Shipping Policy</li>
            <li onClick={() => goto("/termsandcondition")} className={linkClass("/termsandcondition")}>Terms & Conditions</li>
            <li onClick={() => goto("/privacypolicy")} className={linkClass("/privacypolicy")}>Privacy Policy</li>
            <li onClick={() => goto("/CancellationPolicy")} className={linkClass("/CancellationPolicy")}>Cancellation & Refund</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Support
          </h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li onClick={() => goto("/helpcenter")} className={linkClass("/helpcenter")}>Help Center</li>
            <li onClick={() => goto("/faqs")} className={linkClass("/faqs")}>FAQs</li>
            <li onClick={() => goto("/customersupport")} className={linkClass("/customersupport")}>Customer Support</li>
            <li onClick={() => goto("/contactus")} className={linkClass("/contactus")}>Contact Us</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Services
          </h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li onClick={() => goto("/partnerwithroomgi")} className={linkClass("/partnerwithroomgi")}>
              Partner with Roomgi
            </li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Connect With Us
          </h2>

          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/share/17Pg2nzg3s/" target="_blank" rel="noreferrer"
               className="p-3 rounded-full bg-blue-600 hover:brightness-125 shadow-lg transition-all duration-300 flex items-center justify-center">
              <Facebook className="h-6 w-6 text-white" />
            </a>
            <a href="https://www.instagram.com/roomgi_officials" target="_blank" rel="noreferrer"
               className="p-3 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <Instagram className="h-6 w-6 text-white" />
            </a>
            <a href="https://youtube.com/@goroomgi" target="_blank" rel="noreferrer"
               className="p-3 rounded-full bg-red-600 shadow-lg hover:brightness-125 transition-all duration-300 flex items-center justify-center">
              <Youtube className="h-6 w-6 text-white" />
            </a>
            <a href="https://www.linkedin.com/company/roomgi" target="_blank" rel="noreferrer"
               className="p-3 rounded-full bg-blue-700 shadow-lg hover:brightness-125 transition-all duration-300 flex items-center justify-center">
              <Linkedin className="h-6 w-6 text-white" />
            </a>
            <a href="https://x.com/teamroomgi" target="_blank" rel="noreferrer"
               className="p-3 rounded-full bg-sky-400 shadow-lg hover:brightness-125 transition-all duration-300 flex items-center justify-center">
              <Twitter className="h-6 w-6 text-white" />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="mt-14 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
     
        © 2026 Roomgi Private Limited | CIN: U68100UP2026PTC240368

      </div>
    </footer>
  );
}