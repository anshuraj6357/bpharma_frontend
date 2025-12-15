import { useEffect, useState } from "react";
import {
  useGetAllRoomQuery,
  useDeleteRoomMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

function ShowRooms() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllRoomQuery();
  const [deleteRoom, { isSuccess }] = useDeleteRoomMutation();
  const [deletingRoomId, setDeletingRoomId] = useState(null);

  const handleDeleteRoom = async (roomId) => {
    try {
      setDeletingRoomId(roomId);
      await deleteRoom(roomId).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Room cannot be deleted ❌");
    } finally {
      setDeletingRoomId(null);
    }
  };

  const handleEditRoom = (roomId) => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10 text-lg">
        Something went wrong while fetching rooms.
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-wide">
          All Rooms
        </h1>

        {data?.rooms?.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            No rooms added yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.rooms.map((room) => (
              <div
                key={room._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                {/* Room Images */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-50 rounded-t-2xl">
                  <div className="flex overflow-x-auto p-3 space-x-3 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {room.roomImages?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Room ${idx + 1}`}
                        className="snap-center w-52 h-40 rounded-xl object-cover shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 text-sm rounded-lg shadow-lg flex flex-col space-y-0.5">
                    {room.category !== "Hotel" && <span>₹{room.price}</span>}
                    {room.category === "Hotel" && (
                      <>
                        {room.rentperNight && <span>₹{room.rentperNight}/night</span>}
                        {room.rentperday && <span>₹{room.rentperday}/day</span>}
                        {room.rentperhour && <span>₹{room.rentperhour}/hour</span>}
                      </>
                    )}
                  </div>

                  {/* Room Type Badge */}
                  <span className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 text-xs rounded-lg shadow">
                    {room.category === "Pg" && `${room.type} Room`}
                    {room.category === "Hotel" && room.hoteltype}
                    {room.category === "Rented-Room" &&
                      (room.renttype === "Flat-Rent" ? room.flattype : room.roomtype)}
                  </span>
                </div>

                {/* Room Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900">Room {room.roomNumber}</h2>
                    {room.toPublish?.status ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded-full shadow">
                        <CheckCircle size={14} /> Listed
                      </span>
                    ) : room.comment ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs rounded-full shadow">
                        <XCircle size={14} /> Not Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full shadow">
                        <AlertCircle size={14} /> Under Verification
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm capitalize mb-2">
                    {room.category === "Pg" && `${room.type} Room`}
                    {room.category === "Hotel" && room.hoteltype}
                    {room.category === "Rented-Room" &&
                      (room.renttype === "Flat-Rent" ? room.flattype : room.roomtype)}
                  </p>

                  {!room.toPublish?.status && (
                    <div className="text-sm mb-2">
                      {room.comment ? (
                        <p className="bg-orange-100 text-orange-800 p-2 rounded-lg shadow-sm">
                          {room.comment}
                        </p>
                      ) : (
                        <p className="bg-yellow-100 text-yellow-700 p-2 rounded-lg shadow-sm">
                          Under admin verification (24h)
                        </p>
                      )}
                    </div>
                  )}

                  {/* Facilities */}
                  {room.facilities?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.facilities.map((f, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full shadow"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditRoom(room._id)}
                      className="flex-1 py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room._id)}
                      disabled={deletingRoomId === room._id}
                      className={`flex-1 py-2 px-4 text-white font-semibold rounded-lg shadow transition ${
                        deletingRoomId === room._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {deletingRoomId === room._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowRooms;
