import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin, Send, MessageSquare, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SEO & Production Data Layer
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ROOMGI Support",
    "description": "Get expert assistance for PG bookings, rental houses, and commercial property deals in Noida, Delhi, and Mumbai.",
    "publisher": {
      "@type": "Organization",
      "name": "ROOMGI",
      "logo": "https://roomgi.com/images/roomgi-logo.png"
    },
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "ROOMGI Headquarters",
      "image": "https://roomgi.com/images/office.jpg",
      "telephone": "+91-9876543210",
      "email": "support@roomgi.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Raj Nagar District Centre",
        "addressLocality": "Ghaziabad",
        "addressRegion": "UP",
        "postalCode": "201002",
        "addressCountry": "IN"
      }
    }
  }), []);

  const handleForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add production API call here
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      <Helmet>
        <title>Contact Us | ROOMGI - Property & Rental Support India</title>
        <meta name="description" content="Talk to ROOMGI experts. Support for PG rentals, flat purchases, and commercial office bookings in Delhi NCR and Mumbai." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full">
            Connect with us
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6">
            Let’s find your <span className="text-green-600">perfect</span> space.
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed">
            Our property consultants are ready to assist you with PGs, 
            luxury rentals, and commercial investments across India.
          </p>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-green-200/20 blur-[120px] rounded-full" />
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        
        {/* 2. CORE CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-10 mb-24">
          <ContactCard 
            icon={<Phone className="w-6 h-6" />}
            title="Call Support"
            detail="+91 98765 43210"
            desc="Available 10 AM - 7 PM"
          />
          <ContactCard 
            icon={<Mail className="w-6 h-6" />}
            title="Email Inquiries"
            detail="support@roomgi.com"
            desc="Response within 2 hours"
          />
          <ContactCard 
            icon={<MapPin className="w-6 h-6" />}
            title="Visit Office"
            detail="Ghaziabad, UP, India"
            desc="RDC Business Hub"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 3. LEFT COLUMN: TRUST & INFO */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why talk to us?</h2>
              <div className="space-y-6">
                <TrustItem 
                  icon={<ShieldCheck className="text-green-600" />} 
                  title="Verified Listings" 
                  text="We manually check properties so you don't have to worry about scams." 
                />
                <TrustItem 
                  icon={<Clock className="text-green-600" />} 
                  title="Instant Response" 
                  text="95% of our inquiries are resolved in under 24 hours." 
                />
                <TrustItem 
                  icon={<CheckCircle className="text-green-600" />} 
                  title="Zero Spam Policy" 
                  text="Your number stays private. No annoying marketing calls." 
                />
              </div>
            </div>

            {/* MAP PREVIEW (FAST LOADING) */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 grayscale hover:grayscale-0 transition-all duration-700">
               <iframe
                title="ROOMGI Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.35515668169!2d77.3820202!3d28.6322896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bb41c50fdf%3A0xe6f06fd26a7798ba!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-72"
                loading="lazy"
              />
            </div>
          </div>

          {/* 4. RIGHT COLUMN: MODERN FORM */}
          <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-green-900/5">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold">Send a Message</h2>
            </div>
            
            <form onSubmit={handleForm} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Full Name" type="text" placeholder="John Doe" />
                <InputGroup label="Phone Number" type="tel" placeholder="+91 00000 00000" />
              </div>
              <InputGroup label="Email Address" type="email" placeholder="john@example.com" />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all outline-none resize-none"
                  placeholder="Tell us about your property requirement..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

// Optimized Sub-Components
function ContactCard({ icon, title, detail, desc }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
      <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
      <p className="text-xl font-bold text-gray-900 mb-2">{detail}</p>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="flex gap-5">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, type, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</label>
      <input 
        type={type} 
        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all outline-none"
        placeholder={placeholder}
        required
      />
    </div>
  );
}