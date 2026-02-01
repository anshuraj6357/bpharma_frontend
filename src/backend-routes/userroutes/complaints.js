import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Use ENV for production
const USER_API = import.meta.env.VITE_API_BASE_URL + "/api/v1/complain/user";

const user_complaints = createApi({
  reducerPath: "complainapi",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Complaint"],

  // ✅ Production cache defaults
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ---------------- CREATE ---------------- */
    createComplain: builder.mutation({
      query: (formData) => ({
        url: "create",
        method: "POST",
        body: formData,
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

    /* ---------------- GET ALL (Tenant) ---------------- */
    getAllComplainByTenant: builder.query({
      query: ({ cursor, limit = 10 } = {}) => ({
        url: "get",
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),

  }),
});

export const {
  useCreateComplainMutation,
  useDeleteComplainMutation,
  useGetAllComplainByTenantQuery,
} = user_complaints;

export default user_complaints;
