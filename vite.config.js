import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'http://51.44.183.204', // Your original HTTP endpoint
        changeOrigin: true,  // Modify the origin of the host header to the target
        secure: false,       // Allows insecure requests from the API
      },
    },
  },
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
