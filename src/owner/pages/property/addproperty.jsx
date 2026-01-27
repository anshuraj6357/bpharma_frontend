import React, { useEffect } from "react";
import { X, Building2, Loader2, ChevronRight, MapPin, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetStatesQuery,
  useGetCitiesMutation,
  useGetLocationNamesMutation,
} from "../../../backend-routes/ownerroutes/branch";

const AddPropertyModal = ({
  formData,
  setFormData,
  handleSaveProperty,
  addingBranch,
  setShowAddModal,
}) => {
  const { data: statesData, isLoading: loadingStates } = useGetStatesQuery();
  const [getCities, { data: citiesData, isLoading: loadingCities }] = useGetCitiesMutation();
  const [getLocations, { data: locationsData, isLoading: loadingLocs }] = useGetLocationNamesMutation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "locationName") {
      const selectedLocation = locationsData?.data?.find((loc) => loc.name === value);
      setFormData((prev) => ({
        ...prev,
        locationName: value,
        pincode: selectedLocation?.pincode || "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      getCities({ state: value });
      setFormData((prev) => ({ ...prev, city: "", locationName: "", pincode: "" }));
    }

    if (name === "city") {
      getLocations({ state: formData.state, city: value });
      setFormData((prev) => ({ ...prev, locationName: "", pincode: "" }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !addingBranch && setShowAddModal(false)}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-slate-50 w-full max-w-2xl rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"
      >
        {/* Header - Sticky */}
        <div className="px-6 py-5 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">Add Property</h2>
              <p className="text-xs text-slate-500 font-medium">Enter branch details</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(false)}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body - Scrollable */}
       <form
  onSubmit={handleSaveProperty}
  className="overflow-y-auto px-4 sm:px-6 py-6 pb-32 sm:pb-8 space-y-10
             bg-slate-50"
>
  {/* Section: Basic Info */}
  <section className="space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
      <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider
                     text-slate-700">
        Basic Information
      </h3>
    </div>

    <Input
      label="Property / Branch Name"
      name="name"
      placeholder="e.g. Royal Heights"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </section>

  {/* Section: Geography */}
  <section className="bg-white p-5 sm:p-6 rounded-3xl
                      border border-slate-200
                      shadow-md space-y-6">
    <div className="flex items-center gap-3">
      <MapPin size={18} className="text-indigo-600" />
      <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider
                     text-slate-700">
        Address
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Select
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        options={statesData?.data || []}
        placeholder={loadingStates ? "Loading..." : "Select State"}
      />

      <Select
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        options={citiesData?.data || []}
        placeholder={loadingCities ? "Fetching..." : "Select City"}
        disabled={!formData.state || loadingCities}
      />
    </div>

    <SelectLocation
      label="Location / Area Name"
      name="locationName"
      value={formData.locationName}
      onChange={handleChange}
      options={locationsData?.data || []}
      placeholder={loadingLocs ? "Searching..." : "Select Area"}
      disabled={!formData.city || loadingLocs}
    />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5
                    border-t border-slate-200 pt-5">
      <Input
        label="House / Plot No."
        name="streetAdress"
        placeholder="Plot No. 42, 2nd Cross"
        value={formData.streetAdress}
        onChange={handleChange}
      />

      <div className="sm:col-span-2">
        <Input
          label="Landmark"
          name="landmark"
          placeholder="Near Apollo Hospital"
          value={formData.landmark}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Pincode"
        name="pincode"
        placeholder="6-digit pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
        maxLength={6}
      />
    </div>
  </section>

  {/* Desktop Footer Actions */}
  <div className="hidden sm:flex gap-5 pt-6">
    <button
      type="button"
      onClick={() => setShowAddModal(false)}
      className="flex-1 py-4 rounded-xl
                 text-sm font-bold uppercase tracking-wider
                 text-slate-600 hover:text-slate-900
                 border border-slate-300
                 hover:bg-slate-100 transition"
    >
      Discard
    </button>

    <button
      type="submit"
      disabled={addingBranch}
      className="flex-[2] py-4 rounded-2xl
                 bg-indigo-600 hover:bg-indigo-700
                 text-white text-sm font-extrabold uppercase tracking-wider
                 shadow-lg shadow-indigo-200
                 transition flex justify-center items-center gap-3
                 disabled:bg-slate-300"
    >
      {addingBranch ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          Save Property <ChevronRight size={18} />
        </>
      )}
    </button>
  </div>
</form>


        {/* Mobile Action Bar - Fixed at Bottom */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex gap-3 z-30">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="flex-1 py-4 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProperty}
            disabled={addingBranch}
            className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 flex justify-center items-center gap-2"
          >
            {addingBranch ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Property"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------ Refined Helpers ------------------ */

const Input = ({ label, ...props }) => (
  <div className="group">
    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-5 py-3.5 mt-1.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
    <div className="group">
      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors">
        {label}
      </label>
      <textarea
        {...props}
        rows={3}
        className="w-full px-5 py-3.5 mt-1.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
      />
    </div>
);

const Select = ({ label, options, placeholder, ...props }) => (
  <div className="group">
    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-5 py-3.5 mt-1.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none appearance-none transition-all disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="font-semibold text-slate-800">{opt}</option>
      ))}
    </select>
  </div>
);

const SelectLocation = ({ label, options, placeholder, ...props }) => (
  <div className="group">
    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-5 py-3.5 mt-1.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none appearance-none transition-all disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.name} value={opt.name} className="font-semibold">
          {opt.name} ({opt.pincode})
        </option>
      ))}
    </select>
  </div>
);

export default AddPropertyModal;