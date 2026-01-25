import { useEffect, useState, useMemo } from "react";
import {
  useDeleteRoomMutation,
  useGetAllRoomQuery
} from "../../../backend-routes/ownerroutes/room";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Edit3, 
  Trash2, 
  Bed, 
  Building2, 
  Hotel as HotelIcon,
} from "lucide-react";

function ShowRooms() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllRoomQuery();
  const [deleteRoom] = useDeleteRoomMutation();

  // State
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Filtering Logic
  const filteredRooms = useMemo(() => {
    if (!data?.rooms) return [];
    return data.rooms.filter((room) => {
      const matchesSearch = room.roomNumber?.toString().includes(searchTerm) || 
                            room.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || room.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [data?.rooms, searchTerm, activeFilter]);

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      setDeletingRoomId(roomId);
      await deleteRoom(roomId).unwrap();
      toast.success("Room removed safely");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    } finally {
      setDeletingRoomId(null);
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-800">Connection Error</h3>
      <p className="text-gray-500 mb-6">We couldn't load your rooms. Please check your internet.</p>
      <button onClick={() => refetch()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Try Again</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <Toaster position="top-right" />
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b sticky top-0 z-30 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage Inventory</h1>
              <p className="text-gray-500 text-sm">You have total {data?.rooms?.length || 0} rooms listed</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search room no..."
                  className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                {["All", "Pg", "Hotel", "Rented-Room"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      activeFilter === cat 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                      : "bg-white text-gray-600 border hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto mt-6">
        {filteredRooms.length === 0 ? (
          <EmptyState isSearch={searchTerm.length > 0} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard 
                key={room._id} 
                room={room} 
                onEdit={() => navigate(`/admin/edit-room/${room._id}`)}
                onDelete={() => handleDeleteRoom(room._id)}
                isDeleting={deletingRoomId === room._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS FOR SCALABILITY ---

const RoomCard = ({ room, onEdit, onDelete, isDeleting }) => {
  const getStatusInfo = () => {
    if (room.toPublish?.status) return { color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle2 size={12}/>, label: "Live" };
    if (room.comment) return { color: "bg-red-100 text-red-700", icon: <XCircle size={12}/>, label: "Action Required" };
    return { color: "bg-amber-100 text-amber-700", icon: <AlertCircle size={12}/>, label: "Verifying" };
  };

  const status = getStatusInfo();

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={room.roomImages?.[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"} 
          alt="Room" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${status.color}`}>
            {status.icon} {status.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl flex justify-between items-center shadow-lg border border-white/20">
            <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Starting from</p>
               {room.category === "Pg" ? (
  <div className="flex flex-col">
    <p className="text-sm font-black text-gray-900">
      ₹{Number(room.price) + room.services.reduce((a, b) => a + b.price, 0)}
      <span className="text-[10px] font-medium text-gray-500"> /mo (Total)</span>
    </p>
    <span className="text-[8px] text-emerald-600 font-bold uppercase">
      Incl. Services
    </span>
  </div>
) : (
  <p className="text-sm font-black text-gray-900">
    ₹{room.price || room.rentperNight || room.rentperday}
    <span className="text-[10px] font-medium text-gray-500">
      /{room.category === 'Hotel' ? 'night' : 'mo'}
    </span>
  </p>
)}
               
            </div>
            <div className="p-2 bg-blue-600 rounded-lg text-white">
                {room.category === 'Pg' ? <Bed size={16}/> : room.category === 'Hotel' ? <HotelIcon size={16}/> : <Building2 size={16}/>}
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">Room {room.roomNumber}</h3>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold uppercase">{room.category}</span>
        </div>

        <p className="text-gray-500 text-xs mb-4 line-clamp-1">
            {room.type || room.hoteltype || room.flattype || "Standard Accommodation"} • {room.facilities?.slice(0, 2).join(", ")}
        </p>

        {room.comment && !room.toPublish?.status && (
            <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-[10px] text-red-600 italic">"{room.comment}"</p>
            </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dashed">
            <button 
                onClick={onEdit}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition"
            >
                <Edit3 size={14} /> Edit
            </button>
            <button 
                onClick={onDelete}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-600 hover:text-white transition disabled:opacity-50"
            >
                {isDeleting ? <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"/> : <Trash2 size={14} />} 
                Delete
            </button>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-[400px] bg-gray-200 rounded-2xl animate-pulse" />
            ))}
        </div>
    </div>
);

const EmptyState = ({ isSearch }) => (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <Building2 className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-800">{isSearch ? "No matches found" : "No rooms yet"}</h3>
        <p className="text-gray-500 text-sm">{isSearch ? "Try adjusting your search or filters" : "Start adding rooms to see them listed here"}</p>
    </div>
);

export default ShowRooms;