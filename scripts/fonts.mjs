// Copia los woff2 (subconjunto latino) desde node_modules a src/assets/fonts.
import { copyFile, mkdir } from 'node:fs/promises';

const OUT = 'src/assets/fonts';
const FILES = [
  ['@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2', 'newsreader.woff2'],
  ['@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2', 'newsreader-italic.woff2'],
  ['@fontsource-variable/albert-sans/files/albert-sans-latin-wght-normal.woff2', 'albert-sans.woff2'],
];
await mkdir(OUT, { recursive: true });
for (const [src, dst] of FILES) await copyFile(`node_modules/${src}`, `${OUT}/${dst}`);
console.log(`${FILES.length} fuentes → ${OUT}`);
