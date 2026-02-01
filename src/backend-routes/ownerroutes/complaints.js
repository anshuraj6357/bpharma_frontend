import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ ENV BASE URL
const OWNER_COMPLAIN_API =
  import.meta.env.VITE_API_BASE_URL + "/api/complain/owner";

export const owner_complain = createApi({
  reducerPath: "owner_complain",

  baseQuery: fetchBaseQuery({
    baseUrl: OWNER_COMPLAIN_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Complaint"],

  // ✅ PRODUCTION CACHE RULES
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ===================== ALL COMPLAINTS ===================== */

    getAllComplain: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Complaint"],
    }),

    /* ===================== BRANCH BASED ===================== */

    getComplainByBranch: builder.query({
      query: ({ branchId, cursor, limit = 10 }) => ({
        url: `branch/${branchId}`,
        method: "GET",
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),

    /* ===================== STATUS CHANGE ===================== */

    changeComplainStatus: builder.mutation({
      query: ({ complaintId, newStatus }) => ({
        url: `status/${complaintId}`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Complaint"],
    }),

    /* ===================== STATUS FILTER ===================== */

    getComplainByStatus: builder.query({
      query: ({ status, cursor, limit = 10 }) => ({
        url: `status/${status}`,
        method: "GET",
        params: { cursor, limit },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((c) => ({
                type: "Complaint",
                id: c._id,
              })),
              "Complaint",
            ]
          : ["Complaint"],
    }),

    /* ===================== CATEGORY FILTER ===================== */

    getComplainByCategory: builder.query({
      query: ({ category, cursor, limit = 10 }) => ({
        url: `category/${category}`,
        method: "GET",
        params: { cursor, limit },
      }),
      providesTags: ["Complaint"],
    }),

  }),
});

export const {
  useGetAllComplainQuery,
  useGetComplainByBranchQuery,
  useGetComplainByStatusQuery,
  useGetComplainByCategoryQuery,
  useChangeComplainStatusMutation,
} = owner_complain;

export default owner_complain;
