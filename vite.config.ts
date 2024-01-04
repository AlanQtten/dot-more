import { defineConfig } from 'vite';
import { defineConfig as defineVitestConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    build: {
      lib: {
        entry: './src/extension.ts',
        formats: ['cjs'],
        fileName: 'extension',
      },
      rollupOptions: {
        external: ['vscode'],
      },
      sourcemap: true,
      outDir: 'out',
    },
  }),
  defineVitestConfig({
    resolve: {
      alias: {
        vscode: './node_modules/@types/vscode',
      },
    },
    test: {
      include: ['src/__test__/**/*.test.ts'],
    },
  })
);
