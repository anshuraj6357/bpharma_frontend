import { Helmet } from "react-helmet";

export default function Career({ jobs = [] }) {
  const faqs = [
    {
      question: "How can I apply for a job at ROOMGI?",
      answer:
        "You can apply directly through our Careers page by selecting the role you’re interested in and submitting your resume. Our hiring team reviews every application carefully.",
    },
    {
      question: "Does ROOMGI hire freshers?",
      answer:
        "Yes. ROOMGI welcomes both freshers and experienced professionals. Each job listing clearly mentions the required experience level.",
    },
    {
      question: "What kind of roles are available at ROOMGI?",
      answer:
        "We hire across technology, operations, sales, marketing, customer support, property onboarding, legal, and growth teams.",
    },
    {
      question: "What is ROOMGI’s work culture like?",
      answer:
        "ROOMGI promotes a collaborative, transparent, and ownership-driven culture. We believe in fast learning, experimentation, and building real impact.",
    },
    {
      question: "Can I apply for multiple roles?",
      answer:
        "Yes, if you meet the qualifications, you can apply for more than one role.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white">
      {/* SEO Meta */}
      <Helmet>
        <title>Careers at ROOMGI | Jobs in Real Estate, Rentals, PGs & Hotels</title>
        <meta
          name="description"
          content="Explore career opportunities at ROOMGI — India’s trusted platform for PGs, rentals, homes, hotels, offices, and commercial properties. Join our mission-driven team."
        />
        <meta
          name="keywords"
          content="ROOMGI careers, jobs in real estate India, startup jobs, PG platform jobs, hotel tech jobs, rental startup hiring, proptech careers"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Careers at ROOMGI" />
        <meta
          property="og:description"
          content="Join ROOMGI and help build India’s most trusted real estate and rental discovery platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.roomgi.com/careers" />
        <meta property="og:image" content="/images/roomgi-logo.png" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ROOMGI",
            url: "https://www.roomgi.com",
            logo: "https://www.roomgi.com/images/roomgi-logo.png",
            description:
              "ROOMGI is India’s trusted real estate and rental platform for PGs, flats, homes, hotels, offices, and commercial spaces.",
            sameAs: [
              "https://www.facebook.com/roomgi",
              "https://www.instagram.com/roomgi",
              "https://www.linkedin.com/company/roomgi",
              "https://twitter.com/roomgi",
            ],
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <main className="pt-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-10 py-16">

          {/* Hero */}
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Careers at ROOMGI
            </h1>
            <p className="text-indigo-600 text-xl font-semibold mt-2">
              Build the future of real estate & rentals in India
            </p>
            <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
              ROOMGI is building India’s most trusted platform for PGs, rentals,
              homes, hotels, offices, and commercial properties. If you love
              solving real-world problems with technology and innovation,
              you’ll love working here.
            </p>
          </header>

          {/* Why Join */}
          <section className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "High Impact Work",
                desc: "Your work directly impacts millions of students, professionals, families, and travelers.",
              },
              {
                title: "Fast Growth",
                desc: "Learn quickly, take ownership, and grow with a fast-scaling startup.",
              },
              {
                title: "People-First Culture",
                desc: "We value transparency, creativity, and long-term thinking.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 border rounded-2xl bg-gray-50 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-3">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Jobs */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Open Positions
            </h2>

            {jobs.length === 0 ? (
              <p className="text-center text-gray-500">
                No open roles right now. Check back soon!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-2xl p-8 hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-indigo-600 mt-1 font-medium">
                      {job.department}
                    </p>
                    <p className="text-gray-500 mt-1">
                      Location: {job.location}
                    </p>
                    <p className="text-gray-600 mt-4 line-clamp-3">
                      {job.summary}
                    </p>

                    <a
                      href={`/careers/${job.slug}`}
                      className="inline-block mt-6 text-indigo-600 font-semibold hover:underline"
                    >
                      View Details →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq" className="mt-24">
            <h2 id="faq" className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="border rounded-xl p-5 bg-gray-50"
                >
                  <summary className="cursor-pointer font-medium text-indigo-600">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-24 text-center bg-indigo-50 rounded-3xl p-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Don’t see the right role?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              We’re always looking for talented people. Send us your resume and
              we’ll reach out when a suitable role opens.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Contact Hiring Team
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}
