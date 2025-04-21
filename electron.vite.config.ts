
import { defineConfig } from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    entry: path.resolve(__dirname, 'src/main/index.ts'),
  },
  preload: {
    input: path.resolve(__dirname, 'src/preload/index.ts'),
  },
  renderer: {
    input: path.resolve(__dirname, 'src/renderer/index.html'),
  },
});
