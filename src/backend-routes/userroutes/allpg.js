import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_PgApi = createApi({
  reducerPath: "user_PgApi",

  /* =======================
     🌍 BASE QUERY
  ======================= */
  baseQuery: fetchBaseQuery({
    baseUrl: "https://roomgi-backend-project-2.onrender.com/api/property/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  /* =======================
     🏷️ TAGS
  ======================= */
  tagTypes: ["Pg"],

  /* =======================
     🔁 AUTO REFRESH (MOBILE SAFE)
  ======================= */
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /* =======================
       🏠 GET ALL PGs
    ======================= */
    getAllListedPg: builder.query({
      query: ({ lat, lng } = {}) => ({
        url: "/allpg",
        method: "GET",
        params: lat && lng ? { lat, lng } : {},
      }),
      providesTags: ["Pg"],
      keepUnusedDataFor: 60, // 1 minute
    }),

    /* =======================
       🌆 SERVICE CITIES
    ======================= */
    getservicesarea: builder.query({
      query: () => ({
        url: "/services-cities",
        method: "GET",
      }),
      providesTags: ["Pg"],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    /* =======================
       🗺️ MAP DATA
    ======================= */
    getMapPg: builder.query({
      query: () => ({
        url: "/getmapofpg",
        method: "GET",
        params: { _v: "map-v1" }, // controlled cache bust
      }),
      providesTags: ["Pg"],
      keepUnusedDataFor: 60,
    }),

    /* =======================
       🏢 PG BY ID
    ======================= */
    getPgById: builder.query({
      query: (id) => ({
        url: `get/${id}`,
        method: "GET",
      }),
      providesTags: ["Pg"],
      keepUnusedDataFor: 300,
    }),
  }),
});

/* =======================
   🎯 EXPORT HOOKS
======================= */
export const {
  useGetAllListedPgQuery,
  useGetservicesareaQuery,
  useGetMapPgQuery,
  useGetPgByIdQuery,
} = user_PgApi;

export default user_PgApi;
