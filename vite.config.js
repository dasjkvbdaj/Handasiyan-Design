import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function static3DPlugin() {
  return {
    name: 'serve-3d-gallery',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/3d') {
          res.writeHead(301, { Location: '/3d/' });
          return res.end();
        }
        if (url === '/3d/') {
          req.url = req.url.replace('/3d/', '/3d/index.html');
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/3d') {
          res.writeHead(301, { Location: '/3d/' });
          return res.end();
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), static3DPlugin()],
  define: {
    // Frozen at build time — every Vercel deployment gets a fresh value,
    // which busts Cloudinary CDN cache without any manual work.
    __BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString()),
  },
})