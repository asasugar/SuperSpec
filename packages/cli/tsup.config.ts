import { defineConfig } from 'tsup';
import { writeFileSync, readFileSync, chmodSync } from 'node:fs';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    clean: true,
    sourcemap: true,
    dts: true,
    shims: true,
  },
  {
    entry: { 'cli/index': 'src/cli/index.ts' },
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    clean: false,
    sourcemap: true,
    dts: false,
    shims: true,
    onSuccess: async () => {
      const file = 'dist/cli/index.js';
      const content = readFileSync(file, 'utf-8');
      if (!content.startsWith('#!/usr/bin/env node')) {
        writeFileSync(file, '#!/usr/bin/env node\n' + content);
      }
      chmodSync(file, 0o755);
    },
  },
]);
