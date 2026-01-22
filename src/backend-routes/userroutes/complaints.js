 /* ---------------- DELETE ---------------- */


    
    
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:5000/api/complain/user";

const user_complaints = createApi({
  reducerPath: "complainapi",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  tagTypes: ["Complaint"],

  endpoints: (builder) => ({
  
        deleteComplain: builder.mutation({
      query: (complaintId) => ({
        url: `${complaintId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Complaint"],
    }),

  createComplain: builder.mutation({
      query: (formData) => ({
        url: `create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Complaint"],
    }),
      getAllComplainByTenant: builder.query({
      query: ({ cursor, limit = 10 } = {}) => ({
        url: `get`,
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),


    // Tenant personal complaints with cursor
  
  }),
});

export const {
 useDeleteComplainMutation,
 useCreateComplainMutation,
 useGetAllComplainByTenantQuery
} = user_complaints;

export default user_complaints;




