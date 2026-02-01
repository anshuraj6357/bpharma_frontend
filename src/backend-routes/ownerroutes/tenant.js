import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ ENV BASE URL (NO trailing slash)
const OWNER_TENANT_API =
  import.meta.env.VITE_API_BASE_URL + "/v1/tenant/owner";

export const owner_tenant = createApi({
  reducerPath: "owner_tenant",

  baseQuery: fetchBaseQuery({
    baseUrl: OWNER_TENANT_API,
    credentials: "include",

    // ✅ Prevent browser / CDN cache
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Pragma", "no-cache");
      return headers;
    },
  }),

  tagTypes: ["Tenant"],

  // ✅ PRODUCTION CACHE RULES
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({

    /* ===================== TENANT CRUD ===================== */

    addTenant: builder.mutation({
      query: (formdata) => ({
        url: "create",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Tenant"],
    }),

    updateTenant: builder.mutation({
      query: ({ id, formdata }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: formdata,
      }),
      invalidatesTags: ["Tenant"],
    }),

    changeStatus: builder.mutation({
      query: (id) => ({
        url: `markinctive/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Tenant"],
    }),

    onlinepaidtenant: builder.mutation({
      query: (data) => ({
        url: "onlineadddtenant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tenant"],
    }),

    /* ===================== TENANT QUERIES ===================== */

    getAllTenant: builder.query({
      query: () => ({
        url: "GetTenantsByBranch",
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

    getallactivetenant: builder.query({
      query: (branchId) => ({
        url: `activetenant/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

    getTenantById: builder.query({
      query: (id) => ({
        url: `GetTenantByid/${id}`,
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

    getStatus: builder.query({
      query: (status) => ({
        url: `allstatus/${status}`,
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

    getbooking: builder.query({
      query: () => ({
        url: "bookings",
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

    getpayrenttenantdashboard: builder.query({
      query: (id) => ({
        url: `getdashboard/${id}`,
        method: "GET",
      }),
      providesTags: ["Tenant"],
    }),

  }),
});

export const {
  useAddTenantMutation,
  useUpdateTenantMutation,
  useChangeStatusMutation,
  useOnlinepaidtenantMutation,

  useGetAllTenantQuery,
  useGetallactivetenantQuery,
  useGetTenantByIdQuery,
  useGetStatusQuery,
  useGetbookingQuery,
  useGetpayrenttenantdashboardQuery,
} = owner_tenant;

export default owner_tenant;
