import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves project sites from /<repo-name>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
});
