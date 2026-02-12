import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'static',

  build: {
    outDir: 'static/js',
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'ChaoticApp',
      fileName: () => 'app.bundle.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:24267',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:24267',
        ws: true,
      },
    },
  },
});
