import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SorokitUI",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      formats: ["es", "cjs"],
      cssFileName: "styles",
    },
    rollupOptions: {
      // Never bundle these — the consuming app supplies them.
      external: ["react", "react-dom", "@sorokit/core"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) =>
          assetInfo.name === "style.css" ? "styles.css" : "assets/[name]-[hash][extname]",
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
