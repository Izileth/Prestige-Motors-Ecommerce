import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ['react-helmet-async']
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    commonjsOptions: {
      include: [/react-helmet-async/, /node_modules/]
    }
  }
});
