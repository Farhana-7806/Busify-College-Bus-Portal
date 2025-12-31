
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // Bridges your custom secret name to the standard name used in the services.
    // This allows the build process to safely inject the key.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY_BUSIFY || "")
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});

