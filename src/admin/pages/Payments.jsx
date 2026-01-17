import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Plus, X, Calendar, Filter, Search, Wallet, FileText, AlertCircle } from "lucide-react";
import {
  useCreateExpenseMutation,
  useGetRevenueDetailsQuery,
  useGetAllExpenseQuery
} from "../../Bothfeatures/adminfeatures/api/paymentapi.js";
import {
  useGetAllBranchbybranchIdQuery
} from "../../Bothfeatures/adminfeatures/api/propertyapi.js";
import { useDispatch } from "react-redux";
import { setAlltenants } from "../../Bothfeatures/notpaidtenantslice";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: branches } = useGetAllBranchbybranchIdQuery();
  const { data: expensedata } = useGetAllExpenseQuery();

  const currentDate = new Date();
  const [dateAndYear, setDateAndYear] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [activeTab, setActiveTab] = useState("collection");
  const [payments, setpayments] = useState(null);

  const { data, isLoading } = useGetRevenueDetailsQuery(dateAndYear);
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
    }
  }, [data, expensedata]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleseerest = (notpaiddata) => {
    dispatch(setAlltenants(notpaiddata));
    navigate("/all-notpaid-tenant");
  };

  const handleshowtenantlldetails = (payment) => {
    // Navigate or modal logic here
    console.log("View details", payment);
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

  // Helper for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6 md:space-y-8 min-h-screen bg-gray-50/50 pb-10">
      
      {/* ---------------- HEADER SECTION ---------------- */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Financial Overview
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Track your property revenue, expenses, and tenant dues.
          </p>
        </div>
        
        {/* Date Filter Controls */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
            <div className="px-2 text-gray-400">
                <Calendar size={18} />
            </div>
            <select
                value={dateAndYear.month}
                onChange={(e) => setDateAndYear((prev) => ({ ...prev, month: Number(e.target.value) }))}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer hover:text-orange-600 transition"
            >
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
                ))}
            </select>
            <div className="h-4 w-[1px] bg-gray-300"></div>
            <select
                value={dateAndYear.year}
                onChange={(e) => setDateAndYear((prev) => ({ ...prev, year: Number(e.target.value) }))}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer hover:text-orange-600 transition pr-2"
            >
                {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
      </div>

      {/* ---------------- STATS CARDS (Responsive Grid) ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Income */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet className="text-emerald-500" size={48} />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(data?.income)}</h3>
            <div className="flex items-center mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                <TrendingUp size={14} className="mr-1" /> +Collected
            </div>
        </div>

        {/* Expenses */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="text-rose-500" size={48} />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(data?.expense)}</h3>
            <div className="flex items-center mt-2 text-xs font-medium text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-full">
                <TrendingDown size={14} className="mr-1" /> Outflow
            </div>
        </div>

        {/* Net Profit */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl shadow-md text-white relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Net Profit</p>
            <h3 className="text-2xl font-bold text-white">
                {formatCurrency(data ? data.income - data.expense : 0)}
            </h3>
            <p className="text-xs text-indigo-200 mt-2 opacity-80">Income - Expense</p>
        </div>

        {/* Dues / Not Paid */}
        <div 
            onClick={() => handleseerest(data?.notpaid)}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group cursor-pointer hover:border-orange-200 hover:shadow-md transition-all duration-300"
        >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertCircle className="text-orange-500" size={48} />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Pending Collections</p>
            <h3 className="text-2xl font-bold text-orange-600">{data?.notpaid?.length || 0}</h3>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">Tenants pending</span>
                <span className="text-xs text-orange-600 font-semibold flex items-center">
                    View list <span className="ml-1">→</span>
                </span>
            </div>
        </div>
      </div>

      {/* ---------------- ACTION BAR ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto overflow-x-auto">
            {[
                { id: "collection", label: "Rent Collection" },
                { id: "expenses", label: "Expenses" },
                { id: "reminders", label: "Reminders" }
            ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                    ${activeTab === tab.id 
                        ? "bg-white text-slate-800 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-gray-200/50"}
                `}
            >
                {tab.label}
            </button>
            ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full sm:w-auto px-2 pb-2 sm:pb-0">
             {activeTab === "expenses" ? (
                <button
                    onClick={handleAddExpense}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-orange-200"
                >
                    <Plus size={18} /> <span className="hidden sm:inline">Add Expense</span> <span className="sm:hidden">Expense</span>
                </button>
             ) : (
                <button
                    onClick={changepage}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#2a4d7a] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-200"
                >
                    <Plus size={18} /> <span className="hidden sm:inline">Record Payment</span> <span className="sm:hidden">Payment</span>
                </button>
             )}
        </div>
      </div>

      {/* ---------------- CONTENT AREA ---------------- */}
      
      {/* RENT COLLECTION VIEW */}
      {activeTab === "collection" && (
        <div className="animate-fadeIn">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 text-slate-500 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium">Tenant</th>
                            <th className="px-6 py-4 font-medium">Property</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments?.map((payment) => (
                            <tr 
                                key={payment._id} 
                                onClick={() => handleshowtenantlldetails(payment)}
                                className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                            {payment?.tenantId?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700">{payment?.tenantId?.name}</p>
                                            <p className="text-xs text-slate-400">Room {payment?.tenantId?.roomNumber}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{payment?.branch?.name}</td>
                                <td className="px-6 py-4 font-bold text-slate-800">{formatCurrency(payment?.amountpaid)}</td>
                                <td className="px-6 py-4">
                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${payment?.tilldatestatus === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                                        {payment?.tilldatestatus === "paid" ? "Paid" : "Partial/Due"}
                                     </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{new Date(payment.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-xs">
                                        <span className="text-emerald-600 font-medium">Adv: ₹{payment?.tenantId?.advanced}</span>
                                        <span className="text-rose-500 font-medium">Due: ₹{Math.abs(payment?.tenantId?.duesamount)}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                         {(!payments || payments.length === 0) && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                    No payment records found for this month.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards (Visible only on small screens) */}
            <div className="md:hidden space-y-3">
                {payments?.map((payment) => (
                    <div 
                        key={payment._id} 
                        onClick={() => handleshowtenantlldetails(payment)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                                    {payment?.tenantId?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800">{payment?.tenantId?.name}</h4>
                                    <p className="text-xs text-slate-500">{payment?.branch?.name} • Room {payment?.tenantId?.roomNumber}</p>
                                </div>
                            </div>
                            <span className="font-bold text-lg text-slate-800">{formatCurrency(payment?.amountpaid)}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                             <div className="bg-gray-50 p-2 rounded-lg">
                                <p className="text-gray-400">Status</p>
                                <p className={`font-medium ${payment?.tilldatestatus === "paid" ? "text-emerald-600" : "text-rose-600"}`}>
                                    {payment?.status}
                                </p>
                             </div>
                             <div className="bg-gray-50 p-2 rounded-lg">
                                <p className="text-gray-400">Date</p>
                                <p className="font-medium text-slate-700">
                                    {new Date(payment.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}
                                </p>
                             </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                             <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                                {payment?.mode || "Cash"}
                             </span>
                             <span className="text-xs text-rose-500 font-medium">
                                Due: ₹{Math.abs(payment?.tenantId?.duesamount)}
                             </span>
                        </div>
                    </div>
                ))}
                 {(!payments || payments.length === 0) && (
                    <div className="text-center py-10 bg-white rounded-xl text-gray-400">
                        No payments found.
                    </div>
                )}
            </div>
        </div>
      )}

      {/* EXPENSE VIEW */}
      {activeTab === "expenses" && (
        <div className="animate-fadeIn">
            {/* Desktop Expense Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                     <thead className="bg-gray-50/50 text-slate-500 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Property</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data?.allExpense?.map((exp) => (
                             <tr key={exp._id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-700">{exp.category}</td>
                                <td className="px-6 py-4 text-slate-500">{exp.branchId?.address || "General"}</td>
                                <td className="px-6 py-4 text-slate-500">{new Date(exp.createdAt).toLocaleDateString("en-IN")}</td>
                                <td className="px-6 py-4 text-right font-bold text-rose-600">-{formatCurrency(exp.amount)}</td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             {/* Mobile Expense Cards */}
            <div className="md:hidden space-y-3">
                {data?.allExpense?.map((exp) => (
                    <div key={exp._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                                <TrendingDown size={18} />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800">{exp.category}</h4>
                                <p className="text-xs text-slate-400">{new Date(exp.createdAt).toLocaleDateString("en-IN", {day:'numeric', month:'short'})}</p>
                            </div>
                        </div>
                        <span className="font-bold text-rose-600">-{formatCurrency(exp.amount)}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* ---------------- MODALS ---------------- */}
      
      {/* ADD EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setShowExpenseModal(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all relative overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-slate-800">Add New Expense</h2>
                    <button onClick={() => setShowExpenseModal(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleExpenseSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                        <select
                            value={expenseData.category}
                            onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                        >
                            <option value="">Select Category</option>
                            {["Electricity", "Water Bill", "WiFi", "Maintenance", "Cleaning", "Other"].map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Amount (₹)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400 text-sm">₹</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={expenseData.amount}
                                onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Property Branch</label>
                        <select
                            value={expenseData.branchId}
                            onChange={(e) => setExpenseData({ ...expenseData, branchId: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                        >
                            <option value="">Select Branch</option>
                            {branches?.allbranch?.map((branch) => (
                                <option key={branch._id} value={branch._id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-200 mt-2"
                    >
                        Save Expense
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}