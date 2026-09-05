# HoloPolaroid 3D · 专业 3D 拍立得调色工坊 📷✨

<div align="center">
  <p><strong>零依赖、纯原生打造的专业级 3D 悬浮拍立得光影调色工坊</strong></p>
  <p>纯粹上传调色体验，支持原生 2D Canvas 硬件加速导出与 Playwright CLI 4K 超清截图。</p>
</div>

---

## ✨ 核心特性

- 🎛️ **全方位光影与全息微调控制台**：
  - **全息镀膜强度 (0% ~ 100%)**：实时控制彩虹折射浓度。
  - **胶片高光反光 (0% ~ 100%)**：微调玻璃胶片表面的光线反光硬度。
  - **4 种全息色调**：彩虹极光 / 落日霞光 / 赛博霓虹 / 流金璀璨。
- 🎞️ **胶片影调与暗角滤镜**：
  - 曝光亮度 / 对比度 / 色彩饱和度 / 复古暖色温 / 边缘暗角暗化 / 内框圆角。
- 📄 **4 种经典相纸底色**：
  - 经典纯白 / 复古暖米 / 落樱浅粉 / 曜石黑卡。
- ✍️ **手写寄语与 5 款油墨颜色**：
  - 中性黑 / 钢笔蓝 / 复古红 / 金色油墨 / 白银油漆笔。
- 📸 **原生 2D Canvas 硬件加速导出**：
  - 彻底淘汰容易畸变变形的 DOM 截图库，改用 **HTML5 Canvas 2D 硬件合成**，100% 像素级无瑕疵还原滤镜、暗角与手写体（990x1230 300DPI 超清输出）。
- 🤖 **Playwright CLI 自动化截图支持**：
  - 内置 `export_cli.js` 脚本，支持通过 Playwright 无头浏览器进行 4K Retina 级别的精准快照捕获。

---

## 🚀 快速开始

### 🌐 在线直接体验
👉 [https://eshy-c.github.io/holo-card-fx/](https://eshy-c.github.io/holo-card-fx/)

### 💻 本地运行
```bash
# 启动本地服务
python3 -m http.server 8080

# 打开浏览器访问：http://localhost:8080
```

### 🤖 使用 Playwright CLI 工具截图
```bash
# 安装 Playwright
npm install playwright

# 运行 CLI 截图工具
node export_cli.js http://localhost:8080 my_polaroid.png
```
