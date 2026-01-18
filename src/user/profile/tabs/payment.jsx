import {
  CheckCircle,
  Clock,
  Building2,
  CreditCard,
} from "lucide-react";

export default function Payments({ payments }) {
  if (!payments?.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No payments yet 💳
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {payments.map((p) => {
        const isActive = p.status === "Active";

        return (
          <div
            key={p._id}
            className="bg-white rounded-2xl p-5 shadow-md
                       border border-lime-100
                       hover:shadow-lg hover:border-lime-300 transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-lime-100 flex items-center justify-center">
                  <Building2 className="text-lime-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {p.branch?.name || "Unknown Property"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Room #{p.roomNumber}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  isActive
                    ? "bg-lime-100 text-lime-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isActive ? "Active" : "In-Active"}
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Info label="Rent" value={`₹ ${p.rent || 0}`} />
              <Info label="Advance" value={`₹ ${p.advanced || 0}`} />
              <Info label="Dues" value={`₹ ${p.dues || 0}`} />
              <Info label="Security" value={`₹ ${p.securitydeposit || 0}`} />
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {p.mode || "Offline"} • {p.paymentstatus}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(p.checkInDate).toLocaleString("en-IN")}
              </div>

              {p.checkedoutdate && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Checkout{" "}
                  {new Date(p.checkedoutdate).toLocaleString("en-IN")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-lime-50 rounded-lg p-3 text-center">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}