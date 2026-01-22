import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  Home,
  Banknote,
  ShieldCheck,
  MapPin,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const AddTenantModal = ({
  adding,
  setAdding,
  formdata,
  handleChange,
  alldata,
  handleSaveTenant,
}) => {
  return (
    <AnimatePresence>
      {adding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAdding(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#F8FAFC] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 sm:px-8 py-5 bg-white border-b border-slate-100 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">
                    <User size={18} strokeWidth={3} />
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                    Onboard New Tenant
                  </h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Digital Entry System
                </p>
              </div>

              <button
                onClick={() => setAdding(false)}
                className="p-2.5 sm:p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-5 sm:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left */}
                <div className="space-y-6">
                  {/* Branch */}
                  <Card>
                    <SectionLabel icon={<MapPin size={14} />} title="Branch Allocation" />
                    <div className="mt-4">
                      <select
                        name="branch"
                        value={formdata.branch}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-semibold text-sm ${
                          !formdata.branch
                            ? "border-orange-200 focus:border-orange-500"
                            : "border-transparent focus:border-indigo-500"
                        }`}
                      >
                        <option value="">Choose a branch...</option>
                        {alldata?.allbranch?.map((branch) => (
                          <option key={branch._id} value={branch._id}>
                            {branch.address}
                          </option>
                        ))}
                      </select>

                      {!formdata.branch && (
                        <div className="flex items-center gap-1 mt-2 text-orange-500">
                          <AlertCircle size={12} />
                          <p className="text-[10px] font-bold uppercase tracking-tight">
                            Required
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Personal */}
                  <Card>
                    <SectionLabel icon={<User size={14} />} title="Personal Profile" />
                    <div className="grid gap-4 mt-4">
                      <CustomInput
                        icon={<User size={16} />}
                        name="name"
                        placeholder="Full Name"
                        value={formdata.name}
                        onChange={handleChange}
                      />
                      <CustomInput
                        icon={<Mail size={16} />}
                        name="email"
                        placeholder="Email"
                        value={formdata.email}
                        onChange={handleChange}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomInput
                          icon={<Phone size={16} />}
                          name="contactNumber"
                          placeholder="Phone"
                          value={formdata.contactNumber}
                          onChange={handleChange}
                        />
                        <CustomInput
                          icon={<Phone size={16} />}
                          name="emergencyContactNumber"
                          placeholder="Emergency"
                          value={formdata.emergencyContactNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right */}
                <div className="space-y-6">
                  <Card>
                    <SectionLabel icon={<Home size={14} />} title="Room Allocation" />
                    <div className="mt-4">
                      <CustomInput
                        icon={<Home size={16} />}
                        name="roomNumber"
                        placeholder="Room No"
                        value={formdata.roomNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </Card>

                  <Card>
                    <SectionLabel
                      icon={<Banknote size={14} />}
                      title="Financial Setup"
                      color="text-indigo-600"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <CustomInput
                        name="Rent"
                        placeholder="Rent (₹)"
                        value={formdata.Rent}
                        onChange={handleChange}
                      />
                      <CustomInput
                        name="advanced"
                        placeholder="Deposit (₹)"
                        value={formdata.advanced}
                        onChange={handleChange}
                      />
                      <div className="sm:col-span-2">
                        <CustomInput
                          name="dues"
                          placeholder="Dues (₹)"
                          value={formdata.dues}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <SectionLabel icon={<ShieldCheck size={14} />} title="Verification" />
                    <div className="grid gap-4 mt-4">
                      <select
                        name="idProofType"
                        value={formdata.idProofType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none font-semibold text-sm"
                      >
                        <option value="">Select ID Type</option>
                        <option value="Aadhar-Card">Aadhaar Card</option>
                        <option value="Voter-Id-Card">Voter ID</option>
                      </select>
                      <CustomInput
                        name="idProof"
                        placeholder="ID Number"
                        value={formdata.idProof}
                        onChange={handleChange}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-10 py-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setAdding(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-colors"
              >
                Discard
              </button>

              <button
                onClick={handleSaveTenant}
                className="group flex items-center gap-3 bg-slate-900 hover:bg-orange-500 text-white px-8 sm:px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                Save Tenant
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* Helpers */

const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    {children}
  </div>
);

const SectionLabel = ({ icon, title, color = "text-slate-400" }) => (
  <div className="flex items-center gap-2">
    <span className={`${color} bg-slate-50 p-1.5 rounded-lg`}>
      {icon}
    </span>
    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500">
      {title}
    </h3>
  </div>
);

const CustomInput = ({ icon, ...props }) => (
  <div className="relative group">
    {icon && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
        {icon}
      </span>
    )}
    <input
      {...props}
      className={`w-full ${icon ? "pl-11" : "px-5"} py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold text-sm text-slate-700 placeholder:text-slate-300 shadow-sm`}
    />
  </div>
);

export default AddTenantModal;
