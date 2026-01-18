import { configureStore } from "@reduxjs/toolkit";
import authReducer, { hydrateUser } from "../Bothfeatures/features/authSlice";
import authApi from "../features/api/authapi.js";
import purchaseApi from "../features/api/purchaseapi.js";
import propertyApi from "../features/api/propertyapi.js";
import TenantApi from "../features/api/tenant.js";
import AnalysisApi from "../features/api/analysisapi.js";
import staffApi from "../features/api/staffapi.js";
import ComplainApi from "../features/api/complainapi.js";
import paymentApi from "../features/api/paymentapi.js";
import tenantReducer from "@/features/notpaidtenantslice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantReducer, // ✅ now works fine
    [authApi.reducerPath]: authApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [TenantApi.reducerPath]: TenantApi.reducer,
    [AnalysisApi.reducerPath]: AnalysisApi.reducer,
    [ComplainApi.reducerPath]: ComplainApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      purchaseApi.middleware,
      propertyApi.middleware,
      TenantApi.middleware,
      AnalysisApi.middleware,
      ComplainApi.middleware,
      staffApi.middleware,
      paymentApi.middleware
    ),
});

// ✅ Initialize user from localStorage
const initializeUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return { user: null, isAuthenticated: false };

  try {
    const parsedUser = JSON.parse(storedUser);
    const isValidUser = parsedUser && Object.keys(parsedUser).length > 0;
    return {
      user: isValidUser ? parsedUser : null,
      isAuthenticated: isValidUser,
    };
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return { user: null, isAuthenticated: false };
  }
};

const initialUserState = initializeUser();
appStore.dispatch(hydrateUser(initialUserState));
