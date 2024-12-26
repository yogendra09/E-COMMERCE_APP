import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
     alias:{
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
     }
    },
  server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce-app-ewel.onrender.com',
        changeOrigin: true,
        secure: false, // Use this if the backend server uses self-signed SSL certificates
      }, // <-- Ensure this bracket is present
    },
  },
})
