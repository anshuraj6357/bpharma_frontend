import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./store/store";
import "./index.css";

/* 🔔 Toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 📦 PWA Service Worker */
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("🔄 New update available");
  },
  onOfflineReady() {
    console.log("📦 App ready to work offline");
  },
});

ReactDOM.createRoot(document.getElementById
  ("root")).render(
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
