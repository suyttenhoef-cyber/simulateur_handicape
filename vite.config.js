import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/simulateur_handicape/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});