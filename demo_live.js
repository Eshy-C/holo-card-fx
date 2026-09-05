const { chromium } = require('playwright');

(async () => {
  console.log('🚀 启动演示浏览器窗口...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized', '--window-size=1440,920']
  });

  const context = await browser.newContext({
    viewport: { width: 1400, height: 880 }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1500);

  // 辅助平滑鼠标移动函数
  async function smoothMouseMove(fromX, fromY, toX, toY, steps = 35, delayMs = 15) {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // 缓动函数 easeInOutCubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const curX = fromX + (toX - fromX) * ease;
      const curY = fromY + (toY - fromY) * ease;
      await page.mouse.move(curX, curY);
      await page.waitForTimeout(delayMs);
    }
  }

  // 1. [0-5s] 在 3D 卡片上进行平滑画圆悬浮，展示全息激光流动
  console.log('✨ 演示 3D 悬浮与激光全息流光...');
  const stageBox = await page.locator('#cardScene').boundingBox();
  const centerX = stageBox.x + stageBox.width / 2;
  const centerY = stageBox.y + stageBox.height / 2;

  await page.mouse.move(centerX, centerY);
  await page.waitForTimeout(500);

  // 画 2 个平滑的大椭圆
  for (let round = 0; round < 2; round++) {
    const totalPoints = 40;
    for (let i = 0; i <= totalPoints; i++) {
      const angle = (i / totalPoints) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * 160;
      const y = centerY + Math.sin(angle) * 120;
      await page.mouse.move(x, y);
      await page.waitForTimeout(25);
    }
  }

  await page.waitForTimeout(600);

  // 2. [5-10s] 滑向左侧控制台，调节暗角与胶片圆角
  console.log('🎛️ 演示暗房参数微调...');
  const vignetteSlider = await page.locator('#sliderVignette').boundingBox();
  await smoothMouseMove(centerX, centerY, vignetteSlider.x + 30, vignetteSlider.y + 10);
  await page.waitForTimeout(400);

  // 拖拽暗角滑块
  await page.mouse.down();
  await smoothMouseMove(vignetteSlider.x + 30, vignetteSlider.y + 10, vignetteSlider.x + 160, vignetteSlider.y + 10, 20, 20);
  await page.mouse.up();
  await page.waitForTimeout(600);

  // 拖拽圆角滑块
  const radiusSlider = await page.locator('#sliderRadius').boundingBox();
  await smoothMouseMove(vignetteSlider.x + 160, vignetteSlider.y + 10, radiusSlider.x + 40, radiusSlider.y + 10);
  await page.mouse.down();
  await smoothMouseMove(radiusSlider.x + 40, radiusSlider.y + 10, radiusSlider.x + 130, radiusSlider.y + 10, 20, 20);
  await page.mouse.up();
  await page.waitForTimeout(600);

  // 3. 切换相纸底色为樱花粉 / 曜石黑
  console.log('📄 演示相纸底色切换...');
  const pinkPaperBtn = page.locator('.paper-btn[data-paper="pink"]');
  const pinkBox = await pinkPaperBtn.boundingBox();
  await smoothMouseMove(radiusSlider.x + 130, radiusSlider.y + 10, pinkBox.x + pinkBox.width / 2, pinkBox.y + pinkBox.height / 2);
  await page.waitForTimeout(300);
  await pinkPaperBtn.click();
  await page.waitForTimeout(800);

  const blackPaperBtn = page.locator('.paper-btn[data-paper="black"]');
  const blackBox = await blackPaperBtn.boundingBox();
  await smoothMouseMove(pinkBox.x + pinkBox.width / 2, pinkBox.y + pinkBox.height / 2, blackBox.x + blackBox.width / 2, blackBox.y + blackBox.height / 2);
  await page.waitForTimeout(300);
  await blackPaperBtn.click();
  await page.waitForTimeout(1000);

  // 4. 演示笔墨油漆调色板
  console.log('🎨 演示调色板自定义拾色...');
  const inkDot = page.locator('.ink-dot[data-ink="#be123c"]');
  const inkDotBox = await inkDot.boundingBox();
  await smoothMouseMove(blackBox.x + blackBox.width / 2, blackBox.y + blackBox.height / 2, inkDotBox.x + inkDotBox.width / 2, inkDotBox.y + inkDotBox.height / 2);
  await page.waitForTimeout(300);
  await inkDot.click();
  await page.waitForTimeout(800);

  // 5. 切换到双人情侣对卡模式
  console.log('👫 演示双人情侣对卡并排...');
  const coupleModeBtn = page.locator('#modeCoupleBtn');
  const coupleBox = await coupleModeBtn.boundingBox();
  await smoothMouseMove(inkDotBox.x + inkDotBox.width / 2, inkDotBox.y + inkDotBox.height / 2, coupleBox.x + coupleBox.width / 2, coupleBox.y + coupleBox.height / 2);
  await page.waitForTimeout(400);
  await coupleModeBtn.click();
  await page.waitForTimeout(1000);

  // 在双卡之间平滑晃动展示并排 3D
  const sceneBox2 = await page.locator('#cardScene').boundingBox();
  const cX2 = sceneBox2.x + sceneBox2.width / 2;
  const cY2 = sceneBox2.y + sceneBox2.height / 2;
  await smoothMouseMove(coupleBox.x + coupleBox.width / 2, coupleBox.y + coupleBox.height / 2, cX2 - 120, cY2);
  await page.waitForTimeout(500);
  await smoothMouseMove(cX2 - 120, cY2, cX2 + 120, cY2, 30, 25);
  await page.waitForTimeout(500);

  // 6. 开启 360° 悬浮自转
  console.log('🎥 演示 360° 悬浮自转...');
  const spinBtn = page.locator('#btnAutoSpin');
  const spinBox = await spinBtn.boundingBox();
  await smoothMouseMove(cX2 + 120, cY2, spinBox.x + spinBox.width / 2, spinBox.y + spinBox.height / 2);
  await page.waitForTimeout(300);
  await spinBtn.click();
  await page.waitForTimeout(3500); // 欣赏自转动画

  // 7. 一键导出
  console.log('📸 演示一键 4K 导出...');
  const exportBtn = page.locator('#btnExport');
  const exportBox = await exportBtn.boundingBox();
  await smoothMouseMove(spinBox.x + spinBox.width / 2, spinBox.y + spinBox.height / 2, exportBox.x + exportBox.width / 2, exportBox.y + exportBox.height / 2);
  await page.waitForTimeout(400);
  await exportBtn.click();
  await page.waitForTimeout(2500);

  console.log('🎉 演示流程圆满完成！');
  await browser.close();
})();
