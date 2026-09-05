/**
 * HoloCard FX - 3D Interactive Holographic Polaroid Engine, Particles & HD Exporter
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const holoCard = document.getElementById('holoCard');
  const cardScene = document.getElementById('cardScene');
  const cardFrontFace = document.getElementById('cardFrontFace');
  const cardBackFace = document.getElementById('cardBackFace');
  const particleCanvas = document.getElementById('particleCanvas');
  const ctxParticles = particleCanvas ? particleCanvas.getContext('2d') : null;
  
  // Inputs & Displays
  const inputName = document.getElementById('inputName');
  const displayName = document.getElementById('displayName');
  
  const inputSubtitle = document.getElementById('inputSubtitle');
  const displaySubtitle = document.getElementById('displaySubtitle');
  
  const inputBadge = document.getElementById('inputBadge');
  const displayBadge = document.getElementById('displayBadge');
  
  const imageInput = document.getElementById('imageInput');
  const cardImage = document.getElementById('cardImage');
  const uploadDropzone = document.getElementById('uploadDropzone');
  
  // Toggles & Actions
  const togglePopout = document.getElementById('togglePopout');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const btnFlip = document.getElementById('btnFlip');
  const btnAutoSpin = document.getElementById('btnAutoSpin');
  const btnExport = document.getElementById('btnExport');
  const styleBtns = document.querySelectorAll('.style-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  let isAutoSpinning = false;
  let isSoundEnabled = true;
  let isFlipped = false;

  // ========================================================
  // 🖼️ High Quality SVG Data URIs for Zero-CORS Presets
  // ========================================================
  function generatePresetSVG(type) {
    if (type === 'agent') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%231e1b4b"/>
            <stop offset="50%" stop-color="%234338ca"/>
            <stop offset="100%" stop-color="%2306b6d4"/>
          </linearGradient>
          <radialGradient id="g2" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="%2300f0ff" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="%23000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="700" fill="url(%23g1)"/>
        <circle cx="300" cy="280" r="180" fill="url(%23g2)"/>
        <!-- Cyber Avatar Silhouette -->
        <circle cx="300" cy="250" r="70" fill="%23ffffff" opacity="0.9"/>
        <rect x="230" y="235" width="140" height="26" rx="13" fill="%2300f0ff"/>
        <path d="M180 430 C180 340, 420 340, 420 430 L420 520 L180 520 Z" fill="%23e0e7ff" opacity="0.85"/>
        <text x="300" y="580" fill="%2300f0ff" font-size="28" font-family="monospace" font-weight="bold" text-anchor="middle" letter-spacing="4">CYBER AGENT CORE</text>
      </svg>`;
    } else if (type === 'cat') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
        <defs>
          <linearGradient id="catG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%23831843"/>
            <stop offset="50%" stop-color="%23be185d"/>
            <stop offset="100%" stop-color="%23f43f5e"/>
          </linearGradient>
        </defs>
        <rect width="600" height="700" fill="url(%23catG)"/>
        <circle cx="300" cy="350" r="140" fill="%23fdf2f8" opacity="0.95"/>
        <!-- Cat ears -->
        <polygon points="200,280 230,170 280,240" fill="%23fdf2f8"/>
        <polygon points="400,280 370,170 320,240" fill="%23fdf2f8"/>
        <!-- Eyes -->
        <circle cx="250" cy="330" r="16" fill="%230f172a"/>
        <circle cx="350" cy="330" r="16" fill="%230f172a"/>
        <circle cx="254" cy="326" r="5" fill="%23ffffff"/>
        <circle cx="354" cy="326" r="5" fill="%23ffffff"/>
        <!-- Nose -->
        <polygon points="300,360 290,350 310,350" fill="%23fb7185"/>
        <text x="300" y="580" fill="%23ffffff" font-size="28" font-family="monospace" font-weight="bold" text-anchor="middle" letter-spacing="4">QUANTUM NEKO</text>
      </svg>`;
    } else {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
        <defs>
          <linearGradient id="dragG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%23064e3b"/>
            <stop offset="50%" stop-color="%23059669"/>
            <stop offset="100%" stop-color="%2310b981"/>
          </linearGradient>
        </defs>
        <rect width="600" height="700" fill="url(%23dragG)"/>
        <circle cx="300" cy="320" r="130" fill="%23ecfdf5" opacity="0.9"/>
        <polygon points="300,160 380,320 220,320" fill="%23064e3b"/>
        <polygon points="300,200 350,300 250,300" fill="%2310b981"/>
        <text x="300" y="580" fill="%23ffffff" font-size="28" font-family="monospace" font-weight="bold" text-anchor="middle" letter-spacing="4">NEON DRAGON</text>
      </svg>`;
    }
  }

  // Set default image to clean local Base64 SVG
  cardImage.src = generatePresetSVG('agent');

  // ========================================================
  // 🔊 Web Audio API Synthesizer (Crystal Chimes & SSR Sparkles)
  // ========================================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  let lastSoundTime = 0;
  function playShimmerSound(speedFactor = 1) {
    if (!isSoundEnabled) return;
    const now = performance.now();
    if (now - lastSoundTime < 80) return;
    lastSoundTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const baseFreq = 1400 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 400 * speedFactor, ctx.currentTime + 0.08);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      filter.Q.setValueAtTime(8, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) {}
  }

  function playSSRChime() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        } catch (e) {}
      }, idx * 60);
    });
  }

  function playFlipSound() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {}
  }

  btnSoundToggle.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    btnSoundToggle.textContent = isSoundEnabled ? '🔊 音效: 开' : '🔇 音效: 关';
    btnSoundToggle.style.color = isSoundEnabled ? '#e2e8f0' : '#94a3b8';
    if (isSoundEnabled) getAudioContext();
  });

  // ========================================================
  // ✨ Interactive Star Sparkle Particle Engine (Canvas)
  // ========================================================
  let particles = [];
  function resizeParticleCanvas() {
    if (!particleCanvas) return;
    const rect = cardScene.getBoundingClientRect();
    particleCanvas.width = rect.width + 200;
    particleCanvas.height = rect.height + 200;
  }
  resizeParticleCanvas();
  window.addEventListener('resize', resizeParticleCanvas);

  function createSparkle(x, y) {
    const colors = ['#ffd700', '#67e8f9', '#f472b6', '#c084fc', '#ffffff'];
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + 100 + (Math.random() - 0.5) * 20,
        y: y + 100 + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5 - 0.8,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0.95,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  function renderParticles() {
    if (!ctxParticles) return;
    ctxParticles.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha *= p.life;
      p.rotation += p.vRot;

      if (p.alpha <= 0.02) {
        particles.splice(i, 1);
        continue;
      }

      ctxParticles.save();
      ctxParticles.globalAlpha = p.alpha;
      ctxParticles.fillStyle = p.color;
      ctxParticles.shadowBlur = 8;
      ctxParticles.shadowColor = p.color;

      ctxParticles.translate(p.x, p.y);
      ctxParticles.rotate(p.rotation);
      drawStar(ctxParticles, 0, 0, 4, p.size, p.size * 0.35);
      ctxParticles.fill();
      ctxParticles.restore();
    }

    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // 1. Dynamic Text & Value Binding
  function bindInput(input, display, formatter = (v) => v) {
    input.addEventListener('input', (e) => {
      display.textContent = formatter(e.target.value);
    });
  }

  bindInput(inputName, displayName);
  bindInput(inputSubtitle, displaySubtitle);
  bindInput(inputBadge, displayBadge);

  // 2. 3D Tilt & Holographic Foil Physics Engine
  let bounds;
  let lastX = 0, lastY = 0;
  function updateBounds() {
    bounds = holoCard.getBoundingClientRect();
  }
  updateBounds();
  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds);

  function handlePointerMove(e) {
    if (isAutoSpinning) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined) return;

    updateBounds();
    const mouseX = clientX - bounds.left;
    const mouseY = clientY - bounds.top;

    const deltaX = Math.abs(clientX - lastX);
    const deltaY = Math.abs(clientY - lastY);
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    lastX = clientX;
    lastY = clientY;

    if (speed > 8) {
      playShimmerSound(Math.min(speed / 20, 2));
      createSparkle(mouseX, mouseY);
    }

    const left = mouseX;
    const top = mouseY;
    const center = {
      x: left - bounds.width / 2,
      y: top - bounds.height / 2
    };

    const rotateX = -(center.y / (bounds.height / 2)) * 22;
    const rotateY = (center.x / (bounds.width / 2)) * 22;

    const px = Math.min(Math.max((mouseX / bounds.width) * 100, 0), 100);
    const py = Math.min(Math.max((mouseY / bounds.height) * 100, 0), 100);

    holoCard.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    holoCard.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    holoCard.style.setProperty('--mx', `${px.toFixed(1)}%`);
    holoCard.style.setProperty('--my', `${py.toFixed(1)}%`);
    holoCard.style.setProperty('--posx', `${(px * 1.5).toFixed(1)}%`);
    holoCard.style.setProperty('--posy', `${(py * 1.5).toFixed(1)}%`);
    holoCard.style.setProperty('--foil-opacity', '0.9');
  }

  function handlePointerLeave() {
    if (isAutoSpinning) return;
    holoCard.style.setProperty('--rx', '0deg');
    holoCard.style.setProperty('--ry', '0deg');
    holoCard.style.setProperty('--mx', '50%');
    holoCard.style.setProperty('--my', '50%');
    holoCard.style.setProperty('--posx', '50%');
    holoCard.style.setProperty('--posy', '50%');
    holoCard.style.setProperty('--foil-opacity', '0.4');
  }

  cardScene.addEventListener('mousemove', handlePointerMove);
  cardScene.addEventListener('mouseleave', handlePointerLeave);
  cardScene.addEventListener('touchmove', handlePointerMove, { passive: true });
  cardScene.addEventListener('touchend', handlePointerLeave);

  // 3. 📱 Mobile Gyroscope / Device Orientation
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (isAutoSpinning || !e.gamma || !e.beta) return;
      const gamma = Math.min(Math.max(e.gamma, -40), 40);
      const beta = Math.min(Math.max(e.beta - 45, -40), 40);
      
      const rotateY = (gamma / 40) * 22;
      const rotateX = -(beta / 40) * 22;
      
      holoCard.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      holoCard.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      holoCard.style.setProperty('--posx', `${((gamma + 40) / 80 * 100).toFixed(1)}%`);
      holoCard.style.setProperty('--posy', `${((beta + 40) / 80 * 100).toFixed(1)}%`);
      holoCard.style.setProperty('--foil-opacity', '0.85');
    });
  }

  // 4. 🔄 3D Card Flip (Front / Back)
  function toggleFlip() {
    isFlipped = !isFlipped;
    holoCard.classList.add('is-flipping');
    holoCard.style.setProperty('--flip-angle', isFlipped ? '180deg' : '0deg');
    btnFlip.textContent = isFlipped ? '🔄 翻转正面' : '🔄 翻转卡背';
    playFlipSound();
    setTimeout(() => holoCard.classList.remove('is-flipping'), 600);
  }

  btnFlip.addEventListener('click', toggleFlip);
  holoCard.addEventListener('dblclick', toggleFlip);

  // 5. 3D Pop-out Toggle
  togglePopout.addEventListener('change', (e) => {
    if (e.target.checked) {
      holoCard.classList.add('popout-enabled');
    } else {
      holoCard.classList.remove('popout-enabled');
    }
  });

  // 6. Avatar Blend Filters
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      document.body.classList.remove('filter-normal', 'filter-cyber', 'filter-gold', 'filter-holo', 'filter-dither');
      document.body.classList.add(`filter-${filter}`);
      playShimmerSound(1.5);
    });
  });

  // 7. Theme / Foil Texture Switching
  styleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      styleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const style = btn.dataset.style;
      
      const currentFilter = Array.from(document.body.classList).find(c => c.startsWith('filter-')) || 'filter-normal';
      document.body.className = `theme-${style} ${currentFilter}`;
      playSSRChime();
    });
  });

  // 8. Image Upload & Drag-and-Drop (Always base64 for safe export)
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        cardImage.src = event.target.result;
        playSSRChime();
      };
      reader.readAsDataURL(file);
    }
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      uploadDropzone.style.borderColor = '#818cf8';
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    uploadDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      uploadDropzone.style.borderColor = '';
    });
  });

  uploadDropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        cardImage.src = event.target.result;
        playSSRChime();
      };
      reader.readAsDataURL(file);
    }
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      cardImage.src = generatePresetSVG(preset);
      playShimmerSound(1.2);
    });
  });

  // 9. 🎥 Auto-Spin Video Recording Mode
  btnAutoSpin.addEventListener('click', () => {
    isAutoSpinning = !isAutoSpinning;
    if (isAutoSpinning) {
      holoCard.classList.add('auto-spinning');
      btnAutoSpin.textContent = '⏹️ 停止巡航';
      btnAutoSpin.classList.add('btn-primary');
      btnAutoSpin.classList.remove('btn-secondary');
    } else {
      holoCard.classList.remove('auto-spinning');
      btnAutoSpin.textContent = '🎥 360° 巡航';
      btnAutoSpin.classList.remove('btn-primary');
      btnAutoSpin.classList.add('btn-secondary');
      handlePointerLeave();
    }
  });

  // ========================================================
  // 📸 Ultra-Reliable HD Snapshot Exporter
  // ========================================================
  btnExport.addEventListener('click', async () => {
    const originalText = btnExport.textContent;
    btnExport.textContent = '⏳ 高清生成中...';
    btnExport.disabled = true;

    try {
      const targetFace = isFlipped ? cardBackFace : cardFrontFace;
      
      // Clone the target face into an off-screen container without 3D transforms
      const clone = targetFace.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      clone.style.width = '350px';
      clone.style.height = '520px';
      clone.style.transform = 'none';
      clone.style.borderRadius = '22px';
      clone.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      clone.style.overflow = 'hidden';
      
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 2.5, // Crisp 2.5x HD Retina export
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      document.body.removeChild(clone);

      // Download PNG
      const link = document.createElement('a');
      const safeName = (inputName.value || 'HoloCard').replace(/\s+/g, '_');
      link.download = `HoloCard-${safeName}-${isFlipped ? 'Back' : 'Front'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      playSSRChime();
    } catch (err) {
      console.error('Export error:', err);
      alert('导出图片时遇到问题，您可以直接截图保存！');
    } finally {
      btnExport.textContent = originalText;
      btnExport.disabled = false;
    }
  });
});
