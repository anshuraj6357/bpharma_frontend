import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_PgApi = createApi({
    reducerPath: "user_PgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/property/user",
        credentials: "include",
    }),
    tagTypes: ["Pg"], // ✅ Added tag for versioning
    endpoints: (builder) => ({
    getAllListedPg: builder.query({
  query: ({ cursor = null, limit = 12 }) => ({
    url: "/allpg",
    method: "GET",
    params: {
      cursor,
      limit,
    },
  }),
  providesTags: (result) =>
    result?.data
      ? [
          ...result.data.map((pg) => ({ type: "Pg", id: pg._id })),
          { type: "Pg", id: "PARTIAL-LIST" },
        ]
      : [{ type: "Pg", id: "PARTIAL-LIST" }],
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
