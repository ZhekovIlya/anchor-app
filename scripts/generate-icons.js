#!/usr/bin/env node
// ========================
// scripts/generate-icons.js
// ========================
// Renders public/icon.svg to the PNG icons the PWA manifest and iOS need:
//   public/icon-192.png, public/icon-512.png, public/apple-touch-icon.png (180px)
//
// Usage (run once, commit the PNGs; needs the devDependency Playwright with a
// Chromium already installed — it does not download anything):
//   node scripts/generate-icons.js

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = readFileSync(join(publicDir, 'icon.svg'), 'utf8');

const TARGETS = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];

const browser = await chromium.launch();
try {
  for (const [file, size] of TARGETS) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(
      `<html><body style="margin:0;background:transparent">` +
      `<div style="width:${size}px;height:${size}px">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</div>` +
      `</body></html>`
    );
    const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    writeFileSync(join(publicDir, file), png);
    await page.close();
    console.log(`wrote public/${file} (${size}x${size})`);
  }
} finally {
  await browser.close();
}
