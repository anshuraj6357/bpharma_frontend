 /* ---------------- DELETE ---------------- */


    
    
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-2.onrender.com/api/complain/";

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


    // Tenant personal complaints with cursor
  
  }),
});

export const {
 useDeleteComplainMutation,
 useCreateComplainMutation,
} = user_complaints;

export default user_complaints;




