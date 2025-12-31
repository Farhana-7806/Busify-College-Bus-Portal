
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fix for name error in config
declare var process: { env: { [key: string]: string | undefined } };

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
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
