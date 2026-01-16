import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PgApi = createApi({
    reducerPath: "PgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/property/",
        credentials: "include",
    }),
    tagTypes: ["Pg"], // ✅ Added tag for versioning
    endpoints: (builder) => ({
        getAllListedPg: builder.query({
            query: () => ({
                url: "/allpg",
                method: "GET",
            }),
            providesTags: ["Pg"], // ✅ auto refetch on invalidation
        }),
        getMapPg: builder.query({
            query: () => ({
                url: "/getmapofpg",
                method: "GET",
            }),
            providesTags: ["Pg"],
        }),
        getPgById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
            }),
            providesTags: ["Pg"],
        }),
        appliedAllFiltered: builder.mutation({
            query: (formData) => ({
                url: `appliedallfilter`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Pg"], // ✅ triggers refetch of queries with tag
        }),
        getAllFiltered: builder.query({
            query: (cityFromQuery) => ({
                url: `filtered/${cityFromQuery}`,
            }),
            providesTags: ["Pg"],
        }),
    }),
});

export const {
    useGetMapPgQuery,
    useAppliedAllFilteredMutation,
    useGetAllFilteredQuery,
    useGetAllListedPgQuery,
    useGetPgByIdQuery,
} = PgApi;

export default PgApi;
