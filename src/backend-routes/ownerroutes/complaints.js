
    
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-2.onrender.com/api/complain/";

const owner_complain = createApi({
  reducerPath: "owner_complain",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  tagTypes: ["Complaint"],

  endpoints: (builder) => ({
  
      /* ---------------- GET (MANAGER / ALL) ---------------- */
    // Stats ke liye hum usually cursor nahi bhejte, sirf summary chahiye hoti hai
    getAllComplain: builder.query({
      query: () => ``,
      providesTags: ["Complaint"],
    }),
      getAllComplainByTenant: builder.query({
      query: ({ cursor, limit = 10 } = {}) => ({
        url: `tenant`,
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),
     // Branch based fetch with cursor
    getComplainByBranch: builder.query({
      query: ({ branchId, cursor, limit = 10 }) => ({
        url: `branch/${branchId}`,
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),
    /* ---------------- STATUS CHANGE ---------------- */
    changeComplainStatus: builder.mutation({
      query: ({ complaintId, newStatus }) => ({
        url: `status/${complaintId}`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Complaint"], 
    }),

    
  

    /* ---------------- PAGINATED QUERIES (Lazy Loading Support) ---------------- */

    // Status based fetch with cursor
    getComplainByStatus: builder.query({
      query: ({ status, cursor, limit = 10 }) => ({
        url: `status/${status}`,
        params: { cursor, limit }, // Query params: ?cursor=abc&limit=10
      }),
      providesTags: (result) => 
        result 
          ? [...result.data.map(({ _id }) => ({ type: "Complaint", id: _id })), "Complaint"]
          : ["Complaint"],
    }),

   

    // Category based fetch with cursor
    getComplainByCategory: builder.query({
      query: ({ category, cursor, limit = 10 }) => ({
        url: `category/${category}`,
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),

    // Tenant personal complaints with cursor
  
  }),
});

export const {
 
  useChangeComplainStatusMutation,

  useGetAllComplainQuery,
  useGetComplainByStatusQuery,
  useGetComplainByBranchQuery,
  useGetComplainByCategoryQuery,
  useGetAllComplainByTenantQuery,
} = owner_complain;

export default owner_complain;



