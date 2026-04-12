import tailwindcss from '@tailwindcss/vite';

export default {
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
};
