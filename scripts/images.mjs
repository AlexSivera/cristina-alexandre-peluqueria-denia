// Genera las imágenes de la web (webp en varios anchos; jpg solo para la imagen de compartir) a partir de _src/img.
// Uso: npm run images
// ratio = ancho/alto del recorte · fx/fy = centro del recorte (0–1) · zoom > 1 recorta más cerca
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';

const SRC = '_src/img';
const OUT = 'src/assets/img';
const ARCO = 0.66; // proporción de los arcos (los espejos del salón)

const JOBS = [
  { src: 'salon-arcos', ratio: ARCO, fx: 0.42, fy: 0.5, widths: [520, 820, 1200] },
  { src: 'salon-sillones', out: 'salon-sillones-ancho', ratio: 16 / 10, fx: 0.5, fy: 0.42, widths: [800, 1400, 1920] },
  { src: 'spamist-vapor', ratio: ARCO, fx: 0.55, fy: 0.42, widths: [520, 820, 1100] },
  { src: 'cortina', ratio: 4 / 5, fx: 0.45, fy: 0.42, widths: [520, 900] },
  { src: 'evo-repair', ratio: 3 / 2, fx: 0.5, fy: 0.55, widths: [520, 900] },
  { src: 'qiqi-escaparate', ratio: 4 / 5, fx: 0.5, fy: 0.42, zoom: 1.15, widths: [520, 900] },
  { src: 'epres', ratio: 4 / 5, fx: 0.5, fy: 0.45, widths: [520, 900] },
  { src: 'recogido', ratio: 4 / 5, fx: 0.55, fy: 0.5, widths: [520, 900] },
  { src: 'ondas-castano', ratio: 4 / 5, fx: 0.5, fy: 0.5, widths: [520, 900] },
  { src: 'balayage-mural', ratio: 4 / 5, fx: 0.5, fy: 0.45, widths: [520, 900] },
  // Fotogramas de reels (720×1280): recorte central que quita marcas de agua y bordes
  ...['nordico', 'castano', 'reflejos', 'rubio'].flatMap((c) => [
    { src: `caso-${c}-antes`, ratio: ARCO, fx: 0.5, fy: 0.56, widths: [480, 720] },
    { src: `caso-${c}-despues`, ratio: ARCO, fx: 0.5, fy: 0.56, widths: [480, 720] },
  ]),
  { src: 'lavado-espuma', ratio: 4 / 5, fx: 0.5, fy: 0.45, widths: [480, 720] },
  { src: 'spamist-gorro', ratio: 4 / 5, fx: 0.5, fy: 0.45, widths: [480, 720] },
  { src: 'morena-iluminada', ratio: 4 / 5, fx: 0.5, fy: 0.5, widths: [480, 720] },
  // Imagen para compartir (Open Graph)
  { src: 'salon-arcos', out: 'og', ratio: 1200 / 630, fx: 0.5, fy: 0.5, widths: [1200], only: 'jpg' },
];

function cropBox(w, h, { ratio, fx, fy, zoom = 1 }) {
  let cw = w, ch = Math.round(w / ratio);
  if (ch > h) { ch = h; cw = Math.round(h * ratio); }
  cw = Math.round(cw / zoom); ch = Math.round(ch / zoom);
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw);
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch);
  return { left, top, width: cw, height: ch };
}

const files = await readdir(SRC);
await mkdir(OUT, { recursive: true });
for (const job of JOBS) {
  const file = files.find((f) => f.replace(/\.[^.]+$/, '') === job.src);
  const out = job.out || job.src;
  const meta = await sharp(`${SRC}/${file}`).rotate().toBuffer({ resolveWithObject: true });
  const box = cropBox(meta.info.width, meta.info.height, job);
  // Tratamiento común: un punto más cálido y contraste suave para unificar móvil e iPhone.
  const base = sharp(meta.data).extract(box).modulate({ saturation: 0.97 })
    .recomb([[1.03, 0.01, 0], [0, 1, 0], [0, 0.01, 0.95]]).linear(1.03, -3);
  for (const w of job.widths) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    if (job.only === 'jpg') await r.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${OUT}/${out}-${w}.jpg`);
    else await r.clone().webp({ quality: 74 }).toFile(`${OUT}/${out}-${w}.webp`);
  }
  console.log(`${out}: ${box.width}×${box.height} → ${job.widths.join(', ')}`);
}
