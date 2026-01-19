import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-2.onrender.com/property/owner/";

const owner_property = createApi({
  reducerPath: "owner_property",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  // 🔥 MULTI TAG TYPES
  tagTypes: ["Branch", "Room", "Property"],

  endpoints: (builder) => ({

    /* ===================== BRANCH ===================== */



    /* ===================== BRANCH ROOMS (CURSOR PAGINATION) ===================== */


    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `DeleteProperty/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),




  }),
});

export const {
 
  useDeletePropertyMutation,
} = owner_property;

export default owner_property;




