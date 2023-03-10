import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  logLevel:"error",
  mode:'production',
  server:{
    proxy: {
      '/api': {
        target: 'https://unrivaled-dragon-e0c58f.netlify.app:8080',
        changeOrigin: true,
      }
    }
  }
})
 