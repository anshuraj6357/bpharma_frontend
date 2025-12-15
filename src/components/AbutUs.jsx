import { Building2, Users, Globe2, Star, HeartHandshake, Target, Rocket, Briefcase, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function AboutUs() {

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* MAIN CONTENT */}
      <main className="flex-1 py-20 px-6">
        <div className="max-w-7xl mx-auto bg-white p-14 rounded-3xl shadow-2xl border border-gray-200">

          {/* HERO SECTION */}
          <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6 tracking-tight">
            About <span className="text-green-600">ROOMGI</span>
          </h1>
          <p className="text-center text-gray-600 max-w-4xl mx-auto mb-16 text-xl leading-relaxed">
            ROOMGI is India's next-generation accommodation ecosystem. We help users discover
            verified PGs, Hostels, and Hotels effortlessly — delivering trust, comfort, and
            world-class user experience inspired by global platforms.
          </p>

          {/* MISSION + VISION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="p-10 bg-gray-50 rounded-3xl shadow hover:shadow-lg border transition">
              <Target className="text-green-600" size={50} />
              <h3 className="text-3xl font-bold mt-6 mb-3">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To simplify the accommodation journey for millions by offering transparent,
                affordable, and trusted stays powered by technology and verified listings.
              </p>
            </div>

            <div className="p-10 bg-gray-50 rounded-3xl shadow hover:shadow-lg border transition">
              <Rocket className="text-yellow-500" size={50} />
              <h3 className="text-3xl font-bold mt-6 mb-3">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become India’s most reliable and innovative accommodation platform — empowering
                both guests and property owners through powerful digital tools.
              </p>
            </div>
          </div>

          {/* WHO WE ARE */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-14 border shadow-xl mb-24">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
              ROOMGI is a people-first company redefining how India searches for accommodation.
              From curated verified listings to smart filters and an intuitive platform, we
              ensure users find the right stay at the right price.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center mt-4">
              Our approach blends the efficiency of digital innovation with an understanding of
              real-world accommodation challenges — making ROOMGI the bridge between guests and
              trustworthy property owners.
            </p>
          </div>

          {/* WHAT WE OFFER */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 border rounded-3xl bg-white shadow hover:shadow-xl transition text-center">
                <Building2 className="text-green-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">Verified Properties</h3>
                <p className="text-gray-600 text-base mt-3 leading-relaxed">
                  Only trusted PGs, Hostels, and Hotels with real photos, owner details, and
                  transparent policies.
                </p>
              </div>

              <div className="p-8 border rounded-3xl bg-white shadow hover:shadow-xl transition text-center">
                <Users className="text-blue-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">For All Individuals</h3>
                <p className="text-gray-600 text-base mt-3 leading-relaxed">
                  Stays tailored for comfort, safety, affordability, and long-term living.
                </p>
              </div>

              <div className="p-8 border rounded-3xl bg-white shadow hover:shadow-xl transition text-center">
                <HeartHandshake className="text-purple-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">Owner Support</h3>
                <p className="text-gray-600 text-base mt-3 leading-relaxed">
                  Tools and visibility to help PG/Hostel/Hotel owners grow their business
                  efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* OUR VALUES */}
          <div className="bg-gray-50 rounded-3xl p-14 border shadow-xl mb-24">
            <h2 className="text-4xl font-bold text-center mb-10">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <CheckCircle2 className="text-green-600 mx-auto" size={48} />
                <h3 className="text-xl font-semibold mt-4">Transparency</h3>
                <p className="text-gray-600 mt-2">Clear pricing, verified listings, and trusted stays.</p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="text-green-600 mx-auto" size={48} />
                <h3 className="text-xl font-semibold mt-4">Reliability</h3>
                <p className="text-gray-600 mt-2">Helping users choose stays confidently.</p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="text-green-600 mx-auto" size={48} />
                <h3 className="text-xl font-semibold mt-4">Innovation</h3>
                <p className="text-gray-600 mt-2">Building modern tools for guests & property owners.</p>
              </div>
            </div>
          </div>

          {/* OUR JOURNEY */}
          {/* OUR JOURNEY */}
          <div className="bg-white border rounded-3xl shadow-xl p-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center tracking-wide">
              Our Journey
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              ROOMGI was created to solve a real problem — the struggle to find trustworthy,
              affordable accommodation in India. What started as a simple idea has now grown
              into a powerful platform connecting thousands of users with verified and quality stays.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              With technology, transparency, and user-focused design at the core, we aim to
              revolutionize India’s accommodation ecosystem one stay at a time.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              StayPass — Smarter, Faster & More Affordable Stays
            </h3>



            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mt-8">
              Together, ROOMGI and StayPass are building a smarter, safer, and more
              transparent way for India to find accommodation — one stay at a time.
            </p>
          </div>


        </div>
      </main>

      {/* FOOTER AT BOTTOM */}
      {isAuthenticated && role !== "user" ? <Footer /> : null}
    </div>
  );
}
