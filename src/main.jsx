import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./store/store";
import "./index.css";

/* =========================
   🔹 RTK QUERY APIs
========================= */
import  authApi  from "./backend-routes/userroutes/authapi";
import  user_PgApi  from "./backend-routes/userroutes/allpg";

import  owner_branch  from "./backend-routes/ownerroutes/branch";
import  owner_complain  from "./backend-routes/ownerroutes/complaints";
import  owner_payment  from "./backend-routes/ownerroutes/payments";
import  owner_room  from "./backend-routes/ownerroutes/room";
import  owner_tenant  from "./backend-routes/ownerroutes/tenant";

import  user_complaints  from "./backend-routes/userroutes/complaints";
import  user_filter  from "./backend-routes/userroutes/filter";
import  user_payment  from "./backend-routes/userroutes/payment";
import  user_review  from "./backend-routes/userroutes/review";

/* 🔔 Toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================
   🔹 DEPLOY VERSIONING
========================= */
// Har deploy ke liye bas is version ko increment karo
const APP_VERSION = "1.0.7"; 
const storedVersion = localStorage.getItem("app_version");

if (storedVersion !== APP_VERSION) {
  console.log("🚀 New deployment detected. Clearing RTK cache...");

  const { dispatch } = appStore;

  // ✅ RESET ALL RTK QUERY API CACHES
  dispatch(authApi.util.resetApiState());
  dispatch(user_PgApi.util.resetApiState());

  dispatch(owner_branch.util.resetApiState());
  dispatch(owner_complain.util.resetApiState());
  dispatch(owner_payment.util.resetApiState());
  dispatch(owner_room.util.resetApiState());
  dispatch(owner_tenant.util.resetApiState());

  dispatch(user_complaints.util.resetApiState());
  dispatch(user_filter.util.resetApiState());
  dispatch(user_payment.util.resetApiState());
  dispatch(user_review.util.resetApiState());

  // 🔹 Update stored version
  localStorage.setItem("app_version", APP_VERSION);
}

/* =========================
   🔹 RENDER APP
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
