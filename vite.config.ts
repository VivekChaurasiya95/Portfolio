import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    // Work around malformed source map in three-stdlib package during Vite dep optimization.
    exclude: ["three-stdlib"],
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 100 },
      jpeg: { quality: 100 },
      jpg: { quality: 100 },
      webp: { lossless: true },
      avif: { lossless: true },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
