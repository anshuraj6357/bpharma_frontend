import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTenantByIdQuery } from "../Bothfeatures/features2/api/tenant";
import {
  useRazorpayrentPaymentVerifyMutation,
  useRazorpayPaymentMutation,
} from "../Bothfeatures/features2/api/paymentapi";
import { toast } from "react-toastify";

export default function PayRentPanel() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [useWallet, setUseWallet] = useState(false); // Wallet toggle

  const { data, isLoading, error } = useGetTenantByIdQuery(id);
  const [razorpayPayment] = useRazorpayPaymentMutation();
  const [razorpayrentPaymentVerify] = useRazorpayrentPaymentVerifyMutation();

  if (isLoading) return <p>Loading tenant data...</p>;
  if (error) return <p>Failed to load tenant data</p>;

  // Tenant data
  const tenant = {
    id: data?.foundTenant?._id || "",
    name: data?.foundTenant?.name || "",
    roomNo: data?.foundTenant?.roomNumber || "",
    monthlyRent: data?.foundTenant?.rent || 0,
    advance: data?.foundTenant?.advancedpaid || 0,
    duesamount: data?.foundTenant?.duesamount || 0,
    email: data?.foundTenant?.email || "",
    phone: data?.foundTenant?.phone || "",
    walletBalance: data?.foundTenant?.tenantId?.walletBalance || 0,
  };

  const enteredAmount = Number(amount) || 0;

  // Wallet applicable rule
  const isWalletApplicable = tenant.monthlyRent > 1;

  // Wallet usage calculation
  const walletUsed =
    useWallet && isWalletApplicable
      ? Math.min(tenant.walletBalance, enteredAmount)
      : 0;

  const netPayable = Math.max(enteredAmount - walletUsed, 0);

  // Adjust advance and dues dynamically
  const amountToPay = Math.max(netPayable - tenant.advance, 0);
  const remainingAdvance = Math.max(tenant.advance - netPayable, 0);
  const remainingDue = Math.max(tenant.duesamount - amountToPay, 0);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (enteredAmount <= 0) return;
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Payment SDK failed to load");
        setLoading(false);
        return;
      }

      // Create order on backend
      const response = await razorpayPayment({
        amount: netPayable * 100, // convert to paise
        receipt: `receipt_${Date.now()}_${tenant.id}`,
      }).unwrap();

      const order = response?.order;
      if (!order || order.amount < 100) {
        toast.error("Order creation failed or amount too low");
        setLoading(false);
        return;
      }

      // Razorpay options
      const options = {
        key: "rzp_live_Rn8nwfw3Hdmb8E", // Razorpay Key
        amount: order.amount,
        currency: "INR",
        name: "Roomgi Rent Payment",
        description: `Rent Payment for Room ${tenant.roomNo}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyData = await razorpayrentPaymentVerify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tenantId: tenant.id,
              amount: enteredAmount,
              walletUsed,
            }).unwrap();

            if (verifyData?.success) {
              toast.success("Payment successful!");
              setPaymentSuccess(true);
              setAmount("");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification error");
          }
        },
        modal: {
          ondismiss: () => toast.info("Payment cancelled"),
        },
        prefill: {
          name: tenant.name,
          email: tenant.email,
          contact: tenant.phone || "",
        },
        theme: { color: "#2563eb" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8 border">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Pay Rent</h2>
        <p className="text-gray-500 mt-1">
          {tenant.name} • Room {tenant.roomNo}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-3 border">
        <Row label="Monthly Rent" value={`₹${tenant.monthlyRent}`} bold />
        <Row label="Advance Available" value={`₹${tenant.advance}`} />
        <Row label="Current Due" value={`₹${tenant.duesamount}`} highlight />
      </div>

      {/* INPUT */}
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Enter Amount to Pay
        </label>
        <input
          type="number"
          placeholder="Enter any amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full px-4 py-3 rounded-xl border text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          disabled={loading || paymentSuccess}
        />
        <p className="text-xs text-gray-500 mt-1">
          You can make partial payments
        </p>
      </div>

      {/* LIVE PREVIEW */}
      <div
        className={`rounded-2xl p-5 border transition-all ${
          remainingDue > 0
            ? "bg-yellow-50 border-yellow-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <p className="font-semibold">
          {remainingDue > 0
            ? "Remaining Due After Payment"
            : "All Dues Cleared 🎉"}
        </p>
        <p
          className={`text-3xl font-extrabold mt-2 ${
            remainingDue > 0 ? "text-yellow-700" : "text-green-700"
          }`}
        >
          ₹{remainingDue}
        </p>

        {remainingAdvance > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            Advance remaining: ₹{remainingAdvance}
          </p>
        )}
      </div>

      {/* WALLET TOGGLE */}
      {isWalletApplicable && tenant.walletBalance > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Use Wallet Balance
              </p>
              <p className="text-xs text-blue-600">
                Available: ₹{tenant.walletBalance}
              </p>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useWallet}
                onChange={() => setUseWallet(!useWallet)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {useWallet && (
            <p className="text-xs text-indigo-700 font-medium">
              ₹{walletUsed} will be deducted from wallet
            </p>
          )}
        </div>
      )}

      {!isWalletApplicable && (
        <p className="text-xs text-gray-500 text-center">
          Wallet is not applicable for this rent
        </p>
      )}

      {/* ACTION */}
      <button
        disabled={enteredAmount <= 0 || loading || paymentSuccess}
        onClick={handlePay}
        className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-lg font-bold shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Processing Payment..."
          : `Pay ₹${netPayable} ${useWallet ? "(Wallet Applied)" : ""}`}
      </button>

      {/* FOOTER INFO */}
      <p className="text-xs text-gray-500 text-center">
        Advance will be adjusted automatically. Payments are securely processed.
      </p>

      {paymentSuccess && (
        <p className="text-green-600 text-center font-semibold">
          ✅ Payment successful!
        </p>
      )}
    </div>
  );
}

const Row = ({ label, value, highlight, bold }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span
      className={`font-medium ${highlight ? "text-indigo-600" : ""} ${
        bold ? "font-bold text-gray-900" : ""
      }`}
    >
      {value}
    </span>
  </div>
);
