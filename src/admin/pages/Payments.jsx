import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import {
  useCreateExpenseMutation,
  useGetRevenueDetailsQuery,
  useGetAllExpenseQuery

} from "../../Bothfeatures/features2/api/paymentapi.js";
import {
 useGetAllBranchbybranchIdQuery
} from "../../Bothfeatures/features2/api/propertyapi.js";
import { useDispatch } from "react-redux";
import { setAlltenants } from "../../Bothfeatures/notpaidtenantslice";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data:branches}=useGetAllBranchbybranchIdQuery()
  const {data:expensedata}=useGetAllExpenseQuery()

  const currentDate = new Date();
  const [dateAndYear, setDateAndYear] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [activeTab, setActiveTab] = useState("collection");
  const [payments, setpayments] = useState(null);

  const { data } = useGetRevenueDetailsQuery(dateAndYear);
  const [createExpense] = useCreateExpenseMutation();

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    branchId: "",
  });

  useEffect(() => {
    if (data) {
      setpayments(data?.allPayments);
      console.log("data", data?.allPayments);
    }
    if(expensedata){
      console.log(expensedata)
    }
  }, [data,expensedata]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleseerest = (notpaiddata) => {
    dispatch(setAlltenants(notpaiddata));
    navigate("/all-notpaid-tenant");
  };

  const handleshowtenantlldetails = () => {
    alert("here all tenant details will have to show");
  };

  const alladv = (tenantpayments = {}) =>
    Object.values(tenantpayments).reduce((sum, t) => sum + (t.toatadvance || 0), 0);

  // ---------------- ADD EXPENSE ----------------
  const handleAddExpense = () => {
    setShowExpenseModal(true);
    setActiveTab("expenses");
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    if (!expenseData.category || !expenseData.amount || !expenseData.branchId) {
      alert("Please fill all the details");
      return;
    }
    try {
      const res = await createExpense(expenseData).unwrap();
      if (res.success) {
        alert("Expense created successfully!");
        setExpenseData({ category: "", amount: "", branchId: "" });
        setShowExpenseModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating expense");
    }
  };

  const changepage = () => {
    navigate("/admin/add-payment");
  };

  const handleRemindTenant = (tenant) => {
    console.log(`Sending rent reminder → POST /api/reminder to ${tenant}`);
  };

  const handleViewExpense = (id) => {
    console.log(`View expense details → GET /api/expenses/${id}`);
  };

  const handleSaveReminders = () => {
    console.log("Saving reminder settings → PUT /api/reminders/settings");
  };

  return (
    <div className="space-y-8">
      {/* ---------------- HEADER ---------------- */}
      <div className="animate-fadeIn mb-6">
        <h1 className="text-[#1e3a5f] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          Payment Management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-1">
          Track rent collection, expenses, and financial performance
        </p>
      </div>

      {/* ---------------- FINANCIAL SUMMARY ---------------- */}
      <div className="overflow-x-auto">
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-[900px] md:min-w-0">
          <div className="dashboard-card min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <p className="card-label">Total Income</p>
              <TrendingUp className="text-green-500" size={22} />
            </div>
            <p className="card-value">₹{data?.income}</p>
          </div>
          <div className="dashboard-card min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <p className="card-label">Total Expenses</p>
              <TrendingDown className="text-red-500" size={22} />
            </div>
            <p className="card-value">₹{data?.expense}</p>
          </div>
          <div className="dashboard-card min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <p className="card-label">Net Profit</p>
              <TrendingUp className="text-[#ff6b35]" size={22} />
            </div>
            <p className="card-value text-[#ff6b35]">
              ₹{data ? data.income - data.expense : 0}
            </p>
            <p className="card-sub">Current month</p>
          </div>
          <div
            onClick={() => handleseerest(data?.notpaid)}
            className="dashboard-card min-w-[200px] cursor-pointer hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="card-label">Not Paid (Month)</p>
              <TrendingDown className="text-red-500" size={22} />
            </div>
            <p className="card-value">{data?.notpaid?.length}</p>
          </div>
          <div className="dashboard-card min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <p className="card-label">Total Advance</p>
              <TrendingUp className="text-green-500" size={22} />
            </div>
            <p className="card-value">₹{alladv(data?.tenantpayments)}</p>
          </div>
        </div>
      </div>

      {/* ---------------- TITLE + BUTTON + FILTER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="flex flex-col">
          <h1 className="text-[#1e3a5f] text-2xl md:text-3xl font-bold tracking-tight">
            Payment Management
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Manage tenant rent, advances, and dues efficiently
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3 w-full sm:w-auto">
          <button
            onClick={changepage}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#ff8c4a] text-white font-medium rounded-xl shadow-md hover:scale-[1.03] transition-transform duration-200 w-full sm:w-auto"
          >
            <Plus size={18} /> Add Payment
          </button>

          <select
            value={dateAndYear.month}
            onChange={(e) => setDateAndYear((prev) => ({ ...prev, month: Number(e.target.value) }))}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={dateAndYear.year}
            onChange={(e) => setDateAndYear((prev) => ({ ...prev, year: Number(e.target.value) }))}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {["collection", "expenses", "reminders"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 font-medium ${activeTab === tab ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"}`}
            >
              {tab === "collection" ? "Rent Collection" : tab === "expenses" ? "Expenses" : "Reminders"}
            </button>
          ))}
        </div>

        {/* ---------------- RENT COLLECTION ---------------- */}
        {activeTab === "collection" && (
          <div className="p-4 sm:p-6">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-100">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Tenant</th>
                    <th className="px-4 py-3 text-left">Property / Room</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Advance</th>
                    <th className="px-4 py-3 text-left">Dues</th>
                    <th className="px-4 py-3 text-left">Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments?.map((payment) => (
                    <tr
                      key={payment._id}
                      onClick={() => handleshowtenantlldetails(payment)}
                      className="cursor-pointer hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold">
                          {payment?.tenantId?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1e3a5f]">{payment?.tenantId?.name}</p>
                          <p className="text-xs text-gray-500">Room {payment?.tenantId?.roomNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{payment?.branch?.name || "—"}</p>
                        <p className="text-xs text-gray-400">PG / Hostel</p>
                      </td>
                      <td className="px-4 py-4 font-bold text-[#1e3a5f]">₹{payment?.amountpaid}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${payment?.tilldatestatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                        >
                          {payment?.tilldatestatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-4 text-green-600 font-semibold">₹{payment?.tilldateAdvance}</td>
                      <td className="px-4 py-4 text-red-600 font-semibold">₹{Math.abs(payment?.tilldatedues)}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${payment?.mode === "Online" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                        >
                          {payment?.mode}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- EXPENSES TAB ---------------- */}
        {activeTab === "expenses" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Showing expenses for {new Date().toLocaleDateString("en-IN")}
              </p>
              <button onClick={handleAddExpense} className="btn-orange flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                <Plus size={16} /> Add Expense
              </button>
            </div>

            {/* ---------------- ADD EXPENSE MODAL ---------------- */}
            {showExpenseModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                  <button
                    onClick={() => setShowExpenseModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
                  <form className="space-y-4" onSubmit={handleExpenseSubmit}>
                    {/* Category Dropdown */}
                    <select
                      value={expenseData.category}
                      onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">Select Category</option>
                      {["Electricity", "Water Bill", "WiFi", "Maintenance", "Other"].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    {/* Amount Input */}
                    <input
                      type="number"
                      placeholder="Amount"
                      value={expenseData.amount}
                      onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    {/* Branch Dropdown */}
                    <select
                      value={expenseData.branchId}
                      onChange={(e) => setExpenseData({ ...expenseData, branchId: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">Select Branch</option>
                      {branches.allbranch.length>0 && branches?.allbranch?.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.name} - {branch.address}
                        </option>
                      ))}
                    </select>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
                    >
                      Save Expense
                    </button>
                  </form>

                </div>
              </div>
            )}

            {/* ---------------- EXPENSES TABLE ---------------- */}
            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100 mt-4">
              <table className="w-full">
                <thead className="table-head bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-left">Property</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.allExpense?.map((exp) => (
                    <tr key={exp._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-[#1e3a5f] font-medium">{exp.category}</td>
                      <td className="px-4 py-3 text-red-500 font-semibold">₹{exp.amount}</td>
                      <td className="px-4 py-3">{new Date(exp.createdAt).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-3 text-gray-700">{exp.branchId?.address || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
