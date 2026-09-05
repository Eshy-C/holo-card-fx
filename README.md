# HoloCard FX · 3D 全息闪卡工坊 🌈✨

<div align="center">
  <p><strong>零依赖、纯原生打造的双面 3D 全息镭射、星芒粒子、手机重力感应与头像艺术融合工坊</strong></p>
  <p>晃动鼠标或倾斜手机，体验逼真的 3D 悬浮倾斜、晶体反光微音效、星芒碎钻粒子与流光溢彩的彩虹全息折射。</p>
</div>

---

## ✨ 核心特性

- 🔄 **3D 双面翻转 (3D Double-Sided Flip)**：
  - 点击按钮或双击卡片，流畅 3D 翻转展示精致赛博/金属防伪卡背，带有全息防伪烫印标与序列条形码。
- ✨ **星芒碎钻粒子喷射 (Sparkle Particle Engine)**：
  - 鼠标在卡面上划过时，实时喷射出发光四角星芒、彩色光尘与碎钻粒子。
- 📱 **手机重力感应 / 陀螺仪支持 (Device Gyroscope)**：
  - 在移动端浏览器打开，直接倾斜手机即可享受体感全息光影与 3D 悬浮变换。
- 🕹️ **多图层 3D 破框立体悬浮 (Pop-Out Parallax)**：
  - 角色头像与徽章分层渲染，鼠标倾斜时角色宛如“破框而出”。
- 🎨 **头像艺术融合滤镜 (Avatar Fusion)**：
  - 👾 **赛博双色调 (Cyber Duo-Tone)** — 电光青与荧光紫对比
  - 🪙 **烫金金属浮雕 (Golden Emboss)** — 尊贵烫金质感与金属拉丝
  - 🔮 **全息幽灵融合 (Holo Ghost)** — 与卡底星云光效深度融入
  - 🕹️ **复古点阵 (Retro Dither)** — 8-bit 复古高对比度风格
- 🔊 **Web Audio 晶体反光微音效 (ASMR)**：
  - 划过卡片时动态合成晶体清脆反光音、翻牌音效与抽卡金光音。
- 🌈 **4 种全息闪卡材质 (Holographic Foil)**：
  - 🌌 **极光星空 (Prismatic Cosmic)**
  - 👑 **重工烫金 (Golden Foil)**
  - 🔮 **赛博霓虹 (Cyber Neon)**
  - 💎 **碎钻水晶 (Crystal Diamond)**
- 🎥 **一键 360° 录屏巡航模式 (Auto-Spin Mode)**：卡牌自动以 3D 轨迹浮动折射，专为录制 15 秒 X (Twitter) 演示视频设计。
- 📸 **高清 PNG 图片导出**：一键保存正反面专属收藏卡片。

---

## 🚀 快速开始

本项目为**纯前端零依赖**构建：

### 🌐 在线直接体验
👉 [https://eshy-c.github.io/holo-card-fx/](https://eshy-c.github.io/holo-card-fx/)

### 💻 本地运行
```bash
# 启动本地服务
python3 -m http.server 8080

# 打开浏览器访问：http://localhost:8080
```

---

## 🛠️ 技术栈

- **Core**：HTML5 / Modern ES6+ JavaScript / HTML5 Canvas (Particle Physics)
- **Graphics & FX**：CSS 3D Transforms (`perspective`, `rotateY 180deg`, `translateZ`), `mix-blend-mode: color-dodge`, DeviceOrientation API
- **Audio Engine**：Web Audio API (Synthesizer & BiquadFilters)
- **Export**：HTML2Canvas
