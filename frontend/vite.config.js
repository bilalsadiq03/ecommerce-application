import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:8080', 
=======
        target: 'https://ecommerce-backend-xsmz.onrender.com', 
>>>>>>> adb9fa60f5ec115ba9c1890b1d0549ff0b61dc75
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },      
    },
  }
})

