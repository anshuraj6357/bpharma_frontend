import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { 
  Linkedin, Mail, Terminal, Cpu, Code2, Rocket, Library, Coffee, Binary, ShieldCheck, Zap, ChevronRight 
} from "lucide-react";

const CEO = () => {
  // Memoizing data to prevent re-creation on every render (Performance Boost)
  const leaders = useMemo(() => [
    {
      name: "Abhinav Kumar",
      role: "Director & Co-Founder",
      email: "abhinav@roomgi.com",
      college: "ABES Engineering College",
      degree: "B.Tech in AIML",
      img: "/images/director.jpg",
      quote: "Intelligence is not just about data, it's about making lives easier.",
      status: "Final Year Student",
      extra: "Driving AI Automation & Data Security",
      linkedin: "https://linkedin.com/in/abhinavkumar",
      bio: "Specializing in Artificial Intelligence, Abhinav ensures RoomGi stays ahead of the curve. He leads the development of smart algorithms that detect fraudulent listings and provide personalized recommendations.",
      skills: [
        { icon: <Binary size={14} />, label: "AIML Models" },
        { icon: <ShieldCheck size={14} />, label: "Data Security" },
        { icon: <Cpu size={14} />, label: "Automation" }
      ]
    },
    {
      name: "Ayush Raj",
      role: "CEO",
      email: "ayush@roomgi.com",
      college: "ABES Engineering College",
      degree: "B.Tech in Computer Science",
      img: "/images/ceo.jpg",
      quote: "Turning complex code into comfortable living spaces.",
      status: "Final Year Student",
      extra: "Leading Product Strategy & Market Expansion",
      linkedin: "https://linkedin.com/in/ayushraj",
      bio: "Ayush is the chief architect behind RoomGi's vision. A full-stack developer at heart, he started RoomGi to bridge the gap between students and verified property owners using transparent tech solutions.",
      skills: [
        { icon: <Code2 size={14} />, label: "Full Stack Dev" },
        { icon: <Rocket size={14} />, label: "Product Vision" },
        { icon: <Terminal size={14} />, label: "System Design" }
      ]
    }
  ], []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-green-100 selection:text-green-900">
      <Helmet>
        <title>Leadership Team | ROOMGI - Ayush Raj & Abhinav Kumar</title>
        <meta name="description" content="Meet the leadership team of ROOMGI: Ayush Raj (CEO) and Abhinav Kumar (Director). Engineering excellence from ABES EC." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-24 pb-16 px-6 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-green-100 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-fade-in">
            <Zap size={12} fill="currentColor" /> Driven by Innovation
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9]">
            The Engineering <br />
            <span className="text-green-600">Powerhouse.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Merging <span className="text-slate-900 font-bold underline decoration-green-300">Software Architecture</span> with <span className="text-slate-900 font-bold underline decoration-green-300">Artificial Intelligence</span>, built within the ecosystem of ABES Engineering College.
          </p>
        </div>
      </header>

      {/* --- LEADERSHIP PROFILES --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {leaders.map((leader, idx) => (
            <article key={idx} className="group flex flex-col">
              {/* Leader Card Image */}
              <div className="relative mb-10 group-hover:z-20">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-green-100 group-hover:-translate-y-3">
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white text-lg font-medium italic mb-6 leading-snug">"{leader.quote}"</p>
                    <div className="flex gap-4">
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500 text-white rounded-2xl hover:bg-white hover:text-green-600 transition-all shadow-lg" aria-label="LinkedIn">
                        <Linkedin size={20} />
                      </a>
                      <a href={`mailto:${leader.email}`} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white hover:text-slate-900 transition-all border border-white/30" aria-label="Email">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                {/* Decorative Canvas */}
                <div className="absolute -inset-4 border-2 border-slate-50 rounded-[3rem] -z-10 group-hover:border-green-100 group-hover:scale-105 transition-all duration-500"></div>
              </div>

              {/* Textual Details */}
              <div className="flex-1 space-y-4 px-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 group-hover:text-green-600 transition-colors">
                      {leader.name}
                    </h2>
                    <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-[11px] mt-1">
                      {leader.role} • {leader.extra}
                    </p>
                  </div>
                  <span className="bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {leader.status}
                  </span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {leader.bio}
                </p>

                {/* Skills Component */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {leader.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-[10px] font-bold text-slate-500 group-hover:border-green-200 group-hover:bg-green-50 transition-all">
                      {skill.icon} {skill.label}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- ABES EC TECH SYNERGY --- */}
        <div className="mt-32 p-1 bg-gradient-to-br from-green-400 to-slate-900 rounded-[4rem]">
          <div className="bg-slate-900 rounded-[3.8rem] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                  From Lab Sessions <br /> to <span className="text-green-500">Industry Leads.</span>
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  As final year students at <b>ABES Engineering College</b>, we don't just build apps; we engineer solutions for the next billion users. RoomGi is our commitment to a safer rental economy.
                </p>
                <button className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest hover:text-green-400 transition-all group">
                  Learn about our architecture <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {[
                   { val: "2026", label: "Year" },
                   { val: "AIML", label: "Core" },
                   { val: "CSE", label: "Logic" },
                   { val: "100%", label: "Verified" }
                 ].map((stat, i) => (
                   <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                     <p className="text-3xl font-black text-green-500">{stat.val}</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{stat.label}</p>
                   </div>
                 ))}
              </div>
            </div>
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none">
                <Binary className="w-full h-full text-white/5" strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </main>

      {/* --- REFINED FOOTER --- */}
      <footer className="py-16 bg-white border-t border-slate-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             <a href="/about" className="hover:text-green-600 transition-colors">Our Vision</a>
             <a href="/career" className="hover:text-green-600 transition-colors">Careers</a>
             <a href="/support" className="hover:text-green-600 transition-colors">Get Support</a>
          </div>
          <p className="text-slate-300 font-medium text-[11px] flex items-center gap-2">
            <Library size={12} /> Proudly Incubated at ABES Engineering College • ROOMGI Pvt Ltd 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CEO;