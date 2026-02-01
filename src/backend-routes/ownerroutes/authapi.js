import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedin, userLoggedout } from "../slice/authSlice";

// ✅ Use ENV for production
const USER_API = import.meta.env.VITE_API_BASE_URL + "/api/v1/user";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",

    // ✅ Prevent browser + CDN caching
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["User"],

  // ✅ Production cache behavior
  keepUnusedDataFor: 0, // ⛔ No stale cache
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    // 🔐 REGISTER
    registerUser: builder.mutation({
      query: (formdata) => ({
        url: "register",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["User"],
    }),

    // 🔑 LOGIN
    loginUser: builder.mutation({
      query: (formdata) => ({
        url: "login",
        method: "POST",
        body: formdata,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedin({ user: data.existingUser }));
          localStorage.setItem("user", JSON.stringify(data.existingUser));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    // 🚪 LOGOUT
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedout());
          localStorage.removeItem("user");

          // ✅ Clear ALL RTK Query cache
          dispatch(authApi.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    // 👤 LOAD USER (CRITICAL)
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedin({ user: data.profile }));
        } catch {
          dispatch(userLoggedout());
        }
      },
      providesTags: ["User"],
    }),

    // ✏ UPDATE PROFILE
    updateUser: builder.mutation({
      query: (formdata) => ({
        url: "profile/update",
        method: "PUT",
        body: formdata,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedin({ user: data.user }));
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch (err) {
          console.error("Update failed:", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    // 🔐 FORGOT PASSWORD
    forgotUser: builder.mutation({
      query: (email) => ({
        url: "forgotpassword",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ password, confermpassword, resettoken }) => ({
        url: `forgotpassword/${resettoken}`,
        method: "POST",
        body: { password, confermpassword },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useForgotUserMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
