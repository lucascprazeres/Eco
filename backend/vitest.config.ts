import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: [{ find: '@eco', replacement: resolve(__dirname, './src') }],
  },
})
