import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Custom navigation function (navigate + scroll-to-top)
  const goto = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Active styling
  const linkClass = (path) =>
    `cursor-pointer hover:opacity-100 duration-200 ${
      location.pathname === path ? "text-green-400 font-semibold" : "opacity-90"
    }`;

  return (
    <footer className="bg-gradient-to-b from-[#2c1a12] to-[#c62828] text-white pt-16 pb-10 px-6 sm:px-12 lg:px-24">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Company
          </h2>
          <ul className="space-y-2 text-sm opacity-90">

            <li
              onClick={() => goto("/aboutus")}
              className={linkClass("/aboutus")}
            >
              About Us
            </li>

            <li
              onClick={() => goto("/shippingpolicy")}
              className={linkClass("/shippingpolicy")}
            >
              Shipping Policy
            </li>

            <li
              onClick={() => goto("/termsandcondition")}
              className={linkClass("/termsandcondition")}
            >
              Terms & Conditions
            </li>

            <li
              onClick={() => goto("/privacypolicy")}
              className={linkClass("/privacypolicy")}
            >
              Privacy Policy
            </li>

            <li
              onClick={() => goto("/CancellationPolicy")}
              className={linkClass("/CancellationPolicy")}
            >
              Cancellation & Refund Policy
            </li>

          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Support
          </h2>
          <ul className="space-y-2 text-sm opacity-90">

            <li
              onClick={() => goto("/helpcenter")}
              className={linkClass("/helpcenter")}
            >
              Help Center
            </li>

            <li
              onClick={() => goto("/faqs")}
              className={linkClass("/faqs")}
            >
              FAQs
            </li>

            <li
              onClick={() => goto("/customersupport")}
              className={linkClass("/customersupport")}
            >
              Customer Support
            </li>

            <li
              onClick={() => goto("/contactus")}
              className={linkClass("/contactus")}
            >
              Contact Us
            </li>

          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Services
          </h2>
          <ul className="space-y-2 text-sm opacity-90">

            <li
              onClick={() => goto("/partnerwithroomgi")}
              className={linkClass("/partnerwithroomgi")}
            >
              Partner with Roomgi
            </li>

          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Connect With Us
          </h2>

          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/share/17Pg2nzg3s/" target="_blank" rel="noreferrer">
              <Facebook className="h-7 w-7 hover:opacity-80 duration-200" />
            </a>
            <a href="https://www.instagram.com/roomgi_officials?igsh=amhsMW4wZjU1bTdl" target="_blank" rel="noreferrer">
              <Instagram className="h-7 w-7 hover:opacity-80 duration-200" />
            </a>
            <a href="https://youtube.com/@goroomgi?si=i8VSKi-E-Xoxk9zA" target="_blank" rel="noreferrer">
              <Youtube className="h-7 w-7 hover:opacity-80 duration-200" />
            </a>
            <a href="https://www.linkedin.com/company/roomgi/about/?viewAsMember=true" target="_blank" rel="noreferrer">
              <Linkedin className="h-7 w-7 hover:opacity-80 duration-200" />
            </a>
            <a href="https://x.com/teamroomgi" target="_blank" rel="noreferrer">
              <Twitter className="h-7 w-7 hover:opacity-80 duration-200" />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="mt-14 border-t border-red-900 pt-5 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Roomgi. All rights reserved.
      </div>
    </footer>
  );
}
