import { Helmet } from "react-helmet";
import { useState } from "react";
import { 
  AlertTriangle, 
  Upload, 
  Send, 
  ShieldAlert, 
  MessageSquare, 
  User, 
  Building2, 
  Mail, 
  Phone 
} from "lucide-react";

const ReportIssue = () => {
  const [issueType, setIssueType] = useState("");
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased pb-24">
      <Helmet>
        <title>Report an Issue | Roomgi Support</title>
      </Helmet>

      {/* --- Header Section (No Card) --- */}
      <header className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-xs uppercase mb-4">
          <div className="w-8 h-[2px] bg-emerald-600"></div> Support Center
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
          Submit a <span className="text-emerald-600">Report.</span>
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl max-w-2xl font-medium leading-tight">
          Facing trouble? Describe your issue below. Our safety team handles reports with 100% confidentiality.
        </p>
      </header>

      {/* --- Form Sections (Open Layout) --- */}
      <main className="max-w-5xl mx-auto px-6">
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Input Fields */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Issue Category */}
            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                01. Issue Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full bg-transparent border-b-2 border-slate-100 py-4 text-2xl font-bold text-slate-800 focus:border-emerald-500 outline-none transition-all cursor-pointer"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                required
              >
                <option value="">Select an issue...</option>
                <option>Property Listing Issue</option>
                <option>Payment or Refund Issue</option>
                <option>Login or Account Issue</option>
                <option>Owner / Agent Complaint</option>
                <option>Booking or Availability Issue</option>
                <option>Fraud or Safety Concern</option>
                <option>Technical / Website Bug</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                02. Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="What exactly happened?"
                className="w-full bg-transparent border-b-2 border-slate-100 py-4 text-xl font-medium text-slate-800 focus:border-emerald-500 outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            {/* Contact Info Grid */}
            <div className="space-y-8 pt-6">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400">03. Your Contact Information</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input type="text" placeholder="Full Name" className="bg-transparent border-b border-slate-200 py-3 text-lg font-bold outline-none focus:border-emerald-500 transition-all" required />
                <input type="email" placeholder="Email Address" className="bg-transparent border-b border-slate-200 py-3 text-lg font-bold outline-none focus:border-emerald-500 transition-all" required />
                <input type="tel" placeholder="Mobile Number" className="bg-transparent border-b border-slate-200 py-3 text-lg font-bold outline-none focus:border-emerald-500 transition-all md:col-span-2" required />
              </div>
            </div>

            {/* Upload Area */}
            <div className="pt-6">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 block mb-6">04. Attach Evidence</label>
              <div 
                className={`group relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                  dragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
              >
                <Upload className="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                <p className="text-slate-900 font-black">Drop files here or click to browse</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Info & CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Conditional Alert */}
              {issueType === "Fraud or Safety Concern" ? (
                <div className="p-8 bg-red-600 rounded-[2rem] text-white shadow-2xl shadow-red-200 animate-in slide-in-from-right">
                  <ShieldAlert className="w-10 h-10 mb-4 text-red-200" />
                  <h3 className="text-xl font-black mb-2 tracking-tight">Urgent Case</h3>
                  <p className="text-red-100 text-sm leading-relaxed opacity-90">
                    You have selected a Safety Concern. These reports are flagged for immediate intervention by our legal team.
                  </p>
                </div>
              ) : (
                <div className="p-8 bg-emerald-600 rounded-[2rem] text-white shadow-2xl shadow-emerald-200">
                  <MessageSquare className="w-10 h-10 mb-4 text-emerald-200" />
                  <h3 className="text-xl font-black mb-2 tracking-tight">Standard Review</h3>
                  <p className="text-emerald-50 text-sm leading-relaxed opacity-90">
                    Typical response time is 24-48 hours. Please check your email for a ticket number after submitting.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-slate-200"
                >
                  Send Report <Send className="w-6 h-6" />
                </button>
                <p className="text-center text-slate-400 text-xs mt-6 font-bold uppercase tracking-widest">
                  Secure End-to-End Encryption
                </p>
              </div>

            </div>
          </div>

        </form>

        <footer className="mt-32 pt-12 border-t border-slate-100">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
              <p>© 2026 ROOMGI SAFETY HUB</p>
              <div className="flex gap-8">
                <a href="/terms" className="hover:text-emerald-600">Terms</a>
                <a href="/privacypolicy" className="hover:text-emerald-600">Privacy</a>
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default ReportIssue;