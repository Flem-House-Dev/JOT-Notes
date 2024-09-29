import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    {
      name: "log-resolve",
      resolveId(source, importer) {
        console.log(`Resolving: ${source} from ${importer}`);
        console.log(`Resolving: ${source} from ${importer}`);
        if (source.includes("NoteForm")) {
          console.log(
            `NoteForm resolution: ${path.resolve(
              __dirname,
              "src/components/NoteForm.jsx"
            )}`
          );
          console.log(
            `File exists: ${fs.existsSync(
              path.resolve(__dirname, "src/components/NoteForm.jsx")
            )}`
          );
        }
      },
    },
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
