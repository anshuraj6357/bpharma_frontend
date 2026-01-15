import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "https://roomgi-backend-project-1.onrender.com/api/payment";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  tagTypes: ["Payment"], // ✅ Add tag for versioning
  endpoints: (builder) => ({
    // 🔹 1. Get all branch payments
    getAllPayments: builder.query({
      query: () => "/allpayment",
      providesTags: ["Payment"], // ✅ auto refetch if Payment data changes
    }),

    // 🔹 2. Create a new payment
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"], // ✅ invalidate cache after creation
    }),

    // 🔹 3. Create Razorpay order
    razorpayPayment: builder.mutation({
      query: ({amount,receipt}) => ({
        url: "create-order",
        method: "POST",
        body: {amount,receipt},
      }),
    }),

    // 🔹 4. Verify Razorpay payment
    razorpayPaymentVerify: builder.mutation({
      query: (response) => {
        const body = {
          razorpay_order_id: response.razorpay_order_id,
          roomId: response.roomId,
          walletUsed:response.walletUsed,
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

    // 🔹 5. Create a new expense
    createExpense: builder.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"], // ✅ invalidate cache after expense creation
    }),

    // 🔹 6. Get combined revenue details (with optional query params)
    getRevenueDetails: builder.query({
      query: (params) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
        return `/getdetails${queryString}`;
      },
      providesTags: ["Payment"], // ✅ refetch if Payment data changes
    }),
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

      getAllExpense: builder.query({
      query: () => "/expense",
      providesTags: ["Expense"],
    }),

  }),
});

export const {
  useGetAllPaymentsQuery,
  useRazorpayPaymentMutation,
  useRazorpayPaymentVerifyMutation,
  useCreatePaymentMutation,
  useCreateExpenseMutation,
  useGetRevenueDetailsQuery,
  useGetAllExpenseQuery,
  useRazorpayrentPaymentVerifyMutation
} = paymentApi;

export default paymentApi;
