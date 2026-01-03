
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // نستخدم 'global' كبديل لـ process في المتصفح لتجنب أخطاء التعريف
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  base: './', // يضمن عمل الروابط بشكل صحيح سواء على نطاق رئيسي أو فرعي
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    host: true
  }
});
