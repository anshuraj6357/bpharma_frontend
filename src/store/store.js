import { configureStore } from "@reduxjs/toolkit";
import authReducer, { hydrateUser } from "../Bothfeatures/features/authSlice";
import wishlistReducer, { hydrateWishlist } from "../Bothfeatures/features/wishlist";
import { PgApi } from "../Bothfeatures/features/api/allpg";
import authApi from "../Bothfeatures/features/api/authapi";

import tenantReducer from "../Bothfeatures/notpaidtenantslice";
import paymentApi from "../Bothfeatures/features2/api/paymentapi.js";
import reviewApi from "../Bothfeatures/features2/api/reviewapi";
import propertyApi from "../Bothfeatures/features2/api/propertyapi.js";
import TenantApi from "../Bothfeatures/features2/api/tenant.js";
import AnalysisApi from "../Bothfeatures/features2/api/analysisapi.js";
import staffApi from "../Bothfeatures/features2/api/staffapi.js";
import ComplainApi from "../Bothfeatures/features2/api/complainapi.js";


// -------------------------------
// CONFIGURE STORE
// -------------------------------
export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantReducer,
    wishlist: wishlistReducer,

    [PgApi.reducerPath]: PgApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,

    [propertyApi.reducerPath]: propertyApi.reducer,
    [TenantApi.reducerPath]: TenantApi.reducer,
    [AnalysisApi.reducerPath]: AnalysisApi.reducer,
    [ComplainApi.reducerPath]: ComplainApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PgApi.middleware,
      authApi.middleware,
      paymentApi.middleware,
      reviewApi.middleware,
      propertyApi.middleware,
      TenantApi.middleware,
      AnalysisApi.middleware,
      ComplainApi.middleware,
      staffApi.middleware
    ),
});



// -------------------------------
// HYDRATE USER FROM LOCAL STORAGE
// -------------------------------
const initializeUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return { user: null, isAuthenticated: false };
    }

    const parsedUser = JSON.parse(storedUser);

    if (!parsedUser || typeof parsedUser !== "object") {
      return { user: null, isAuthenticated: false };
    }

    return {
      user: parsedUser,
      isAuthenticated: true,
    };

  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return { user: null, isAuthenticated: false };
  }
};

const initialState = initializeUser();
appStore.dispatch(hydrateUser(initialState));
