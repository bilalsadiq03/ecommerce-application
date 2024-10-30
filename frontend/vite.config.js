import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    proxy: {
      '/api': {
        target: 'https://ecommerce-backend-xsmz.onrender.com', 
<<<<<<< HEAD
=======

>>>>>>> 9c28537f3bc5c6af6094e6c3d896024cad8497b7
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/api/, ''),
      },      
    },
  }
})

