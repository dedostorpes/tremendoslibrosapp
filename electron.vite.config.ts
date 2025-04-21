
import { defineConfig } from 'electron-vite';

export default defineConfig({
  main: {
    entry: 'src/main/electron.ts',
  },
  renderer: {
    input: 'src/renderer/index.html',
  },
});
