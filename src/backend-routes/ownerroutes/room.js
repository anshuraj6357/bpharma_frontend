import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const USER_API = "https://roomgi-backend-project-2.onrender.com/api/room/owner";
const USER_API = `https://roomgi-backend-project-2.onrender.com/api/room/owner`;






const owner_room = createApi({
  reducerPath: "owner_room",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  // 🔥 MULTI TAG TYPES
  tagTypes: ["Branch", "Room", "Property"],

  endpoints: (builder) => ({

     getAllBranchbyproperty: builder.query({
      query: () => "/getproperty/all",
      providesTags: ["Branch"],
    }),
  


    /* ===================== BRANCH ROOMS (CURSOR PAGINATION) ===================== */
getRoomsByBranch: builder.query({
  query: ({ branchId, cursor, limit = 10 }) => ({
    url: `branch-rooms/${branchId}`,
    params: { limit, cursor }, // Query params object format mein dena zyada saaf hai
  }),

  // Sirf branchId ke basis par cache maintain karega (Pagination ke liye zaroori)
  serializeQueryArgs: ({ queryArgs }) => queryArgs.branchId,

  // Naye data ko purane mein merge karna
  merge: (currentCache, newData) => {
    if (!currentCache) return newData; // Agar pehla load hai toh direct return karo
    
    return {
      ...newData,
      rooms: [...currentCache.rooms, ...newData.rooms], // Purane rooms + naye rooms
      nextCursor: newData.nextCursor, // Update cursor
    };
  },

  // Jab branch change ho tabhi refetch karega (Not on cursor change)
  forceRefetch: ({ currentArg, previousArg }) => currentArg?.branchId !== previousArg?.branchId,

  providesTags: (result, error, arg) => [{ type: "Room", id: arg.branchId }],
}),

    /* ===================== ROOM ===================== */

    addRoom: builder.mutation({
      query: (formData) => ({
        url: "addroom",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Room"],
    }),


    getAllRoom: builder.query({
      query: () => "allroomsaccordingtoowner",
      providesTags: ["Room"],
    }),

    getRoomById: builder.query({
      query: (roomId) => `get/${roomId}`,
      providesTags: ["Room"],
    }),

    updateRoom: builder.mutation({
      query: ({ id, data }) => ({
        url: `updateroom/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),

    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `deleteroom/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"], // 🔥 auto refetch only rooms
    }),

    deleteRoomImage: builder.mutation({
      query: ({ id, imageurl }) => ({
        url: "deleteroomimage",
        method: "DELETE",
        body: { id, imageurl },
      }),
      invalidatesTags: ["Room"],
    }),

    addRoomImages: builder.mutation({
      query: (formData) => ({
        url: "addroomimages",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Room"],
    }),

   
  }),
});

export const {

  useGetRoomsByBranchQuery,

   useGetAllBranchbypropertyQuery,

useGetAllRoomQuery,
  useAddRoomMutation,

  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useDeleteRoomImageMutation,
  useAddRoomImagesMutation,

} = owner_room;

export default owner_room;




