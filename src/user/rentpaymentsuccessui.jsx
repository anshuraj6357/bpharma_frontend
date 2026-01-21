import React from "react";
import { 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Copy, 
  ShieldCheck,
  ReceiptText,
  Smartphone
} from "lucide-react";

const SummaryRow = ({ label, value, isTotal }) => (
  <div className={`flex justify-between items-center py-3 ${isTotal ? "border-t border-dashed border-slate-200 mt-2" : ""}`}>
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <span className={`text-slate-900 ${isTotal ? "text-lg font-black" : "text-sm font-bold"}`}>
      {value}
    </span>
  </div>
);

export default function PaymentSuccessUI({ details }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  return (
    <div className="max-w-md mx-auto">
      {/* SUCCESS ANIMATION & HEADER */}
      <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full"></div>
          <div className="relative bg-white rounded-full p-1">
            <CheckCircle2 size={80} className="text-emerald-500 fill-emerald-50" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mt-6 tracking-tight">
          Payment Confirmed
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Transaction processed successfully.
        </p>
      </div>

      {/* THE "RECEIPT" CARD */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
        {/* Decorative Receipt Notches */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border border-slate-100 shadow-inner"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border border-slate-100 shadow-inner"></div>

        <div className="p-8">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full">
            <ReceiptText size={12} />
            E-Receipt
          </div>

          <div className="space-y-1">
            <SummaryRow label="Tenant" value={details.tenantName} />
            <SummaryRow label="Property / Room" value={`Room ${details.roomNo}`} />
            <SummaryRow label="Payment Mode" value="Online Transfer" />
            <SummaryRow label="Wallet Credits" value={`- ₹${details.walletUsed}`} />
            <SummaryRow label="Total Amount" value={`₹${details.paidAmount}`} isTotal />
          </div>

          {/* TRANSACTION METADATA */}
          <div className="mt-8 pt-6 border-t border-slate-50 space-y-4">
            <div className="group flex justify-between items-center cursor-pointer" onClick={() => copyToClipboard(details.paymentId)}>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transaction ID</p>
                <p className="text-xs font-mono font-medium text-slate-600">{details.paymentId}</p>
              </div>
              <Copy size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</p>
                <p className="text-xs font-medium text-slate-600">{details.date}</p>
              </div>
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION CTA */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
           <button
            onClick={() => {/* Download Logic */}}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm hover:bg-slate-100 active:scale-[0.98] transition-all shadow-sm"
          >
            <Download size={18} />
            Download PDF Receipt
          </button>
        </div>
      </div>

      {/* SECONDARY ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 py-4 bg-indigo-600 rounded-2xl text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          New Payment <ArrowRight size={18} />
        </button>
        
        <button
          className="flex items-center justify-center gap-2 py-4 bg-slate-900 rounded-2xl text-white font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <Smartphone size={18} /> Support
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-400 mt-8 font-medium">
        Securely processed via Razorpay SSL Encryption. <br/>
        A confirmation has been sent to your registered mobile.
      </p>
    </div>
  );
}