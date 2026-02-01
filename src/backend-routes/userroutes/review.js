import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Use ENV variable for production
const REVIEW_API = import.meta.env.VITE_API_BASE_URL + "/api/v1/review/user";

export const user_review = createApi({
  reducerPath: "user_review",

  baseQuery: fetchBaseQuery({
    baseUrl: REVIEW_API,
    credentials: "include",

    // ✅ Prevent mobile/browser cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Review"],

  // ✅ Production defaults
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /* ---------------- CREATE REVIEW ---------------- */
    createReview: builder.mutation({
      query: ({ roomId, rating, review }) => ({
        url: "createreview",
        method: "POST",
        body: { roomId, rating, review },
      }),
      invalidatesTags: ["Review"], // ✅ invalidate cache after review creation
    }),
  }),
});

export const { useCreateReviewMutation } = user_review;
export default user_review;
