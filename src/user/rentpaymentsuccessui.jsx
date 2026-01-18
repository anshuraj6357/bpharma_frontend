export default function PaymentSuccessUI  ({ details }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border space-y-6">
      
      {/* SUCCESS ICON */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-3xl font-extrabold text-green-700 mt-4">
          Payment Successful
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Thank you! Your rent payment is completed.
        </p>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="bg-gray-50 rounded-2xl p-6 border space-y-3">
        <SummaryRow label="Tenant Name" value={details.tenantName} />
        <SummaryRow label="Room Number" value={details.roomNo} />
        <SummaryRow label="Paid Amount" value={`₹${details.paidAmount}`} bold />
        <SummaryRow label="Wallet Used" value={`₹${details.walletUsed}`} />
        <SummaryRow label="Net Paid Online" value={`₹${details.netPaid}`} />
        <SummaryRow label="Remaining Due" value={`₹${details.remainingDue}`} />
      </div>

      {/* TRANSACTION INFO */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-2">
        <p className="text-sm text-green-700 font-semibold">
          Transaction Details
        </p>
        <p className="text-xs text-gray-600">
          Payment ID: <span className="font-medium">{details.paymentId}</span>
        </p>
        <p className="text-xs text-gray-600">
          Order ID: <span className="font-medium">{details.orderId}</span>
        </p>
        <p className="text-xs text-gray-600">
          Date: <span className="font-medium">{details.date}</span>
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
        >
          Pay Another Rent
        </button>

        <button
          onClick={() => toast.info("Receipt download coming soon")}
          className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          Download Receipt
        </button>
      </div>

      <p className="text-xs text-center text-gray-500">
        A confirmation email/SMS will be sent shortly 📩
      </p>
    </div>
  );
};

const SummaryRow = ({ label, value, bold }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className={`text-gray-900 ${bold ? "font-bold" : "font-medium"}`}>
      {value}
    </span>
  </div>
);
