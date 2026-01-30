import {
  Building2,
  Users,
  HeartHandshake,
  Target,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  MapPin,
  Home,
  Hotel
} from "lucide-react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { useMemo } from "react";

const FAQS = [
  {
    question: "Can I rent PGs, rooms, and flats on ROOMGI?",
    answer:
      "Yes. ROOMGI lets you explore and book verified PGs, rooms, shared flats, and rental homes for students and working professionals."
  },
  {
    question: "Can I buy or sell a home on ROOMGI?",
    answer:
      "Yes. You can buy or sell flats, houses, villas, and independent homes directly with verified owners."
  },
  {
    question: "Does ROOMGI offer hotels and short-term stays?",
    answer:
      "Yes. We also list verified hotels and short-term stays for travelers, interns, and professionals."
  },
  {
    question: "Which cities does ROOMGI serve?",
    answer:
      "We currently focus on Noida, Delhi, Ghaziabad, Mumbai, and Gurgaon, expanding rapidly across India."
  }
];

export default function AboutUs() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = user?.role;

  const structuredData = useMemo(() => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ];
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      <Helmet>
        <title>
          ROOMGI | Rent, Buy & Sell Homes, PGs, Rooms & Hotels in India
        </title>
        <meta
          name="description"
          content="ROOMGI is India’s verified property platform to rent PGs, rooms & flats, buy & sell homes, and book hotels in Noida, Delhi, Ghaziabad, Mumbai & Gurgaon."
        />
        <meta
          name="keywords"
          content="PG in Noida, rent flat Delhi, buy home India, sell property, hotel booking, shared rooms, working professional stays, ROOMGI"
        />
        <link rel="canonical" href="https://roomgi.com/about" />

        {structuredData.map((data, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* HERO */}
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              India’s All-in-One Platform to{" "}
              <span className="text-green-600">
                Rent, Buy & Sell Properties
              </span>
            </h1>
            <p className="text-gray-600 text-xl mt-6 max-w-4xl mx-auto">
              From PGs, rooms, shared flats, and rental homes to buying, selling,
              and booking hotels — ROOMGI makes property decisions simple, safe,
              and transparent.
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <a
                href="/"
                className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold"
              >
                Find a Rental
              </a>
              <a
                href="/"
                className="px-8 py-3 border rounded-full font-semibold"
              >
                Buy a Home
              </a>
              <a
                href="/"
                className="px-8 py-3 border rounded-full font-semibold"
              >
                Sell Property
              </a>
            </div>
          </header>

          {/* TRUST BADGES */}
          <section className="grid md:grid-cols-3 gap-8 mb-24 text-center">
            <div>
              <ShieldCheck className="mx-auto text-green-600" size={44} />
              <h3 className="font-semibold mt-3">Verified Listings</h3>
              <p className="text-gray-600 text-sm mt-1">
                Every property is checked before going live
              </p>
            </div>
            <div>
              <BadgeCheck className="mx-auto text-green-600" size={44} />
              <h3 className="font-semibold mt-3">Real Photos</h3>
              <p className="text-gray-600 text-sm mt-1">
                No fake or misleading images
              </p>
            </div>
            <div>
              <Users className="mx-auto text-green-600" size={44} />
              <h3 className="font-semibold mt-3">Trusted by Movers</h3>
              <p className="text-gray-600 text-sm mt-1">
                Students, professionals & families
              </p>
            </div>
          </section>

          {/* WHAT WE OFFER */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">
              Everything You Need in One Place
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="p-8 border rounded-3xl text-center">
                <Building2 className="mx-auto text-green-600" size={48} />
                <h3 className="font-semibold mt-4">PGs & Rooms</h3>
                <p className="text-gray-600 mt-2">
                  Affordable stays for students and job seekers
                </p>
              </div>

              <div className="p-8 border rounded-3xl text-center">
                <Home className="mx-auto text-green-600" size={48} />
                <h3 className="font-semibold mt-4">Rent, Buy & Sell Homes</h3>
                <p className="text-gray-600 mt-2">
                  Flats, villas, houses & independent homes
                </p>
              </div>

              <div className="p-8 border rounded-3xl text-center">
                <Hotel className="mx-auto text-green-600" size={48} />
                <h3 className="font-semibold mt-4">Hotels & Short Stays</h3>
                <p className="text-gray-600 mt-2">
                  Comfortable stays for travel & work trips
                </p>
              </div>
            </div>
          </section>

          {/* CITY SEO */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-10">
              Serving Top Indian Cities
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "PG & Rentals in Noida",
                "PG & Rentals in Delhi",
                "PG & Rentals in Ghaziabad",
                "PG & Rentals in Mumbai",
                "PG & Rentals in Gurgaon"
              ].map((city) => (
                <div key={city} className="p-8 border rounded-2xl text-center">
                  <MapPin className="mx-auto text-green-600" />
                  <h3 className="text-xl font-semibold mt-3">{city}</h3>
                  <p className="text-gray-600 mt-2">
                    Verified homes near colleges & offices
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
              {FAQS.map((faq, i) => (
                <details key={i} className="border rounded-xl p-6">
                  <summary className="font-semibold cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-green-600 text-white rounded-3xl p-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Find Your Perfect Stay or Dream Home
            </h2>
            <p className="text-lg mb-8">
              Join thousands who trust ROOMGI for renting, buying & selling.
            </p>
            <a
              href="/rent"
              className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold"
            >
              Start Exploring
            </a>
          </section>

        </div>
      </main>

      {/* Footer */}
      {isAuthenticated && role !== "user" && <Footer />}
    </div>
  );
}
