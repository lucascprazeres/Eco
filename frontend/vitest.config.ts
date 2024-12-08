/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [
        '**/node_modules/**',
        '**/src/graphql/**',
        '**/.next/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/src/styles/**',
        '**.config.{mjs,ts}',
        '**/src/env.ts',
      ],
    },
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    setupFiles: [resolve(__dirname, '/tests/setup.ts')],
    env: {
      ...config({ path: '.env.local' }).parsed,
    },
  },
  resolve: {
    alias: [{ find: '@eco', replacement: resolve(__dirname, './src') }],
  },
})
