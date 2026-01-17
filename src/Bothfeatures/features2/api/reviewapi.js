import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://roomgi-backend-project-1.onrender.com/api/review",
        credentials: "include", // optional, remove if not needed
    }),
    tagTypes: ["Review"],
    endpoints: (builder) => ({
        // ✅ Create a new review
        createReview: builder.mutation({
            query: ({ roomId, rating, review }) => ({
                url: "/createreview", // backend endpoint
                method: "POST",
                body: { roomId, rating, review },
            }),
            invalidatesTags: ["Review"], // optional, if you want to refetch reviews
        }),
    }),
});

export const { useCreateReviewMutation } = reviewApi;
export default reviewApi;
