import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // This bridges your GitHub Secret (API_KEY_BUSIFY) 
    // to the name used inside the code (process.env.API_KEY).
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
    }
  }
});

