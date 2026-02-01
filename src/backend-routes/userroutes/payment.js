import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Use ENV for production
const PAYMENT_API = import.meta.env.VITE_API_BASE_URL + "/api/v1/payment/user";

export const user_payment = createApi({
  reducerPath: "user_payment",

  baseQuery: fetchBaseQuery({
    baseUrl: PAYMENT_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Payment"], // Tag for caching / invalidation

  // ✅ Production defaults
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ---------------- RAZORPAY ORDER ---------------- */
    razorpayPayment: builder.mutation({
      query: ({ amount, receipt }) => ({
        url: "create-order",
        method: "POST",
        body: { amount, receipt },
      }),
    }),

    /* ---------------- VERIFY RAZORPAY PAYMENT ---------------- */
    razorpayPaymentVerify: builder.mutation({
      query: (response) => {
        const body = {
          razorpay_order_id: response.razorpay_order_id,
          roomId: response.roomId,
          walletUsed: response.walletUsed,
        };
        if (response.razorpay_payment_id) body.razorpay_payment_id = response.razorpay_payment_id;
        if (response.razorpay_signature) body.razorpay_signature = response.razorpay_signature;
        if (response.amount) body.amount = response.amount;

        return {
          url: "verify-payment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Payment"], // ✅ invalidate cache after verification
    }),

    /* ---------------- VERIFY RAZORPAY RENT PAYMENT ---------------- */
    razorpayrentPaymentVerify: builder.mutation({
      query: (response) => {
        const body = {
          razorpay_order_id: response.razorpay_order_id,
          tenantId: response.tenantId,
        };
        if (response.razorpay_payment_id) body.razorpay_payment_id = response.razorpay_payment_id;
        if (response.razorpay_signature) body.razorpay_signature = response.razorpay_signature;
        if (response.amount) body.amount = response.amount;

        return {
          url: "verify-Rent-payment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Payment"], // ✅ invalidate cache after verification
    }),

  }),
});

export const {
  useRazorpayPaymentMutation,
  useRazorpayPaymentVerifyMutation,
  useRazorpayrentPaymentVerifyMutation,
} = user_payment;

export default user_payment;
