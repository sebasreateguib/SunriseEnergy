/**
 * Optimiza los assets de imagen del sitio.
 *
 *   node scripts/optimize-images.mjs
 *
 * - Convierte las fotos de `raw-assets/` y los PNG/JPG grandes de `src/assets/`
 *   a WebP redimensionado al tamaño real en que se muestran.
 * - Genera dos sets de frames (desktop / mobile) para la secuencia de scroll
 *   a partir de los 240 frames originales de `raw-assets/panel2/`.
 * - Genera la imagen Open Graph y el apple-touch-icon.
 *
 * Los originales nunca se modifican: vive todo en `raw-assets/` (fuera del
 * bundle) o se reescribe a un archivo `.webp` nuevo junto al original.
 */
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

/**
 * Ancho máximo de cada imagen según el tamaño real al que se renderiza.
 *
 * Los originales .png/.jpg ya se convirtieron y se borraron del repo: viven en
 * el historial de git. Si falta alguno, el script lo avisa y sigue; para
 * reconvertir uno hay que recuperarlo primero (`git checkout <commit> -- ruta`).
 */
const IMAGES = [
  // Hero (LCP) — columna de ~50vw en desktop
  { in: 'src/assets/panel.png', width: 1600, quality: 78 },
  // Fondo full-width del CTA final
  { in: 'src/assets/panelnegro2.png', width: 1920, quality: 74 },
  // Imágenes del showcase de proyectos (contenedor máx. 1280px)
  { in: 'src/assets/paneles.png', width: 1600, quality: 76 },
  { in: 'src/assets/casapanel.png', width: 1600, quality: 76 },
  { in: 'src/assets/panelnegro.png', width: 1600, quality: 76 },
  { in: 'src/assets/minicasa.png', width: 1600, quality: 76 },
  { in: 'src/assets/arequipa-compressed.jpg', width: 1600, quality: 76 },
  { in: 'src/assets/arequipa2-compressed.jpg', width: 1600, quality: 76 },
  { in: 'src/assets/seal-compressed.jpg', width: 1600, quality: 76 },
  { in: 'src/assets/sanfranciscoasis-compressed.jpg', width: 1600, quality: 76 },
  { in: 'src/assets/huanuco-compressed.jpg', width: 1600, quality: 76 },
  { in: 'raw-assets/wind_turbines.png', out: 'public/wind_turbines.webp', width: 1600, quality: 76 },
  // Secciones internas
  { in: 'src/assets/foto.png', width: 1200, quality: 78 },
  { in: 'src/assets/isometric.png', width: 1200, quality: 82 },
  { in: 'src/assets/electribill.png', width: 900, quality: 80 },
  { in: 'src/assets/foto.jpeg', out: 'src/assets/ceo-foto.webp', width: 800, quality: 82 },
  // Logos: se muestran a unas pocas decenas de píxeles de alto
  { in: 'src/assets/logoicon-cropped.png', width: 240, quality: 90 },
  { in: 'src/assets/caral.png', width: 320, quality: 88 },
];

/**
 * Carpeta con los frames originales de la secuencia, en orden.
 * `panel/` son los frames 1920x1080 con buena compresión; `panel2/` es el set
 * viejo (2560x1440 pero muy comprimido) y sólo se usa si el otro no existe.
 */
const SEQUENCE_SOURCES = ['raw-assets/panel', 'raw-assets/panel2'];

/**
 * Sets de frames de la secuencia de scroll.
 *
 * `step` es cada cuántos frames se toma uno: el peso total de la secuencia es
 * lo único que hay que vigilar aquí (step 1 = los 241 frames = ~13 MB).
 */
const SEQUENCES = [
  // Único set, usado tanto en desktop como en mobile: los frames originales
  // tal cual, a 1920x1080 y sin recomprimir. Pasarlos a WebP los dejaría MÁS
  // pesados (~78 KB vs 57 KB), porque el WebP gastaría bits en reproducir los
  // artefactos del JPEG de origen. Un set separado y más liviano para mobile
  // (menos frames y/o menor resolución) se probó y se descartó: el scrub se
  // veía visiblemente entrecortado.
  { name: 'desktop', step: 3, copy: true, ext: 'jpg' },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function optimizeImages() {
  console.log('\n▸ Imágenes\n');
  let before = 0;
  let after = 0;

  for (const img of IMAGES) {
    const from = path.join(ROOT, img.in);
    if (!existsSync(from)) {
      console.warn(`  ! no existe: ${img.in}`);
      continue;
    }
    const to = path.join(ROOT, img.out ?? img.in.replace(/\.(png|jpe?g)$/i, '.webp'));
    await mkdir(path.dirname(to), { recursive: true });

    const { size: originalSize } = await stat(from);
    const { size } = await sharp(from)
      .resize({ width: img.width, withoutEnlargement: true })
      .webp({ quality: img.quality, effort: 6 })
      .toFile(to);

    before += originalSize;
    after += size;
    console.log(
      `  ${path.basename(to).padEnd(34)} ${kb(originalSize).padStart(9)} → ${kb(size).padStart(8)}`
    );
  }

  console.log(`\n  total: ${kb(before)} → ${kb(after)}`);
}

async function optimizeSequence() {
  const source = SEQUENCE_SOURCES.map((dir) => path.join(ROOT, dir)).find((dir) =>
    existsSync(dir)
  );
  if (!source) {
    console.warn(`\n! no se encontró ninguna carpeta de frames (${SEQUENCE_SOURCES.join(', ')})`);
    return;
  }

  const frames = (await readdir(source)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  console.log(
    `\n▸ Secuencia de scroll — ${path.relative(ROOT, source)} (${frames.length} frames originales)\n`
  );

  for (const seq of SEQUENCES) {
    const outDir = path.join(PUBLIC, 'seq', seq.name);
    await mkdir(outDir, { recursive: true });

    const selected = frames.filter((_, i) => i % seq.step === 0);
    let total = 0;

    for (const [index, frame] of selected.entries()) {
      const from = path.join(source, frame);
      const to = path.join(outDir, `f-${String(index).padStart(3, '0')}.${seq.ext}`);

      if (seq.copy) {
        await copyFile(from, to);
        total += (await stat(to)).size;
      } else {
        const { size } = await sharp(from)
          .resize({ width: seq.width, withoutEnlargement: true })
          .webp({ quality: seq.quality, effort: 5 })
          .toFile(to);
        total += size;
      }
    }

    console.log(
      `  ${seq.name.padEnd(8)} ${String(selected.length).padStart(3)} frames ${seq.copy ? 'originales' : `@ ${seq.width}px`} → ${kb(total)} (${kb(total / selected.length)}/frame)`
    );
    // El componente necesita estos números; si cambian hay que actualizar
    // VARIANTS en src/components/scroll-image-sequence.tsx.
    await writeFile(
      path.join(outDir, 'manifest.json'),
      `${JSON.stringify({ frames: selected.length, ext: seq.ext }, null, 2)}\n`
    );
  }
}

/** Primera ruta que exista, para no depender de si el original ya se borró. */
const firstExisting = (...candidates) =>
  candidates.map((c) => path.join(ROOT, c)).find((c) => existsSync(c));

async function socialAssets() {
  console.log('\n▸ Assets sociales\n');

  const ogSource = firstExisting('src/assets/panelnegro2.webp', 'src/assets/panelnegro2.png');
  const iconSource = firstExisting(
    'src/assets/logoicon-cropped.webp',
    'src/assets/logoicon-cropped.png'
  );
  if (!ogSource || !iconSource) {
    console.warn('  ! faltan las imágenes de origen, se omiten');
    return;
  }

  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#050810" stop-opacity="0.92"/>
          <stop offset="55%" stop-color="#050810" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#050810" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#shade)"/>
      <text x="80" y="392" font-family="Helvetica, Arial, sans-serif" font-size="30"
            font-weight="700" letter-spacing="7" fill="#d9f99d">SUNRISE ENERGY PERÚ</text>
      <text x="80" y="474" font-family="Helvetica, Arial, sans-serif" font-size="62"
            font-weight="700" fill="#ffffff">Ingeniería en energía solar</text>
      <text x="80" y="536" font-family="Helvetica, Arial, sans-serif" font-size="30"
            fill="#cbd5e1">36 años · Plantas fotovoltaicas On-Grid y Off-Grid</text>
    </svg>`);

  const og = await sharp(ogSource)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
    .composite([{ input: overlay }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'));
  console.log(`  og-image.jpg                       → ${kb(og.size).padStart(8)}`);

  const icon = await sharp(iconSource)
    .resize({ width: 180, height: 180, fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
  console.log(`  apple-touch-icon.png               → ${kb(icon.size).padStart(8)}`);
}

await optimizeImages();
await optimizeSequence();
await socialAssets();
console.log('\n✔ Listo\n');
