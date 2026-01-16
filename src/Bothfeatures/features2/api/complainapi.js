import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:5000/api/complain/";

const ComplainApi = createApi({
  reducerPath: "complainapi",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  tagTypes: ["Complaint"], // 🔥 IMPORTANT

  endpoints: (builder) => ({

    /* ---------------- CREATE ---------------- */
    createComplain: builder.mutation({
      query: (formData) => ({
        url: `create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Complaint"],
    }),

    /* ---------------- STATUS CHANGE ---------------- */
    changeComplainStatus: builder.mutation({
      query: ({ complaintId, newStatus }) => ({
        url: `status/${complaintId}`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Complaint"], // 🔥 AUTO REFETCH
    }),

    /* ---------------- UPDATE ---------------- */
    updateComplain: builder.mutation({
      query: ({ complaintId, updatedData }) => ({
        url: `${complaintId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Complaint"],
    }),

    /* ---------------- DELETE ---------------- */
    deleteComplain: builder.mutation({
      query: (complaintId) => ({
        url: `${complaintId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Complaint"],
    }),

    /* ---------------- GET (TENANT) ---------------- */
    getAllComplainByTenant: builder.query({
      query: () => `tenant`,
      providesTags: ["Complaint"],
    }),

    getComplainByTenant: builder.query({
      query: (tenantId) => `tenant/${tenantId}`,
      providesTags: ["Complaint"],
    }),

    /* ---------------- GET (MANAGER / ADMIN) ---------------- */
    getAllComplain: builder.query({
      query: () => ``,
      providesTags: ["Complaint"],
    }),

    getComplainByBranch: builder.query({
      query: (branchId) => `branch/${branchId}`,
      providesTags: ["Complaint"],
    }),

    getComplainByStatus: builder.query({
      query: (status) => `status/${status}`,
      providesTags: ["Complaint"],
    }),
     getComplainByCategory: builder.query({
      query: (category) => `category/${category}`,
      providesTags: ["Complaint"],
    }),

 
  }),
});

export const {
  useCreateComplainMutation,
  useChangeComplainStatusMutation,
  useUpdateComplainMutation,
  useDeleteComplainMutation,
  useGetComplainByCategoryQuery,

  useGetAllComplainByTenantQuery,
  useGetComplainByTenantQuery,
  useGetAllComplainQuery,
  useGetComplainByBranchQuery,
  useGetComplainByStatusQuery,

  
} = ComplainApi;

export default ComplainApi;
