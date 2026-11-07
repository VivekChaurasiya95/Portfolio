import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": "default-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' https: http: 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' https: http: 'unsafe-inline'; font-src 'self' https: http: data:; img-src 'self' https: http: data: blob:; connect-src 'self' https: http: wss: ws: blob: data:; worker-src 'self' blob:; frame-src 'self' https:;",
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
      png: { quality: 85 },
      jpeg: { quality: 82, mozjpeg: true },
      jpg: { quality: 82, mozjpeg: true },
      webp: { lossless: true },
      avif: { lossless: true },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          framer: ["framer-motion"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          spline: ["@splinetool/react-spline", "@splinetool/runtime"],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
}));
