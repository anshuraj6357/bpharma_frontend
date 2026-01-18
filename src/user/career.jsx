import { Helmet } from "react-helmet";
import { Briefcase, Rocket, Users, Heart, ArrowRight, Plus, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Career({ jobs = [] }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { question: "How can I apply for a job at ROOMGI?", answer: "You can apply directly through our Careers page by selecting the role you’re interested in and submitting your resume. Our hiring team reviews every application carefully." },
    { question: "Does ROOMGI hire freshers?", answer: "Yes. ROOMGI welcomes both freshers and experienced professionals. Each job listing clearly mentions the required experience level." },
    { question: "What kind of roles are available?", answer: "We hire across technology, operations, sales, marketing, customer support, property onboarding, legal, and growth teams." },
    { question: "What is ROOMGI’s work culture like?", answer: "ROOMGI promotes a collaborative, transparent, and ownership-driven culture. We believe in fast learning and building real impact." },
  ];

  const benefits = [
    { title: "High Impact Work", icon: <Rocket />, desc: "Your work directly impacts millions of students, professionals, and families." },
    { title: "Fast Growth", icon: <Sparkles />, desc: "Learn quickly, take ownership, and grow with a fast-scaling startup." },
    { title: "People-First", icon: <Heart />, desc: "We value transparency, creativity, and long-term thinking." },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased">
      <Helmet>
        <title>Careers at ROOMGI | Build the Future of Real Estate</title>
        <meta name="description" content="Join India's most trusted property platform." />
      </Helmet>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-32 pb-48 px-6 bg-gradient-to-b from-emerald-50/80 via-white to-white overflow-hidden text-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent opacity-70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-4 py-2 rounded-full text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Briefcase className="w-4 h-4" /> We are hiring
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Build the future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Living in India.</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            ROOMGI is transforming how people find PGs, flats, and offices. 
            If you're passionate about PropTech, we're looking for you.
          </p>
        </div>
      </section>

      {/* --- 2. BENEFITS SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-32 pb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {benefits.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-emerald-500 transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- 3. OPEN POSITIONS --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Open Positions</h2>
            <div className="h-1.5 w-20 bg-emerald-500 mx-auto rounded-full" />
          </div>

          {jobs.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
              <p className="text-slate-400 font-bold text-xl">No open roles right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest">{job.department}</span>
                    <span className="flex items-center gap-1 text-slate-400 text-sm font-bold"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{job.title}</h3>
                  <p className="text-slate-500 line-clamp-2 font-medium mb-8">{job.summary}</p>
                  <a href={`/careers/${job.slug}`} className="flex items-center gap-2 text-emerald-600 font-black hover:gap-4 transition-all">
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- 4. FAQ SECTION --- */}
        <section className="max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-black text-center mb-12">Hiring <span className="text-emerald-600">FAQ</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-emerald-50/30 transition-colors"
                >
                  <span className="text-lg font-bold text-slate-800">{faq.question}</span>
                  <div className={`p-2 rounded-full bg-slate-100 transition-transform ${openFaq === idx ? 'rotate-45 bg-emerald-600 text-white' : ''}`}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. CTA SECTION (DARK MODE CONTRAST) --- */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Don’t see the right role?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">
              We’re always on the lookout for rockstars. Drop your resume in our talent pool and we'll contact you.
            </p>
            <a href="/contact" className="inline-flex items-center gap-3 bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-900/40">
              Get in Touch <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />
        </section>
      </main>

      {/* FOOTER STRIP */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">ROOMGI Talent Hub • 2026</p>
      </footer>
    </div>
  );
}