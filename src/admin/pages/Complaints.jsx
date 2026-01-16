import { useState } from "react";
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

export default function Complaints() {
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: statsData, isLoading: statsLoading } =
    useGetAllComplainQuery();

  const { data: statusCompData, isLoading } =
    useGetComplainByStatusQuery(filterStatus);

  const [changeComplainStatus, { isLoading: statusLoading }] =
    useChangeComplainStatusMutation();

  const complaints = statusCompData?.data || [];

  const handleStatusChange = async (complaintId, status) => {
    await changeComplainStatus({ complaintId, newStatus: status });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 lg:px-12 pt-safe pb-safe">

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#1e3a5f] to-blue-600 rounded-b-3xl p-4 sm:p-6 text-white shadow-lg">
        <h1 className="text-lg sm:text-2xl font-bold">
          Complaint Management
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1">
          Monitor and resolve tenant issues
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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

      {/* ================= FILTER ================= */}
      <div className="sticky top-[92px] sm:top-[120px] z-30 bg-white p-2 rounded-xl shadow mt-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {["all", "Pending", "In-Progress", "Resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${
              filterStatus === status
                ? "bg-[#1e3a5f] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4 mt-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => <ComplaintSkeleton key={i} />)
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No complaints found
          </p>
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

/* ================= CARD ================= */
function ComplaintCard({ complaint, loading, onAction }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow border w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="flex gap-2 items-center">
          <CircleDot className="text-[#1e3a5f]" />
          <h2 className="font-semibold text-base sm:text-lg">
            {complaint.title}
          </h2>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <InfoBlock label="Tenant" value={complaint?.tenantId?.username} />
        <InfoBlock label="Branch" value={complaint?.branchId?.name} />
        <InfoBlock
          label="Reported"
          value={new Date(complaint.createdAt).toLocaleString("en-IN")}
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {complaint.description}
      </p>

      <div className="mt-4">
        {loading ? (
          <p className="text-xs text-gray-400">Updating...</p>
        ) : (
          <>
            {complaint.status === "Pending" && (
              <ActionButton
                label="Mark In Progress"
                color="blue"
                icon={<Clock size={16} />}
                onClick={() => onAction(complaint._id, "In-Progress")}
              />
            )}
            {complaint.status === "In-Progress" && (
              <ActionButton
                label="Mark Resolved"
                color="green"
                icon={<CheckCircle size={16} />}
                onClick={() => onAction(complaint._id, "Resolved")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL UI ================= */
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

function ActionButton({ label, icon, onClick, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600",
    green: "from-green-500 to-emerald-600 hover:from-green-600",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full sm:w-auto mt-2 flex items-center justify-center gap-2
        px-5 py-3 rounded-xl text-sm font-semibold text-white
        bg-gradient-to-r ${colors[color]} shadow active:scale-95 transition`}
    >
      {icon}
      {label}
    </button>
  );
}

function DashboardCard({ icon, label, count }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex gap-4 items-center">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  );
}

/* ================= SKELETONS ================= */
function ComplaintSkeleton() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 w-1/2 rounded" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
      <div className="h-14 bg-gray-200 rounded" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow animate-pulse h-24" />
  );
}
