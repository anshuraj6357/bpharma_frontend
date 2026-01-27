import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user_review = createApi({
    reducerPath: "user_review",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://roomgi-backend-project-2.onrender.com/api/review/user`,
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

export const { useCreateReviewMutation } = user_review;
export default user_review;
