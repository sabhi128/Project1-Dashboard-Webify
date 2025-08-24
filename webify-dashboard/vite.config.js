import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD
=======

>>>>>>> upstream/main

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [
    react(),
    tailwindcss(),
  ],
=======
  plugins: [tailwindcss(),
react()],
>>>>>>> upstream/main
})
