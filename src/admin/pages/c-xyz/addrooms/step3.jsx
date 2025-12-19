const Step3 = ({ roomData, setRoomData, facilitiesOptions, notAllowedOptions, rulesOptions, furnishedOptions }) => {
  
  const handleCheckboxArray = (field, value) => {
    const arr = roomData[field];
    if (arr.includes(value)) {
      setRoomData({ ...roomData, [field]: arr.filter(v => v !== value) });
    } else {
      setRoomData({ ...roomData, [field]: [...arr, value] });
    }
  };

  const handleServiceChange = (index, key, value) => {
    const updated = [...roomData.services];
    updated[index][key] = key === "price" ? Number(value) : value;
    setRoomData({ ...roomData, services: updated });
  };

  const addService = () => {
    setRoomData({ ...roomData, services: [...roomData.services, { name: "", price: "" }] });
  };

  const removeService = (index) => {
    const updated = roomData.services.filter((_, i) => i !== index);
    setRoomData({ ...roomData, services: updated });
  };

  return (
    <div>
      {/* Facilities */}
      <p className="section-heading">Facilities</p>
      <div className="grid grid-cols-2 gap-3">
        {facilitiesOptions.map(f => (
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

      {/* Not Allowed */}
      <p className="section-heading mt-4">Not Allowed</p>
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

      {/* Rules */}
      <p className="section-heading mt-4">Rules</p>
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

      {/* Furnished Type */}
      <div className="mt-4">
        <label className="label-style">Furnishing Type</label>
        <select
          className="input-style"
          value={roomData.furnishedType}
          onChange={(e) => setRoomData({ ...roomData, furnishedType: e.target.value })}
        >
          {furnishedOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Optional Services */}
      <div className="mt-6">
        <p className="section-heading">Optional Services & Charges</p>
        {roomData.services.map((service, index) => (
          <div key={index} className="flex gap-3 mb-3 items-center">
            <input
              type="text"
              className="input-style flex-1"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="input-style w-32"
              placeholder="Price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, "price", e.target.value)}
            />
            {roomData.services.length > 1 && (
              <button
                type="button"
                onClick={() => removeService(index)}
                className="ml-1 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addService}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Service
        </button>

        {/* Total Services */}
        <div className="mt-2 text-sm font-semibold text-gray-700">
          Total Services Amount: ₹{roomData.services.reduce((sum, s) => sum + Number(s.price || 0), 0)}
        </div>
      </div>
    </div>
  );
};

export default Step3;
