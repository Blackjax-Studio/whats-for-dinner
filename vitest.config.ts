import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,js}', 'web/src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'dist/**',
        'node_modules/**',
        'tests/**',
        '**/*.json',
      ],
    },
  },
})
