// @ts-check
import { defineConfig } from "astro/config";

import tailwincss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwincss()],
  },
  integrations: [react()],
});
