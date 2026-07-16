import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/CRM_V2.29/" : "/",
  plugins: [vue()],
});
