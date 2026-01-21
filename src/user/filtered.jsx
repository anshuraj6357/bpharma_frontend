import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllFilteredQuery,
  useAppliedAllFilteredMutation,
} from "../backend-routes/userroutes/filter";
import { 
  Loader2, Filter, Search, X, ChevronDown, 
  MapPin, IndianRupee, Home, Building2, Hotel 
} from "lucide-react";
import ROOMCARD from "../user/roomcard";

export default function Searched() {
  const navigate = useNavigate();
  const { city } = useParams();

  const { data, isLoading } = useGetAllFilteredQuery(city);
  const [applyFilters, { data: pgdata, isLoading: pgisLoading }] = useAppliedAllFilteredMutation();

  const [pgData, setPgData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  // FILTER STATES
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);
  const [category, setCategory] = useState("any");
  const [type, setType] = useState("any");
  const [hoteltype, sethoteltype] = useState("any");
  const [facilities, setFacilities] = useState([]);
  const [flattype, setflattype] = useState("any");
  const [roomtype, setroomtype] = useState("any");
  const [pg, setpg] = useState("any");
  const [Rented_Room_type, setRented_Room_type] = useState("any");

  const handleFindPG = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter a category or name.");
      return;
    }
    setSearchError("");
    const filtered = data?.data?.filter((pg) =>
      pg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pg.branch?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPgData(filtered || []);
  };

  const toggleFacility = (facility) => {
    setFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  const handleApplyFilters = async () => {
    const filterBody = { city, min, max, category, type, facilities, pg, Rented_Room_type, flattype, roomtype, hoteltype };
    try {
      const response = await applyFilters(filterBody).unwrap();
      setPgData(response?.data || []);
      setIsFilterOpen(false);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  useEffect(() => {
    if (data?.data) setPgData(data.data);
    if (pgdata) setPgData(pgdata?.data);
  }, [data, pgdata]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-4" />
        <span className="text-slate-500 font-medium">Finding perfect stays in {city}...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HEADER & SEARCH SECTION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search PG, Hotels, or Area..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value.trim()) setPgData(data?.data || []);
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl transition-all outline-none text-slate-700 font-medium"
              />
            </div>
            
            <div className="flex w-full md:w-auto gap-2">
              <button
                onClick={handleFindPG}
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Search
              </button>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="px-4 py-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-600 font-semibold"
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
          {searchError && <p className="text-red-500 text-sm mt-2 ml-4 font-medium italic">{searchError}</p>}
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
       
        <h2 className="text-3xl font-black text-slate-900 mb-8">Available Stays</h2>

        {pgisLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />)}
            </div>
        ) : pgData?.length > 0 ? (
          <ROOMCARD pgData={pgData} setIsAuthModalOpen={() => {}} isLoading={isLoading} />
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-300">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No stays found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or searching for something else.</p>
            <button onClick={() => {setPgData(data?.data); setSearchQuery("")}} className="mt-6 text-blue-600 font-bold hover:underline">Clear all search</button>
          </div>
        )}
      </div>

      {/* FILTER MODAL */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-end sm:items-center px-0 sm:px-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-2 z-10">
              <h2 className="text-2xl font-black text-slate-900">Refine Search</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Category Selector - Professional Pills */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {["any", "Hotel", "Rented-Room", "Pg"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      category === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat === "any" ? "All" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Budget (Monthly/Daily)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => setMin(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold"
                    placeholder="Min"
                  />
                </div>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => setMax(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="space-y-6 animate-in slide-in-from-top-2">
                {category === "Hotel" && (
                    <FilterDropdown label="Hotel Room Type" value={hoteltype} onChange={sethoteltype} options={[
                        "any", "Standard-Single", "Standard-Double", "Twin-Room", "Triple-Room", "Family-Room", "Deluxe-Room", "Suite"
                    ]} />
                )}

                {category === "Rented-Room" && (
                    <div className="grid grid-cols-1 gap-6">
                        <FilterDropdown label="Rental Type" value={Rented_Room_type} onChange={setRented_Room_type} options={["any", "Flat-Rent", "Room-Rent"]} />
                        {Rented_Room_type === "Flat-Rent" && (
                             <FilterDropdown label="Flat Size" value={flattype} onChange={setflattype} options={["any", "1Rk", "1BHK", "2BHK", "3BHK", "4BHK"]} />
                        )}
                        {Rented_Room_type === "Room-Rent" && (
                             <FilterDropdown label="Sharing" value={roomtype} onChange={setroomtype} options={["any", "Single", "Double", "Triple"]} />
                        )}
                    </div>
                )}

                {category === "Pg" && (
                    <FilterDropdown label="PG Sharing" value={pg} onChange={setpg} options={["any", "Single", "Double", "Triple"]} />
                )}

                <FilterDropdown label="Preferred For" value={type} onChange={setType} options={["any", "Boys", "Girls", "Co-ed"]} />
            </div>

            {/* Facilities - Modern Checkboxes */}
            <div className="mt-8 mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 block">Facilities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["AC", "WiFi", "Laundry", "CCTV", "Parking", "Power Backup"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleFacility(item)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      facilities.includes(item) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-100 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${facilities.includes(item) ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300"}`}>
                        {facilities.includes(item) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-4 sticky bottom-0 bg-white pt-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Dropdown Component for cleaner code
function FilterDropdown({ label, value, onChange, options }) {
    return (
        <div className="relative">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">{label}</label>
            <div className="relative group">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt === "any" ? `All ${label}s` : opt}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus:rotate-180 transition-transform" />
            </div>
        </div>
    )
}