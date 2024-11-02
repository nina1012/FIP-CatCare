import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/testing/setup.ts'],
    include: ['src/**/*.test.ts'],
    exclude: ['src/e2e/**'],
  },
  define: {
    'process.env.NODE_ENV': "'test'",
  },
});
