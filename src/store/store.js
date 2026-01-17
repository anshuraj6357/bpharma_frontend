import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer, { hydrateUser } from "../Bothfeatures/features/authSlice";
import wishlistReducer from "../Bothfeatures/features/wishlist";
import tenantReducer from "../Bothfeatures/notpaidtenantslice";

// RTK QUERY APIs
import { PgApi } from "../Bothfeatures/features/api/allpg";
import authApi from "../Bothfeatures/features/api/authapi";
import paymentApi from "../Bothfeatures/adminfeatures/api/paymentapi";
import reviewApi from "../Bothfeatures/adminfeatures/api/reviewapi";
import propertyApi from "../Bothfeatures/adminfeatures/api/propertyapi";
import TenantApi from "../Bothfeatures/adminfeatures/api/tenant";
import AnalysisApi from "../Bothfeatures/adminfeatures/api/analysisapi";
import staffApi from "../Bothfeatures/adminfeatures/api/staffapi";
import ComplainApi from "../Bothfeatures/adminfeatures/api/complainapi";

// -------------------------------
// COMBINED REDUCER
// -------------------------------
const appReducer = combineReducers({
  auth: authReducer,
  tenants: tenantReducer,
  wishlist: wishlistReducer,

  [PgApi.reducerPath]: PgApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [propertyApi.reducerPath]: propertyApi.reducer,
  [TenantApi.reducerPath]: TenantApi.reducer,
  [AnalysisApi.reducerPath]: AnalysisApi.reducer,
  [ComplainApi.reducerPath]: ComplainApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
});

// -------------------------------
// ROOT REDUCER (LOGOUT = FULL RESET)
// -------------------------------
const rootReducer = (state, action) => {
  if (action.type === "auth/userLoggedout") {
    state = undefined; // 🔥 clears redux completely
  }
  return appReducer(state, action);
};

// -------------------------------
// STORE
// -------------------------------
export const appStore = configureStore({
  reducer: rootReducer,
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
    if (!storedUser) return { user: null, isAuthenticated: false };

    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser) return { user: null, isAuthenticated: false };

    return { user: parsedUser, isAuthenticated: true };
  } catch (err) {
    console.error("User hydrate error:", err);
    return { user: null, isAuthenticated: false };
  }
};

appStore.dispatch(hydrateUser(initializeUser()));
