import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg'] // Add @ffmpeg/ffmpeg here

  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imentiv.ai', // The target backend API
        changeOrigin: true,              // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite '/api' prefix
      },
    },
  },
});
