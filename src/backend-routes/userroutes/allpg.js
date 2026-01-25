import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_PgApi = createApi({
    reducerPath: "user_PgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL}/property/user`,
        credentials: "include",
    }),
    tagTypes: ["Pg"], // ✅ Added tag for versioning
    endpoints: (builder) => ({
        getAllListedPg: builder.query({
            query: () => ({
                url: `/allpg`,
                method: "GET",
            }),
            providesTags: ["Pg"], 
        }),
        getservicesarea: builder.query({
            query: () => ({
                url: `/services-cities`,
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
    useGetservicesareaQuery,
    useGetAllListedPgQuery,
    useGetPgByIdQuery,
} = user_PgApi;

export default user_PgApi;