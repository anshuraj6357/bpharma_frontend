import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-1.onrender.com/api/property/";

const propertyApi = createApi({
  reducerPath: "propertyapi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  // 🔥 MULTI TAG TYPES
  tagTypes: ["Branch", "Room", "Property"],

  endpoints: (builder) => ({

    /* ===================== BRANCH ===================== */

    addbranch: builder.mutation({
      query: (payload) => ({
        url: "add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Branch"],
    }),

    getAllBranch: builder.query({
      query: () => "get",
      providesTags: ["Branch"],
    }),

    getAllBranchByOwner: builder.query({
      query: () => "getalllbranchowner",
      providesTags: ["Branch"],
    }),

    getAllBranchbybranchId: builder.query({
      query: () => "getbranch/bybranchMnager",
      providesTags: ["Branch"],
    }),
     getAllBranchbyproperty: builder.query({
      query: () => "/getproperty/all",
      providesTags: ["Branch"],
    }),
  
    Removebranchmanager: builder.mutation({
      query: (managerId) => ({
        url: `/re/${managerId}`,
        method: "delete",
      }),
      invalidatesTags: ["Branch"],
    }),

  

    addbranchmanager: builder.mutation({
      query: ({ managerData, branchid }) => ({
        url: `createbranchmanager/${branchid}`,
        method: "POST",
        body: managerData,
      }),
      invalidatesTags: ["Branch"],
    }),


      addexistingbranchmanager: builder.mutation({
      query: ({ managerData, branchid }) => ({
        url: `createexistingbranchmanager/${branchid}`,
        method: "POST",
        body: {managerData},
      }),
      invalidatesTags: ["Branch"],
    }),


    changemanagerpass: builder.mutation({
      query: (payload) => ({
        url: "branchmanager/passwordchange",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Branch"],
    }),

    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `DeleteProperty/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
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
      query: () => "allrooms",
      providesTags: ["Room"],
    }),
    getAllRoomowner: builder.query({
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

    /* ===================== HOTEL ===================== */

    addHotelRoom: builder.mutation({
      query: (dataToSend) => ({
        url: "addhotelroom",
        method: "POST",
        body: dataToSend,
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useAddbranchMutation,
  useGetAllBranchQuery,
  useAddexistingbranchmanagerMutation,
  useGetAllBranchByOwnerQuery,
  useGetAllBranchbybranchIdQuery,
   useGetAllBranchbypropertyQuery,
  useAddbranchmanagerMutation,
  useChangemanagerpassMutation,
  useDeletePropertyMutation,
  useRemovebranchmanagerMutation,
useGetAllRoomownerQuery,
  useAddRoomMutation,
  useGetAllRoomQuery,
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useDeleteRoomImageMutation,
  useAddRoomImagesMutation,

  useAddHotelRoomMutation,
} = propertyApi;

export default propertyApi;
