import { useState } from "react";
import {
  Crown,
  Calendar,
  CheckCircle,
  CreditCard,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

/* ---------------- MAIN COMPONENT ---------------- */
export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState("all");

  const plans = [
    {
      id: "1_month",
      title: "Starter",
      duration: "1 Month",
      price: 499,
      badge: null,
      savings: null,
    },
    {
      id: "3_month",
      title: "Growth",
      duration: "3 Months",
      price: 1399,
      badge: "POPULAR",
      savings: "Save ₹98",
    },
    {
      id: "6_month",
      title: "Professional",
      duration: "6 Months",
      price: 2599,
      badge: "BEST VALUE",
      savings: "Save ₹395",
    },
    {
      id: "9_month",
      title: "Business",
      duration: "9 Months",
      price: 3699,
      badge: null,
      savings: "Save ₹792",
    },
    {
      id: "11_month",
      title: "Enterprise",
      duration: "11 Months",
      price: 4399,
      badge: "MAX SAVINGS",
      savings: "Save ₹1090",
    },
  ];

  const handleSubscribe = (plan) => {
    console.log("Subscribe:", plan);
    // Razorpay order create → checkout → verify
  };

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16">

      {/* ---------------- HERO ---------------- */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 p-8 rounded-3xl text-white shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Crown className="text-yellow-300" />
          Subscription & Billing
        </h1>
        <p className="text-blue-100 mt-2 max-w-2xl">
          Upgrade your Roomgi admin to manage unlimited properties, rooms,
          tenants, payments and complaints with full control.
        </p>
      </div>

      {/* ---------------- CURRENT PLAN ---------------- */}
      <div className="bg-white p-6 rounded-2xl shadow border flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="text-gray-500 text-sm">Current Plan</p>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">
            Professional (6 Months)
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            Valid till <span className="font-medium">12 Jan 2026</span>
          </p>

          <p className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <ShieldCheck size={16} />
            Subscription Active
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:opacity-90 transition">
            Renew / Upgrade
          </button>
        </div>
      </div>

      {/* ---------------- FILTER ---------------- */}
      <div className="bg-white p-3 rounded-2xl shadow flex gap-2 w-fit">
        {["all", "monthly", "long-term"].map((type) => (
          <button
            key={type}
            onClick={() => setBillingCycle(type)}
            className={`px-4 py-2 rounded-xl font-medium ${
              billingCycle === type
                ? "bg-[#1e3a5f] text-white"
                : "bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ---------------- PLANS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>

      {/* ---------------- PAYMENT HISTORY ---------------- */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={18} />
          Payment History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Plan</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">12 Dec 2025</td>
                <td>6 Months</td>
                <td>₹2599</td>
                <td className="text-green-600 font-medium">Paid</td>
              </tr>
              <tr>
                <td className="py-3">12 Jun 2025</td>
                <td>3 Months</td>
                <td>₹1399</td>
                <td className="text-green-600 font-medium">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PLAN CARD ---------------- */
function PlanCard({ plan, onSubscribe }) {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow border hover:shadow-lg transition">

      {plan.badge && (
        <span className="absolute -top-3 left-4 text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">
          {plan.badge}
        </span>
      )}

      <h3 className="text-xl font-bold">{plan.title}</h3>
      <p className="text-gray-500">{plan.duration}</p>

      <p className="text-3xl font-bold mt-4 flex items-center gap-1">
        <IndianRupee size={22} /> {plan.price}
      </p>

      {plan.savings && (
        <p className="text-sm text-green-600 mt-1">{plan.savings}</p>
      )}

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <Feature text="Unlimited Properties & Rooms" />
        <Feature text="Tenant & Payment Management" />
        <Feature text="Complaint & Analytics Dashboard" />
        <Feature text="Priority Support" />
      </div>

      <button
        onClick={() => onSubscribe(plan)}
        className="mt-6 w-full flex items-center justify-center gap-2
          px-5 py-2.5 rounded-xl font-semibold
          bg-gradient-to-r from-blue-500 to-blue-600
          text-white hover:opacity-90 transition"
      >
        <CreditCard size={16} />
        Subscribe Securely
      </button>
    </div>
  );
}

/* ---------------- FEATURE ---------------- */
function Feature({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle size={14} className="text-green-500" />
      {text}
    </div>
  );
}
