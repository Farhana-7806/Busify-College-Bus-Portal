
/// <reference types="vite/client" />

/**
 * Augment the NodeJS namespace to include our custom environment variables.
 * This ensures that process.env.API_KEY is recognized by TypeScript.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    // This is the variable injected by vite.config.ts
    API_KEY: string;
    API_KEY_BUSIFY: string;
  }
}
