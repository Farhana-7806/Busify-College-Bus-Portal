import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // Bridges your custom secret name to the standard name used in the services
    // This allows the code to use process.env.API_KEY while the secret is named API_KEY_BUSIFY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY_BUSIFY || process.env.VITE_API_KEY || "")
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
