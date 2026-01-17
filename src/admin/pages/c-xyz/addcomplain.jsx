import React, { useState } from "react";
import { 
  Loader2, 
  X, 
  AlertTriangle, 
  Wrench, 
  Receipt, 
  HelpCircle, 
  MessageSquareText,
  ShieldAlert
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// Assume you have an API hook like this:
// import { useCreateComplaintMutation } from "../../../Bothfeatures/features2/api/complaintApi";

export default function AddComplaint({ onClose }) {
  const { branchId } = useParams(); // Destructure properly from params
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low", // Added for better business logic
  });

  const categories = [
    { id: "Maintenance", icon: <Wrench size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "Billing", icon: <Receipt size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: "Service", icon: <HelpCircle size={18} />, color: "text-purple-600", bg: "bg-purple-50" },
    { id: "Urgent", icon: <ShieldAlert size={18} />, color: "text-red-600", bg: "bg-red-50" },
  ];

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Logic for API Call:
      // await createComplaint({ ...formdata, branchId }).unwrap();
      
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Complaint logged. We'll get back to you soon!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        
        {/* Header - Using a more modern "Banner" style */}
        <div className="bg-[#1e3a5f] p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/30">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">New Complaint</h2>
              <p className="text-blue-100/70 text-sm">We're here to help you solve issues.</p>
            </div>
          </div>
        </div>

        {/* Wrap everything in the form so footer buttons work */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            
            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Issue Title</label>
              <input
                type="text"
                name="title"
                required
                value={formdata.title}
                onChange={handleChange}
                placeholder="e.g. WiFi not working in Room 302"
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a5f] outline-none transition-all"
              />
            </div>

            {/* Category Selector - Visual Cards */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormdata({ ...formdata, category: cat.id })}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                      formdata.category === cat.id 
                      ? `border-[#1e3a5f] ring-2 ring-[#1e3a5f]/5 ${cat.bg}` 
                      : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className={`${cat.color}`}>{cat.icon}</div>
                    <span className={`text-sm font-bold ${formdata.category === cat.id ? "text-slate-900" : "text-slate-500"}`}>
                      {cat.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description Area */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
              <div className="relative">
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formdata.description}
                  onChange={handleChange}
                  placeholder="Describe when the issue started and what is happening..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a5f] outline-none transition-all resize-none pl-11"
                />
                <MessageSquareText className="absolute left-4 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-50 border-t flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border border-slate-200 rounded-2xl hover:bg-white text-slate-600 font-bold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !formdata.category}
              className="flex-[2] px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                "Post Complaint"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}