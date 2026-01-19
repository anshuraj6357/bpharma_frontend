import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_PgApi = createApi({
    reducerPath: "user_PgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://roomgi-backend-project-2.onrender.com/api/property/user",
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
    }),
});

export const {
    useGetMapPgQuery,
    useGetAllListedPgQuery,
    useGetPgByIdQuery,
} = user_PgApi;

export default user_PgApi;
