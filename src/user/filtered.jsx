import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllFilteredQuery,
  useAppliedAllFilteredMutation,
  useGetAllnearestPgMutation,
} from "../backend-routes/userroutes/filter";

import { Loader2, Filter, Search } from "lucide-react";
import ROOMCARD from "../user/roomcard";

export default function Searched() {
  const { city } = useParams();
  const searchInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { data, isLoading } = useGetAllFilteredQuery(city);
  const [applyFilters, { data: pgdata, isLoading: pgisLoading }] =
    useAppliedAllFilteredMutation();
  const [getAllnearestPg] = useGetAllnearestPgMutation();

  const [pgData, setPgData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  console.log(pgData)

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

  /* ================= GOOGLE AUTOCOMPLETE ================= */
useEffect(() => {
  let intervalId;
  let autocompleteInstance = null;
  let isInitialized = false;   // ⭐ IMPORTANT

  const initAutoComplete = () => {
    if (isInitialized) return;   // ⭐ STOP DOUBLE INIT

    if (
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      searchInputRef.current &&
      city
    ) {
      isInitialized = true;      // ⭐ LOCK

      clearInterval(intervalId);

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: city }, (results, status) => {
        if (status !== "OK" || !results?.[0]) {
          console.error("Geocode failed:", status);
          return;
        }

        const bounds = results[0].geometry.viewport;

        autocompleteInstance =
          new window.google.maps.places.Autocomplete(
            searchInputRef.current,
            {
              bounds,
              strictBounds: true,
              componentRestrictions: { country: "IN" },
              types: ["geocode"],
            }
          );

        autocompleteInstance.addListener("place_changed", async () => {
          const place = autocompleteInstance.getPlace();
          if (!place?.geometry) return;

          const lat = place.geometry.location.lat();
          const long = place.geometry.location.lng();

          setSearchQuery(place.formatted_address || "");

          try {
            const response = await getAllnearestPg({ lat, long }).unwrap();
            setPgData(response?.data || []);
          } catch (err) {
            console.error(err);
          }
        });
      });
    }
  };

  intervalId = setInterval(initAutoComplete, 400);

  return () => {
    clearInterval(intervalId);

    if (autocompleteInstance) {
      window.google.maps.event.clearInstanceListeners(
        autocompleteInstance
      );
    }
  };
}, [city]);






  /* ================= RESET ON CITY CHANGE ================= */
  useEffect(() => {
    setSearchQuery("");
    setPgData(data?.data || []);
  }, [city, data]);

  /* ================= SEARCH BUTTON ================= */
  const handleFindPG = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter area or property name");
      return;
    }
    setSearchError("");

    const filtered = data?.data?.filter(
      (pg) =>
        pg.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.branch?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPgData(filtered || []);
  };

  /* ================= APPLY FILTERS ================= */
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

    try {
      const response = await applyFilters(filterBody).unwrap();
      setPgData(response?.data || []);
      setIsFilterOpen(false);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (data?.data) setPgData(data.data);
    if (pgdata?.data) setPgData(pgdata.data);
  }, [data, pgdata]);

  /* ================= LOADER ================= */
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        <p className="mt-3">Finding stays in {city}...</p>
      </div>
    );
  }

  /* ================= UI ================= */
return (
  <div className="min-h-screen bg-white">

    {/* SEARCH BAR */}
    <div className="z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6"> {/* ⬅ WIDTH INCREASED */}

        {/* Hero Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find PG & Homes
          </h1>
          <p className="text-lg text-green-600 font-semibold">
            100% Verified | Owner Posted
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter an area, landmark or property ID"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) setPgData(data?.data || []);
              }}
              className="
                w-full pl-12 pr-6 py-4
                rounded-2xl bg-white
                border-2 border-gray-200
                focus:border-green-500
                focus:ring-4 focus:ring-green-100
                outline-none transition-all duration-300
                text-lg shadow-lg hover:shadow-xl
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button
              onClick={handleFindPG}
              className="
                bg-gradient-to-r from-green-500 to-green-600
                hover:from-green-600 hover:to-green-700
                text-white px-8 py-4 rounded-2xl
                font-bold text-lg shadow-lg hover:shadow-xl
                transition-all duration-300
              "
            >
              Search Properties
            </button>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="
                bg-white border-2 border-green-500
                text-green-500 px-6 py-4 rounded-2xl
                font-semibold hover:bg-green-500 hover:text-white
                transition-all duration-300 shadow-lg hover:shadow-xl
                whitespace-nowrap
              "
            >
              Filters
            </button>
          </div>
        </div>

        {searchError && (
          <p className="text-sm text-red-500 mt-3 text-center">
            {searchError}
          </p>
        )}
      </div>
    </div>

    {/* RESULTS */}
    <div className="max-w-7xl mx-auto px-4 py-12"> {/* ⬅ WIDTH INCREASED */}
      {pgisLoading ? (
        <div className="flex justify-center mt-24">
          <Loader2 className="animate-spin w-12 h-12 text-green-500" />
        </div>
      ) : pgData?.length ? (
        <ROOMCARD pgData={pgData} />
      ) : (
        <div className="text-center mt-32">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            No properties found
          </p>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Try adjusting your search or explore popular areas nearby
          </p>
        </div>
      )}
    </div>

  </div>
);


}

/* ================= DROPDOWN ================= */
function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs font-bold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 p-3 rounded-xl border"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
