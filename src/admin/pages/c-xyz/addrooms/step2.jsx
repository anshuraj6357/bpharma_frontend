const Step2 = ({ roomData, setRoomData }) => {
  return (
    <div>
      {roomData.category === "Pg" && (
        <>
          <label className="label-style">PG Type</label>
          <select
            className="input-style"
            value={roomData.type}
            onChange={e => setRoomData({ ...roomData, type: e.target.value })}
          >
            <option value="">Select PG Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </select>
        </>
      )}

      {roomData.category === "Hotel" && (
        <>
          <label className="label-style mt-4">Hotel Type</label>
          <select
            className="input-style"
            value={roomData.hoteltype}
            onChange={e => setRoomData({ ...roomData, hoteltype: e.target.value })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
        </>
      )}

      {roomData.category === "Rented-Room" && (
        <>
          <label className="label-style">Rent Type</label>
          <select
            className="input-style"
            value={roomData.renttype}
            onChange={e => setRoomData({ ...roomData, renttype: e.target.value, flattype: "", roomtype: "" })}
          >
            <option value="">Select Rent Type</option>
            <option value="Flat-Rent">Flat Rent</option>
            <option value="Room-Rent">Room Rent</option>
          </select>

          {roomData.renttype === "Flat-Rent" && (
            <>
              <label className="label-style mt-3">Flat Type</label>
              <select
                className="input-style"
                value={roomData.flattype}
                onChange={e => setRoomData({ ...roomData, flattype: e.target.value })}
              >
                <option value="">Select Flat Type</option>
                <option value="1Rk">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
                <option value="5BHK">5BHK</option>
              </select>
            </>
          )}

          {roomData.renttype === "Room-Rent" && (
            <>
              <label className="label-style mt-3">Room Type</label>
              <select
                className="input-style"
                value={roomData.roomtype}
                onChange={e => setRoomData({ ...roomData, roomtype: e.target.value })}
              >
                <option value="">Select Room Type</option>
                <option value="Single">Single Room</option>
                <option value="Double">Double Room</option>
                <option value="Triple">Triple Room</option>
              </select>
            </>
          )}
        </>
      )}

      {roomData.category !== "Hotel" && (
        <div className="mt-4">
          <label className="label-style">Price (Per Month)</label>
          <input
            type="number"
            className="input-style"
            value={roomData.price}
            onChange={e => setRoomData({ ...roomData, price: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};

export default Step2;
