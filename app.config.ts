import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  tsr: {
    appDirectory: "./src",
  },
  server: {
    preset: "vercel",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
