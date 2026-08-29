/**
 * Optimiza los assets de imagen del sitio.
 *
 *   node scripts/optimize-images.mjs
 *
 * - Convierte las fotos de `raw-assets/` y los PNG/JPG grandes de `src/assets/`
 *   a WebP redimensionado al tamaño real en que se muestran.
 * - Genera la imagen Open Graph y el apple-touch-icon.
 *
 * Los originales nunca se modifican: vive todo en `raw-assets/` (fuera del
 * bundle) o se reescribe a un archivo `.webp` nuevo junto al original.
 */
import { existsSync } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
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
  // Card de proyecto: se muestra a 340px como máximo, así que 900px basta y
  // sobra incluso en pantallas 2x (los 1600px de arriba son herencia).
  { in: 'src/assets/camisea.JPG', out: 'src/assets/camisea.webp', width: 900, quality: 78 },
  { in: 'src/assets/shivancoreni.JPG', out: 'src/assets/shivancoreni.webp', width: 900, quality: 78 },
  // Par de fotos de trayectoria: se muestran a ~600px de ancho cada una
  { in: 'src/assets/cuerpo.JPG', out: 'src/assets/cuerpo.webp', width: 1200, quality: 76 },
  { in: 'src/assets/cuerpo2.JPG', out: 'src/assets/cuerpo2.webp', width: 1200, quality: 76 },
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
await socialAssets();
console.log('\n✔ Listo\n');
