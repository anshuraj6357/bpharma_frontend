// import React, { useState, useEffect } from "react";
// import {
//   AlertTriangle,
//   CheckCircle,
//   Wallet,
//   IndianRupee,
//   Home,
//   Calendar,
//   Clock
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGetpayrenttenantdashboardQuery } from "../backend-routes/ownerroutes/tenant";
// import downloadPaymentInvoice from "./utils/downloadrentinvoice"
// /* ================= HELPERS ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric"
//     })
//     : "--";

// const getTier = (percent) => {
//   if (percent >= 90) return { label: "Gold", color: "bg-yellow-100 text-yellow-800" };
//   if (percent >= 60) return { label: "Silver", color: "bg-gray-100 text-gray-800" };
//   if (percent >= 30) return { label: "Bronze", color: "bg-orange-100 text-orange-800" };
//   return { label: "Starter", color: "bg-red-100 text-red-800" };
// };


// const DueCountdown = ({ extduesdate }) => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

//   useEffect(() => {
//     if (!extduesdate) return;

//     const nextDue = new Date(extduesdate);

//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = nextDue - now;

//       if (diff <= 0) {
//         clearInterval(interval);
//         setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const mins = Math.floor((diff / (1000 * 60)) % 60);
//       const secs = Math.floor((diff / 1000) % 60);

//       setTimeLeft({ days, hours, mins, secs });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [extduesdate]);

//   return (
//     <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl flex items-center gap-4">
//       <Clock />
//       <p className="font-semibold text-sm">
//         Next Rent Due in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
//       </p>
//     </div>
//   );
// };


// /* ================= DASHBOARD ================= */
// export default function TenantDashboard() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [invoiceLoadingId, setInvoiceLoadingId] = useState(null);


//   const { data: apiRes, isLoading } = useGetpayrenttenantdashboardQuery(id);

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex items-center justify-center text-lg font-semibold">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   const data = apiRes?.data;

//   if (!data) {
//     return <div className="text-center text-red-500">Failed to load dashboard</div>;
//   }

//   const { tenant, branch, room, finance, payments = [] } = data;
//   console.log(tenant)

//   // ================= SAFE NUMERIC CALCULATIONS =================
//   const monthlyRent = Number(finance?.monthlyRent || room?.price || 0);
//   const totalPaid = Number(finance?.totalPaid || 0);
//   const totalDues = Number(finance?.totalDues || 0);
//   const advance = Number(finance?.advancePaid || finance?.securityDeposit || 0);

//   const totalAmount = Math.max(totalPaid + totalDues, 1);
//   const progress = Math.min(100, Math.round((totalPaid / totalAmount) * 100));

//   const isOverDue = totalDues > 0;
//   const tier = getTier(progress);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
//       {/* ================= HERO HEADER ================= */}
//       <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-3xl p-8 shadow">
//         <div className="flex flex-col md:flex-row justify-between gap-6">
//           <div>
//             <h1 className="text-4xl font-extrabold">{tenant?.name}</h1>
//             <p className="opacity-90 mt-1">
//               Room {tenant?.roomNumber} • {branch?.name}, {branch?.city}
//             </p>
//             <p className="mt-3 text-sm opacity-80 flex items-center gap-2">
//               <Calendar size={16} />
//               Check-in: {formatDate(tenant?.checkInDate)}
//             </p>

//             {/* ================= NEXT DUE COUNTDOWN ================= */}
//             <DueCountdown extduesdate={tenant?.startDuesFrom} />
//           </div>

//           <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
//             <StatusBadge status={tenant?.status} />
//             <button
//               onClick={() => navigate(`/payrent/${tenant?.id}`)}
//               className={`px-6 py-3 rounded-xl font-bold shadow ${isOverDue
//                 ? "bg-white text-indigo-600 hover:bg-gray-100"
//                 : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 }`}
//             >
//               Pay Rent
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= FINANCE SUMMARY ================= */}
//       <div className="grid md:grid-cols-5 gap-6">
//         <SummaryCard title="Monthly Rent" value={`₹${monthlyRent}`} icon={<IndianRupee />} color="indigo" />
//         <SummaryCard title="Total Paid" value={`₹${totalPaid}`} icon={<Wallet />} color="green" />
//         <SummaryCard title="Advance / Security" value={`₹${advance}`} icon={<CheckCircle />} color="blue" />
//         <SummaryCard title="Outstanding Due" value={`₹${totalDues}`} icon={<AlertTriangle />} color={isOverDue ? "red" : "green"} />
//         <SummaryCard title="Tenant Tier" value={tier.label} icon={<Clock />} color="yellow" />
//       </div>

//       {/* ================= DUE ALERT ================= */}
//       {isOverDue && (
//         <div className="flex gap-4 p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700">
//           <AlertTriangle />
//           <div>
//             <p className="font-bold text-lg">Payment Pending: ₹{totalDues}</p>
//             <p className="text-sm">Please clear dues to avoid penalties</p>
//           </div>
//         </div>
//       )}

//       {/* ================= PROGRESS + BAR ================= */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-3xl shadow p-8 flex flex-col gap-4">
//           <div className="flex items-center gap-8">
//             <ProgressRing percent={progress} />
//             <div>
//               <p className="text-sm text-gray-500">Payment Completion</p>
//               <p className="text-3xl font-extrabold">{progress}%</p>
//               <p className="text-gray-600 mt-1">{finance?.duesMonth || 0} month pending</p>
//             </div>
//           </div>
//           {/* Mini bar for Paid / Dues / Advance */}
//           <div className="flex gap-1 mt-4 h-4 rounded-full overflow-hidden bg-gray-200">
//             <div className="bg-green-500" style={{ width: `${(totalPaid / totalAmount) * 100}%` }} title={`Paid: ₹${totalPaid}`} />
//             <div className="bg-red-500" style={{ width: `${(totalDues / totalAmount) * 100}%` }} title={`Dues: ₹${totalDues}`} />
//             <div className="bg-blue-400" style={{ width: `${(advance / totalAmount) * 100}%` }} title={`Advance: ₹${advance}`} />
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl shadow p-8">
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <Home /> Room Details
//           </h3>
//           <InfoRow label="Category" value={room?.category} />
//           <InfoRow label="Room Number" value={room?.roomNumber} />
//           <InfoRow label="Capacity" value={room?.capacity} />
//           <InfoRow label="Facilities" value={room?.facilities?.length ? room.facilities.join(", ") : "—"} />
//           <InfoRow label="Check-in Date" value={formatDate(tenant?.checkInDate)} />
//         </div>
//       </div>

//       {/* ================= PAYMENT HISTORY ================= */}
//       <div className="bg-white rounded-3xl shadow p-8">
//         <h3 className="text-2xl font-bold mb-6">Payment History</h3>

//         {payments.length === 0 ? (
//           <p className="text-gray-500 text-sm">No payments recorded yet</p>
//         ) : (
//           <div className="space-y-4">
//             {payments.map((p) => (
//               <div
//                 key={p._id}
//                 className="flex items-center gap-4 p-4 rounded-xl border hover:bg-gray-50"
//               >
//                 <CheckCircle
//                   className={
//                     p.status === "paid"
//                       ? "text-green-600"
//                       : "text-yellow-500"
//                   }
//                 />

//                 <div className="flex-1">
//                   <p className="font-semibold">
//                     ₹{p.amountpaid} • {p.mode}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {formatDate(p.createdAt)}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === "paid"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                       }`}
//                   >
//                     {p.status}
//                   </span>

//                   {/* DOWNLOAD INVOICE */}
//                   <button
//                     disabled={invoiceLoadingId === p._id}
//                     onClick={async () => {
//                       if (invoiceLoadingId) return;

//                       try {
//                         setInvoiceLoadingId(p._id);

//                         // ✅ VERY IMPORTANT — allow UI to render spinner
//                         await new Promise((resolve) => setTimeout(resolve, 0));

//                         await downloadPaymentInvoice({
//                           paymentId: p._id,
//                           tenantName: tenant.name || "-",
//                           email: p.email || "-",
//                           branchName: branch.name || "-",
//                           roomNumber: p.roomNumber || "-",
//                           amountpaid: p.amountpaid || 0,
//                           walletused: p.walletused || 0,
//                           totalAmount: p.totalAmount || 0,
//                           mode: p.mode || "-",
//                           paymentStatus: p.status || "-",
//                           razorpay_payment_id: p.razorpay_payment_id || "-",
//                           razorpay_order_id: p.razorpay_order_id || "-",
//                           paymentInMonth: p.paymentInMonth || "-",
//                           createdAt: p.createdAt,
//                         });

//                       } catch (err) {
//                         console.error("Invoice download failed", err);
//                       } finally {
//                         setInvoiceLoadingId(null);
//                       }
//                     }}
//                     className={`px-3 py-1 text-sm font-semibold rounded-lg border flex items-center gap-2
//     ${invoiceLoadingId === p._id
//                         ? "cursor-not-allowed opacity-60 border-gray-300 text-gray-500"
//                         : "text-indigo-600 border-indigo-200 hover:bg-indigo-50"
//                       }`}
//                   >
//                     {invoiceLoadingId === p._id ? (
//                       <>
//                         <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
//                         Generating...
//                       </>
//                     ) : (
//                       "Download"
//                     )}
//                   </button>



//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */
// const StatusBadge = ({ status }) => (
//   <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">{status}</span>
// );

// const SummaryCard = ({ title, value, icon, color }) => {
//   const colors = {
//     indigo: "bg-indigo-50 text-indigo-700",
//     green: "bg-green-50 text-green-700",
//     blue: "bg-blue-50 text-blue-700",
//     red: "bg-red-50 text-red-700",
//     yellow: "bg-yellow-50 text-yellow-700"
//   };
//   return (
//     <div className="bg-white rounded-3xl p-6 shadow flex flex-col items-start gap-2">
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>{icon}</div>
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-extrabold">{value}</p>
//     </div>
//   );
// };

// const ProgressRing = ({ percent }) => (
//   <div className="relative w-24 h-24">
//     <svg className="w-full h-full rotate-[-90deg]">
//       <circle cx="50%" cy="50%" r="45%" stroke="#E5E7EB" strokeWidth="8" fill="none" />
//       <circle
//         cx="50%"
//         cy="50%"
//         r="45%"
//         stroke="#4F46E5"
//         strokeWidth="8"
//         fill="none"
//         strokeDasharray="283"
//         strokeDashoffset={283 - (283 * percent) / 100}
//         strokeLinecap="round"
//       />
//     </svg>
//   </div>
// );

// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between text-sm py-2 border-b last:border-none">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-semibold text-gray-800">{value ?? "--"}</span>
//   </div>
// );



import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Wallet,
  IndianRupee,
  Home,
  Calendar,
  Clock,
  Download,
  MapPin,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetpayrenttenantdashboardQuery } from "../backend-routes/ownerroutes/tenant";
import downloadPaymentInvoice from "./utils/downloadrentinvoice";

/* ================= UTILS ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "--";

const getTier = (percent) => {
  if (percent >= 90) return { label: "Gold", color: "text-amber-600 bg-amber-50 border-amber-100", icon: "✨" };
  if (percent >= 60) return { label: "Silver", color: "text-slate-600 bg-slate-50 border-slate-100", icon: "🥈" };
  return { label: "Bronze", color: "text-orange-600 bg-orange-50 border-orange-100", icon: "🥉" };
};

/* ================= SUB-COMPONENTS ================= */

const DueCountdown = ({ extduesdate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!extduesdate) return;
    const interval = setInterval(() => {
      const diff = new Date(extduesdate) - new Date();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff / 36e5) % 24),
        mins: Math.floor((diff / 6e4) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [extduesdate]);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-medium mt-4">
      <Clock size={14} className="animate-pulse" />
      <span>Due in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m</span>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function TenantDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoiceLoadingId, setInvoiceLoadingId] = useState(null);

  const { data: apiRes, isLoading } = useGetpayrenttenantdashboardQuery(id);
  
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const data = apiRes?.data;
  if (!data) return <div className="p-10 text-center text-slate-500">No records found.</div>;

  const { tenant, branch, room, finance, payments = [] } = data;
  const monthlyRent = Number(finance?.monthlyRent || 0);
  const totalPaid = Number(finance?.totalPaid || 0);
  const totalDues = Number(finance?.totalDues || 0);
  const progress = Math.min(100, Math.round((totalPaid / (totalPaid + totalDues || 1)) * 100));
  const tier = getTier(progress);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 pt-12 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  {tenant?.status || "Active"}
                </span>
                <span className={`text-xs px-2 py-1 rounded border ${tier.color}`}>
                  {tier.icon} {tier.label} Tier
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">{tenant?.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-400 text-sm">
                <span className="flex items-center gap-1"><Home size={14}/> Room {tenant?.roomNumber}</span>
                <span className="flex items-center gap-1"><MapPin size={14}/> {branch?.city}</span>
                <span className="flex items-center gap-1"><Calendar size={14}/> In: {formatDate(tenant?.checkInDate)}</span>
              </div>
              <DueCountdown extduesdate={tenant?.startDuesFrom} />
            </div>

            <button
              onClick={() => navigate(`/payrent/${tenant?.id}`)}
              // disabled={totalDues <= 0}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:bg-slate-700"
            >
              Pay Now <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Monthly Rent" value={monthlyRent} icon={<IndianRupee />} trend="Current Cycle" />
          <StatCard label="Outstanding" value={totalDues} icon={<AlertTriangle />} variant={totalDues > 0 ? "danger" : "success"} />
          <StatCard label="Security Deposit" value={finance?.securityDeposit} icon={<ShieldCheck />} variant="info" />
          <StatCard label="Total Paid" value={totalPaid} icon={<Wallet />} variant="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* PAYMENT COMPLIANCE */}
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Payment Compliance</h3>
            <div className="flex flex-col items-center justify-center">
               <div className="relative mb-6">
                  <svg className="w-32 h-32">
                    <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                    <circle cx="64" cy="64" r="58" stroke="#4f46e5" strokeWidth="10" fill="none" 
                      strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * progress) / 100}
                      strokeLinecap="round" className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-800">{progress}%</span>
                  </div>
               </div>
               <p className="text-slate-500 text-sm text-center">You have cleared <span className="font-bold text-slate-800">{progress}%</span> of your lifetime dues at this property.</p>
            </div>
          </div>

          {/* RECENT PAYMENTS */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Transaction History</h3>
              <span className="text-xs font-medium text-slate-400">{payments.length} Records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-8 py-4 font-semibold">Date & Mode</th>
                    <th className="px-8 py-4 font-semibold">Amount</th>
                    <th className="px-8 py-4 font-semibold">Status</th>
                    <th className="px-8 py-4 font-semibold text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <p className="text-sm font-bold text-slate-700">{formatDate(p.createdAt)}</p>
                        <p className="text-xs text-slate-400 uppercase">{p.mode}</p>
                      </td>
                      <td className="px-8 py-4 font-bold text-slate-700">₹{p.amountpaid}</td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button 
                          onClick={() => {/* Download Logic */}}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= DESIGN SYSTEM COMPONENTS ================= */

const StatCard = ({ label, value, icon, variant = "default", trend }) => {
  const styles = {
    default: "text-indigo-600 bg-indigo-50",
    success: "text-emerald-600 bg-emerald-50",
    danger: "text-rose-600 bg-rose-50",
    info: "text-blue-600 bg-blue-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${styles[variant]}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">₹{value?.toLocaleString('en-IN') || 0}</p>
      {trend && <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-2">{trend}</p>}
    </div>
  );
};