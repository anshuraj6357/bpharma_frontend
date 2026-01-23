import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-2.onrender.com/api/branch/owner";

const owner_branch = createApi({
  reducerPath: "owner_branch",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  tagTypes: ["Branch", "Room", "Property", "Location"],

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
   deleteBranch: builder.mutation({
  query: (id) => ({
    url: "/DeleteBranch",
    method: "DELETE",
    body: { id },
  }),
  invalidatesTags: ["Branch"],
}),



    getAllBranchByOwner: builder.query({
      query: () => "getalllbranchowner",
      providesTags: ["Branch"],
    }),

    getAllBranchbybranchId: builder.query({
      query: () => "getbranch/bybranchMnager",
      providesTags: ["Branch"],
    }),

    /* ===================== LOCATION ===================== */

    // Get all states
    getStates: builder.query({
      query: () => "states",
      providesTags: ["Location"],
    }),

    // Get cities by state
    getCities: builder.mutation({
      query: (payload) => ({
        url: "cities",
        method: "POST",
        body: payload, // { state: "Delhi" }
      }),
      invalidatesTags: ["Location"],
    }),

    // Get locations by state + city
    getLocationNames: builder.mutation({
      query: (payload) => ({
        url: "locations",
        method: "POST",
        body: payload, // { state: "Delhi", city: "New Delhi" }
      }),
      invalidatesTags: ["Location"],
    }),

  }),
});

export const {
  useAddbranchMutation,
  useGetAllBranchQuery,
  useGetAllBranchByOwnerQuery,
  useGetAllBranchbybranchIdQuery,
  useDeleteBranchMutation,

  // Location hooks
  useGetStatesQuery,
  useGetCitiesMutation,
  useGetLocationNamesMutation,

} = owner_branch;

export default owner_branch;
