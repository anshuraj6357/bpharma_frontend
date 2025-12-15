import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAddHotelRoomMutation, useGetAllBranchbybranchIdQuery } from "../../../Bothfeatures/features2/api/propertyapi";

export function AddHotelRoom() {
  const { data, isLoading, isError, error } = useGetAllBranchbybranchIdQuery();
  const [addHotelRoom, { isLoading: addRoomLoading, isSuccess }] = useAddHotelRoomMutation();

  const facilityOptions = [
    "AC",
                "Non-AC",
                "Bathroom",
                "WiFi",
                "Power Backup",
                "Laundry",
                "CCTV",
                "Parking",
                "Refrigerator",
                 "24x7 Electricity",
              
  ];

  

  const [formData, setFormData] = useState({
    branchId: "",
    roomNumber: "",
    rentperday: "",
    rentperhour: "",
    rentperNight: "",
    facilities: [],
    images: [null],
  });

  // Handle facility selection
  const handleFacilities = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // Handle image upload
  const handleSingleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  // Add more image inputs
  const addMoreImageInput = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, null] }));
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!formData.branchId || !formData.roomNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append("branchId", formData.branchId);
      dataToSend.append("roomNumber", formData.roomNumber);
      dataToSend.append("rentperday", formData.rentperday);
      dataToSend.append("rentperhour", formData.rentperhour);
      dataToSend.append("rentperNight", formData.rentperNight);
      formData.facilities.forEach((facility) => dataToSend.append("facilities", facility));
      formData.images.forEach((img) => img && dataToSend.append("images", img));

      await addHotelRoom(dataToSend).unwrap();
     
    toast.success("Room Will Be Listed after Verification")

      setFormData({
        branchId: "",
        roomNumber: "",
        rentperday: "",
        rentperhour: "",
        rentperNight: "",
        facilities: [],
        images: [null],
      });
    } catch (err) {
      toast.error("Failed to add room");
      console.error(err);
    }
  };

  if (isLoading) return <div className="text-center mt-10 text-gray-500">Loading branches...</div>;
  if (isError) return <div className="text-red-600 text-center mt-10">Error loading branches. {error?.status && `Status: ${error.status}`}</div>;

  const branches = data?.allbranch || [];

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1e3a5f]">Add Hotel Room</h2>
        <form className="flex flex-col gap-5" onSubmit={handleAddRoom}>

          {/* Branch */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Branch</label>
            <select
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              className="input-box"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>{branch.address}</option>
              ))}
            </select>
          </div>

          {/* Room Number */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Room Number</label>
            <input
              type="number"
              name="roomNumber"
              placeholder="e.g., 101"
              value={formData.roomNumber}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Rent / Day</label>
              <input type="number" name="rentperday" placeholder="₹ per day" value={formData.rentperday} onChange={handleChange} className="input-box"/>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Rent / Night</label>
              <input type="number" name="rentperNight" placeholder="₹ per night" value={formData.rentperNight} onChange={handleChange} className="input-box"/>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Rent / Hour</label>
              <input type="number" name="rentperhour" placeholder="₹ per hour" value={formData.rentperhour} onChange={handleChange} className="input-box"/>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Facilities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {facilityOptions.map((facility) => (
                <label key={facility} className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" checked={formData.facilities.includes(facility)} onChange={() => handleFacilities(facility)} className="h-4 w-4"/>
                  {facility}
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Room Images</p>
            {formData.images.map((img, index) => (
              <div key={index} className="mb-5">
                <input type="file" accept="image/*" onChange={(e) => handleSingleImage(e, index)} className="input-box"/>
                {img && <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-40 rounded-xl object-cover mt-2 border shadow-sm"/>}
              </div>
            ))}
            <button type="button" onClick={addMoreImageInput} className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all">+ Add More Images</button>
          </div>

          {/* Submit */}
          <button type="submit" disabled={addRoomLoading} className={`w-full mt-5 py-3 rounded-xl font-semibold text-lg transition-all shadow-md ${addRoomLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}`}>
            {addRoomLoading ? <div className="flex items-center justify-center gap-2"><span className="loader"></span>Adding...</div> : "Add Room"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddHotelRoom;
