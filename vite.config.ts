import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  server: {
    port: 5180,
    strictPort: true,
    host: true,
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        articles: path.resolve(__dirname, 'articles.html'),
        article: path.resolve(__dirname, 'article.html')
      }
    }
  },
  plugins: [
    {
      name: 'copy-static-assets-to-dist',
      closeBundle() {
        const framesSrc = path.resolve(__dirname, 'Me');
        const framesDest = path.resolve(__dirname, 'dist', 'frames');
        if (fs.existsSync(framesSrc)) {
          console.log('[build] Copying frames from Me to dist/frames for deployment...');
          if (!fs.existsSync(framesDest)) {
            fs.mkdirSync(framesDest, { recursive: true });
          }
          fs.cpSync(framesSrc, framesDest, { recursive: true });
          console.log('[build] Successfully populated dist/frames.');
        }

        const assetsSrc = path.resolve(__dirname, 'assets');
        const assetsDest = path.resolve(__dirname, 'dist', 'assets');
        if (fs.existsSync(assetsSrc)) {
          console.log('[build] Copying assets directory to dist/assets for deployment...');
          if (!fs.existsSync(assetsDest)) {
            fs.mkdirSync(assetsDest, { recursive: true });
          }
          fs.cpSync(assetsSrc, assetsDest, { recursive: true });
          console.log('[build] Successfully populated dist/assets.');
        }
      }
    },
    {
      name: 'serve-me-frames',
      configureServer(server) {
        server.middlewares.use('/frames', (req, res, next) => {
          // Remove leading slash and decode
          const rawUrl = (req.url || '').split('?')[0].replace(/^\//, '');
          const frameName = decodeURIComponent(rawUrl);
          const filePath = path.join(process.cwd(), 'Me', frameName);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use('/frames', (req, res, next) => {
          const rawUrl = (req.url || '').split('?')[0].replace(/^\//, '');
          const frameName = decodeURIComponent(rawUrl);
          const filePath = path.join(process.cwd(), 'Me', frameName);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ]
});
