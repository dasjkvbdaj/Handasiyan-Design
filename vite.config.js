import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Frozen at build time — every Vercel deployment gets a fresh value,
    // which busts Cloudinary CDN cache without any manual work.
    __BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString()),
  },
})