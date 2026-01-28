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
  if (!searchInputRef.current || !city) return;

  let autocomplete;

  const initAutocomplete = async () => {
    // Wait for Google Maps JS to load
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      setTimeout(initAutocomplete, 300);
      return;
    }

    // Cleanup old autocomplete
    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(
        autocompleteRef.current
      );
      autocompleteRef.current = null;
    }

    // Geocode city to get bounds
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: city }, (results, status) => {
      if (status !== "OK" || !results[0]) return;

      const bounds = results[0].geometry.viewport;

      autocomplete = new window.google.maps.places.Autocomplete(
        searchInputRef.current,
        {
          types: ["geocode"],
          bounds: bounds,
          strictBounds: true,
          componentRestrictions: { country: "IN" },
        }
      );

      autocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", async () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const lat = place.geometry.location.lat();
        const long = place.geometry.location.lng();

        setSearchQuery(place.formatted_address);

        try {
          const response = await getAllnearestPg({ lat, long }).unwrap();
          setPgData(response?.data || []);
        } catch (err) {
          console.error("Nearest PG error:", err);
        }
      });
    });
  };

  initAutocomplete();

  return () => {
    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(
        autocompleteRef.current
      );
      autocompleteRef.current = null;
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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* SEARCH BAR */}
      <div className="bg-white sticky top-0 z-30 border-b py-6">
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search PG, Hotels or Area..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) setPgData(data?.data || []);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl outline-none"
            />
          </div>

          <button
            onClick={handleFindPG}
            className="bg-blue-600 text-white px-6 rounded-2xl font-bold"
          >
            Search
          </button>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="border px-4 rounded-2xl"
          >
            <Filter />
          </button>
        </div>

        {searchError && (
          <p className="text-red-500 text-center mt-2">{searchError}</p>
        )}
      </div>

      {/* RESULTS */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        {pgisLoading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : pgData?.length ? (
          <ROOMCARD pgData={pgData} />
        ) : (
          <p className="text-center mt-20 text-gray-500">No stays found</p>
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
