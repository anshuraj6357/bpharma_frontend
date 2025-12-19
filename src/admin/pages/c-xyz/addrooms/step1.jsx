const Step1 = ({ roomData, setRoomData, Allbranchdata, allowedForOptions }) => (
  <div>
    <label className="label-style">Branch</label>
    <select
      className="input-style"
      value={roomData.branch}
      onChange={e => setRoomData({ ...roomData, branch: e.target.value })}
    >
      <option value="">Select Branch</option>
      {Allbranchdata?.allbranch?.map(branch => (
        <option key={branch._id} value={branch._id}>{branch.name}</option>
      ))}
    </select>

    <label className="label-style mt-4">Room Number</label>
    <input
      type="number"
      className="input-style"
      value={roomData.roomNumber}
      onChange={e => setRoomData({ ...roomData, roomNumber: e.target.value })}
    />

    <label className="label-style mt-4">City</label>
    <input
      type="text"
      className="input-style"
      value={roomData.city}
      onChange={e => setRoomData({ ...roomData, city: e.target.value })}
    />

    <label className="label-style mt-4">Allowed For</label>
    <select
      className="input-style"
      value={roomData.allowedFor}
      onChange={e => setRoomData({ ...roomData, allowedFor: e.target.value })}
    >
      {allowedForOptions.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>

    <label className="label-style mt-4">Category</label>
    <select
      className="input-style"
      value={roomData.category}
      onChange={e => setRoomData({ ...roomData, category: e.target.value })}
    >
      <option value="">Select</option>
      <option value="Pg">PG</option>
      <option value="Hotel">Hotel</option>
      <option value="Rented-Room">Rented Room</option>
    </select>
  </div>
);
export default Step1;
