const Step5 = ({ roomData, handleAddRoom, isLoading }) => {
  return (
    <div>
      <label className="label-style">Description</label>
      <textarea
        className="input-style h-28 resize-none"
        placeholder="Write room description..."
        value={roomData.description}
        onChange={(e) => roomData.setRoomData({ ...roomData, description: e.target.value })}
      />

      <button
        onClick={() => handleAddRoom(roomData)}
        disabled={isLoading}
        className={`w-full mt-6 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg
          ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}`}
      >
        {isLoading ? "Adding..." : "Add Room"}
      </button>
    </div>
  );
};

export default Step5;
