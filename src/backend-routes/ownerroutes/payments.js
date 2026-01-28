import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const USER_API = "https://roomgi-backend-project-2.onrender.com/api/payment/owner";
const USER_API = `https://roomgi-backend-project-2.onrender.com/api/payment/owner`;




export const owner_payment = createApi({
  reducerPath: "owner_payment",
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
  

      getAllExpense: builder.query({
      query: () => "/expense",
      providesTags: ["Expense"],
    }),

  }),
});

export const {
  useGetAllPaymentsQuery,
  
  useCreatePaymentMutation,
  useCreateExpenseMutation,
  useGetRevenueDetailsQuery,
  useGetAllExpenseQuery,

} = owner_payment;

export default owner_payment;
