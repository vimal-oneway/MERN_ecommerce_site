import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  logLevel:"error",
  mode:'production',
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure:true
      }
    }
  }
})
 