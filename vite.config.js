import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      // 🔹 Localhost testing ke liye
      devOptions: {
        enabled: true,
      },

      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "Roomgi – Find PGs & Rooms",
        short_name: "Roomgi",
        description:
          "Book verified PGs, rooms, flats & rentals instantly",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#16a34a",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  // 🔹 Alias config (THIS WAS BREAKING BEFORE)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
