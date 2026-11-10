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
    },
    rollupOptions: {
      // Never bundle these — the consuming app supplies them.
      external: ["react", "react-dom", "@sorokit/core"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // package.json exports "./styles.css" -> dist/styles.css, but Vite's
        // library mode names the extracted stylesheet "style.css" by default.
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css") ? "styles.css" : "assets/[name][extname]",
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
