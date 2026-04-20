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
  },
  build: {
    outDir: 'dist',
  },
};
