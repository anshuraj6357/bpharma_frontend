import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllFilteredQuery,
  useAppliedAllFilteredMutation
} from "../backend-routes/userroutes/filter";
import { Loader2, Filter } from "lucide-react";

export default function Searched() {
  const navigate = useNavigate();
  const { city } = useParams();

  const { data, isLoading } = useGetAllFilteredQuery(city);
  const [applyFilters, { data: pgdata, isLoading: pgisLoading }] =
    useAppliedAllFilteredMutation();

  const [pgData, setPgData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  // FILTER STATES
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999999);
  const [category, setCategory] = useState("any");
  const [type, setType] = useState("any");
  const [hoteltype, sethoteltype] = useState("any");
  const [facilities, setFacilities] = useState([]);
  const [flattype, setflattype] = useState("any");
  const [roomtype, setroomtype] = useState("any");
  const [pg, setpg] = useState("any");
  const [Rented_Room_type, setRented_Room_type] = useState("any");

  // Search by category
  const handleFindPG = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter PG name.");
      return;
    }

    setSearchError("");

    const filtered = data?.data?.filter((pg) =>
      pg.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPgData(filtered || []);
  };

  // Toggle facility
  const toggleFacility = (facility) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  // Apply filters
  // Apply filters
  const handleApplyFilters = async () => {
    const filterBody = {
      city,
      min,
      max,
      category,
      type,
      facilities,
      pg,
      Rented_Room_type,
      flattype,
      roomtype,
      hoteltype,
    };
    console.log("Applying Filters:", filterBody);

    try {
      const response = await applyFilters(filterBody).unwrap();
      setPgData(response?.data || []); // Update PG list immediately
    } catch (err) {
      console.error("Filter error:", err);
    } finally {
      setIsFilterOpen(false); // Close modal after applying
    }
  };


  // SET DATA
  useEffect(() => {
    if (data?.data) setPgData(data.data);
    if (pgdata) setPgData(pgdata?.data);
  }, [data, pgdata]);

  if (isLoading || pgisLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Loading stays...</span>
      </div>
    );
  }

  return (
    <>
      {/* Search Bar */}
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search PG, Hotel, Hostel or Room..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) setPgData(data?.data || []);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleFindPG()}
              className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Find Button */}
          <button
            onClick={handleFindPG}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition transform hover:-translate-y-1 hover:scale-105"
          >
            Find
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-full shadow-md transition transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
          >
            <Filter className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Search Error */}
        {searchError && (
          <p className="text-red-500 text-center mt-3 text-sm sm:text-base">
            {searchError}
          </p>
        )}
      </div>

      {/* FILTER MODAL */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-200">

            <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">
              🔍 Apply Filters
            </h2>

            {/* Price Range */}
            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                💸 Price Range
              </label>

              <div className="mt-4 grid grid-cols-2 gap-4">

                {/* Min Price */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium mb-1">Min (₹)</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={min}
                      onChange={(e) => setMin(Number(e.target.value))}
                      placeholder="0"
                      className="
            w-full px-4 py-2.5
            border border-gray-300 
            rounded-xl 
            bg-white/80 backdrop-blur-sm
            shadow-sm
            focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 
            transition-all duration-200
            text-gray-700 font-medium
          "
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium mb-1">Max (₹)</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={max}
                      onChange={(e) => setMax(Number(e.target.value))}
                      placeholder="20000"
                      className="
            w-full px-4 py-2.5
            border border-gray-300 
            rounded-xl 
            bg-white/80 backdrop-blur-sm
            shadow-sm
            focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 
            transition-all duration-200
            text-gray-700 font-medium
          "
                    />
                  </div>
                </div>

              </div>
            </div>


            {/* Category */}
            <div className="mb-5">
              <label className="text-sm text-gray-700 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="any">Any</option>
                <option value="Hotel">Hotel</option>
                <option value="Rented-Room">Rented-Room</option>
                <option value="Pg">PG</option>
              </select>
            </div>

            {/* Dynamic Sections */}
            {category === "Hotel" && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">Hotel Room Type</label>
                <select
                  value={hoteltype}
                  onChange={(e) => sethoteltype(e.target.value)}
                  className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any</option>
                  {[
                    "Standard-Single",
                    "Standard-Double",
                    "Twin-Room",
                    "Triple-Room",
                    "Family-Room",
                    "Deluxe-Room",
                    "Super-Deluxe-Room",
                    "Executive-Room",
                    "Suite",
                  ].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            {category === "Rented-Room" && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">Rented Room Type</label>
                <select
                  value={Rented_Room_type}
                  onChange={(e) => setRented_Room_type(e.target.value)}
                  className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any</option>
                  <option value="Flat-Rent">Flat-Rent</option>
                  <option value="Room-Rent">Room-Rent</option>
                </select>
              </div>
            )}

            {Rented_Room_type === "Flat-Rent" && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">Flat Type</label>
                <select
                  value={flattype}
                  onChange={(e) => setflattype(e.target.value)}
                  className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any</option>
                  {["1Rk", "1BHK", "2BHK", "3BHK", "4BHK", "5BHK"].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            {Rented_Room_type === "Room-Rent" && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">Room Type</label>
                <select
                  value={roomtype}
                  onChange={(e) => setroomtype(e.target.value)}
                  className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any</option>
                  {["Single", "Double", "Triple"].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            )}

            {category === "Pg" && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">PG Type</label>
                <select
                  value={pg}
                  onChange={(e) => setpg(e.target.value)}
                  className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any</option>
                  {["Single", "Double", "Triple"].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Type */}
            <div className="mb-5">
              <label className="text-sm text-gray-700 font-medium">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-xl mt-2 px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="any">Any</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
              </select>
            </div>

            {/* Facilities */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 font-medium">Facilities</label>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "AC", "Non-AC", "Bathroom", "WiFi", "Power Backup", "Laundry",
                  "CCTV", "Parking", "Refrigerator", "24x7 Electricity",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={facilities.includes(item)}
                      onChange={() => toggleFacility(item)}
                      className="accent-blue-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-between mt-5">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADER */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold mb-6">
            PG Hotel, Hostel and Rooms Available in {city}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pgData?.length > 0 ? (
              pgData.map((pg) => (
                <div
                  key={pg._id}
                  onClick={() => navigate(`/pg/${pg._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={pg.roomImages?.[0]}
                      alt={pg.category}
                      className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      ₹{pg.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                      {pg.category}
                    </h3>

                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      📍 {pg.city}
                    </p>

                    <p className="text-xs font-medium text-green-600">
                      {pg.type === "any" ? "Available for All" : pg.type}
                    </p>

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-700">
                      {pg.facilities?.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-full border text-gray-600"
                        >
                          {f}
                        </span>
                      ))}

                      {pg.facilities?.length > 4 && (
                        <span className="text-blue-600 font-medium text-xs">
                          +{pg.facilities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No PGs found.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
