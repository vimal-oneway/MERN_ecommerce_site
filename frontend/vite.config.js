import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  logLevel:"error",
  mode:'production',
  server:{
    proxy: {
      '/api': {
        target: 'https://letscode-f938.onrender.com:8080',
        changeOrigin: true,
      }
    }
  }
})
 