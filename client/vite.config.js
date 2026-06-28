import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'dns': false, // Prevents Vite from trying to bundle it
    },
  },
  define: {
    global: 'window',
  },
});