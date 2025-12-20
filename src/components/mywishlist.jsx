import React from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
const dummyTenantDashboard = {
  tenant: {
    id: "TEN123",
    name: "Anshu Raj",
    email: "anshu@gmail.com",
    roomNumber: 203,
    status: "Active",
    checkInDate: "2024-01-10"
  },

  branch: {
    name: "Krishna PG",
    address: "Near Tech Park",
    city: "Bangalore"
  },

  room: {
    roomNumber: 203,
    category: "Pg",
    price: 9000,
    advancedmonth: 2,
    services: [
      { name: "Food", price: 300 },
      { name: "WiFi", price: 400 },
      { name: "Laundry", price: 300 }
    ]
  },

  finance: {
    monthlyRent: 9000,
    advancePaid: 18000,
    securityDeposit: 5000,
    totalPaid: 36000,
    totalDues: 9000,
    paymentStatus: "dues",
    duesMonth: 1,
    duesDays: 12,
    nextPaymentDate: "2025-01-10",
    remainingDays: 8
  },

  payments: [
    { month: "Jan 2025", date: "2025-01-01", amount: 9000, status: "Paid" },
    { month: "Dec 2024", date: "2024-12-01", amount: 9000, status: "Paid" },
    { month: "Nov 2024", date: "2024-11-01", amount: 9000, status: "Paid" }
  ],

  complaints: {
    total: 3,
    pending: 1,
    inProgress: 1,
    resolved: 1
  }
};


export default function WishlistDetails() {
  const data = dummyTenantDashboard;

  const totalAmount =
    data.finance.totalPaid + data.finance.totalDues;

  const progress = Math.round(
    (data.finance.totalPaid / totalAmount) * 100
  );

  const isOverDue = data.finance.remainingDays <= 3;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {data.tenant.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Room {data.room.roomNumber} • {data.branch.name}, {data.branch.city}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={data.tenant.status} />
          <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
            Pay Rent
          </button>
        </div>
      </div>

      {/* ================= DUES ALERT ================= */}
      {data.finance.totalDues > 0 && (
        <div
          className={`flex items-center gap-4 p-5 rounded-2xl border
            ${isOverDue
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
            }`}
        >
          <AlertTriangle />
          <div>
            <p className="font-bold">
              Outstanding Due: ₹{data.finance.totalDues}
            </p>
            <p className="text-sm">
              Payment due in {data.finance.remainingDays} days
            </p>
          </div>
        </div>
      )}

      {/* ================= FINANCIAL SUMMARY ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Monthly Rent" value={`₹${data.finance.monthlyRent}`} />
        <Stat title="Advance Used" value={`₹${data.finance.advancePaid}`} accent />
        <Stat title="Paid Till Now" value={`₹${data.finance.totalPaid}`} />
        <Stat title="Total Due" value={`₹${data.finance.totalDues}`} danger />
      </div>

      {/* ================= PROGRESS + TIMER ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Progress Ring */}
        <div className="bg-white rounded-3xl shadow p-8 flex items-center gap-8">
          <ProgressRing percent={progress} />
          <div>
            <p className="text-sm text-gray-500">Payment Completion</p>
            <p className="text-3xl font-extrabold">{progress}%</p>
            <p className="text-gray-600 mt-1">
              {data.finance.duesMonth} month pending
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-3xl shadow p-8 flex flex-col justify-center">
          <p className="text-sm opacity-80">Next Rent Due In</p>
          <p className="text-5xl font-extrabold mt-2">
            {data.finance.remainingDays}
          </p>
          <p className="text-lg opacity-80">Days</p>
        </div>
      </div>

      {/* ================= RENT BREAKDOWN ================= */}
      <div className="bg-white rounded-3xl shadow p-8">
        <h3 className="text-2xl font-bold mb-6">Rent & Services Breakdown</h3>

        <div className="space-y-3">
          {data.room.services.map((s, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-gray-700">{s.name}</span>
              <span className="font-semibold">₹{s.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
          <span>Total Monthly Rent</span>
          <span>₹{data.room.price}</span>
        </div>
      </div>

      {/* ================= PAYMENT TIMELINE ================= */}
      <div className="bg-white rounded-3xl shadow p-8">
        <h3 className="text-2xl font-bold mb-6">Payment Timeline</h3>

        <div className="space-y-4">
          {data.payments.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <CheckCircle className="text-green-600" />
              <div className="flex-1">
                <p className="font-semibold">
                  {p.month} • ₹{p.amount}
                </p>
                <p className="text-sm text-gray-500">{p.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPLAINT SUMMARY ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MiniStat title="Total Complaints" value={data.complaints.total} />
        <MiniStat title="Pending" value={data.complaints.pending} danger />
        <MiniStat title="In Progress" value={data.complaints.inProgress} />
        <MiniStat title="Resolved" value={data.complaints.resolved} success />
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatusBadge = ({ status }) => (
  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
    {status}
  </span>
);

const Stat = ({ title, value, accent, danger }) => (
  <div
    className={`p-6 rounded-2xl shadow
      ${accent ? "bg-indigo-50 text-indigo-700" : ""}
      ${danger ? "bg-red-50 text-red-600" : "bg-gray-50"}`}
  >
    <p className="text-sm opacity-70">{title}</p>
    <p className="text-2xl font-extrabold mt-1">{value}</p>
  </div>
);

const MiniStat = ({ title, value, danger, success }) => (
  <div
    className={`p-5 rounded-2xl text-center shadow
      ${danger ? "bg-red-50 text-red-600" : ""}
      ${success ? "bg-green-50 text-green-600" : "bg-gray-50"}`}
  >
    <p className="text-sm">{title}</p>
    <p className="text-3xl font-extrabold">{value}</p>
  </div>
);

const ProgressRing = ({ percent }) => (
  <div className="relative w-24 h-24">
    <svg className="w-full h-full rotate-[-90deg]">
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke="#E5E7EB"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke="#4F46E5"
        strokeWidth="8"
        fill="none"
        strokeDasharray="283"
        strokeDashoffset={283 - (283 * percent) / 100}
        strokeLinecap="round"
      />
    </svg>
  </div>
);
