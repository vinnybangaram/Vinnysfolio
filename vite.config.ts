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
