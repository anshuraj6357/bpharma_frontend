import { Helmet } from "react-helmet";

export default function About({ properties }) {
  // Navigation Links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "Contact", href: "/contact" },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How does ROOMGI verify its listings?",
      answer:
        "All properties on ROOMGI are verified through onsite inspections, real photos, and owner documentation to ensure authenticity and safety.",
    },
    {
      question: "Can I book a PG or Hostel for short-term stay?",
      answer:
        "Yes! ROOMGI allows flexible booking options, including short-term and long-term stays in PGs, hostels, and hotels across India.",
    },
    {
      question: "Is ROOMGI safe for students and working professionals?",
      answer:
        "Absolutely. ROOMGI focuses on verified listings and trustworthy accommodation providers, ensuring safety and transparency.",
    },
    {
      question: "Which cities does ROOMGI operate in?",
      answer:
        "ROOMGI operates across all major cities in India including Delhi, Mumbai, Bangalore, Pune, Chennai, Hyderabad, and more.",
    },
    {
      question: "Can I contact ROOMGI support before booking?",
      answer:
        "Yes, ROOMGI provides multiple contact options including phone, email, and live chat. Support is available in English and Hindi.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About ROOMGI | Verified Hotels, PGs, and Hostels in India</title>
        <meta
          name="description"
          content="ROOMGI is India's trusted platform for verified Hotels, PGs, and Hostels. Explore safe, comfortable stays with real photos, accurate property details, and trusted reviews."
        />
        <meta
          name="keywords"
          content="ROOMGI, Hotels India, PG booking India, Hostel booking India, Verified accommodation, Student housing, Professional stays, Safe stays India"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About ROOMGI | Trusted Accommodation Booking Platform"
        />
        <meta
          property="og:description"
          content="Find verified Hotels, PGs, and Hostels across India with ROOMGI. Safe, reliable, and easy accommodation discovery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="/images/roomgi-logo.png" />

        {/* Organization JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ROOMGI",
            url: "https://yourdomain.com",
            logo: "https://yourdomain.com/images/roomgi-logo.png",
            founder: { "@type": "Person", name: "Abhishek Kumar" },
            foundingDate: "2025-01-01",
            foundingLocation: { "@type": "Place", name: "India" },
            sameAs: [
              "https://www.facebook.com/roomgi",
              "https://www.instagram.com/roomgi",
              "https://www.linkedin.com/company/roomgi",
              "https://twitter.com/roomgi",
            ],
            description:
              "ROOMGI helps students and professionals find verified Hotels, PGs, and Hostels in India with real photos, accurate details, and safe bookings.",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-9876543210",
                contactType: "Customer Support",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "123, Main Street",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              postalCode: "110001",
              addressCountry: "IN",
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://yourdomain.com/search?query={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://yourdomain.com/" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://yourdomain.com/about" },
            ],
          })}
        </script>

        {/* FAQ JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>

        {/* Dynamic LodgingBusiness JSON-LD for properties */}
        {properties.map((pg) => (
          <script key={pg.id} type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: pg.name,
              image: pg.images[0],
              address: {
                "@type": "PostalAddress",
                streetAddress: pg.street,
                addressLocality: pg.city,
                addressRegion: pg.state,
                postalCode: pg.postalCode,
                addressCountry: "IN",
              },
              priceRange: pg.price,
              telephone: pg.phone,
              url: `https://yourdomain.com/listings/${pg.slug}`,
              amenityFeature: pg.amenities.map((a) => ({
                "@type": "LocationFeatureSpecification",
                name: a.name,
                value: a.available,
              })),
              starRating: { "@type": "Rating", ratingValue: pg.rating, bestRating: "5" },
              review: pg.reviews.map((r) => ({
                "@type": "Review",
                author: { "@type": "Person", name: r.author },
                reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: "5" },
                reviewBody: r.comment,
              })),
            })}
          </script>
        ))}
      </Helmet>

      {/* Page Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              About ROOMGI
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              Trusted Hotel, PG, and Hostel Discovery Platform
            </p>
            <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
              ROOMGI is your one-stop platform to find verified Hotels, PGs, and Hostels in India. Explore real photos, accurate property details, and trusted stays in major cities.
            </p>

            {/* Navigation Links */}
            <nav className="mt-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-green-600 hover:underline mr-4">
                  {link.name}
                </a>
              ))}
            </nav>
          </header>

          {/* FAQ Section */}
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-semibold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx}>
                  <summary className="cursor-pointer font-medium text-green-600">{faq.question}</summary>
                  <p className="mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
