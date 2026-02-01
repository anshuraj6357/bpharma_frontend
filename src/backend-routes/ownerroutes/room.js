import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ ENV BASE URL
const OWNER_ROOM_API =
  import.meta.env.VITE_API_BASE_URL + "/v1/room/owner";

export const owner_room = createApi({
  reducerPath: "owner_room",

  baseQuery: fetchBaseQuery({
    baseUrl: OWNER_ROOM_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  // 🔥 MULTI TAG TYPES
  tagTypes: ["Branch", "Room", "Property"],

  // ✅ PRODUCTION CACHE RULES
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ===================== PROPERTY → BRANCH ===================== */

    getAllBranchbyproperty: builder.query({
      query: () => ({
        url: "/getproperty/all",
        method: "GET",
      }),
      providesTags: ["Branch"],
    }),

    /* ===================== BRANCH ROOMS (CURSOR PAGINATION) ===================== */

    getRoomsByBranch: builder.query({
      query: ({ branchId, cursor, limit = 10 }) => ({
        url: `branch-rooms/${branchId}`,
        method: "GET",
        params: { limit, cursor },
      }),

      // ✅ Cache only by branchId
      serializeQueryArgs: ({ queryArgs }) => queryArgs.branchId,

      // ✅ Merge paginated data
      merge: (currentCache, newData) => {
        if (!currentCache) return newData;

        return {
          ...newData,
          rooms: [...currentCache.rooms, ...newData.rooms],
          nextCursor: newData.nextCursor,
        };
      },

      // ✅ Refetch only when branch changes
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.branchId !== previousArg?.branchId,

      providesTags: (result, error, arg) => [
        { type: "Room", id: arg.branchId },
      ],
    }),

    /* ===================== ROOM CRUD ===================== */

    addRoom: builder.mutation({
      query: (formData) => ({
        url: "addroom",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Room"],
    }),

    getAllRoom: builder.query({
      query: () => ({
        url: "allroomsaccordingtoowner",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),

    getRoomById: builder.query({
      query: (roomId) => ({
        url: `get/${roomId}`,
        method: "GET",
      }),
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
      invalidatesTags: ["Room"],
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
