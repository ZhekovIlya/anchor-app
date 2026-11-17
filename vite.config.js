import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';

// Outside a git checkout (e.g. a source tarball) fall back to Vercel's SHA, then 'dev'.
function getRevision() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || 'dev';
  } catch {
    return (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7) || 'dev';
  }
}

const commitHash = getRevision();

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
