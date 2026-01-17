import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const USER_API = "https://admin-backend-pgmega.onrender.com/api/";

const USER_API = "https://roomgi-backend-project-1.onrender.com/api/";



const AnalysisApi = createApi({
  reducerPath: "analysisapi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    getPropertyPerformance: builder.query({
      query: () => ({
        url: `propertyperformance`,
        method: 'GET',
      }),
    }),

    getPaymentStatusDistribution: builder.query({
      query: () => ({
        url: `paymentstatusdistribution`,
        method: 'GET',
      }),
    }),

    getTenantActivitySummary: builder.query({
      query: () => ({
        url: `tenantactivitysummary`,
        method: 'GET',
      }),
    }),

    getPropertyComparison: builder.query({
      query: () => ({
        url: `propertycomparison`, 
        method: 'GET',
      }),
    }),

    getOccupancyRateTrend: builder.query({
      query: () => ({
        url: `occupancyratetrend`,
        method: 'GET',
      }),
    }),

    getTenantActivity: builder.query({
      query: () => ({
        url: `tenantactivity`,
        method: 'GET',
      }),
    }),
    getOccupancySummary: builder.query({
      query: () => ({
        url: `insights`,
        method: 'GET',
      }),
    }),

    getPaymentReport: builder.query({
      query: () => ({
        url: `paymentreport`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetOccupancySummaryQuery,
  useGetPropertyPerformanceQuery,
  useGetPaymentStatusDistributionQuery,
  useGetTenantActivitySummaryQuery,
  useGetPropertyComparisonQuery,
  useGetOccupancyRateTrendQuery,
  useGetTenantActivityQuery,
  useGetPaymentReportQuery,
} = AnalysisApi;

export default AnalysisApi;
