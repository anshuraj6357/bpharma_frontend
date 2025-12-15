import { useState, useEffect } from 'react';
import { Plus, User, Zap, Droplet, Wifi, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import {
  useAddStaffMutation,
  useGetAllStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from "../../Bothfeatures/features2/api/staffapi";





export default function StaffUtilities() {
  const { data: AllStaffdata } = useGetAllStaffQuery();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('staff');
  const [staff, setstaff] = useState(null);

  // 🔹 Backend: Fetch staff list from API
  console.log("Fetch staff data from backend here");






  const handleAddStaff = () => {
    navigate('/addstaff')

  };

  const handleEditStaff = (id) => {
    navigate(`/edit/${id}`)
    console.log("Edit staff:", id);
  };

  const handlePayBill = (id) => {
    // 🔹 Backend: Update bill status to 'paid'
    console.log("Pay bill API call for bill id:", id);
  };

  const handleApplyRent = () => {


    console.log("Apply AI rent update API call");
  };

  const handleNewAnalysis = () => {

    console.log("Run new rent analysis request");
  };
  useEffect(() => {

    if (AllStaffdata) {
      setstaff(AllStaffdata?.AllStaff.flat())
      console.log(AllStaffdata)
    }
  }, [AllStaffdata]);


  console.log(staff)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl lg:text-4xl font-bold tracking-tight">
            Staff & Utilities Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage staff, utilities, and allocations
          </p>
        </div>

        <button
          onClick={handleAddStaff}
          className="flex items-center gap-2 bg-[#ff6b35] hover:bg-[#e55a2b] 
        transition-all px-5 py-3 rounded-xl shadow-md text-white text-sm lg:text-base"
        >
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      {/* Wrapper Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 lg:px-6 py-3">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === "staff"
                ? "text-[#1e3a5f] font-semibold bg-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            Staff
          </button>
        </div>

        {/* Staff Table / Cards */}
        {activeTab === "staff" && (
          <div className="p-4 lg:p-6">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    {["Name", "Role", "Contact", "Property", "Status", "Actions"].map(
                      (title) => (
                        <th
                          key={title}
                          className="px-5 py-3 text-left text-sm font-semibold text-gray-700 border-b"
                        >
                          {title}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {staff?.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 flex items-center gap-3">
                        <div className="w-11 h-11 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shadow">
                          <User size={20} />
                        </div>
                        <span className="font-medium text-[#1e3a5f]">{s.name}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {s.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-700">{s.contact}</td>

                      <td className="px-5 py-4 text-gray-700">
                        {s.branch?.[0].address}
                      </td>

                      <td className="px-5 py-4">
                        {s.status === "Active" ? (
                          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                            In-Active
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleEditStaff(s._id)}
                          className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid lg:hidden gap-4">
              {staff?.map((s) => (
                <div
                  key={s._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-full text-white flex items-center justify-center shadow">
                      <User size={22} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#1e3a5f]">{s.name}</p>
                      <p className="text-sm text-gray-600">{s.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Contact:</span> {s.contact}
                    </p>
                    <p>
                      <span className="font-medium">Property:</span>{" "}
                      {s.branch?.[0].address}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {s.status === "Active" ? (
                        <span className="text-green-600 font-semibold">Active</span>
                      ) : (
                        <span className="text-red-600 font-semibold">In-Active</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEditStaff(s._id)}
                    className="mt-4 w-full bg-gray-100 border border-gray-300 rounded-lg py-2 font-medium text-sm hover:bg-gray-200 transition"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );


}
