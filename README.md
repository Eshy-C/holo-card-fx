# HoloCard FX · 3D 全息闪卡生成器 🌈✨

<div align="center">
  <p><strong>零依赖、纯原生打造的 3D 全息镭射反光与炫光卡牌生成工坊</strong></p>
  <p>晃动鼠标，即可体验逼真的 3D 悬浮倾斜与流光溢彩的彩虹全息折射。</p>
</div>

---

## ✨ 核心特性

- 🕹️ **实时 3D 悬浮物理倾斜**：精准计算光标与视角距离，提供丝滑的 3D Parallax 空间回弹。
- 🌈 **4 种全息闪卡质感 (Holographic Foil)**：
  - 🌌 **极光星空 (Prismatic Cosmic)** — 经典宝可梦稀有闪卡彩虹折射
  - 👑 **重工烫金 (Golden Foil)** — 尊贵黑金与高光琥珀流光
  - 🔮 **赛博霓虹 (Cyber Neon)** — 电光青与霓虹粉的赛博朋克冲击
  - 💎 **碎钻水晶 (Crystal Diamond)** — 晶莹剔透的高饱和冰晶星芒
- 🎨 **自由定制属性与头像**：
  - 拖拽上传任意图片 / 剪贴板粘贴
  - 自定义卡牌名称、生命值 (HP)、算力输出 (ATK)、专属奥义技能
  - 稀有度勋章与元素标签（UR / SSR / HOLO / CYBER GOD）
- 🎥 **一键录屏巡航模式 (Auto-Spin Mode)**：开启后卡牌自动以 3D 轨迹浮动折射，专为录制 15 秒 X (Twitter) 演示视频设计。
- 📸 **高清 PNG 图片导出**：一键保存生成的专属收藏卡片。

---

## 🚀 快速开始

本项目为**纯前端零依赖**构建：

### 方法 1：直接双击打开
直接双击目录下的 `index.html` 文件，即可在浏览器中体验完整交互！

### 方法 2：使用本地静态服务
```bash
# 进入项目目录
cd holo-card-fx

# 启动本地服务（例如通过 Python）
python3 -m http.server 8080

# 打开浏览器访问：http://localhost:8080
```

---

## 🐦 发 X (Twitter) 文案灵感推荐

录制一段 10~15 秒鼠标晃动全息卡片的无水印微视频，配上以下文案：

> 🎴 我用 CSS 3D 和 Color-Dodge 滤镜写了一个「全息 3D 闪卡生成器」！
> 
> 任何头像都能一键变成宝可梦风格的镭射卡牌，支持鼠标光线追踪折射 + 4 种全息材质 ✨
> 
> 零依赖纯前端，代码开源在 GitHub，欢迎把玩 👇
> [你的仓库链接]

---

## 🛠️ 技术栈

- **Core**：HTML5 / Modern ES6+ JavaScript
- **Graphics & FX**：CSS 3D Transforms (`perspective`, `rotateX/Y`), `mix-blend-mode: color-dodge`, Radial/Linear Gradient Shaders
- **Export**：HTML2Canvas
