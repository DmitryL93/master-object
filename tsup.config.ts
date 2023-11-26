import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2015',
  format: ['cjs', 'esm'],
  entry: ['src/**/*', '!src/**/*.spec.*'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true
})
