import { defineConfig } from "@tanstack/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  tsr: {
    appDirectory: "./src",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
