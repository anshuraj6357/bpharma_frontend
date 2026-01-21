import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTenantByIdQuery } from "../backend-routes/ownerroutes/tenant";
import {
  useRazorpayrentPaymentVerifyMutation,
  useRazorpayPaymentMutation,
} from "../backend-routes/userroutes/payment";
import { toast } from "react-toastify";
import { 
  ShieldCheck, 
  Wallet, 
  Info, 
  ChevronRight, 
  CreditCard,
  History,
  AlertCircle
} from "lucide-react";
import PaymentSuccessUI from "../user/rentpaymentsuccessui";

export default function PayRentPanel() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const { data, isLoading, error } = useGetTenantByIdQuery(id);
  const [razorpayPayment] = useRazorpayPaymentMutation();
  const [razorpayrentPaymentVerify] = useRazorpayrentPaymentVerifyMutation();

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">Initializing Secure Checkout...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto p-8 text-center bg-rose-50 rounded-3xl border border-rose-100">
      <AlertCircle className="mx-auto text-rose-500 mb-4" size={40} />
      <p className="text-rose-700 font-bold">Session Error</p>
      <p className="text-rose-600/70 text-sm mt-1">We couldn't retrieve your tenant profile. Please refresh.</p>
    </div>
  );

  // Data Mapping
  const tenant = {
    id: data?.foundTenant?._id || "",
    name: data?.foundTenant?.name || "Guest Tenant",
    roomNo: data?.foundTenant?.roomNumber || "N/A",
    monthlyRent: data?.foundTenant?.rent || 0,
    advance: data?.foundTenant?.advancedpaid || 0,
    duesamount: data?.foundTenant?.duesamount || 0,
    email: data?.foundTenant?.email || "",
    phone: data?.foundTenant?.phone || "",
    walletBalance: data?.foundTenant?.tenantId?.walletBalance || 0,
  };

  const enteredAmount = Number(amount) || 0;
  const isWalletApplicable = tenant.monthlyRent > 1;
  const walletUsed = useWallet && isWalletApplicable ? Math.min(tenant.walletBalance, enteredAmount) : 0;
  const netPayable = Math.max(enteredAmount - walletUsed, 0);
  const amountToPay = Math.max(netPayable - tenant.advance, 0);
  const remainingDue = Math.max(tenant.duesamount - amountToPay, 0);

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
    if (enteredAmount <= 0) {
      toast.warning("Please enter a valid amount");
      return;
    }
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("SDK Load Failed");

      const response = await razorpayPayment({
        amount: netPayable * 100,
        receipt: `rcpt_${Date.now()}`,
      }).unwrap();

      const order = response?.order;
      
      const options = {
        key: "rzp_live_Rn8nwfw3Hdmb8E", 
        amount: order.amount,
        currency: "INR",
        name: "Roomgi",
        description: `Rent - Room ${tenant.roomNo}`,
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
              setPaymentDetails({
                tenantName: tenant.name,
                roomNo: tenant.roomNo,
                paidAmount: enteredAmount,
                walletUsed,
                netPaid: netPayable,
                remainingDue,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                date: new Date().toLocaleString(),
              });
              setPaymentSuccess(true);
            }
          } catch (err) {
            toast.error("Verification failed. Contact support.");
          }
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess && paymentDetails) {
    return <PaymentSuccessUI details={paymentDetails} />;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Checkout</h2>
            <div className="mt-1 flex items-center gap-2 text-slate-400 text-sm font-medium">
              <span>{tenant.name}</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span>Room {tenant.roomNo}</span>
            </div>
          </div>
          <ShieldCheck className="text-indigo-400" size={28} />
        </div>
      </div>

      <div className="p-8 space-y-6 -mt-6 bg-white rounded-t-[2rem] relative z-20">
        {/* SUMMARY TILES */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Monthly Rent</p>
            <p className="text-lg font-bold text-slate-900">₹{tenant.monthlyRent.toLocaleString()}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100/50">
            <p className="text-[10px] uppercase tracking-widest font-black text-indigo-400 mb-1">Total Due</p>
            <p className="text-lg font-bold text-indigo-600">₹{tenant.duesamount.toLocaleString()}</p>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Payment Amount</label>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Partial Payment Allowed</span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-slate-400 font-bold text-xl group-focus-within:text-indigo-500 transition-colors">₹</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-5 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-2xl font-black focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* WALLET INTEGRATION */}
        {isWalletApplicable && tenant.walletBalance > 0 && (
          <div className={`p-4 rounded-2xl border-2 transition-all ${useWallet ? 'bg-emerald-50 border-emerald-500/30' : 'bg-slate-50 border-transparent'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${useWallet ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700 uppercase">Apply Wallet</p>
                  <p className="text-[10px] font-bold text-slate-500">Balance: ₹{tenant.walletBalance}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={useWallet} onChange={() => setUseWallet(!useWallet)} />
                <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        )}

        {/* IMPACT PREVIEW */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 opacity-60">
              <History size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Post-Payment Status</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-400">Net Payable Now</span>
              <span className="text-xl font-black text-white">₹{netPayable.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <span className="text-sm font-medium text-slate-400">Remaining Balance</span>
              <span className={`text-sm font-black ${remainingDue === 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                {remainingDue === 0 ? "Fully Cleared 🎉" : `₹${remainingDue.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>

        {/* SECURE ACTION */}
        <div className="space-y-4 pt-2">
          <button
            disabled={enteredAmount <= 0 || loading}
            onClick={handlePay}
            className="w-full group relative flex items-center justify-center gap-3 py-5 bg-indigo-600 rounded-2xl text-white font-black text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-indigo-200"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <CreditCard size={20} />
                <span>Pay ₹{netPayable.toLocaleString()} Securely</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Bank Grade 256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}