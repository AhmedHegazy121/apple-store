import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    sourcemap: false,

    // Rolldown manual chunking configuration added below:
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              name: "vendor",
              test: /node_modules/,
            },
          ],
        },
      },
    },
  },
});
