import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx, { Framework } from "./plugins/vite-mdx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({ framework: Framework.React }),
    react({
      include: /\.(mdx|jsx|tsx)/,
    }),
  ],
  resolve: {
    alias: {
      "@src": "./src",
    },
  },
});
