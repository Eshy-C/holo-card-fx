/**
 * Playwright CLI High-DPI Screenshot Tool
 * Usage:
 *   npx playwright test export_cli.js
 *   OR: node export_cli.js [url] [output.png]
 */

const { chromium } = require('playwright');
const path = require('path');

async function capturePolaroid(url = 'http://localhost:8080', outputPath = 'polaroid_4k.png') {
  console.log(`🚀 Launching Playwright Chromium to capture Polaroid from ${url}...`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
    deviceScaleFactor: 3 // 3x Ultra-HD Retina scale
  });
  
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  // Locate the Polaroid Card
  const card = page.locator('#polaroidCard');
  await card.waitFor({ state: 'visible' });

  // Wait 500ms for fonts & filters to stabilize
  await page.waitForTimeout(500);

  // Capture crisp transparent or white screenshot
  const fullPath = path.resolve(process.cwd(), outputPath);
  await card.screenshot({
    path: fullPath,
    omitBackground: true
  });

  console.log(`✅ Polaroid captured perfectly at 3x Retina resolution: ${fullPath}`);
  await browser.close();
}

const args = process.argv.slice(2);
const targetUrl = args[0] || 'http://localhost:8080';
const targetOutput = args[1] || 'polaroid_playwright.png';

capturePolaroid(targetUrl, targetOutput).catch(err => {
  console.error('❌ Capture error:', err);
  process.exit(1);
});
