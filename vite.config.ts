import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function cmsDevApiPlugin(): Plugin {
  return {
    name: 'cms-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const filePath = path.resolve(__dirname, 'public/api/content.json');

        // GET /api/get-content or /api/get-content.php
        if (req.method === 'GET' && (req.url === '/api/get-content' || req.url === '/api/get-content.php')) {
          res.setHeader('Content-Type', 'application/json');
          if (fs.existsSync(filePath)) {
            const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            res.end(JSON.stringify({ status: 'success', data: raw.content || raw, updatedAt: raw.updatedAt }));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ status: 'error', message: 'File not found' }));
          }
          return;
        }

        // POST /api/save-content or /api/save-content.php
        if (req.method === 'POST' && (req.url === '/api/save-content' || req.url === '/api/save-content.php')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const current = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
              const storedPassword = current.passwordHash || 'beautytrap2026';

              if (data.password !== storedPassword) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'error', message: 'Invalid Admin Password' }));
                return;
              }

              const newPassword = data.newPassword ? data.newPassword.trim() : storedPassword;
              const payload = {
                passwordHash: newPassword,
                updatedAt: new Date().toISOString(),
                content: data.content
              };

              fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'success', message: 'Content saved live to server database!', updatedAt: payload.updatedAt }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'error', message: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cmsDevApiPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true
  }
});
