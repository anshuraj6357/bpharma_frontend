import { Helmet } from "react-helmet";
import {
  Briefcase,
  Rocket,
  Heart,
  ArrowRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function Career({ jobs = [] }) {
  const [openFaq, setOpenFaq] = useState(null);
  const year = new Date().getFullYear();

  const faqs = [
    {
      question: "How can I apply for a job at ROOMGI?",
      answer:
        "You can apply directly through our Careers page by selecting an open role and submitting your resume. Our hiring team reviews every application.",
    },
    {
      question: "Does ROOMGI hire freshers?",
      answer:
        "Yes. ROOMGI welcomes freshers as well as experienced professionals. Each role clearly specifies experience requirements.",
    },
    {
      question: "What kind of roles are available at ROOMGI?",
      answer:
        "We hire across technology, product, operations, sales, marketing, customer support, legal, and growth teams.",
    },
    {
      question: "What is ROOMGI’s work culture like?",
      answer:
        "ROOMGI believes in ownership, transparency, fast learning, and building long-term impact through meaningful work.",
    },
  ];

  const benefits = [
    {
      title: "High Impact Work",
      icon: <Rocket />,
      desc:
        "Your work helps shape the future of real estate discovery for a growing user base across India.",
    },
    {
      title: "Fast Growth",
      icon: <Sparkles />,
      desc:
        "Learn quickly, take responsibility early, and grow alongside a fast-scaling PropTech startup.",
    },
    {
      title: "People-First Culture",
      icon: <Heart />,
      desc:
        "We value trust, transparency, creativity, and long-term thinking over short-term wins.",
    },
  ];

  const faqSchema = {
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
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased">
      <Helmet>
        <title>Careers at ROOMGI | PropTech Startup Jobs in India</title>
        <meta
          name="description"
          content="Explore careers at ROOMGI – a fast-growing PropTech startup in India. Join our technology, operations, marketing, and growth teams as we expand nationwide."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.roomgi.com/careers" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-48 px-6 bg-gradient-to-b from-emerald-50/80 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border px-4 py-2 rounded-full text-emerald-700 text-xs font-black uppercase tracking-widest mb-8">
            <Briefcase className="w-4 h-4" /> We’re hiring
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            Build the future of <br />
            <span className="text-emerald-600">living in India</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            ROOMGI is reimagining how people discover PGs, rental homes, and
            workspaces. We’re expanding across India — and we want builders with
            us.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-32 pb-32">
        {/* BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[3rem] border shadow-xl"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                {b.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{b.title}</h3>
              <p className="text-slate-500">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* OPEN POSITIONS */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-center mb-12">
            Open Positions
          </h2>

          {jobs.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed rounded-[3rem] p-20 text-center">
              <p className="text-slate-400 text-xl font-bold">
                No open roles right now — we’re expanding soon. 🚀
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border p-8 rounded-[2.5rem] shadow-lg"
                >
                  <span className="text-emerald-600 text-xs font-black uppercase">
                    {job.department}
                  </span>
                  <h3 className="text-2xl font-black mt-4 mb-4">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 mb-6">{job.summary}</p>
                  <a
                    href={`/careers/${job.slug}`}
                    className="flex items-center gap-2 text-emerald-600 font-black"
                  >
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-black text-center mb-12">
            Hiring <span className="text-emerald-600">FAQs</span>
          </h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-[2rem] mb-4 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between p-8 text-left"
              >
                <span className="font-bold">{faq.question}</span>
                <Plus
                  className={`transition-transform ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-8 pb-8 text-slate-500">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-[4rem] p-16 text-center text-white">
          <h2 className="text-4xl font-black mb-6">
            Don’t see the right role?
          </h2>
          <p className="text-slate-400 mb-8">
            We’re growing fast. Drop your resume and we’ll reach out.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-emerald-600 px-10 py-5 rounded-2xl font-black"
          >
            Get in Touch <ArrowRight />
          </a>
        </section>
      </main>

      <footer className="py-12 border-t text-center">
        <p className="text-slate-400 text-xs uppercase tracking-widest">
          ROOMGI Careers • {year}
        </p>
      </footer>
    </div>
  );
}
