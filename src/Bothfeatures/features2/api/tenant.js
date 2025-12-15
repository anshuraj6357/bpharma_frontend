import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_API = "https://roomgi-backend-project-2.onrender.com/api/tenant/";


const TenantApi = createApi({
    reducerPath: "tenantapi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
    }),
    tagTypes: ["Tenant"],

    endpoints: (builder) => ({

        addTenant: builder.mutation({
            query: (formdata) => ({
                url: `create`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: ["Tenant"],
        }),

        getAllTenant: builder.query({
            query: () => `GetTenantsByBranch`,
            providesTags: ["Tenant"],
        }),

        onlinepaidtenant: builder.mutation({
            query: (data) => ({
                url: `onlineadddtenant`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tenant"],
        }),

        getallactivetenant: builder.query({
            query: (selectedBranch) => `activetenant/${selectedBranch}`,
            providesTags: ["Tenant"],
        }),

        getbooking: builder.query({
            query: () => `bookings`,
            providesTags: ["Tenant"],
        }),

        getAllTenantByBranchId: builder.query({
            query: (id) => `GetTenantsByBranchid/${id}`,
            providesTags: ["Tenant"],
        }),

        getTenantById: builder.query({
            query: (id) => `GetTenantByid/${id}`,
            providesTags: ["Tenant"],
        }),

        updateTenant: builder.mutation({
            query: ({ formdata, id }) => ({
                url: `update/${id}`,
                method: 'PUT',
                body: formdata,
            }),
            invalidatesTags: ["Tenant"],
        }),

        // ✅ FIXED HERE
        changeStatus: builder.mutation({
            query: (id) => ({
                url: `markinctive/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ["Tenant"],
        }),

        getStatus: builder.query({
            query: (status) => `allstatus/${status}`,
            providesTags: ["Tenant"],
        }),
    }),
});

export const {
    useAddTenantMutation,
    useGetbookingQuery,
    useOnlinepaidtenantMutation,
    useGetallactivetenantQuery,
    useGetStatusQuery,
    useGetAllTenantQuery,
    useChangeStatusMutation, // 👈 NOTE
    useGetTenantByIdQuery,
    useUpdateTenantMutation,
    useGetAllTenantByBranchIdQuery
} = TenantApi;

export default TenantApi;
