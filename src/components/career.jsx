import { Helmet } from "react-helmet";

export default function Careers({ jobs }) {
  // Example FAQ for Careers
  const faqs = [
    {
      question: "How can I apply for a job at ROOMGI?",
      answer:
        "You can apply online by submitting your resume through our Careers page. Make sure to select the position you are interested in.",
    },
    {
      question: "Do I need prior experience to join ROOMGI?",
      answer:
        "We hire both experienced professionals and freshers. Job requirements vary by role, and each listing specifies experience expectations.",
    },
    {
      question: "What is ROOMGI's work culture like?",
      answer:
        "ROOMGI fosters a collaborative, inclusive, and innovative work culture. We encourage creativity and continuous learning for all employees.",
    },
    {
      question: "Can I apply for multiple roles?",
      answer:
        "Yes! You are welcome to apply for multiple roles if you meet the qualifications for each position.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Careers at ROOMGI | Join India's Trusted Accommodation Platform</title>
        <meta
          name="description"
          content="Explore career opportunities at ROOMGI. Join India's trusted platform for verified Hotels, PGs, and Hostels. Apply now for open positions in tech, marketing, operations, and more."
        />
        <meta
          name="keywords"
          content="ROOMGI Careers, Jobs in India, Work at ROOMGI, Hotel tech jobs, PG management jobs, Hostel operations jobs, Startup careers India"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Careers at ROOMGI | Join Our Team" />
        <meta
          property="og:description"
          content="Explore career opportunities at ROOMGI. Join India's trusted platform for Hotels, PGs, and Hostels. Apply now!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/careers" />
        <meta property="og:image" content="/images/roomgi-logo.png" />

        {/* Organization JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ROOMGI",
            url: "https://yourdomain.com",
            logo: "https://yourdomain.com/images/roomgi-logo.png",
            description:
              "ROOMGI helps students and professionals find verified Hotels, PGs, and Hostels in India.",
            sameAs: [
              "https://www.facebook.com/roomgi",
              "https://www.instagram.com/roomgi",
              "https://www.linkedin.com/company/roomgi",
              "https://twitter.com/roomgi",
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
      </Helmet>

      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Careers at ROOMGI
            </h1>
            <p className="text-blue-600 text-xl font-semibold mt-2">
              Join India's Trusted Accommodation Platform
            </p>
            <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
              We are always looking for talented individuals to help us make accommodation discovery simple, transparent, and trustworthy across India.
            </p>
          </header>

          {/* Job Listings */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Open Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.department}</p>
                  <p className="text-gray-500 mt-1">Location: {job.location}</p>
                  <p className="text-gray-700 mt-3 line-clamp-3">{job.summary}</p>
                  <a
                    href={`/careers/${job.slug}`}
                    className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="faq" className="mt-16">
            <h2 id="faq" className="text-2xl font-semibold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx}>
                  <summary className="cursor-pointer font-medium text-blue-600">{faq.question}</summary>
                  <p className="mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Want to join us?</h2>
            <p className="text-gray-600 mb-6">
              Send us your resume and become part of the ROOMGI team shaping the future of accommodation in India.
            </p>
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
