import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('../gif-makr-demo/node_modules/puppeteer');
import { execSync } from 'child_process';
import { mkdirSync, existsSync, rmSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = resolve(__dirname, 'frames');
const HTML_FILE  = resolve(__dirname, 'scenes.html');
const OUTPUT     = resolve(__dirname, '..', '..', 'videos', 'hero.mp4');

const TOTAL_FRAMES = 216; // 215 + 1
const FPS          = 6;

async function main() {
  if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
  mkdirSync(FRAMES_DIR, { recursive: true });

  const outDir = resolve(__dirname, '..', '..', 'videos');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 450, deviceScaleFactor: 2 });

  console.log(`Capturing ${TOTAL_FRAMES} frames @ ${FPS}fps...`);
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const url = `file://${HTML_FILE}?frame=${i}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 80));

    const padded = String(i).padStart(4, '0');
    await page.screenshot({
      path: resolve(FRAMES_DIR, `frame_${padded}.png`),
      type: 'png',
    });
    if (i % 20 === 0) console.log(`  frame ${i}/${TOTAL_FRAMES}`);
  }

  await browser.close();
  console.log('All frames captured.');

  console.log('Assembling MP4...');
  const cmd = [
    'ffmpeg -y',
    `-framerate ${FPS}`,
    `-i "${FRAMES_DIR}/frame_%04d.png"`,
    '-c:v libx264',
    '-preset slow',
    '-crf 22',
    '-pix_fmt yuv420p',
    '-vf "tpad=stop_mode=clone:stop_duration=2"',
    `"${OUTPUT}"`,
  ].join(' ');

  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });

  const size = (statSync(OUTPUT).size / 1024).toFixed(0);
  console.log(`\n Done: ${OUTPUT}`);
  console.log(`  Size: ${size} KB`);

  rmSync(FRAMES_DIR, { recursive: true });
  console.log('  Frames cleaned up.');
}

main().catch(e => { console.error(e); process.exit(1); });
