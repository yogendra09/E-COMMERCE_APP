import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      proxy: {
        '/api': {
          target: 'https://e-commerce-app-ewel.onrender.com',
          changeOrigin: true,
          secure: false, // Use this if the backend server uses self-signed SSL certificates
        },
    },
  },
})
