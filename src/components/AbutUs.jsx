import {
  Building2,
  Users,
  HeartHandshake,
  Target,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";

export default function AboutUs() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Hero */}
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              About <span className="text-green-600">ROOMGI</span>
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed max-w-4xl mx-auto mt-6">
              ROOMGI is India’s next-generation accommodation ecosystem. We help
              users discover verified PGs, Hostels, and Hotels effortlessly —
              delivering trust, comfort, and a world-class experience inspired
              by global platforms.
            </p>
          </header>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="p-10 bg-gray-50 rounded-3xl border hover:shadow-md transition">
              <Target className="text-green-600" size={48} />
              <h3 className="text-3xl font-bold mt-6 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To simplify the accommodation journey for millions by offering
                transparent, affordable, and trusted stays powered by
                technology and verified listings.
              </p>
            </div>

            <div className="p-10 bg-gray-50 rounded-3xl border hover:shadow-md transition">
              <Rocket className="text-yellow-500" size={48} />
              <h3 className="text-3xl font-bold mt-6 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become India’s most reliable and innovative accommodation
                platform — empowering both guests and property owners through
                powerful digital tools.
              </p>
            </div>
          </section>

          {/* Who We Are */}
          <section className="bg-gray-50 rounded-3xl p-14 border mb-24">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
              ROOMGI is a people-first company redefining how India searches for
              accommodation. From curated verified listings to smart filters
              and an intuitive platform, we ensure users find the right stay at
              the right price.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center mt-4">
              Our approach blends digital innovation with a deep understanding
              of real-world accommodation challenges — making ROOMGI the bridge
              between guests and trustworthy property owners.
            </p>
          </section>

          {/* What We Offer */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              What We Offer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition text-center">
                <Building2 className="text-green-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">
                  Verified Properties
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Trusted PGs, Hostels, and Hotels with real photos, owner
                  details, and transparent policies.
                </p>
              </div>

              <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition text-center">
                <Users className="text-blue-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">
                  For Every Individual
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Comfortable, safe, and affordable stays designed for both
                  short and long-term living.
                </p>
              </div>

              <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition text-center">
                <HeartHandshake className="text-purple-600 mx-auto" size={52} />
                <h3 className="text-xl font-semibold mt-6">
                  Owner Enablement
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Tools, visibility, and support to help property owners grow
                  efficiently.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="bg-gray-50 rounded-3xl p-14 border mb-24">
            <h2 className="text-4xl font-bold text-center mb-10">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {["Transparency", "Reliability", "Innovation"].map((value) => (
                <div key={value} className="text-center">
                  <CheckCircle2 className="text-green-600 mx-auto" size={48} />
                  <h3 className="text-xl font-semibold mt-4">{value}</h3>
                  <p className="text-gray-600 mt-2">
                    {value === "Transparency" &&
                      "Clear pricing, verified listings, and honest policies."}
                    {value === "Reliability" &&
                      "Helping users choose stays with confidence."}
                    {value === "Innovation" &&
                      "Building modern tools for guests and owners."}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Journey */}
          <section className="bg-white border rounded-3xl shadow-sm p-14">
            <h2 className="text-4xl font-bold text-center mb-8">
              Our Journey
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              ROOMGI was created to solve a real problem — finding trustworthy
              and affordable accommodation in India. What started as a simple
              idea is now evolving into a platform connecting thousands of
              users with verified stays.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              With technology, transparency, and user-first design, we aim to
              revolutionize India’s accommodation ecosystem — one stay at a
              time.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
