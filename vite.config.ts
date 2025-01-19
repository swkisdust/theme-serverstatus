import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "^/api/v1/ws/.*": {
        target: "ws://localhost:8008",
        changeOrigin: true,
        ws: true,
      },
      "/api": {
        target: "http://localhost:8008",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
