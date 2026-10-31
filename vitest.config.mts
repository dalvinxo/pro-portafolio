import path from 'node:path'
import { defineConfig } from 'vitest/config'

const fromRoot = (target: string) => path.resolve(__dirname, target)

// Mirrors the path aliases declared in tsconfig.json
export default defineConfig({
  resolve: {
    alias: {
      providers: fromRoot('src/context/index.ts'),
      'var-contants': fromRoot('src/constants/index.ts'),
      services: fromRoot('src/services/index.ts'),
      helpers: fromRoot('src/helpers/index.ts'),
      '@components': fromRoot('src/components'),
      '@layouts': fromRoot('src/layouts'),
      '@styles': fromRoot('src/styles'),
      '@common': fromRoot('src/common'),
      '@utils': fromRoot('src/utils'),
      src: fromRoot('src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
