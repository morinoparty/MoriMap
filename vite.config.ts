import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/tiles": {
        target: "https://seikatsumain.map.morino.party",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
