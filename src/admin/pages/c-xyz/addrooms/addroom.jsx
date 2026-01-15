// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { User } from "lucide-react";
// import {
//   useAddRoomMutation,
//   useGetAllBranchbybranchIdQuery,
//   useGetAllRoomQuery
// } from "../../../../Bothfeatures/features2/api/propertyapi";
// import { useNavigate } from "react-router-dom";

// function AddRoomForm() {
//   const navigate = useNavigate();

//   const [roomData, setRoomData] = useState({
//     roomNumber: "",
//     type: "",
//     price: "",
//     facilities: [],
//     images: [],
//     branch: "",
//     category: "",

//     renttype: "",
//     flattype: "",
//     roomtype: "",
//     hoteltype: "",

//     description: "",
//     notAllowed: [],
//     rules: [],
//     allowedFor: "Anyone",
//     furnishedType: "Semi Furnished",
//     areaSize: "",
//     availabilityStatus: "Available",
//     extraNotes: "",
//     rentperday: "",
//     rentperhour: "",
//     rentperNight: "",
//     city: "",
//     capacity: "",
//     services: [{ name: "", price: "" }]

//   });

//   const { refetch } = useGetAllRoomQuery();
//   const [
//     addRoom,
//     { data: AddRoomdata, isLoading, isSuccess: addroomsuccess, isError, error }
//   ] = useAddRoomMutation();

//   const { data: Allbranchdata, isLoading: AllBranchloading } =
//     useGetAllBranchbybranchIdQuery();

//   const facilityOptions = [
//     "AC",
//     "Non-AC",
//     "Bathroom",
//     "WiFi",
//     "Power Backup",
//     "Laundry",
//     "CCTV",
//     "Parking",
//     "Refrigerator",
//     "24x7 Electricity",
//   ];

//   const notAllowedOptions = ["Smoking", "Alcohol", "Pets", "Visitors", "Loud Music"];
//   const rulesOptions = ["Keep room clean", "No loud music", "Maintain hygiene", "No outside guests", "Respect timings"];
//   const allowedForOptions = ["Boys", "Girls", "Family", "Anyone"];
//   const furnishedOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

//   // Checkbox handler
//   const handleCheckboxArray = (field, value) => {
//     setRoomData(prev => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter(v => v !== value)
//         : [...prev[field], value]
//     }));
//   };

//   // Image handlers
//   const handleSingleImage = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const updatedImages = [...roomData.images];
//     updatedImages[index] = file;
//     setRoomData({ ...roomData, images: updatedImages });
//   };

//   const addMoreImageInput = () => {
//     setRoomData(prev => ({ ...prev, images: [...prev.images, null] }));
//   };

// const handleAddRoom = async () => {
//   console.log(roomData)


//   const formData = new FormData();
//   formData.append("roomNumber", roomData.roomNumber);
//   formData.append("type", roomData.type);
//   formData.append("price", roomData.price);
//   formData.append("branch", roomData.branch);
//   formData.append("category", roomData.category);
//   formData.append("description", roomData.description);
//   formData.append("allowedFor", roomData.allowedFor);
//   formData.append("furnishedType", roomData.furnishedType);
//   formData.append("flattype", roomData.flattype);
//   formData.append("roomtype", roomData.roomtype);
//   formData.append("hoteltype", roomData.hoteltype);
//   formData.append("renttype", roomData.renttype);

//   formData.append("availabilityStatus", roomData.availabilityStatus);

//   formData.append("rentperday", roomData.rentperday);
//   formData.append("rentperhour", roomData.rentperhour);
//   formData.append("rentperNight", roomData.rentperNight);
//   formData.append("city", roomData.city);
//   formData.append("capacity", roomData.capacity);

//   roomData.facilities.forEach(f => formData.append("facilities", f));
//   roomData.notAllowed.forEach(f => formData.append("notAllowed", f));
//   roomData.rules.forEach(f => formData.append("rules", f));
//   formData.append(
//     "services",
//     JSON.stringify(
//       roomData.services
//         .filter(s => s.name && s.price)
//         .map(s => ({
//           name: s.name,
//           price: Number(s.price)
//         }))
//     )
//   );


//   roomData.images.forEach(img => img && formData.append("images", img));

//   await addRoom(formData);
// };


//   const handleServiceChange = (index, field, value) => {
//     const updatedServices = [...roomData.services];
//     updatedServices[index][field] = value;

//     // 🔢 Calculate total services price
//     const total = updatedServices.reduce(
//       (sum, s) => sum + Number(s.price || 0),
//       0
//     );

//     // ➕ Auto add new empty row if last row filled
//     if (
//       index === updatedServices.length - 1 &&
//       updatedServices[index].name &&
//       updatedServices[index].price
//     ) {
//       updatedServices.push({ name: "", price: "" });
//     }

//     setRoomData((prev) => ({
//       ...prev,
//       services: updatedServices,
//       price: total, // ✅ AUTO PG RENT SET
//     }));
//   };
//   const removeService = (index) => {
//     const updatedServices = roomData.services.filter(
//       (_, i) => i !== index
//     );

//     // 🔢 Recalculate total after removal
//     const total = updatedServices.reduce(
//       (sum, s) => sum + Number(s.price || 0),
//       0
//     );

//     setRoomData((prev) => ({
//       ...prev,
//       services: updatedServices.length
//         ? updatedServices
//         : [{ name: "", price: "" }], // keep at least one row
//       price: total, // ✅ auto update PG rent
//     }));
//   };


//   useEffect(() => {
//     if (addroomsuccess) {
//       toast.success("Room Will Be Listed after Verification");
//       refetch();
//       navigate(-1);
//     }

//     if (isError) {
//       toast.error(error?.data?.message || "Failed to add room!");
//     }
//   }, [addroomsuccess, isError, error]);

//   if (AllBranchloading) return <div>Loading branches...</div>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.1)]">
//       <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Add New Room</h2>
//       <p className="text-gray-500 mb-8 text-sm">Fill all details carefully before adding a room.</p>

//       {/* Branch selection */}
//       <div className="mt-6">
//         <label className="label-style">Branch</label>
//         <select
//           className="input-style"
//           value={roomData.branch}
//           onChange={(e) => setRoomData({ ...roomData, branch: e.target.value })}
//         >
//           <option value="">Select Branch</option>
//           {Allbranchdata?.allbranch?.map(branch => (
//             <option key={branch._id} value={branch._id}>{branch.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Grid for Room Number, City, Capacity, Allowed For */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div>
//           <label className="label-style">Room Number</label>
//           <input
//             type="number"
//             placeholder="101"
//             className="input-style"
//             value={roomData.roomNumber}
//             onChange={e => setRoomData({ ...roomData, roomNumber: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="label-style">City</label>
//           <input
//             type="text"
//             placeholder="City name"
//             className="input-style"
//             value={roomData.city}
//             onChange={e => setRoomData({ ...roomData, city: e.target.value })}
//           />
//         </div>




//         <div>
//           <label className="label-style">Allowed For</label>
//           <select
//             className="input-style"
//             value={roomData.allowedFor}
//             onChange={e => setRoomData({ ...roomData, allowedFor: e.target.value })}
//           >
//             {allowedForOptions.map(opt => (
//               <option key={opt} value={opt}>{opt}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <label className="label-style">Description</label>
//         <textarea
//           className="input-style h-28 resize-none"
//           placeholder="Write room description..."
//           value={roomData.description}
//           onChange={e => setRoomData({ ...roomData, description: e.target.value })}
//         />
//       </div>

//       {/* Not Allowed */}
//       <div className="mt-6">
//         <p className="section-heading">Not Allowed</p>
//         <div className="grid grid-cols-2 gap-3">
//           {notAllowedOptions.map(item => (
//             <label key={item} className="checkbox-style">
//               <input
//                 type="checkbox"
//                 className="checkbox-input"
//                 checked={roomData.notAllowed.includes(item)}
//                 onChange={() => handleCheckboxArray("notAllowed", item)}
//               />
//               {item}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Rules */}
//       <div className="mt-6">
//         <p className="section-heading">Rules</p>
//         <div className="grid grid-cols-2 gap-3">
//           {rulesOptions.map(item => (
//             <label key={item} className="checkbox-style">
//               <input
//                 type="checkbox"
//                 className="checkbox-input"
//                 checked={roomData.rules.includes(item)}
//                 onChange={() => handleCheckboxArray("rules", item)}
//               />
//               {item}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Furnished Type */}
//       <div className="mt-6">
//         <label className="label-style">Furnishing Type</label>
//         <select
//           className="input-style"
//           value={roomData.furnishedType}
//           onChange={e => setRoomData({ ...roomData, furnishedType: e.target.value })}
//         >
//           {furnishedOptions.map(opt => (
//             <option key={opt} value={opt}>{opt}</option>
//           ))}
//         </select>
//       </div>


//       {/* Category */}
//       <div className="mt-6">
//         <label className="label-style">Category</label>
//         <select
//           className="input-style"
//           value={roomData.category}
//           onChange={e => setRoomData({ ...roomData, category: e.target.value })}
//         >
//           <option value="">Select</option>
//           <option value="Pg">PG</option>
//           <option value="Hotel">Hotel</option>
//           <option value="Rented-Room">Rented Room</option>
//         </select>
//       </div>

//       {/* Pricing */}
//       {
//         roomData.category === "Pg" ? <>
//           <label className="label-style">Pg Type</label>
//           <select
//             className="input-style"
//             value={roomData.type} // use category to store type
//             onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
//           >
//             <option value="">Select Pg Type</option>
//             <option value="Single"> Single</option>
//             <option value="Double"> Double</option>
//             <option value="Triple">Triple</option>

//           </select>

//         </> : <></>
//       }


//       {roomData.category === "Hotel" ?
//         <><div>
//           <label className="label-style">Hotel Type</label>
//           <select
//             className="input-style"
//             value={roomData.hoteltype} // use category to store type
//             onChange={(e) => setRoomData({ ...roomData, hoteltype: e.target.value })}
//           >
//             <option value="">Select Hotel Type</option>
//             <option value="Standard-Single">Standard Single</option>
//             <option value="Standard-Double">Standard Double</option>
//             <option value="Twin-Room">Twin Room</option>
//             <option value="Triple-Room">Triple Room</option>
//             <option value="Family-Room">Family Room</option>
//             <option value="Deluxe-Room">Deluxe Room</option>
//             <option value="Super-Deluxe-Room">Super Deluxe Room</option>
//             <option value="Executive-Room">Executive Room</option>
//             <option value="Suite">Suite</option>

//           </select>
//         </div></> : <></>
//       }
//       {roomData.category === "Rented-Room" && (
//         <div>

//           {/* 1️⃣ Select Rent Type FIRST */}
//           <label className="label-style">Rent Type</label>
//           <select
//             className="input-style"
//             value={roomData.renttype}
//             onChange={(e) =>
//               setRoomData({ ...roomData, renttype: e.target.value, roomtype: "", flattype: "" })
//             }
//           >
//             <option value="">Select Rent Type</option>
//             <option value="Flat-Rent">Flat Rent</option>
//             <option value="Room-Rent">Room Rent</option>
//           </select>

//           {/* 2️⃣ If Rent Type = Flat Rent → show Flat Type */}
//           {roomData.renttype === "Flat-Rent" && (
//             <div className="mt-3">
//               <label className="label-style">Flat Type</label>
//               <select
//                 className="input-style"
//                 value={roomData.flattype}
//                 onChange={(e) =>
//                   setRoomData({ ...roomData, flattype: e.target.value })
//                 }
//               >
//                 <option value="">Select Flat Type</option>
//                 <option value="1Rk">1RK</option>
//                 <option value="1BHK">1BHK</option>
//                 <option value="2BHK">2BHK</option>
//                 <option value="3BHK">3BHK</option>
//                 <option value="4BHK">4BHK</option>
//                 <option value="5BHK">5BHK</option>
//               </select>
//             </div>
//           )}

//           {/* 3️⃣ If Rent Type = Room Rent → show Room Type */}
//           {roomData.renttype === "Room-Rent" && (
//             <div className="mt-3">
//               <label className="label-style">Room Type</label>
//               <select
//                 className="input-style"
//                 value={roomData.roomtype}
//                 onChange={(e) =>
//                   setRoomData({ ...roomData, roomtype: e.target.value })
//                 }
//               >
//                 <option value="">Select Room Type</option>
//                 <option value="Single">Single Room</option>
//                 <option value="Double">Double Room</option>
//                 <option value="Triple">Triple Room</option>
//               </select>
//             </div>
//           )}
//         </div>
//       )}


//       {roomData.category === "Hotel" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           <div>
//             <label className="label-style">Rent Per Day</label>
//             <input
//               type="number"
//               className="input-style"
//               value={roomData.rentperday}
//               onChange={e => setRoomData({ ...roomData, rentperday: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="label-style">Rent Per Hour</label>
//             <input
//               type="number"
//               className="input-style"
//               value={roomData.rentperhour}
//               onChange={e => setRoomData({ ...roomData, rentperhour: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="label-style">Rent Per Night</label>
//             <input
//               type="number"
//               className="input-style"
//               value={roomData.rentperNight}
//               onChange={e => setRoomData({ ...roomData, rentperNight: e.target.value })}
//             />
//           </div>
//         </div>
//       )}
//       {(roomData.category !== "Hotel") && (
//         <div className="mt-6">
//           <label className="label-style">Price (Per Month)</label>
//           <input
//             type="number"
//             className="input-style"
//             disabled={roomData.category === "Pg"}
//             value={roomData.price}
//             onChange={e => setRoomData({ ...roomData, price: e.target.value })}
//           />
//         </div>
//       )}

//       {roomData.category === "Pg" && (
//         <div className="mt-6">
//           <p className="section-heading">Optional Services & Charges</p>

//           {roomData.services.map((service, index) => (
//             <div
//               key={index}
//               className="flex gap-3 mb-3 items-center relative"
//             >
//               <input
//                 type="text"
//                 placeholder="Service Name (e.g., Breakfast)"
//                 className="input-style flex-1"
//                 value={service.name}
//                 onChange={(e) =>
//                   handleServiceChange(index, "name", e.target.value)
//                 }
//               />

//               <input
//                 type="number"
//                 placeholder="Price"
//                 className="input-style w-32"
//                 value={service.price}
//                 onChange={(e) =>
//                   handleServiceChange(index, "price", e.target.value)
//                 }
//               />

//               {/* ❌ REMOVE BUTTON */}
//               {roomData.services.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeService(index)}
//                   className="ml-1 w-8 h-8 flex items-center justify-center
//                        rounded-full bg-red-100 text-red-600
//                        hover:bg-red-600 hover:text-white
//                        transition-all font-bold"
//                   title="Remove service"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* 💰 TOTAL DISPLAY */}
//           <div className="mt-2 text-sm font-semibold text-gray-700">
//             Total Services Amount: ₹
//             {roomData.services.reduce(
//               (sum, s) => sum + Number(s.price || 0),
//               0
//             )}
//           </div>
//         </div>
//       )}




//       {/* Facilities */}
//       <div className="mt-8">
//         <p className="section-heading">Facilities</p>
//         <div className="grid grid-cols-2 gap-3">
//           {facilityOptions.map(f => (
//             <label key={f} className="checkbox-style">
//               <input
//                 type="checkbox"
//                 className="checkbox-input"
//                 checked={roomData.facilities.includes(f)}
//                 onChange={() => handleCheckboxArray("facilities", f)}
//               />
//               {f}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Images */}
//       <div className="mt-6">
//         <p className="section-heading">Room Images</p>
//         {roomData.images.map((img, index) => (
//           <div key={index}>
//             <input
//               type="file"
//               accept="image/*"
//               className="input-style"
//               onChange={e => handleSingleImage(e, index)}
//             />
//             {img && (
//               <img
//                 src={URL.createObjectURL(img)}
//                 className="w-full h-32 object-cover rounded-xl mt-3 shadow-md border"
//                 alt="Preview"
//               />
//             )}
//           </div>
//         ))}
//         <button
//           onClick={addMoreImageInput}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full transition-all"
//         >
//           + Add More Images
//         </button>
//       </div>

//       {/* Submit */}
//       <button
//         onClick={handleAddRoom}
//         disabled={isLoading}
//         className={`w-full mt-8 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg
//           ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}`}
//       >
//         {isLoading ? "Adding..." : "Add Room"}
//       </button>
//     </div>
//   );
// }

// export default AddRoomForm;




































































































































































































































































































































































































import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import {
  useAddRoomMutation,
  useGetAllBranchbybranchIdQuery,
  useGetAllRoomQuery
} from "../../../../Bothfeatures/features2/api/propertyapi";
import { useNavigate } from "react-router-dom";

function AddRoomForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Current step
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    facilities: [],
    images: [null],
    branch: "",
    category: "",
    renttype: "",
    flattype: "",
    roomtype: "",
    hoteltype: "",
    description: "",
    notAllowed: [],
    rules: [],
    allowedFor: "Anyone",
    furnishedType: "Semi Furnished",
    areaSize: "",
    availabilityStatus: "Available",
    extraNotes: "",
    rentperday: "",
    rentperhour: "",
    rentperNight: "",
    city: "",
    advancedmonth: "",

    services: [{ name: "", price: "" }]
  });

  const { refetch } = useGetAllRoomQuery();
  const [addRoom, { isLoading, isSuccess: addroomsuccess, isError, error }] = useAddRoomMutation();
  const { data: Allbranchdata, isLoading: AllBranchloading } = useGetAllBranchbybranchIdQuery();

  const facilityOptions = ["AC", "Non-AC", "Bathroom", "WiFi", "Power Backup", "Laundry", "CCTV", "Parking", "Refrigerator", "24x7 Electricity"];
  const notAllowedOptions = ["Smoking", "Alcohol", "Pets", "Visitors", "Loud Music"];
  const rulesOptions = ["Keep room clean", "No loud music", "Maintain hygiene", "No outside guests", "Respect timings"];
  const allowedForOptions = ["Boys", "Girls", "Family", "Anyone"];
  const furnishedOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

  // Checkbox handler
  const handleCheckboxArray = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value]
    }));
  };

  // Image handlers
  const handleSingleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...roomData.images];
    updatedImages[index] = file;
    setRoomData({ ...roomData, images: updatedImages });
  };

  const addMoreImageInput = () => setRoomData(prev => ({ ...prev, images: [...prev.images, null] }));

  // Services handlers
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...roomData.services];
    updatedServices[index][field] = value;

    // 🔢 Calculate total services price
    const total = updatedServices.reduce(
      (sum, s) => sum + Number(s.price || 0),
      0
    );

    // ➕ Auto add new empty row if last row filled
    if (
      index === updatedServices.length - 1 &&
      updatedServices[index].name &&
      updatedServices[index].price
    ) {
      updatedServices.push({ name: "", price: "" });
    }

    setRoomData((prev) => ({
      ...prev,
      services: updatedServices,
      price: total, // ✅ AUTO PG RENT SET
    }));
  };
  const removeService = (index) => {
    const updatedServices = roomData.services.filter(
      (_, i) => i !== index
    );

    // 🔢 Recalculate total after removal
    const total = updatedServices.reduce(
      (sum, s) => sum + Number(s.price || 0),
      0
    );

    setRoomData((prev) => ({
      ...prev,
      services: updatedServices.length
        ? updatedServices
        : [{ name: "", price: "" }], // keep at least one row
      price: total, // ✅ auto update PG rent
    }));
  };

  const handleAddRoom = async () => {
    console.log(roomData)


    const formData = new FormData();
    formData.append("roomNumber", roomData.roomNumber);
    formData.append("type", roomData.type);
    formData.append("price", roomData.price);
    formData.append("branch", roomData.branch);
    formData.append("category", roomData.category);
    formData.append("description", roomData.description);
    formData.append("allowedFor", roomData.allowedFor);
    formData.append("furnishedType", roomData.furnishedType);
    formData.append("flattype", roomData.flattype);
    formData.append("roomtype", roomData.roomtype);
    formData.append("hoteltype", roomData.hoteltype);
    formData.append("renttype", roomData.renttype);
    formData.append("advancedmonth", roomData.advancedmonth);


    formData.append("availabilityStatus", roomData.availabilityStatus);

    formData.append("rentperday", roomData.rentperday);
    formData.append("rentperhour", roomData.rentperhour);
    formData.append("rentperNight", roomData.rentperNight);
    formData.append("city", roomData.city);
    formData.append("capacity", roomData.capacity);

    roomData.facilities.forEach(f => formData.append("facilities", f));
    roomData.notAllowed.forEach(f => formData.append("notAllowed", f));
    roomData.rules.forEach(f => formData.append("rules", f));
    formData.append(
      "services",
      JSON.stringify(
        roomData.services
          .filter(s => s.name && s.price)
          .map(s => ({
            name: s.name,
            price: Number(s.price)
          }))
      )
    );


    roomData.images.forEach(img => img && formData.append("images", img));

    await addRoom(formData);
  };

  useEffect(() => {
    if (addroomsuccess) {
      toast.success("Room Will Be Listed after Verification");
      refetch();
      navigate(-1);
    }
    if (isError) toast.error(error?.data?.message || "Failed to add room!");
  }, [addroomsuccess, isError, error]);

  if (AllBranchloading) return <div>Loading branches...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 transition-all">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Add New Room</h2>
      <p className="text-gray-500 mb-8 text-sm">Fill all details carefully before adding a room.</p>

      {/* Progress Bar */}
      <div className="flex mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? 'bg-[#ff6b35]' : 'bg-gray-300'}`}></div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Step Heading */}
          <h2 className="text-2xl font-bold text-gray-900">Step 1: Basic Room Information</h2>
          <p className="text-gray-500 text-sm">Provide the essential details about the room.</p>

          {/* Branch Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Branch</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={roomData.branch}
              onChange={e => setRoomData({ ...roomData, branch: e.target.value })}
            >
              <option value="">Select Branch</option>
              {Allbranchdata?.allbranch?.map(branch => (
                <option key={branch._id} value={branch._id}>{branch.name}</option>
              ))}
            </select>
          </div>

          {/* Grid: Room Number, City, Capacity, Allowed For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Room Number</label>
              <input
                type="number"
                placeholder="Enter room number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                value={roomData.roomNumber}
                onChange={e => setRoomData({ ...roomData, roomNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Advanced Months</label>
              <input
                type="number"
                placeholder="Enter room number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                value={roomData.advancedmonth}
                onChange={e => setRoomData({ ...roomData, advancedmonth: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">City</label>
              <input
                type="text"
                placeholder="Enter city name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                value={roomData.city}
                onChange={e => setRoomData({ ...roomData, city: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Allowed For</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                value={roomData.allowedFor}
                onChange={e => setRoomData({ ...roomData, allowedFor: e.target.value })}
              >
                {allowedForOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Write a brief description of the room"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={roomData.description}
              onChange={e => setRoomData({ ...roomData, description: e.target.value })}
            />
          </div>

          {/* Furnished Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Furnishing Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={roomData.furnishedType}
              onChange={e => setRoomData({ ...roomData, furnishedType: e.target.value })}
            >
              {furnishedOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={roomData.category}
              onChange={e => setRoomData({ ...roomData, category: e.target.value })}
            >
              <option value="">Select Room Category</option>
              <option value="Pg">PG</option>
              <option value="Hotel">Hotel</option>
              <option value="Rented-Room">Rented Room</option>
            </select>
          </div>
        </div>
      )}


      {step === 2 && (
        <>
          {/* Step 2: Pricing & Services */}

          {/* PG Category Pricing & Services */}
          {roomData.category === "Pg" && (
            <div className="mt-6">
              <p className="section-heading">PG Type</p>
              <select
                className="input-style"
                value={roomData.type}
                onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
              >
                <option value="">Select PG Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>

              {roomData.category === "Pg" && (
                <div className="mt-6">
                  <p className="section-heading font-semibold text-lg">Optional Services & Charges</p>

                  {roomData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex gap-3 mb-3 items-center relative"
                    >
                      <input
                        type="text"
                        placeholder="Service Name (e.g., Breakfast)"
                        className="input-style flex-1"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                      />

                      <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        className="input-style w-32"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                      />

                      {/* ❌ Remove button */}
                      {roomData.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="ml-1 w-8 h-8 flex items-center justify-center
              rounded-full bg-red-100 text-red-600
              hover:bg-red-600 hover:text-white
              transition-all font-bold"
                          title="Remove service"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  {/* 💰 Total Services Amount */}
                  <div className="mt-2 text-sm font-semibold text-gray-700">
                    Total Services Amount: ₹
                    {roomData.services.reduce((sum, s) => sum + Number(s.price || 0), 0)}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Hotel Category Pricing */}
          {roomData.category === "Hotel" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="label-style">Hotel Type</label>
                <select
                  className="input-style"
                  value={roomData.hoteltype}
                  onChange={(e) => setRoomData({ ...roomData, hoteltype: e.target.value })}
                >
                  <option value="">Select Hotel Type</option>
                  <option value="Standard-Single">Standard Single</option>
                  <option value="Standard-Double">Standard Double</option>
                  <option value="Twin-Room">Twin Room</option>
                  <option value="Triple-Room">Triple Room</option>
                  <option value="Family-Room">Family Room</option>
                  <option value="Deluxe-Room">Deluxe Room</option>
                  <option value="Super-Deluxe-Room">Super Deluxe Room</option>
                  <option value="Executive-Room">Executive Room</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div>
                <label className="label-style">Rent Per Day</label>
                <input
                  type="number"
                  className="input-style"
                  value={roomData.rentperday}
                  onChange={e => setRoomData({ ...roomData, rentperday: e.target.value })}
                />
              </div>
              <div>
                <label className="label-style">Rent Per Hour</label>
                <input
                  type="number"
                  className="input-style"
                  value={roomData.rentperhour}
                  onChange={e => setRoomData({ ...roomData, rentperhour: e.target.value })}
                />
              </div>
              <div>
                <label className="label-style">Rent Per Night</label>
                <input
                  type="number"
                  className="input-style"
                  value={roomData.rentperNight}
                  onChange={e => setRoomData({ ...roomData, rentperNight: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Rented-Room Category Pricing */}
          {roomData.category === "Rented-Room" && (
            <div className="mt-6">
              <label className="label-style">Rent Type</label>
              <select
                className="input-style"
                value={roomData.renttype}
                onChange={(e) =>
                  setRoomData({ ...roomData, renttype: e.target.value, flattype: "", roomtype: "" })
                }
              >
                <option value="">Select Rent Type</option>
                <option value="Flat-Rent">Flat Rent</option>
                <option value="Room-Rent">Room Rent</option>
              </select>

              {roomData.renttype === "Flat-Rent" && (
                <div className="mt-3">
                  <label className="label-style">Flat Type</label>
                  <select
                    className="input-style"
                    value={roomData.flattype}
                    onChange={(e) => setRoomData({ ...roomData, flattype: e.target.value })}
                  >
                    <option value="">Select Flat Type</option>
                    <option value="1Rk">1RK</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                    <option value="5BHK">5BHK</option>
                  </select>
                </div>
              )}

              {roomData.renttype === "Room-Rent" && (
                <div className="mt-3">
                  <label className="label-style">Room Type</label>
                  <select
                    className="input-style"
                    value={roomData.roomtype}
                    onChange={(e) => setRoomData({ ...roomData, roomtype: e.target.value })}
                  >
                    <option value="">Select Room Type</option>
                    <option value="Single">Single Room</option>
                    <option value="Double">Double Room</option>
                    <option value="Triple">Triple Room</option>
                  </select>
                </div>
              )}

               {(roomData.category !== "Hotel") && (
        <div className="mt-6">
          <label className="label-style">Price (Per Month)</label>
          <input
            type="number"
            className="input-style"
            disabled={roomData.category === "Pg"}
            value={roomData.price}
            onChange={e => setRoomData({ ...roomData, price: e.target.value })}
          />
        </div>
      )}
            </div>
          )}
        </>
      )}


      {step === 3 && (
        <>
          {/* Step 3: Facilities, Rules & Images */}

          {/* Facilities */}
          <div className="mt-6">

            <p className="section-heading">Facilities</p>
            <div className="grid grid-cols-2 gap-3">
              {facilityOptions.map(f => (
                <label key={f} className="checkbox-style">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={roomData.facilities.includes(f)}
                    onChange={() => handleCheckboxArray("facilities", f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mt-6">
            <p className="section-heading">Rules</p>
            <div className="grid grid-cols-2 gap-3">
              {rulesOptions.map(item => (
                <label key={item} className="checkbox-style">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={roomData.rules.includes(item)}
                    onChange={() => handleCheckboxArray("rules", item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Not Allowed */}
          <div className="mt-6">
            <p className="section-heading">Not Allowed</p>
            <div className="grid grid-cols-2 gap-3">
              {notAllowedOptions.map(item => (
                <label key={item} className="checkbox-style">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={roomData.notAllowed.includes(item)}
                    onChange={() => handleCheckboxArray("notAllowed", item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Room Images */}
          <div className="mt-6">
            <p className="section-heading">Room Images</p>
            {roomData.images.map((img, index) => (
              <div key={index}>
                <input
                  type="file"
                  accept="image/*"
                  className="input-style"
                  onChange={e => handleSingleImage(e, index)}
                />
                {img && (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-32 object-cover rounded-xl mt-3 shadow-md border"
                    alt="Preview"
                  />
                )}
              </div>
            ))}
            <button
              onClick={addMoreImageInput}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full transition-all"
            >
              + Add More Images
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleAddRoom}
            disabled={isLoading}
            className={`w-full mt-8 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg
        ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}`}
          >
            {isLoading ? "Adding..." : "Add Room"}
          </button>
        </>
      )}


      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && <button onClick={() => setStep(prev => prev - 1)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Prev</button>}
        {step < 3 && <button onClick={() => setStep(prev => prev + 1)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>}
        {step === 3 && <button onClick={handleAddRoom} disabled={isLoading} className={`px-4 py-2 bg-[#ff6b35] text-white rounded hover:bg-[#e55a2b] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>{isLoading ? "Adding..." : "Submit"}</button>}
      </div>
    </div>
  );
}

export default AddRoomForm;
