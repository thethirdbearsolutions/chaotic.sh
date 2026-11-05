import { defineConfig } from 'vite';
import { resolve } from 'path';

// The rich comment editor (CHT-2028) is its own bundle, loaded the first
// time a composer is focused, so pages that never open one don't pay for
// Tiptap. The main config empties nothing, so the two builds share
// static/js.
export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    outDir: 'static/js',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/editor/main.js'),
      name: 'ChaoticEditorBundle',
      fileName: () => 'editor.bundle.js',
      formats: ['iife'],
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
