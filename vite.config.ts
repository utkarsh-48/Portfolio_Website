import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Set base path for GitHub Pages (if needed)
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  build: {
    // Simplified build configuration
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
      },
    },
    // Source maps only in development
    sourcemap: mode === "development",
  },
  // Disable source maps in production
  define: {
    __DEV__: mode === "development",
  },
}));
