import { useState,  } from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  CircleDot,
} from "lucide-react";

import {
  useGetAllComplainQuery,
  useGetComplainByStatusQuery,
  useChangeComplainStatusMutation,
} from "../../Bothfeatures/features2/api/complainapi";

/* ---------------- MAIN COMPONENT ---------------- */
export default function Complaints() {
  const [filterStatus, setFilterStatus] = useState("all");


  const {
    data: statsData,
    isLoading: statsLoading,
  } = useGetAllComplainQuery();

  const {
    data: statusCompData,
    isLoading,
 
  } = useGetComplainByStatusQuery(filterStatus);


  const [changeComplainStatus, { isLoading: statusLoading }] =
    useChangeComplainStatusMutation();

  const complaints = statusCompData?.data || [];

  const handleStatusChange = async (complaintId, status) => {
    await changeComplainStatus({
      complaintId,
      newStatus: status,
    });
     };



  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16">

    
      <div className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 p-6 rounded-3xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Complaint Management</h1>
        <p className="text-blue-100">Monitor and resolve tenant issues</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsLoading ? (
          <>
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
          </>
        ) : (
          <>
            <DashboardCard
              icon={<AlertTriangle className="text-yellow-500" />}
              label="Pending"
              count={statsData?.stats?.pending || 0}
            />
            <DashboardCard
              icon={<Clock className="text-blue-500" />}
              label="In Progress"
              count={statsData?.stats?.InProgress || 0}
            />
            <DashboardCard
              icon={<CheckCircle className="text-green-500" />}
              label="Resolved"
              count={statsData?.stats?.Resolved || 0}
            />
          </>
        )}
      </div>

      {/* ---------------- FILTER ---------------- */}
      <div className="sticky top-2 bg-white p-3 rounded-2xl shadow flex gap-2">
        {["all", "pending", "In-Progress", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl font-medium ${filterStatus === status
                ? "bg-[#1e3a5f] text-white"
                : "bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ---------------- COMPLAINT LIST ---------------- */}
      <div className="space-y-4">
        {isLoading  ? (
          [...Array(4)].map((_, i) => <ComplaintSkeleton key={i} />)
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-500">No complaints found</p>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              loading={statusLoading}
              onAction={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ---------------- COMPLAINT CARD ---------------- */
function ComplaintCard({ complaint, loading, onAction }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <CircleDot className="text-[#1e3a5f]" />
          <h2 className="font-semibold text-lg">{complaint.title}</h2>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <InfoBlock label="Tenant" value={complaint?.tenantId?.username} />
        <InfoBlock label="Branch" value={complaint?.branchId?.name} />
        <InfoBlock
          label="Reported"
          value={new Date(complaint.createdAt).toLocaleString("en-IN")}
        />
      </div>

      <p className="mt-3 text-gray-600">{complaint.description}</p>

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-gray-400">Updating...</p>
        ) : (
          <>
            {complaint.status === "Pending" && (
              <button
                onClick={() => onAction(complaint._id, "In-Progress")}
                className="
        group flex items-center gap-2
        px-5 py-2.5
        bg-gradient-to-r from-blue-500 to-blue-600
        text-white text-sm font-semibold
        rounded-xl
        shadow-md
        hover:from-blue-600 hover:to-blue-700
        hover:shadow-lg
        active:scale-95
        transition-all duration-200
      "
              >
                <Clock
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
                Mark In Progress
              </button>
            )}

            {complaint.status === "In-Progress" && (
              <button
                onClick={() => onAction(complaint._id, "Resolved")}
                className="
        group flex items-center gap-2
        px-5 py-2.5
        bg-gradient-to-r from-green-500 to-emerald-600
        text-white text-sm font-semibold
        rounded-xl
        shadow-md
        hover:from-green-600 hover:to-emerald-700
        hover:shadow-lg
        active:scale-95
        transition-all duration-200
      "
              >
                <CheckCircle
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                Mark Resolved
              </button>
            )}
          </>

        )}
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */
function StatusBadge({ status }) {
  const map = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In-Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}

function DashboardCard({ icon, label, count }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex gap-4">
      {icon}
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

/* ---------------- SKELETONS ---------------- */
function ComplaintSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 w-1/3 rounded" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
      <div className="h-16 bg-gray-200 rounded" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow animate-pulse h-24" />
  );
}
