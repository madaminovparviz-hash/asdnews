import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userImagePath = 'C:/Users/MSI AR/.gemini/antigravity-ide/brain/be8aa1bc-e37d-4d05-b02e-ce264cebd482/.user_uploaded/media_1789734977600.jpg';

// Helper to write standard Windows ICO file containing PNGs
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let currentOffset = headerSize;

  const entries = [];
  for (const buf of pngBuffers) {
    // Read PNG dimensions
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    entries.push({
      width: width >= 256 ? 0 : width,
      height: height >= 256 ? 0 : height,
      colorCount: 0,
      reserved: 0,
      planes: 1,
      bitCount: 32,
      bytesInRes: buf.length,
      imageOffset: currentOffset,
      data: buf
    });
    currentOffset += buf.length;
  }

  const out = Buffer.alloc(currentOffset);
  // Header
  out.writeUInt16LE(0, 0); // reserved
  out.writeUInt16LE(1, 2); // ICO type
  out.writeUInt16LE(count, 4); // image count

  // Directory entries
  let offset = 6;
  for (const entry of entries) {
    out.writeUInt8(entry.width, offset);
    out.writeUInt8(entry.height, offset + 1);
    out.writeUInt8(entry.colorCount, offset + 2);
    out.writeUInt8(entry.reserved, offset + 3);
    out.writeUInt16LE(entry.planes, offset + 4);
    out.writeUInt16LE(entry.bitCount, offset + 6);
    out.writeUInt32LE(entry.bytesInRes, offset + 8);
    out.writeUInt32LE(entry.imageOffset, offset + 12);
    offset += 16;
  }

  // Data
  for (const entry of entries) {
    entry.data.copy(out, entry.imageOffset);
  }

  return out;
}

async function main() {
  console.log('Generating logo assets and favicons...');
  
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  // 1. Copy original user image to public/logo.png and public/images/logo.png
  await sharp(userImagePath).png({ quality: 100 }).toFile('public/logo.png');
  await sharp(userImagePath).png({ quality: 100 }).toFile('public/images/logo.png');
  console.log('Saved public/logo.png & public/images/logo.png');

  // 2. Generate transparent logo with protected white cross
  const imgRaw = await sharp(userImagePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = imgRaw.info.width;
  const h = imgRaw.info.height;
  const data = imgRaw.data;

  const isOuterBg = new Uint8Array(w * h);
  const queue = [];

  for (let x = 0; x < w; x++) {
    for (const y of [0, h - 1]) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 235 && data[idx+1] > 235 && data[idx+2] > 235) {
        const p = y * w + x;
        if (!isOuterBg[p]) { isOuterBg[p] = 1; queue.push(p); }
      }
    }
  }
  for (let y = 0; y < h; y++) {
    for (const x of [0, w - 1]) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 235 && data[idx+1] > 235 && data[idx+2] > 235) {
        const p = y * w + x;
        if (!isOuterBg[p]) { isOuterBg[p] = 1; queue.push(p); }
      }
    }
  }

  function isCrossArea(x, y) {
    return (x >= 440 && x <= 600 && y >= 730 && y <= 870);
  }

  let head = 0;
  while(head < queue.length) {
    const p = queue[head++];
    const x = p % w;
    const y = Math.floor(p / w);

    const neighbors = [];
    if (x > 0) neighbors.push(p - 1);
    if (x < w - 1) neighbors.push(p + 1);
    if (y > 0) neighbors.push(p - w);
    if (y < h - 1) neighbors.push(p + w);

    for (const n of neighbors) {
      if (!isOuterBg[n]) {
        const nx = n % w;
        const ny = Math.floor(n / w);
        if (isCrossArea(nx, ny)) continue;

        const idx = n * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 235 && g > 235 && b > 235) {
          isOuterBg[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  for (let i = 0; i < w * h; i++) {
    if (isOuterBg[i]) {
      data[i * 4 + 3] = 0;
    } else {
      const x = i % w;
      const y = Math.floor(i / w);
      let bgCount = 0;
      if (x > 0 && isOuterBg[i-1]) bgCount++;
      if (x < w - 1 && isOuterBg[i+1]) bgCount++;
      if (y > 0 && isOuterBg[i-w]) bgCount++;
      if (y < h - 1 && isOuterBg[i+w]) bgCount++;

      if (bgCount > 0) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
        const brightness = (r + g + b) / 3;
        if (brightness > 220) {
          data[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(255 - (brightness - 220) * 6)));
        }
      }
    }
  }

  const transparentBuf = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();

  await sharp(transparentBuf).toFile('public/images/logo-transparent.png');
  console.log('Saved public/images/logo-transparent.png');

  // 3. Trimmed transparent logo for icons and badges
  const trimmedBuf = await sharp(transparentBuf).trim().toBuffer();

  // 4. Circular white badge version (crisp in dark/light browser tabs & header)
  const badgeSize = 512;
  const padding = 28;
  const emblemSize = badgeSize - padding * 2;

  const fittedEmblem = await sharp(trimmedBuf)
    .resize(emblemSize, emblemSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const circleSvg = `<svg width="${badgeSize}" height="${badgeSize}" viewBox="0 0 ${badgeSize} ${badgeSize}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${badgeSize/2}" cy="${badgeSize/2}" r="${badgeSize/2 - 2}" fill="#ffffff"/>
  </svg>`;

  const badge512 = await sharp(Buffer.from(circleSvg))
    .composite([{ input: fittedEmblem, top: padding, left: padding }])
    .png()
    .toBuffer();

  await sharp(badge512).toFile('public/images/logo-badge.png');
  console.log('Saved public/images/logo-badge.png');

  // 5. Generate Favicons and App Icons
  // A. Next.js App Router icons
  // src/app/icon.png (32x32)
  const icon32 = await sharp(badge512).resize(32, 32).png().toBuffer();
  await sharp(icon32).toFile('src/app/icon.png');
  await sharp(icon32).toFile('public/icon.png');

  // src/app/apple-icon.png (180x180)
  const apple180 = await sharp(badge512).resize(180, 180).png().toBuffer();
  await sharp(apple180).toFile('src/app/apple-icon.png');
  await sharp(apple180).toFile('public/apple-touch-icon.png');

  // B. Large icons (192, 512)
  const icon192 = await sharp(badge512).resize(192, 192).png().toBuffer();
  await sharp(icon192).toFile('public/icon-192.png');

  const icon512 = await sharp(badge512).resize(512, 512).png().toBuffer();
  await sharp(icon512).toFile('public/icon-512.png');

  // C. Multi-size favicon.ico (16, 32, 48)
  const icon16 = await sharp(badge512).resize(16, 16).png().toBuffer();
  const icon48 = await sharp(badge512).resize(48, 48).png().toBuffer();
  const icoData = createIco([icon16, icon32, icon48]);
  fs.writeFileSync('public/favicon.ico', icoData);
  fs.writeFileSync('src/app/favicon.ico', icoData);
  console.log('Saved public/favicon.ico & src/app/favicon.ico');

  // D. Update src/app/icon.svg to embed the crisp 64x64 PNG as base64 data URI so SVG icon requests also display the SDA logo
  const icon64 = await sharp(badge512).resize(64, 64).png().toBuffer();
  const base64Png = icon64.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="64" height="64"/>
</svg>\n`;
  fs.writeFileSync('src/app/icon.svg', svgContent);
  fs.writeFileSync('public/logo.svg', svgContent);
  console.log('Updated src/app/icon.svg and public/logo.svg');

  console.log('All icons generated successfully!');
}

main().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
