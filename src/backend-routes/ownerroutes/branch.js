import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-2.onrender.com/api/property/";

const owner_branch = createApi({
  reducerPath: "owner_branch",
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
   


    //edit branch 

    //deletebranch




   
  }),
});

export const {
  useAddbranchMutation,
  useGetAllBranchQuery,

  useGetAllBranchByOwnerQuery,
  useGetAllBranchbybranchIdQuery,


} = owner_branch;

export default owner_branch;




