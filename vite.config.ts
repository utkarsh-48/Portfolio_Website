import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import JavaScriptObfuscator from "javascript-obfuscator";

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
    // Enhanced minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Only drop console in production
        drop_debugger: true, // Removes debugger statements
        pure_funcs:
          mode === "production"
            ? ["console.log", "console.info", "console.debug", "console.warn"]
            : [],
      },
      mangle: {
        // Mangle variable names
        toplevel: true,
      },
    },
    // Split chunks for better caching but harder to reverse engineer
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-ui";
            }
            return "vendor";
          }
        },
        // Apply obfuscation to chunks only in production
        plugins:
          mode === "production"
            ? [
                {
                  name: "obfuscator",
                  generateBundle(options, bundle) {
                    Object.keys(bundle).forEach((fileName) => {
                      if (fileName.endsWith(".js")) {
                        const asset = bundle[fileName];
                        if (asset.type === "chunk" && asset.code) {
                          asset.code = JavaScriptObfuscator.obfuscate(
                            asset.code,
                            {
                              compact: true,
                              controlFlowFlattening: true,
                              controlFlowFlatteningThreshold: 0.75,
                              deadCodeInjection: true,
                              deadCodeInjectionThreshold: 0.4,
                              debugProtection: false,
                              debugProtectionInterval: 0,
                              disableConsoleOutput: true,
                              identifierNamesGenerator: "hexadecimal",
                              log: false,
                              numbersToExpressions: true,
                              renameGlobals: false,
                              selfDefending: true,
                              simplify: true,
                              splitStrings: true,
                              splitStringsChunkLength: 10,
                              stringArray: true,
                              stringArrayEncoding: ["base64"],
                              stringArrayThreshold: 0.75,
                              transformObjectKeys: true,
                              unicodeEscapeSequence: false,
                            }
                          ).getObfuscatedCode();
                        }
                      }
                    });
                  },
                },
              ]
            : [],
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
