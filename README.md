# HoloCard FX · 3D 全息闪卡工坊 🌈✨

<div align="center">
  <p><strong>零依赖、纯原生打造的 3D 全息镭射反光、多图层破框悬浮与头像艺术融合工坊</strong></p>
  <p>晃动鼠标，即可体验逼真的 3D 悬浮倾斜、晶体反光微音效与流光溢彩的彩虹全息折射。</p>
</div>

---

## ✨ 核心特性

- 🕹️ **多图层 3D 破框立体悬浮 (Pop-Out Parallax)**：
  - 角色头像、卡片徽章与技能边框分层渲染，鼠标倾斜时角色仿佛“破框而出”。
- 🎨 **头像艺术融合滤镜 (Avatar Fusion)**：
  - 👾 **赛博双色调 (Cyber Duo-Tone)** — 赛博朋克电光青与荧光紫对比
  - 🪙 **烫金金属浮雕 (Golden Emboss)** — 尊贵烫金质感与金属拉丝
  - 🔮 **全息幽灵融合 (Holo Ghost)** — 与卡底星云光效深度融入
  - 🕹️ **复古点阵 (Retro Dither)** — 8-bit 复古高对比度风格
- 🔊 **Web Audio 晶体反光微音效 (ASMR)**：
  - 鼠标在卡面上划过时，根据移动速度实时合成晶体清脆反光音与抽卡金光音效。
- 🌈 **4 种全息闪卡材质 (Holographic Foil)**：
  - 🌌 **极光星空 (Prismatic Cosmic)**
  - 👑 **重工烫金 (Golden Foil)**
  - 🔮 **赛博霓虹 (Cyber Neon)**
  - 💎 **碎钻水晶 (Crystal Diamond)**
- 🎥 **一键 360° 录屏巡航模式 (Auto-Spin Mode)**：卡牌自动以 3D 轨迹浮动折射，专为录制 15 秒 X (Twitter) 演示视频设计。
- 📸 **高清 PNG 图片导出**：一键保存生成的专属收藏卡片。

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

- **Core**：HTML5 / Modern ES6+ JavaScript
- **Graphics & FX**：CSS 3D Transforms (`perspective`, `translateZ`, `rotateX/Y`), `mix-blend-mode: color-dodge`, CSS Custom Properties
- **Audio Engine**：Web Audio API (Synthesizer & BiquadFilters)
- **Export**：HTML2Canvas
