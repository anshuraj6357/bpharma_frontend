import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ ENV BASE URL
const OWNER_PAYMENT_API =
  import.meta.env.VITE_API_BASE_URL + "/api/payment/owner";

export const owner_payment = createApi({
  reducerPath: "owner_payment",

  baseQuery: fetchBaseQuery({
    baseUrl: OWNER_PAYMENT_API,
    credentials: "include",

    // ✅ Prevent browser / CDN caching
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  // ✅ Declare ALL tags
  tagTypes: ["Payment", "Expense"],

  // ✅ Production cache rules
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ===================== PAYMENTS ===================== */

    getAllPayments: builder.query({
      query: () => ({
        url: "/allpayment",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),

    createPayment: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),

    /* ===================== EXPENSE ===================== */

    createExpense: builder.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense", "Payment"],
    }),

    getAllExpense: builder.query({
      query: () => ({
        url: "/expense",
        method: "GET",
      }),
      providesTags: ["Expense"],
    }),

    /* ===================== REVENUE ===================== */

    getRevenueDetails: builder.query({
      query: (params = {}) => ({
        url: "/getdetails",
        method: "GET",
        params,
      }),
      providesTags: ["Payment"],
    }),

  }),
});

export const {
  useGetAllPaymentsQuery,
  useCreatePaymentMutation,
  useCreateExpenseMutation,
  useGetAllExpenseQuery,
  useGetRevenueDetailsQuery,
} = owner_payment;

export default owner_payment;
