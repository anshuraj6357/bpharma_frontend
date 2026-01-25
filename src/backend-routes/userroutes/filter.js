import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_filter = createApi({
    reducerPath: "user_filter",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/filter/user",
        credentials: "include",
    }),
    tagTypes: ["Pg"], // ✅ Added tag for versioning
    endpoints: (builder) => ({
     
       
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
  
    useAppliedAllFilteredMutation,
    useGetAllFilteredQuery,
} = user_filter;

export default user_filter;
