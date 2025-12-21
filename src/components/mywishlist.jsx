import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Wallet,
  IndianRupee,
  Home,
  Calendar,
  Clock
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetpayrenttenantdashboardQuery } from "../Bothfeatures/features2/api/tenant";
import downloadPaymentInvoice from "../components/utils/downloadrentinvoice"
/* ================= HELPERS ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
    : "--";

const getTier = (percent) => {
  if (percent >= 90) return { label: "Gold", color: "bg-yellow-100 text-yellow-800" };
  if (percent >= 60) return { label: "Silver", color: "bg-gray-100 text-gray-800" };
  if (percent >= 30) return { label: "Bronze", color: "bg-orange-100 text-orange-800" };
  return { label: "Starter", color: "bg-red-100 text-red-800" };
};


const DueCountdown = ({ extduesdate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!extduesdate) return;

    const nextDue = new Date(extduesdate);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextDue - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    }, 1000);

    return () => clearInterval(interval);
  }, [extduesdate]);

  return (
    <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl flex items-center gap-4">
      <Clock />
      <p className="font-semibold text-sm">
        Next Rent Due in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
      </p>
    </div>
  );
};


/* ================= DASHBOARD ================= */
export default function TenantDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: apiRes, isLoading } = useGetpayrenttenantdashboardQuery(id);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const data = apiRes?.data;

  if (!data) {
    return <div className="text-center text-red-500">Failed to load dashboard</div>;
  }

  const { tenant, branch, room, finance, payments = [] } = data;
  console.log(tenant)

  // ================= SAFE NUMERIC CALCULATIONS =================
  const monthlyRent = Number(finance?.monthlyRent || room?.price || 0);
  const totalPaid = Number(finance?.totalPaid || 0);
  const totalDues = Number(finance?.totalDues || 0);
  const advance = Number(finance?.advancePaid || finance?.securityDeposit || 0);

  const totalAmount = Math.max(totalPaid + totalDues, 1);
  const progress = Math.min(100, Math.round((totalPaid / totalAmount) * 100));

  const isOverDue = totalDues > 0;
  const tier = getTier(progress);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-3xl p-8 shadow">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold">{tenant?.name}</h1>
            <p className="opacity-90 mt-1">
              Room {tenant?.roomNumber} • {branch?.name}, {branch?.city}
            </p>
            <p className="mt-3 text-sm opacity-80 flex items-center gap-2">
              <Calendar size={16} />
              Check-in: {formatDate(tenant?.checkInDate)}
            </p>

            {/* ================= NEXT DUE COUNTDOWN ================= */}
            <DueCountdown extduesdate={tenant?.startDuesFrom} />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <StatusBadge status={tenant?.status} />
            <button
              onClick={() => navigate(`/payrent/${tenant?.id}`)}
              className={`px-6 py-3 rounded-xl font-bold shadow ${isOverDue
                ? "bg-white text-indigo-600 hover:bg-gray-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Pay Rent
            </button>
          </div>
        </div>
      </div>

      {/* ================= FINANCE SUMMARY ================= */}
      <div className="grid md:grid-cols-5 gap-6">
        <SummaryCard title="Monthly Rent" value={`₹${monthlyRent}`} icon={<IndianRupee />} color="indigo" />
        <SummaryCard title="Total Paid" value={`₹${totalPaid}`} icon={<Wallet />} color="green" />
        <SummaryCard title="Advance / Security" value={`₹${advance}`} icon={<CheckCircle />} color="blue" />
        <SummaryCard title="Outstanding Due" value={`₹${totalDues}`} icon={<AlertTriangle />} color={isOverDue ? "red" : "green"} />
        <SummaryCard title="Tenant Tier" value={tier.label} icon={<Clock />} color="yellow" />
      </div>

      {/* ================= DUE ALERT ================= */}
      {isOverDue && (
        <div className="flex gap-4 p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700">
          <AlertTriangle />
          <div>
            <p className="font-bold text-lg">Payment Pending: ₹{totalDues}</p>
            <p className="text-sm">Please clear dues to avoid penalties</p>
          </div>
        </div>
      )}

      {/* ================= PROGRESS + BAR ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow p-8 flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <ProgressRing percent={progress} />
            <div>
              <p className="text-sm text-gray-500">Payment Completion</p>
              <p className="text-3xl font-extrabold">{progress}%</p>
              <p className="text-gray-600 mt-1">{finance?.duesMonth || 0} month pending</p>
            </div>
          </div>
          {/* Mini bar for Paid / Dues / Advance */}
          <div className="flex gap-1 mt-4 h-4 rounded-full overflow-hidden bg-gray-200">
            <div className="bg-green-500" style={{ width: `${(totalPaid / totalAmount) * 100}%` }} title={`Paid: ₹${totalPaid}`} />
            <div className="bg-red-500" style={{ width: `${(totalDues / totalAmount) * 100}%` }} title={`Dues: ₹${totalDues}`} />
            <div className="bg-blue-400" style={{ width: `${(advance / totalAmount) * 100}%` }} title={`Advance: ₹${advance}`} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Home /> Room Details
          </h3>
          <InfoRow label="Category" value={room?.category} />
          <InfoRow label="Room Number" value={room?.roomNumber} />
          <InfoRow label="Capacity" value={room?.capacity} />
          <InfoRow label="Facilities" value={room?.facilities?.length ? room.facilities.join(", ") : "—"} />
          <InfoRow label="Check-in Date" value={formatDate(tenant?.checkInDate)} />
        </div>
      </div>

      {/* ================= PAYMENT HISTORY ================= */}
      <div className="bg-white rounded-3xl shadow p-8">
        <h3 className="text-2xl font-bold mb-6">Payment History</h3>

        {payments.length === 0 ? (
          <p className="text-gray-500 text-sm">No payments recorded yet</p>
        ) : (
          <div className="space-y-4">
            {payments.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 p-4 rounded-xl border hover:bg-gray-50"
              >
                <CheckCircle
                  className={
                    p.status === "paid"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }
                />

                <div className="flex-1">
                  <p className="font-semibold">
                    ₹{p.amountpaid} • {p.mode}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(p.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {p.status}
                  </span>

                  {/* DOWNLOAD INVOICE */}
                  {p.status === "paid" && (
                    <button
                      onClick={() => {
                        console.log(p);
                        downloadPaymentInvoice({
                          paymentId: p._id,
                          tenantName: tenant.name || "-",
                          email: p.email || "-",
                          branchName: branch.name || "-",
                          roomNumber: p.roomNumber || "-",
                          amountpaid: p.amountpaid || 0,
                          walletused: p.walletused || 0,
                          totalAmount: p.totalAmount || 0,
                          mode: p.mode || "-",
                          paymentStatus: p.status || "-",
                          razorpay_payment_id: p.razorpay_payment_id || "-",
                          razorpay_order_id: p.razorpay_order_id || "-",
                          paymentInMonth: p.paymentInMonth || "-",
                          createdAt: p.createdAt,
                        });
                      }}
                      className="px-3 py-1 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
                    >
                      Download
                    </button>


                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
const StatusBadge = ({ status }) => (
  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">{status}</span>
);

const SummaryCard = ({ title, value, icon, color }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700",
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
    yellow: "bg-yellow-50 text-yellow-700"
  };
  return (
    <div className="bg-white rounded-3xl p-6 shadow flex flex-col items-start gap-2">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-extrabold">{value}</p>
    </div>
  );
};

const ProgressRing = ({ percent }) => (
  <div className="relative w-24 h-24">
    <svg className="w-full h-full rotate-[-90deg]">
      <circle cx="50%" cy="50%" r="45%" stroke="#E5E7EB" strokeWidth="8" fill="none" />
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

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm py-2 border-b last:border-none">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value ?? "--"}</span>
  </div>
);
