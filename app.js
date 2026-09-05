/**
 * HoloCard FX - Pro Polaroid Studio
 * Robust Direct-Binding Engine for Real-Time Adjustments & Export
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const polaroidCard = document.getElementById('polaroidCard');
  const cardScene = document.getElementById('cardScene');
  const photoPocket = document.getElementById('photoPocket');
  const polaroidImage = document.getElementById('polaroidImage');
  const filmGlare = document.getElementById('filmGlare');
  const filmHologram = document.getElementById('filmHologram');
  const photoVignette = document.getElementById('photoVignette');
  
  const inputCaption = document.getElementById('inputCaption');
  const displayCaption = document.getElementById('displayCaption');
  
  const inputDate = document.getElementById('inputDate');
  const displayDate = document.getElementById('displayDate');
  
  const imageInput = document.getElementById('imageInput');
  const uploadDropzone = document.getElementById('uploadDropzone');
  
  const btnAutoSpin = document.getElementById('btnAutoSpin');
  const btnExport = document.getElementById('btnExport');
  const btnReset = document.getElementById('btnReset');
  
  // Sliders
  const sliderHolo = document.getElementById('sliderHolo');
  const valHolo = document.getElementById('valHolo');
  
  const sliderGlare = document.getElementById('sliderGlare');
  const valGlare = document.getElementById('valGlare');
  
  const sliderBrightness = document.getElementById('sliderBrightness');
  const valBrightness = document.getElementById('valBrightness');
  
  const sliderContrast = document.getElementById('sliderContrast');
  const valContrast = document.getElementById('valContrast');
  
  const sliderSaturation = document.getElementById('sliderSaturation');
  const valSaturation = document.getElementById('valSaturation');
  
  const sliderWarmth = document.getElementById('sliderWarmth');
  const valWarmth = document.getElementById('valWarmth');
  
  const sliderVignette = document.getElementById('sliderVignette');
  const valVignette = document.getElementById('valVignette');
  
  const sliderRadius = document.getElementById('sliderRadius');
  const valRadius = document.getElementById('valRadius');

  // Button Groups
  const styleBtns = document.querySelectorAll('.style-btn');
  const paperBtns = document.querySelectorAll('.paper-btn');
  const inkDots = document.querySelectorAll('.ink-dot');

  let isAutoSpinning = false;

  // Global State for State-Driven Rendering
  const state = {
    holoOpacity: 0.45,
    glareOpacity: 0.35,
    brightness: 100,
    contrast: 105,
    saturation: 110,
    warmth: 15,
    vignette: 30,
    radius: 4,
    theme: 'rainbow',
    paper: 'white',
    inkColor: '#1e293b'
  };

  // ========================================================
  // ⚡ Direct State Applier (Guaranteed Instant Visual Update)
  // ========================================================
  function applyState() {
    if (polaroidImage) {
      polaroidImage.style.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%) sepia(${state.warmth}%)`;
    }

    if (filmHologram) {
      filmHologram.style.opacity = state.holoOpacity;
    }
    if (filmGlare) {
      filmGlare.style.opacity = state.glareOpacity;
    }

    if (photoVignette) {
      const vBlur = Math.round((state.vignette / 100) * 60);
      const vAlpha = (state.vignette / 100) * 0.7;
      photoVignette.style.boxShadow = `inset 0 0 ${vBlur}px rgba(0, 0, 0, ${vAlpha})`;
    }

    if (photoPocket) {
      photoPocket.style.borderRadius = `${state.radius}px`;
    }

    if (displayCaption) {
      displayCaption.style.color = state.inkColor;
    }

    if (polaroidCard) {
      polaroidCard.className = `polaroid-card paper-${state.paper}${isAutoSpinning ? ' auto-spinning' : ''}`;
    }

    document.body.className = `theme-${state.theme}`;
  }

  // Initial Default Placeholder Artwork
  const defaultPlaceholder = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="bgInit" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fed7aa"/>
        <stop offset="50%" stop-color="#fb923c"/>
        <stop offset="100%" stop-color="#ea580c"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgInit)"/>
    <circle cx="300" cy="230" r="100" fill="#431407" opacity="0.9"/>
    <circle cx="300" cy="240" r="85" fill="#ffedd5"/>
    <path d="M160 520 C160 370, 440 370, 440 520 Z" fill="#1e293b"/>
  </svg>`;
  
  polaroidImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(defaultPlaceholder)}`;
  applyState();

  // Text Binding
  inputCaption.addEventListener('input', (e) => {
    displayCaption.textContent = e.target.value || 'Untitled';
  });
  inputDate.addEventListener('input', (e) => {
    displayDate.textContent = e.target.value || '';
  });

  // Sliders Event Binding
  sliderHolo.addEventListener('input', (e) => {
    state.holoOpacity = e.target.value / 100;
    valHolo.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderGlare.addEventListener('input', (e) => {
    state.glareOpacity = e.target.value / 100;
    valGlare.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderBrightness.addEventListener('input', (e) => {
    state.brightness = e.target.value;
    valBrightness.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderContrast.addEventListener('input', (e) => {
    state.contrast = e.target.value;
    valContrast.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderSaturation.addEventListener('input', (e) => {
    state.saturation = e.target.value;
    valSaturation.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderWarmth.addEventListener('input', (e) => {
    state.warmth = e.target.value;
    valWarmth.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderVignette.addEventListener('input', (e) => {
    state.vignette = e.target.value;
    valVignette.textContent = `${e.target.value}%`;
    applyState();
  });

  sliderRadius.addEventListener('input', (e) => {
    state.radius = e.target.value;
    valRadius.textContent = `${e.target.value}px`;
    applyState();
  });

  // Buttons Handlers
  styleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      styleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.theme = btn.dataset.style;
      applyState();
    });
  });

  paperBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      paperBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.paper = btn.dataset.paper;
      applyState();
    });
  });

  inkDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      inkDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
      state.inkColor = dot.dataset.ink;
      applyState();
    });
  });

  // Reset Button
  btnReset.addEventListener('click', () => {
    state.holoOpacity = 0.45;
    state.glareOpacity = 0.35;
    state.brightness = 100;
    state.contrast = 105;
    state.saturation = 110;
    state.warmth = 15;
    state.vignette = 30;
    state.radius = 4;
    state.theme = 'rainbow';
    state.paper = 'white';
    state.inkColor = '#1e293b';

    sliderHolo.value = 45; valHolo.textContent = '45%';
    sliderGlare.value = 35; valGlare.textContent = '35%';
    sliderBrightness.value = 100; valBrightness.textContent = '100%';
    sliderContrast.value = 105; valContrast.textContent = '105%';
    sliderSaturation.value = 110; valSaturation.textContent = '110%';
    sliderWarmth.value = 15; valWarmth.textContent = '15%';
    sliderVignette.value = 30; valVignette.textContent = '30%';
    sliderRadius.value = 4; valRadius.textContent = '4px';

    styleBtns[0].click();
    paperBtns[0].click();
    inkDots[0].click();
    applyState();
  });

  // 3D Mouse Movement
  let bounds;
  function updateBounds() {
    bounds = polaroidCard.getBoundingClientRect();
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

    const left = mouseX;
    const top = mouseY;
    const center = {
      x: left - bounds.width / 2,
      y: top - bounds.height / 2
    };

    const rotateX = -(center.y / (bounds.height / 2)) * 18;
    const rotateY = (center.x / (bounds.width / 2)) * 18;

    const px = Math.min(Math.max((mouseX / bounds.width) * 100, 0), 100);
    const py = Math.min(Math.max((mouseY / bounds.height) * 100, 0), 100);

    polaroidCard.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    polaroidCard.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    polaroidCard.style.setProperty('--mx', `${px.toFixed(1)}%`);
    polaroidCard.style.setProperty('--my', `${py.toFixed(1)}%`);
    polaroidCard.style.setProperty('--posx', `${px.toFixed(1)}%`);
    polaroidCard.style.setProperty('--posy', `${py.toFixed(1)}%`);
  }

  function handlePointerLeave() {
    if (isAutoSpinning) return;
    polaroidCard.style.setProperty('--rx', '0deg');
    polaroidCard.style.setProperty('--ry', '0deg');
    polaroidCard.style.setProperty('--mx', '50%');
    polaroidCard.style.setProperty('--my', '50%');
    polaroidCard.style.setProperty('--posx', '50%');
    polaroidCard.style.setProperty('--posy', '50%');
  }

  cardScene.addEventListener('mousemove', handlePointerMove);
  cardScene.addEventListener('mouseleave', handlePointerLeave);
  cardScene.addEventListener('touchmove', handlePointerMove, { passive: true });
  cardScene.addEventListener('touchend', handlePointerLeave);

  // Mobile Gyroscope
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (isAutoSpinning || !e.gamma || !e.beta) return;
      const gamma = Math.min(Math.max(e.gamma, -35), 35);
      const beta = Math.min(Math.max(e.beta - 45, -35), 35);
      
      const rotateY = (gamma / 35) * 18;
      const rotateX = -(beta / 35) * 18;
      
      polaroidCard.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      polaroidCard.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      polaroidCard.style.setProperty('--posx', `${((gamma + 35) / 70 * 100).toFixed(1)}%`);
      polaroidCard.style.setProperty('--posy', `${((beta + 35) / 70 * 100).toFixed(1)}%`);
    });
  }

  // Upload Handling
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        polaroidImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      uploadDropzone.style.borderColor = '#f43f5e';
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
        polaroidImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Auto-Spin
  btnAutoSpin.addEventListener('click', () => {
    isAutoSpinning = !isAutoSpinning;
    if (isAutoSpinning) {
      polaroidCard.classList.add('auto-spinning');
      btnAutoSpin.textContent = '⏹️ 停止展示';
      btnAutoSpin.classList.add('btn-primary');
      btnAutoSpin.classList.remove('btn-secondary');
    } else {
      polaroidCard.classList.remove('auto-spinning');
      btnAutoSpin.textContent = '🎥 360° 悬浮展示';
      btnAutoSpin.classList.remove('btn-primary');
      btnAutoSpin.classList.add('btn-secondary');
      handlePointerLeave();
    }
  });

  // HD Exporter
  btnExport.addEventListener('click', async () => {
    const originalText = btnExport.textContent;
    btnExport.textContent = '⏳ 高清生成中...';
    btnExport.disabled = true;

    try {
      const clone = polaroidCard.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      clone.style.width = '330px';
      clone.style.height = '410px';
      clone.style.transform = 'none';
      clone.style.borderRadius = '6px';
      clone.style.boxShadow = '0 12px 36px rgba(0,0,0,0.3)';
      clone.style.padding = '16px 16px 0 16px';
      
      clone.style.setProperty('--rx', '4deg');
      clone.style.setProperty('--ry', '-6deg');
      clone.style.setProperty('--posx', '35%');
      clone.style.setProperty('--posy', '30%');
      
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      document.body.removeChild(clone);

      const link = document.createElement('a');
      const safeName = (inputCaption.value || 'Polaroid').replace(/\s+/g, '_');
      link.download = `Polaroid-${safeName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      alert('导出图片时遇到问题，您可以直接截图保存！');
    } finally {
      btnExport.textContent = originalText;
      btnExport.disabled = false;
    }
  });
});
