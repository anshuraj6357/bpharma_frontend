import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_API_BASE_URL}/payment/user`;

export const user_payment = createApi({
  reducerPath: "user_payment",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  tagTypes: ["Payment"], // ✅ Add tag for versioning
  endpoints: (builder) => ({
   
 

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

  //Dashboard
  //bookingconfirmation

  }),
});

export const {
 
  useRazorpayPaymentMutation,
  useRazorpayPaymentVerifyMutation,
  
  useRazorpayrentPaymentVerifyMutation
} = user_payment;

export default user_payment;
