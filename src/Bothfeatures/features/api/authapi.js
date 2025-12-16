import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedin, userLoggedout } from "../../features/authSlice";

// Backend URL
const USER_API = "https://roomgi-backend-project-2.onrender.com/api/v1/user/";

/* -------------------- BASE QUERY -------------------- */
const baseQuery = fetchBaseQuery({
  baseUrl: USER_API,
  credentials: "include",
});

/* -------------------- BASE QUERY WITH 401 HANDLING -------------------- */
const baseQueryWithLogout = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // 🔴 If token expired / not found
  if (result?.error?.status === 401) {
    console.warn("⚠️ Token expired or not found. Logging out...");

    // Clear Redux state
    api.dispatch(userLoggedout());

    // Clear RTK Query cache
    api.dispatch(authApi.util.resetApiState());

    // Clear localStorage
    localStorage.removeItem("user");
  }

  return result;
};

/* -------------------- API -------------------- */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["User", "Wishlist"],
  endpoints: (builder) => ({

    /* ---------- AUTH ---------- */
    registerUser: builder.mutation({
      query: (formdata) => ({
        url: "register",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["User"],
    }),

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
          console.error("Login failed", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedout());
          dispatch(authApi.util.resetApiState());
          localStorage.removeItem("user");
        } catch (err) {
          console.error("Logout error", err);
        }
      },
      invalidatesTags: ["User", "Wishlist"],
    }),

    /* ---------- USER ---------- */
    profile: builder.query({
      query: () => "profile",
      providesTags: ["User"],
    }),

    loadUser: builder.query({
      query: () => "profile",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.profile) {
            dispatch(userLoggedin({ user: data.profile }));
          }
        } catch {
          dispatch(userLoggedout());
        }
      },
      providesTags: ["User"],
    }),

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
          console.error("Update user failed", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    /* ---------- WISHLIST ---------- */
    toggleWishlist: builder.mutation({
      query: ({ pgId, branchId }) => ({
        url: "wishlist/toggle",
        method: "POST",
        body: { pgId, branchId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getWishlist: builder.query({
      query: () => "wishlist/my",
      providesTags: ["Wishlist"],
    }),

    /* ---------- PASSWORD ---------- */
    ForgotUser: builder.mutation({
      query: (email) => ({
        url: "forgotpassword",
        method: "POST",
        body: email,
      }),
    }),

    ForgotUserpassword: builder.mutation({
      query: ({ password, confermpassword, resettoken }) => ({
        url: `forgotpassword/${resettoken}`,
        method: "POST",
        body: { password, confermpassword },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

/* -------------------- EXPORT HOOKS -------------------- */
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useProfileQuery,
  useLoadUserQuery,
  useUpdateUserMutation,
  useToggleWishlistMutation,
  useGetWishlistQuery,
  useForgotUserMutation,
  useForgotUserpasswordMutation,
  useGetAllFilteredQuery,
} = authApi;

export default authApi;
