import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/festival-api": {
        target: "https://api.edinburghfestivalcity.com",
        changeOrigin: true,
        rewrite: (path) => {
          const rewritten = path.replace(/^\/festival-api/, "");
          console.log("proxying:", rewritten);
          return rewritten;
        },
      },
    },
  },
});
