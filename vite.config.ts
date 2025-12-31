
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Set base to empty string or './' for relative paths, 
  // which works better on GitHub Pages (e.g. username.github.io/repo/)
  base: './',
  plugins: [react()],
  define: {
    // This allows the app to access the API key during the build process
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
