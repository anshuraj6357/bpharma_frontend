const Step4 = ({ roomData, setRoomData }) => {
  const handleSingleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...roomData.images];
    updatedImages[index] = file;
    setRoomData({ ...roomData, images: updatedImages });
  };

  const addMoreImageInput = () => {
    setRoomData({ ...roomData, images: [...roomData.images, null] });
  };

  return (
    <div>
      <p className="section-heading">Room Images</p>
      {roomData.images.map((img, index) => (
        <div key={index} className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="input-style"
            onChange={(e) => handleSingleImage(e, index)}
          />
          {img && (
            <img
              src={URL.createObjectURL(img)}
              alt="Preview"
              className="w-full h-32 object-cover rounded-xl mt-2 shadow-md border"
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addMoreImageInput}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add More Images
      </button>
    </div>
  );
};

export default Step4;
