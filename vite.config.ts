import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // نضمن أن process.env متاح في المتصفح لتجنب أخطاء undefined
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    },
    'global': 'window',
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
});