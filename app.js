/**
 * HoloCard FX - Pro Polaroid Studio
 * Direct DOM Reactivity + Dual Distinct Couple Cards + Playwright & Canvas 2D
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const cardScene = document.getElementById('cardScene');
  const stageHintText = document.getElementById('stageHintText');
  
  // Single Card Elements
  const polaroidCard = document.getElementById('polaroidCard');
  const photoPocket = document.getElementById('photoPocket');
  const polaroidImage = document.getElementById('polaroidImage');
  const filmGlare = document.getElementById('filmGlare');
  const filmHologram = document.getElementById('filmHologram');
  const photoVignette = document.getElementById('photoVignette');
  const inputCaption = document.getElementById('inputCaption');
  const displayCaption = document.getElementById('displayCaption');
  const inputDate = document.getElementById('inputDate');
  const displayDate = document.getElementById('displayDate');

  // Dual Cards Elements
  const coupleCardsWrap = document.getElementById('coupleCardsWrap');
  const polaroidCard1 = document.getElementById('polaroidCard1');
  const photoPocket1 = document.getElementById('photoPocket1');
  const polaroidImage1 = document.getElementById('polaroidImage1');
  const filmGlare1 = document.getElementById('filmGlare1');
  const filmHologram1 = document.getElementById('filmHologram1');
  const photoVignette1 = document.getElementById('photoVignette1');
  const inputCaption1 = document.getElementById('inputCaption1');
  const displayCaption1 = document.getElementById('displayCaption1');

  const polaroidCard2 = document.getElementById('polaroidCard2');
  const photoPocket2 = document.getElementById('photoPocket2');
  const polaroidImage2 = document.getElementById('polaroidImage2');
  const filmGlare2 = document.getElementById('filmGlare2');
  const filmHologram2 = document.getElementById('filmHologram2');
  const photoVignette2 = document.getElementById('photoVignette2');
  const inputCaption2 = document.getElementById('inputCaption2');
  const displayCaption2 = document.getElementById('displayCaption2');

  const inputDateDual = document.getElementById('inputDateDual');
  const displayDate1 = document.getElementById('displayDate1');
  const displayDate2 = document.getElementById('displayDate2');

  // Mode Tabs & Upload Wrappers
  const tabSingle = document.getElementById('tabSingle');
  const tabDual = document.getElementById('tabDual');
  const singleUploadWrap = document.getElementById('singleUploadWrap');
  const dualUploadWrap = document.getElementById('dualUploadWrap');
  const singleInputsWrap = document.getElementById('singleInputsWrap');
  const dualInputsWrap = document.getElementById('dualInputsWrap');
  
  const imageInput = document.getElementById('imageInput');
  const uploadDropzone = document.getElementById('uploadDropzone');
  const imageInput1 = document.getElementById('imageInput1');
  const uploadDropzone1 = document.getElementById('uploadDropzone1');
  const imageInput2 = document.getElementById('imageInput2');
  const uploadDropzone2 = document.getElementById('uploadDropzone2');
  
  const slotText1 = document.getElementById('slotText1');
  const slotText2 = document.getElementById('slotText2');
  
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

  // Button Groups & Ink Picker
  const styleBtns = document.querySelectorAll('.style-btn');
  const paperBtns = document.querySelectorAll('.paper-btn');
  const inkDots = document.querySelectorAll('.ink-dot');
  const inkColorPicker = document.getElementById('inkColorPicker');
  const customInkWrap = document.getElementById('customInkWrap');
  const palettePreview = document.getElementById('palettePreview');
  const inkHexBadge = document.getElementById('inkHexBadge');

  let isAutoSpinning = false;

  // Global State
  const state = {
    mode: 'single', // 'single' | 'dual'
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

  // Default Placeholders (SVG Data URIs)
  const defaultPlaceholderSingle = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
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
  </svg>`)}`;

  const defaultPlaceholderLeft = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="bgLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bae6fd"/>
        <stop offset="50%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgLeft)"/>
    <circle cx="300" cy="230" r="100" fill="#0f172a" opacity="0.85"/>
    <circle cx="300" cy="240" r="85" fill="#e0f2fe"/>
    <path d="M160 520 C160 370, 440 370, 440 520 Z" fill="#0369a1"/>
    <text x="300" y="560" fill="#ffffff" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">TA (Left)</text>
  </svg>`)}`;

  const defaultPlaceholderRight = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="bgRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbcfe8"/>
        <stop offset="50%" stop-color="#f472b6"/>
        <stop offset="100%" stop-color="#db2777"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgRight)"/>
    <circle cx="300" cy="230" r="100" fill="#4a044e" opacity="0.85"/>
    <circle cx="300" cy="240" r="85" fill="#fdf2f8"/>
    <path d="M160 520 C160 370, 440 370, 440 520 Z" fill="#be185d"/>
    <text x="300" y="560" fill="#ffffff" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">ME (Right)</text>
  </svg>`)}`;

  polaroidImage.src = defaultPlaceholderSingle;
  polaroidImage1.src = defaultPlaceholderLeft;
  polaroidImage2.src = defaultPlaceholderRight;

  // ========================================================
  // ⚡ Direct State Applier (Real-time 0ms DOM Rendering)
  // ========================================================
  function applyState() {
    const filterStyle = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%) sepia(${state.warmth}%)`;
    
    // Apply filters to all photos
    if (polaroidImage) polaroidImage.style.filter = filterStyle;
    if (polaroidImage1) polaroidImage1.style.filter = filterStyle;
    if (polaroidImage2) polaroidImage2.style.filter = filterStyle;

    // Toggle Single vs Dual on Stage and Controls
    if (state.mode === 'dual') {
      if (polaroidCard) polaroidCard.style.display = 'none';
      if (coupleCardsWrap) coupleCardsWrap.style.display = 'flex';
      if (singleUploadWrap) singleUploadWrap.style.display = 'none';
      if (dualUploadWrap) dualUploadWrap.style.display = 'grid';
      if (singleInputsWrap) singleInputsWrap.style.display = 'none';
      if (dualInputsWrap) dualInputsWrap.style.display = 'block';
      tabSingle.classList.remove('active');
      tabDual.classList.add('active');
      if (stageHintText) stageHintText.textContent = '👫 晃动鼠标体验 3D 情侣双卡悬浮光影';
    } else {
      if (polaroidCard) polaroidCard.style.display = 'flex';
      if (coupleCardsWrap) coupleCardsWrap.style.display = 'none';
      if (singleUploadWrap) singleUploadWrap.style.display = 'block';
      if (dualUploadWrap) dualUploadWrap.style.display = 'none';
      if (singleInputsWrap) singleInputsWrap.style.display = 'grid';
      if (dualInputsWrap) dualInputsWrap.style.display = 'none';
      tabSingle.classList.add('active');
      tabDual.classList.remove('active');
      if (stageHintText) stageHintText.textContent = '✨ 晃动鼠标体验 3D 悬浮与实时参数渲染';
    }

    // Hologram Opacity
    [filmHologram, filmHologram1, filmHologram2].forEach((h) => {
      if (h) h.style.opacity = state.holoOpacity;
    });

    // Glare Opacity
    [filmGlare, filmGlare1, filmGlare2].forEach((g) => {
      if (g) g.style.opacity = state.glareOpacity;
    });

    // Vignette
    const vBlur = Math.round((state.vignette / 100) * 60);
    const vAlpha = (state.vignette / 100) * 0.7;
    [photoVignette, photoVignette1, photoVignette2].forEach((v) => {
      if (v) v.style.boxShadow = `inset 0 0 ${vBlur}px rgba(0, 0, 0, ${vAlpha})`;
    });

    // Radius
    [photoPocket, photoPocket1, photoPocket2].forEach((p) => {
      if (p) p.style.borderRadius = `${state.radius}px`;
    });

    // Ink Color
    [displayCaption, displayCaption1, displayCaption2].forEach((c) => {
      if (c) c.style.color = state.inkColor;
    });

    // Paper Tones
    if (polaroidCard) {
      polaroidCard.className = `polaroid-card paper-${state.paper}${isAutoSpinning ? ' auto-spinning' : ''}`;
    }
    if (polaroidCard1) {
      polaroidCard1.className = `polaroid-card polaroid-card-dual card-left paper-${state.paper}`;
    }
    if (polaroidCard2) {
      polaroidCard2.className = `polaroid-card polaroid-card-dual card-right paper-${state.paper}`;
    }
    if (coupleCardsWrap) {
      coupleCardsWrap.className = `couple-cards-pair${isAutoSpinning ? ' auto-spinning' : ''}`;
    }

    document.body.className = `theme-${state.theme}`;
  }

  applyState();

  // Mode Switch Tabs
  tabSingle.addEventListener('click', () => {
    state.mode = 'single';
    applyState();
  });

  tabDual.addEventListener('click', () => {
    state.mode = 'dual';
    applyState();
  });

  // Text Bindings
  inputCaption.addEventListener('input', (e) => {
    displayCaption.textContent = e.target.value || 'Untitled';
  });
  inputDate.addEventListener('input', (e) => {
    displayDate.textContent = e.target.value || '';
  });

  inputCaption1.addEventListener('input', (e) => {
    displayCaption1.textContent = e.target.value || 'Untitled';
  });
  inputCaption2.addEventListener('input', (e) => {
    displayCaption2.textContent = e.target.value || 'Untitled';
  });
  inputDateDual.addEventListener('input', (e) => {
    const val = e.target.value || '';
    displayDate1.textContent = val;
    displayDate2.textContent = val;
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

  // Style Buttons
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

  function setInkColor(color, isCustom = false) {
    state.inkColor = color;
    if (inkHexBadge) inkHexBadge.textContent = color.toUpperCase();
    if (inkColorPicker) inkColorPicker.value = color.length === 7 ? color : '#1e293b';
    if (palettePreview) palettePreview.style.background = color;

    if (isCustom) {
      inkDots.forEach((d) => d.classList.remove('active'));
      if (customInkWrap) customInkWrap.classList.add('active');
    } else {
      if (customInkWrap) customInkWrap.classList.remove('active');
    }
    applyState();
  }

  inkDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      inkDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
      setInkColor(dot.dataset.ink, false);
    });
  });

  if (inkColorPicker) {
    const handleCustomColor = (e) => {
      setInkColor(e.target.value, true);
    };
    inkColorPicker.addEventListener('input', handleCustomColor);
    inkColorPicker.addEventListener('change', handleCustomColor);
  }

  // Reset Button
  btnReset.addEventListener('click', () => {
    state.mode = 'single';
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

    sliderHolo.value = 45; valHolo.textContent = '45%';
    sliderGlare.value = 35; valGlare.textContent = '35%';
    sliderBrightness.value = 100; valBrightness.textContent = '100%';
    sliderContrast.value = 105; valContrast.textContent = '105%';
    sliderSaturation.value = 110; valSaturation.textContent = '110%';
    sliderWarmth.value = 15; valWarmth.textContent = '15%';
    sliderVignette.value = 30; valVignette.textContent = '30%';
    sliderRadius.value = 4; valRadius.textContent = '4px';

    inputCaption.value = 'Summer Vibes · 2026';
    displayCaption.textContent = 'Summer Vibes · 2026';
    inputDate.value = '2026.09.05 / Tokyo';
    displayDate.textContent = '2026.09.05 / Tokyo';

    inputCaption1.value = 'His Smile · 2026';
    displayCaption1.textContent = 'His Smile · 2026';
    inputCaption2.value = 'Her World · 2026';
    displayCaption2.textContent = 'Her World · 2026';
    inputDateDual.value = '2026.09.05 / Together';
    displayDate1.textContent = '2026.09.05 / Together';
    displayDate2.textContent = '2026.09.05 / Together';

    styleBtns[0].click();
    paperBtns[0].click();
    inkDots[0].click();
    setInkColor('#1e293b', false);
    applyState();
  });

  // 3D Motion
  let bounds;
  function updateBounds() {
    bounds = cardScene.getBoundingClientRect();
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

    const rotateX = -(center.y / (bounds.height / 2)) * 16;
    const rotateY = (center.x / (bounds.width / 2)) * 16;

    const px = Math.min(Math.max((mouseX / bounds.width) * 100, 0), 100);
    const py = Math.min(Math.max((mouseY / bounds.height) * 100, 0), 100);

    const cardsToUpdate = [polaroidCard, polaroidCard1, polaroidCard2];
    cardsToUpdate.forEach((c) => {
      if (!c) return;
      c.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      c.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      c.style.setProperty('--mx', `${px.toFixed(1)}%`);
      c.style.setProperty('--my', `${py.toFixed(1)}%`);
      c.style.setProperty('--posx', `${px.toFixed(1)}%`);
      c.style.setProperty('--posy', `${py.toFixed(1)}%`);
    });
  }

  function handlePointerLeave() {
    if (isAutoSpinning) return;
    const cardsToUpdate = [polaroidCard, polaroidCard1, polaroidCard2];
    cardsToUpdate.forEach((c) => {
      if (!c) return;
      c.style.setProperty('--rx', '0deg');
      c.style.setProperty('--ry', '0deg');
      c.style.setProperty('--mx', '50%');
      c.style.setProperty('--my', '50%');
      c.style.setProperty('--posx', '50%');
      c.style.setProperty('--posy', '50%');
    });
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
      
      const rotateY = (gamma / 35) * 16;
      const rotateX = -(beta / 35) * 16;
      
      const cardsToUpdate = [polaroidCard, polaroidCard1, polaroidCard2];
      cardsToUpdate.forEach((c) => {
        if (!c) return;
        c.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
        c.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
        c.style.setProperty('--posx', `${((gamma + 35) / 70 * 100).toFixed(1)}%`);
        c.style.setProperty('--posy', `${((beta + 35) / 70 * 100).toFixed(1)}%`);
      });
    });
  }

  // ========================================================
  // 🖼️ Upload Handling (Single & Dual Mode)
  // ========================================================
  function handleFiles(files) {
    if (!files || files.length === 0) return;
    
    if (files.length >= 2) {
      state.mode = 'dual';
      const r1 = new FileReader();
      r1.onload = (e) => {
        polaroidImage1.src = e.target.result;
        if (slotText1) slotText1.textContent = files[0].name.slice(0, 8);
      };
      r1.readAsDataURL(files[0]);

      const r2 = new FileReader();
      r2.onload = (e) => {
        polaroidImage2.src = e.target.result;
        if (slotText2) slotText2.textContent = files[1].name.slice(0, 8);
      };
      r2.readAsDataURL(files[1]);

      applyState();
    } else {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (state.mode === 'dual') {
          polaroidImage1.src = event.target.result;
          if (slotText1) slotText1.textContent = file.name.slice(0, 8);
        } else {
          polaroidImage.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  imageInput.addEventListener('change', (e) => handleFiles(e.target.files));

  imageInput1.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        polaroidImage1.src = event.target.result;
        if (slotText1) slotText1.textContent = file.name.slice(0, 8);
      };
      reader.readAsDataURL(file);
    }
  });

  imageInput2.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        polaroidImage2.src = event.target.result;
        if (slotText2) slotText2.textContent = file.name.slice(0, 8);
      };
      reader.readAsDataURL(file);
    }
  });

  // Drag and Drop
  [uploadDropzone, uploadDropzone1, uploadDropzone2].forEach((zone) => {
    if (!zone) return;
    ['dragenter', 'dragover'].forEach((eventName) => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.style.borderColor = '#f43f5e';
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.style.borderColor = '';
      });
    });
  });

  uploadDropzone.addEventListener('drop', (e) => {
    handleFiles(e.dataTransfer.files);
  });
  uploadDropzone1.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) {
      const r = new FileReader();
      r.onload = (ev) => {
        polaroidImage1.src = ev.target.result;
        if (slotText1) slotText1.textContent = file.name.slice(0, 8);
      };
      r.readAsDataURL(file);
    }
  });
  uploadDropzone2.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) {
      const r = new FileReader();
      r.onload = (ev) => {
        polaroidImage2.src = ev.target.result;
        if (slotText2) slotText2.textContent = file.name.slice(0, 8);
      };
      r.readAsDataURL(file);
    }
  });

  // Auto-Spin
  btnAutoSpin.addEventListener('click', () => {
    isAutoSpinning = !isAutoSpinning;
    if (isAutoSpinning) {
      if (polaroidCard) polaroidCard.classList.add('auto-spinning');
      if (coupleCardsWrap) coupleCardsWrap.classList.add('auto-spinning');
      btnAutoSpin.textContent = '⏹️ 停止展示';
      btnAutoSpin.classList.add('btn-primary');
      btnAutoSpin.classList.remove('btn-secondary');
    } else {
      if (polaroidCard) polaroidCard.classList.remove('auto-spinning');
      if (coupleCardsWrap) coupleCardsWrap.classList.remove('auto-spinning');
      btnAutoSpin.textContent = '🎥 360° 悬浮展示';
      btnAutoSpin.classList.remove('btn-primary');
      btnAutoSpin.classList.add('btn-secondary');
      handlePointerLeave();
    }
  });

  // Helper for Canvas 2D Cover Crop
  function drawImageCover(ctx, img, x, y, w, h) {
    if (!img || !img.naturalWidth) {
      ctx.drawImage(img, x, y, w, h);
      return;
    }
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH;
    const targetRatio = w / h;
    let sx = 0, sy = 0, sw = imgW, sh = imgH;
    if (imgRatio > targetRatio) {
      sh = imgH;
      sw = imgH * targetRatio;
      sx = (imgW - sw) / 2;
      sy = 0;
    } else {
      sw = imgW;
      sh = imgW / targetRatio;
      sx = 0;
      sy = (imgH - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  // Draw a single Polaroid card on a 2D Canvas context
  function drawSingleCardOnCanvas(ctx, x, y, cardW, cardH, img, captionText, dateText, scale) {
    const padX = 14 * scale;
    const padY = 14 * scale;
    const photoSize = cardW - padX * 2;
    const radius = state.radius * scale;

    // 1. Paper
    let paperColor = '#fdfdfd';
    if (state.paper === 'cream') paperColor = '#fef7ea';
    else if (state.paper === 'pink') paperColor = '#fdf2f8';
    else if (state.paper === 'black') paperColor = '#18181b';

    ctx.save();
    ctx.translate(x, y);

    // Card Shadow & Base Paper
    ctx.fillStyle = paperColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, cardW, cardH, 6 * scale);
    ctx.fill();

    // 2. Photo Area (Clipped with Radius)
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(padX, padY, photoSize, photoSize, radius);
    ctx.clip();

    ctx.fillStyle = '#18181b';
    ctx.fillRect(padX, padY, photoSize, photoSize);

    ctx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%) sepia(${state.warmth}%)`;
    drawImageCover(ctx, img, padX, padY, photoSize, photoSize);
    ctx.filter = 'none';

    // 3. Glare
    if (state.glareOpacity > 0) {
      ctx.save();
      ctx.globalAlpha = state.glareOpacity;
      ctx.globalCompositeOperation = 'screen';
      const glareGrad = ctx.createLinearGradient(padX, padY, padX + photoSize, padY + photoSize);
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      glareGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.1)');
      glareGrad.addColorStop(0.7, 'transparent');
      ctx.fillStyle = glareGrad;
      ctx.fillRect(padX, padY, photoSize, photoSize);
      ctx.restore();
    }

    // 4. Hologram
    if (state.holoOpacity > 0) {
      ctx.save();
      ctx.globalAlpha = state.holoOpacity;
      ctx.globalCompositeOperation = 'screen';
      const holoGrad = ctx.createLinearGradient(padX, padY, padX + photoSize, padY + photoSize);
      if (state.theme === 'sunset') {
        holoGrad.addColorStop(0, 'rgba(255, 126, 95, 0.8)');
        holoGrad.addColorStop(0.5, 'rgba(254, 180, 123, 0.7)');
        holoGrad.addColorStop(1, 'rgba(255, 42, 109, 0.8)');
      } else if (state.theme === 'cyber') {
        holoGrad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
        holoGrad.addColorStop(0.5, 'rgba(255, 0, 85, 0.8)');
        holoGrad.addColorStop(1, 'rgba(0, 255, 102, 0.8)');
      } else if (state.theme === 'golden') {
        holoGrad.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
        holoGrad.addColorStop(0.5, 'rgba(255, 235, 160, 0.6)');
        holoGrad.addColorStop(1, 'rgba(218, 165, 32, 0.9)');
      } else {
        holoGrad.addColorStop(0, 'rgba(255, 0, 128, 0.7)');
        holoGrad.addColorStop(0.25, 'rgba(255, 140, 0, 0.7)');
        holoGrad.addColorStop(0.5, 'rgba(64, 224, 208, 0.7)');
        holoGrad.addColorStop(0.75, 'rgba(123, 104, 238, 0.7)');
        holoGrad.addColorStop(1, 'rgba(255, 0, 128, 0.7)');
      }
      ctx.fillStyle = holoGrad;
      ctx.fillRect(padX, padY, photoSize, photoSize);
      ctx.restore();
    }

    // 5. Vignette
    if (state.vignette > 0) {
      ctx.save();
      const vAlpha = (state.vignette / 100) * 0.7;
      const cx = padX + photoSize / 2;
      const cy = padY + photoSize / 2;
      const vigGrad = ctx.createRadialGradient(cx, cy, photoSize * 0.3, cx, cy, photoSize * 0.7);
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(1, `rgba(0, 0, 0, ${vAlpha})`);
      ctx.fillStyle = vigGrad;
      ctx.fillRect(padX, padY, photoSize, photoSize);
      ctx.restore();
    }

    ctx.restore(); // end photo clip

    // 6. Text
    const chinY = padY + photoSize + 6 * scale;
    const chinH = cardH - chinY;
    const textCenterY = chinY + chinH / 2;

    ctx.save();
    ctx.translate(cardW / 2, textCenterY - 9 * scale);
    ctx.rotate(-0.5 * Math.PI / 180);
    ctx.fillStyle = state.paper === 'black' ? '#f4f4f5' : state.inkColor;
    ctx.font = `bold ${21 * scale}px 'Caveat', cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(captionText || 'Untitled', 0, 0);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#64748b';
    ctx.font = `bold ${8.5 * scale}px 'JetBrains Mono', monospace, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateText || '', cardW / 2, textCenterY + 14 * scale);
    ctx.restore();

    ctx.restore(); // end card translate
  }

  // ========================================================
  // 📸 Ultra-High Definition Exporter (Playwright API + Canvas)
  // ========================================================
  btnExport.addEventListener('click', async () => {
    const originalText = btnExport.textContent;
    btnExport.textContent = '⏳ Playwright 4K 渲染中...';
    btnExport.disabled = true;

    const safeName = (state.mode === 'dual' ? 'Couples_Polaroid_Pair' : (inputCaption.value || 'Polaroid')).replace(/\s+/g, '_');

    // 1. Try Backend Playwright API first
    try {
      const response = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: state,
          mode: state.mode,
          caption: inputCaption.value || 'Untitled',
          date: inputDate.value || '',
          caption1: inputCaption1.value || 'His Smile · 2026',
          caption2: inputCaption2.value || 'Her World · 2026',
          dateDual: inputDateDual.value || '2026.09.05 / Together',
          imageSrc: polaroidImage.src,
          imageSrc1: polaroidImage1.src,
          imageSrc2: polaroidImage2.src
        })
      });

      if (response.ok && response.headers.get('Content-Type')?.includes('image/png')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Polaroid-${safeName}-Playwright.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        btnExport.textContent = originalText;
        btnExport.disabled = false;
        return;
      }
    } catch (e) {
      // Backend not running (e.g. on static GitHub Pages), fall back to Hardware 2D Canvas
    }

    // 2. Hardware 2D Canvas Direct Rendering Fallback
    try {
      const scale = 3;

      if (state.mode === 'dual') {
        const cardW = 270 * scale;
        const cardH = 345 * scale;
        const gap = 24 * scale;
        const pad = 20 * scale;
        const totalW = pad * 2 + cardW * 2 + gap;
        const totalH = pad * 2 + cardH;

        const canvas = document.createElement('canvas');
        canvas.width = totalW;
        canvas.height = totalH;
        const ctx = canvas.getContext('2d');

        // Draw Left Card (TA)
        drawSingleCardOnCanvas(
          ctx,
          pad,
          pad,
          cardW,
          cardH,
          polaroidImage1,
          inputCaption1.value || 'His Smile · 2026',
          inputDateDual.value || '2026.09.05 / Together',
          scale
        );

        // Draw Right Card (ME)
        drawSingleCardOnCanvas(
          ctx,
          pad + cardW + gap,
          pad,
          cardW,
          cardH,
          polaroidImage2,
          inputCaption2.value || 'Her World · 2026',
          inputDateDual.value || '2026.09.05 / Together',
          scale
        );

        const link = document.createElement('a');
        link.download = `Polaroid-${safeName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        const cardW = 330 * scale;
        const cardH = 410 * scale;
        const canvas = document.createElement('canvas');
        canvas.width = cardW;
        canvas.height = cardH;
        const ctx = canvas.getContext('2d');

        drawSingleCardOnCanvas(
          ctx,
          0,
          0,
          cardW,
          cardH,
          polaroidImage,
          inputCaption.value || 'Untitled',
          inputDate.value || '',
          scale
        );

        const link = document.createElement('a');
        link.download = `Polaroid-${safeName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('导出图片时遇到问题，您可以直接截图保存！');
    } finally {
      btnExport.textContent = originalText;
      btnExport.disabled = false;
    }
  });
});



