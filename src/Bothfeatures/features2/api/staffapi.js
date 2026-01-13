import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffApi = createApi({
    reducerPath: "staffApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/staff", // adjust if needed
        credentials: "include",
    }),
    tagTypes: ["Staff"],
    endpoints: (builder) => ({
        // ✅ Add new staff
        addStaff: builder.mutation({
            query: (formData) => ({
                url: "/",
                method: "POST",
                body: formData,
            }),
        }),


        getAllStaff: builder.query({
            query: () => ({
                url: "/get",
                method: "GET",
            }),
        }),

        getStaffById: builder.query({
            query: (id) => ({
                url: `get/${id}`
            }),
        }),




        updateStaff: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),

        // ✅ Delete staff
        deleteStaff: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetStaffByIdQuery,
    useAddStaffMutation,
    useGetAllStaffQuery,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
} = staffApi;

export default staffApi;

