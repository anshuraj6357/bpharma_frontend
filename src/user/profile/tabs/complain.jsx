import {
  CheckCircle,
  Clock,
  AlertCircle,
  Building2,
} from "lucide-react";

const statusMap = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="w-4 h-4" />,
  },
  "In-Progress": {
    color: "bg-blue-100 text-blue-700",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  Resolved: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="w-4 h-4" />,
  },
};

export default function Complaints({ complaints }) {
  if (!complaints?.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No complaints raised 🌱
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {complaints.map((c) => {
        const status = statusMap[c.status];
        const branch = c.branchId;

        return (
          <div
            key={c._id}
            className="bg-white rounded-2xl p-5 shadow-md
                       border border-lime-100
                       hover:shadow-lg hover:border-lime-300 transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {c.title}
                </h3>

                <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full
                                 bg-lime-100 text-lime-700 font-medium">
                  {c.category}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
              >
                {status.icon}
                {c.status}
              </div>
            </div>

            {/* Description */}
            {c.description && (
              <p className="mt-3 text-gray-600 leading-relaxed">
                {c.description}
              </p>
            )}

            {/* Branch Info (ONLY if exists) */}
            {branch ? (
              <div className="mt-4 flex items-center gap-3 bg-lime-50 p-3 rounded-xl">
                {branch.Propertyphoto?.[0] ? (
                  <img
                    src={branch.Propertyphoto[0]}
                    alt={branch.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-lime-100 flex items-center justify-center">
                    <Building2 className="text-lime-600" />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-800">
                    {branch.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {branch.city}, {branch.state}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-sm text-gray-400 italic">
                Branch information not available
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>
                Created{" "}
                {new Date(c.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span>
                Updated{" "}
                {new Date(c.updatedAt).toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}