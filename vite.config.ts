import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? process.env.VERCEL_APP_NAME : '/',
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://freetestapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1/books'), // Adjust as needed
      },
    },
  },
});
