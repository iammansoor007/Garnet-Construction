// vite.config.ts
import { defineConfig } from "file:///C:/Users/ggg/Desktop/GarnetConstrcution/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ggg/Desktop/GarnetConstrcution/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/ggg/Desktop/GarnetConstrcution/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\ggg\\Desktop\\GarnetConstrcution";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  assetsInclude: ["**/*.jfif"],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — large libraries split out for better caching
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-router": ["react-router-dom"],
          "vendor-query": ["@tanstack/react-query"]
        }
      }
    },
    // Increase warning threshold slightly (we have large assets)
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "gsap",
      "react-router-dom",
      "@tanstack/react-query"
    ]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZ2dcXFxcRGVza3RvcFxcXFxHYXJuZXRDb25zdHJjdXRpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdnZ1xcXFxEZXNrdG9wXFxcXEdhcm5ldENvbnN0cmN1dGlvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2dnL0Rlc2t0b3AvR2FybmV0Q29uc3RyY3V0aW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCldLmZpbHRlcihCb29sZWFuKSxcbiAgYXNzZXRzSW5jbHVkZTogW1wiKiovKi5qZmlmXCJdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzIFx1MjAxNCBsYXJnZSBsaWJyYXJpZXMgc3BsaXQgb3V0IGZvciBiZXR0ZXIgY2FjaGluZ1xuICAgICAgICAgIFwidmVuZG9yLXJlYWN0XCI6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICAgIFwidmVuZG9yLW1vdGlvblwiOiBbXCJmcmFtZXItbW90aW9uXCJdLFxuICAgICAgICAgIFwidmVuZG9yLWdzYXBcIjogW1wiZ3NhcFwiXSxcbiAgICAgICAgICBcInZlbmRvci1yb3V0ZXJcIjogW1wicmVhY3Qtcm91dGVyLWRvbVwiXSxcbiAgICAgICAgICBcInZlbmRvci1xdWVyeVwiOiBbXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gSW5jcmVhc2Ugd2FybmluZyB0aHJlc2hvbGQgc2xpZ2h0bHkgKHdlIGhhdmUgbGFyZ2UgYXNzZXRzKVxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNjAwLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICBcInJlYWN0XCIsXG4gICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgXCJmcmFtZXItbW90aW9uXCIsXG4gICAgICBcImdzYXBcIixcbiAgICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiLFxuICAgICAgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIixcbiAgICBdLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVCxTQUFTLG9CQUFvQjtBQUM5VSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsaUJBQWlCLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDOUUsZUFBZSxDQUFDLFdBQVc7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLGlCQUFpQixDQUFDLGVBQWU7QUFBQSxVQUNqQyxlQUFlLENBQUMsTUFBTTtBQUFBLFVBQ3RCLGlCQUFpQixDQUFDLGtCQUFrQjtBQUFBLFVBQ3BDLGdCQUFnQixDQUFDLHVCQUF1QjtBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
