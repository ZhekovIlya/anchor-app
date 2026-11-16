import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

export default {
  plugins: [tailwindcss()],
  define: {
    __GIT_REVISION__: JSON.stringify(commitHash),
  },
  server: {
    port: 3000,
    open: true,
    // /api/* is served by scripts/dev-api.js (npm run dev:api)
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
  build: {
    outDir: 'dist',
  },
};
