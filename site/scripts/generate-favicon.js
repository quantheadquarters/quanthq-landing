import sharp from 'sharp';
import fs from 'fs';

// Read the SVG
const svgBuffer = fs.readFileSync('./public/favicon.svg');

// Generate favicon.png (96x96)
await sharp(svgBuffer)
  .resize(96, 96)
  .png()
  .toFile('./public/favicon.png');

// Generate apple-touch-icon.png (180x180)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile('./public/apple-touch-icon.png');

console.log('Favicon files generated successfully!');
