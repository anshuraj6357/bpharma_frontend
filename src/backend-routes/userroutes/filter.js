import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Use ENV for production
const FILTER_API = import.meta.env.VITE_API_BASE_URL + "/api/v1/filter/user";

export const user_filter = createApi({
  reducerPath: "user_filter",

  baseQuery: fetchBaseQuery({
    baseUrl: FILTER_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Pg"], // Tag for caching / invalidation

  // ✅ Production defaults
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ---------------- APPLY ALL FILTERS ---------------- */
    appliedAllFiltered: builder.mutation({
      query: (formData) => ({
        url: "appliedallfilter",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Pg"], // triggers refetch of queries with tag
    }),

    /* ---------------- GET ALL NEAREST PG ---------------- */
    getAllnearestPg: builder.mutation({
      query: ({ lat, long }) => ({
        url: "getallnearestpg",
        method: "POST",
        body: { lat, long },
      }),
      invalidatesTags: ["Pg"], // Invalidate to ensure fresh data
    }),

    /* ---------------- GET FILTERED PG BY CITY ---------------- */
    getAllFiltered: builder.query({
      query: (cityFromQuery) => ({
        url: `filtered/${cityFromQuery}`,
      }),
      providesTags: ["Pg"],
    }),
  }),
});

export const {
  useAppliedAllFilteredMutation,
  useGetAllFilteredQuery,
  useGetAllnearestPgMutation,
} = user_filter;

export default user_filter;
