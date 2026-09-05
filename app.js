/**
 * HoloCard FX - Authentic 3D Polaroid Engine & Exporter
 */

document.addEventListener('DOMContentLoaded', () => {
  const polaroidCard = document.getElementById('polaroidCard');
  const cardScene = document.getElementById('cardScene');
  
  const inputCaption = document.getElementById('inputCaption');
  const displayCaption = document.getElementById('displayCaption');
  
  const inputDate = document.getElementById('inputDate');
  const displayDate = document.getElementById('displayDate');
  
  const imageInput = document.getElementById('imageInput');
  const polaroidImage = document.getElementById('polaroidImage');
  const uploadDropzone = document.getElementById('uploadDropzone');
  
  const btnAutoSpin = document.getElementById('btnAutoSpin');
  const btnExport = document.getElementById('btnExport');
  const styleBtns = document.querySelectorAll('.style-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  let isAutoSpinning = false;

  // Generate robust Base64 SVG Data URIs with encodeURIComponent
  function generatePresetSVG(type) {
    let svg = '';
    if (type === 'portrait') {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="bgP" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fed7aa"/>
            <stop offset="50%" stop-color="#fb923c"/>
            <stop offset="100%" stop-color="#ea580c"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bgP)"/>
        <circle cx="300" cy="230" r="100" fill="#431407" opacity="0.9"/>
        <circle cx="300" cy="240" r="85" fill="#ffedd5"/>
        <path d="M160 520 C160 370, 440 370, 440 520 Z" fill="#1e293b"/>
      </svg>`;
    } else if (type === 'cat') {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="catBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#catBg)"/>
        <circle cx="300" cy="340" r="160" fill="#fbbf24"/>
        <polygon points="180,260 210,130 280,210" fill="#d97706"/>
        <polygon points="420,260 390,130 320,210" fill="#d97706"/>
        <circle cx="240" cy="320" r="18" fill="#1e293b"/>
        <circle cx="360" cy="320" r="18" fill="#1e293b"/>
        <circle cx="245" cy="315" r="6" fill="#ffffff"/>
        <circle cx="365" cy="315" r="6" fill="#ffffff"/>
        <polygon points="300,360 288,348 312,348" fill="#f43f5e"/>
      </svg>`;
    } else {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="scenBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="40%" stop-color="#fb923c"/>
            <stop offset="70%" stop-color="#fed7aa"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#scenBg)"/>
        <circle cx="300" cy="260" r="90" fill="#ffffff" opacity="0.95"/>
        <polygon points="300,200 520,540 80,540" fill="#1e1b4b"/>
        <polygon points="300,200 360,290 240,290" fill="#ffffff"/>
      </svg>`;
    }
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  // Set default initial image safely
  polaroidImage.src = generatePresetSVG('portrait');

  // Text Binding
  inputCaption.addEventListener('input', (e) => {
    displayCaption.textContent = e.target.value || 'Untitled';
  });
  inputDate.addEventListener('input', (e) => {
    displayDate.textContent = e.target.value || '';
  });

  // 3D Tilt & Light Physics
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

  // Style Selector
  styleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      styleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const style = btn.dataset.style;
      document.body.className = `theme-${style}`;
    });
  });

  // Image Upload & Drag-and-Drop
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

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      polaroidImage.src = generatePresetSVG(preset);
    });
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

  // HD Polaroid Snapshot Exporter with Balanced Natural Glare
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
      clone.style.background = '#fdfdfd';
      clone.style.padding = '16px 16px 0 16px';
      
      // Inject ideal balanced natural lighting angles for export
      clone.style.setProperty('--rx', '4deg');
      clone.style.setProperty('--ry', '-6deg');
      clone.style.setProperty('--posx', '35%');
      clone.style.setProperty('--posy', '30%');
      
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 3, // 3x Ultra HD
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
