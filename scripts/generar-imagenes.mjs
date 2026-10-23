// Genera imágenes SVG simples para los productos que no tienen foto real.
// Uso: node scripts/generar-imagenes.mjs
import { writeFileSync } from 'node:fs';

const productos = [
  ['arena', 'Arena Gruesa', '25 kg', '#8b6b4a', '⛰️'],
  ['gravilla', 'Gravilla', '25 kg', '#6b7280', '🪨'],
  ['esmeril', 'Esmeril Angular', '850W', '#1d4ed8', '⚙️'],
  ['sierra', 'Sierra Circular', '1400W', '#b91c1c', '🪚'],
  ['latex', 'Pintura Látex', '1 galón', '#0e7490', '🎨'],
  ['esmalte', 'Esmalte Sintético', '1/4 galón', '#475569', '🖌️'],
  ['tornillos', 'Tornillos Volcanita', 'caja 100u', '#a16207', '🔩'],
  ['clavos', 'Clavos 3"', '1 kg', '#57534e', '📌'],
  ['pino', 'Pino 2x4"', '3,2 m', '#92400e', '🪵'],
  ['osb', 'Plancha OSB', '9,5 mm', '#b45309', '🟫'],
];

for (const [slug, nombre, detalle, color, icono] of productos) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="${color}"/>
  <rect x="16" y="16" width="368" height="268" rx="14" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <text x="200" y="135" font-size="72" text-anchor="middle">${icono}</text>
  <text x="200" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">${nombre}</text>
  <text x="200" y="235" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.85)" text-anchor="middle">${detalle}</text>
</svg>`;
  writeFileSync(new URL(`../public/img/productos/${slug}.svg`, import.meta.url), svg);
}
console.log(`Generadas ${productos.length} imágenes`);
