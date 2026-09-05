<div align="center">

# 📷 HoloPolaroid 3D · 专业 3D 拍立得全息照片工坊

**基于原生 WebGL/Canvas 与 Playwright 渲染引擎打造的专业级 3D 悬浮拍立得调色与全息光影合成系统**

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://eshy-c.github.io/holo-card-fx/)
[![Playwright](https://img.shields.io/badge/Export_Engine-Playwright_4K-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Canvas 2D](https://img.shields.io/badge/Hardware-Canvas_300DPI-ea580c?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br/>

👉 **[⚡ 点击立即在线体验 Live Demo](https://eshy-c.github.io/holo-card-fx/)** 👈

</div>

---

## 📖 项目简介

**HoloPolaroid 3D** 是一款专为摄影爱好者、设计师与复古极客设计的 **3D 拍立得全息照片卡制作器**。

项目摒弃了繁杂冗余的卡牌对战属性，回归经典的 **1:1 拍立得相纸比例** 与 **暗房级微调体验**。用户只需上传任意照片，即可在 3D 空间中自由调整全息反光、胶片滤镜、暗角、相纸底色与手写签名，并支持一键通过 **Playwright Headless CLI** 或 **HTML5 2D Canvas 硬件合成引擎** 导出 4K Retina 视网膜级别的无损拍立得照片。

---

## ✨ 核心特性

### 1. 🎛️ 模块化双列控制台与暗房调色系统
- **👫 单人 / 独立双人情侣对卡（全新上线）**：
  - **单人经典模式**：标准单个 1:1 拍立得相纸卡片独立悬浮。
  - **双人情侣对卡模式**：在 3D 舞台中并排呈现 **两张独立的拍立得卡片（左卡 TA / 右卡 我）**，具备各自专属的照片卡位、独立手写寄语与微角度浪漫倾角（`-2.5°` / `+2.5°`），同时共享调色与全息反光。
  - **双图一键拖拽识别**：直接将 2 张照片同时拖拽至上传区域，系统自动开启情侣模式并分别填充左右两张卡片。
- **✨ 4 种全息彩虹色调**：
  - 🌈 **彩虹极光 (Rainbow Aurora)**：经典 CD 光盘激光幻彩。
  - 🌅 **落日霞光 (Sunset Glow)**：暖橙与玫瑰紫渐变余晖。
  - ⚡ **赛博霓虹 (Cyber Neon)**：电光青、高能荧光绿与品红。
  - 👑 **流金璀璨 (Golden Shimmer)**：典雅奢华的金箔金属反光。
- **🎞️ 精细胶片影调调节（实时 0ms 响应）**：
  - **曝光亮度 (Brightness)**：70% ~ 140% 自由增减感光度。
  - **胶片对比度 (Contrast)**：80% ~ 150% 模拟高反差黑白或柔和负片。
  - **色彩饱和度 (Saturation)**：0%（纯黑白胶片）~ 200%（高饱和鲜艳反转片）。
  - **复古暖色温 (Warmth)**：0% ~ 100% 胶片氧化褪色暖调。
  - **边缘暗角 (Vignette)**：精准复刻复古大光圈镜头边缘失光效果。
  - **相框圆角 (Radius)**：0px ~ 16px 自由微调照片内边框。
- **📄 4 款经典相纸底色**：
  - 纯白相纸 (`#fdfdfd`)、复古暖米 (`#fef7ea`)、落樱浅粉 (`#fdf2f8`)、曜石黑卡 (`#18181b`)。
- **✍️ 拍立得手写签名与复古油漆**：
  - 经典 `Caveat` 连笔手写签名与 `JetBrains Mono` 等宽拍摄日期。
  - 提供 5 款墨水配色：中性黑、钢笔蓝、复古红、金色油墨、白银油漆笔。

---

### 2. 🧊 真实 3D 悬浮与视差光影物理模拟
- **视差追踪（Parallax Motion）**：卡片根据鼠标悬停或手指触摸位置产生自然的 3D 倾斜（Tilt），表面光斑与彩虹镀膜随视角流动折射。
- **移动端陀螺仪支持（Device Orientation）**：支持手机重力感应，随晃动手势倾斜卡片。
- **🎥 360° 悬浮自转展示**：一键开启 3D 空间自转漂浮动画。

---

### 3. 📸 双轨 4K 超高清导出引擎（彻底解决失真）

传统网页截屏库（如 `html2canvas`）在处理 CSS `mix-blend-mode: screen`、复杂滤镜及 `calc()` 时极易出现色差与边框错位。本项目采用**双轨架构**彻底解决该问题：

| 导出方案 | 运行环境 | 渲染机制 | 分辨率 & 特性 |
| :--- | :--- | :--- | :--- |
| **🚀 Playwright Headless API** | 本地 Node.js / Python 后端 | 调用真实 Chromium 渲染内核 | **3x Retina 4K 无损截屏**，光影与滤镜 100% 真实还原 |
| **⚡ Canvas 2D 硬件合成** | 纯静态环境（如 GitHub Pages） | 浏览器底层 2D Canvas 逐层合成 | **300 DPI (990x1230)**，0 依赖，即点即出 |

---

## 🛠️ 技术架构

```
holo-card-fx/
├── index.html          # 响应式双列布局与 3D 舞台结构
├── style.css           # 3D 变换、全息着色器、相纸质感与现代化卡片 UI
├── app.js              # 状态驱动引擎 (State-Driven)、事件绑定与双轨导出控制器
├── server.py           # Python 高性能本地服务器（内置 /api/capture Playwright 接口）
├── export_cli.js       # 独立的 Playwright CLI 自动化截图脚本
└── README.md           # 项目详细说明文档
```

- **前端技术**：HTML5 Semantic Tags, CSS 3D Transforms, CSS Custom Properties, Vanilla JS (ES6+)
- **导出技术**：Playwright (Chromium), HTML5 Canvas 2D Context
- **字体支持**：Google Fonts (`Caveat`, `Plus Jakarta Sans`, `JetBrains Mono`)

---

## 🚀 本地运行与开发指南

### 1. 克隆代码仓库
```bash
git clone https://github.com/Eshy-C/holo-card-fx.git
cd holo-card-fx
```

### 2. 启动 Playwright 高清导出服务（推荐）
运行 Python 服务端（可在网页端直接点击按钮调用 Playwright 导出）：
```bash
python3 server.py
```
终端输出：
```text
🚀 Starting HoloCard Studio Server with Playwright Capture on port 8080...
```
在浏览器中打开 **`http://localhost:8080`** 即可畅享完整功能！

---

### 3. 使用独立 Playwright CLI 脚本截屏
如果你想通过命令行批量或单独截取拍立得卡片：
```bash
# 安装依赖
npm install playwright

# 命令行直出 4K 截图
node export_cli.js http://localhost:8080 my_polaroid_4k.png
```

---

## 🌐 在线部署

项目原生兼容 **GitHub Pages**、**Vercel**、**Netlify** 或任意静态托管平台：

- 生产环境在线演示：[https://eshy-c.github.io/holo-card-fx/](https://eshy-c.github.io/holo-card-fx/)

---

## 👤 作者信息

- **开发者**：郭远凯 (Kai)
- **GitHub**：[@Eshy-C](https://github.com/Eshy-C)
- **Email**：`yuankaiguo2001@163.com`
- **WeChat**：`Kai_hex`

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 与提交 Issue！
