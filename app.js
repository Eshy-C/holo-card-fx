/**
 * HoloCard FX - 3D Interactive Holographic Card Engine & Sound Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const holoCard = document.getElementById('holoCard');
  const cardScene = document.getElementById('cardScene');
  
  // Inputs & Displays
  const inputName = document.getElementById('inputName');
  const displayName = document.getElementById('displayName');
  
  const inputRarity = document.getElementById('inputRarity');
  const displayRarity = document.getElementById('displayRarity');
  
  const inputType = document.getElementById('inputType');
  const displayType = document.getElementById('displayType');
  
  const inputNumber = document.getElementById('inputNumber');
  const displayNumber = document.getElementById('displayNumber');
  
  const inputHp = document.getElementById('inputHp');
  const displayHp = document.getElementById('displayHp');
  
  const inputAtk = document.getElementById('inputAtk');
  const displayAtk = document.getElementById('displayAtk');
  
  const inputSkillName = document.getElementById('inputSkillName');
  const displaySkillName = document.getElementById('displaySkillName');
  
  const inputSkillDesc = document.getElementById('inputSkillDesc');
  const displaySkillDesc = document.getElementById('displaySkillDesc');
  
  const imageInput = document.getElementById('imageInput');
  const cardImage = document.getElementById('cardImage');
  const uploadDropzone = document.getElementById('uploadDropzone');
  
  // Toggles & Actions
  const togglePopout = document.getElementById('togglePopout');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const btnAutoSpin = document.getElementById('btnAutoSpin');
  const btnRandom = document.getElementById('btnRandom');
  const btnExport = document.getElementById('btnExport');
  const styleBtns = document.querySelectorAll('.style-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  let isAutoSpinning = false;
  let isSoundEnabled = true;

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
    if (now - lastSoundTime < 80) return; // throttle audio rate
    lastSoundTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // High-pitched crystal frequency (1200Hz - 2400Hz)
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
    } catch (e) {
      // AudioContext policy fallback
    }
  }

  function playSSRChime() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
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

  // Sound Toggle Button
  btnSoundToggle.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    btnSoundToggle.textContent = isSoundEnabled ? '🔊 音效: 开' : '🔇 音效: 关';
    btnSoundToggle.style.color = isSoundEnabled ? '#e2e8f0' : '#94a3b8';
    if (isSoundEnabled) getAudioContext();
  });

  // Preset Images
  const presets = {
    agent: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    dragon: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  };

  // 1. Dynamic Text & Value Binding
  function bindInput(input, display, formatter = (v) => v) {
    input.addEventListener('input', (e) => {
      display.textContent = formatter(e.target.value);
    });
  }

  bindInput(inputName, displayName);
  bindInput(inputRarity, displayRarity);
  bindInput(inputType, displayType);
  bindInput(inputNumber, displayNumber);
  bindInput(inputHp, displayHp);
  bindInput(inputAtk, displayAtk);
  bindInput(inputSkillName, displaySkillName);
  bindInput(inputSkillDesc, displaySkillDesc);

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

    // Movement speed for audio trigger
    const deltaX = Math.abs(clientX - lastX);
    const deltaY = Math.abs(clientY - lastY);
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    lastX = clientX;
    lastY = clientY;

    if (speed > 8) {
      playShimmerSound(Math.min(speed / 20, 2));
    }

    const left = mouseX;
    const top = mouseY;
    const center = {
      x: left - bounds.width / 2,
      y: top - bounds.height / 2
    };

    // Calculate rotation (-22deg to +22deg)
    const rotateX = -(center.y / (bounds.height / 2)) * 22;
    const rotateY = (center.x / (bounds.width / 2)) * 22;

    // Percentages for gradient positions
    const px = Math.min(Math.max((mouseX / bounds.width) * 100, 0), 100);
    const py = Math.min(Math.max((mouseY / bounds.height) * 100, 0), 100);

    // Apply CSS Custom Properties
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
  cardScene.addEventListener('touchmove', handlePointerMove);
  cardScene.addEventListener('touchend', handlePointerLeave);

  // 3. 3D Pop-out Toggle
  togglePopout.addEventListener('change', (e) => {
    if (e.target.checked) {
      holoCard.classList.add('popout-enabled');
    } else {
      holoCard.classList.remove('popout-enabled');
    }
  });

  // 4. Avatar Blend Filters
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      // Update body filter class
      document.body.classList.remove('filter-normal', 'filter-cyber', 'filter-gold', 'filter-holo', 'filter-dither');
      document.body.classList.add(`filter-${filter}`);
      playShimmerSound(1.5);
    });
  });

  // 5. Theme / Foil Texture Switching
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

  // 6. Image Upload & Drag-and-Drop
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

  // Preset Avatar Pickers
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      if (presets[preset]) {
        cardImage.src = presets[preset];
        playShimmerSound(1.2);
      }
    });
  });

  // 7. 🎥 Auto-Spin Video Recording Mode
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

  // 8. 🎲 Randomizer for Fun Stats
  const randomPool = [
    {
      name: 'Kai · 赛博炼金术士',
      rarity: 'UR · SECRET',
      type: '⚡ AI / Compute',
      number: `NO. ${Math.floor(Math.random() * 900 + 100)} / 999`,
      hp: 12500,
      atk: 9900,
      skill: '超弦并发协议 (Hyper-Thread)',
      desc: '一次性调度 1024 个后台 Agent，在内存溢出前瞬间吞噬整个业务需求。',
      style: 'cosmic',
      filter: 'cyber'
    },
    {
      name: '量子猫咪 · 降维打击',
      rarity: 'SSR · LEGEND',
      type: '🔮 Python / Void',
      number: `NO. ${Math.floor(Math.random() * 900 + 100)} / 999`,
      hp: 8800,
      atk: 10800,
      skill: '踩踏物理键盘 (Cat On Keyboard)',
      desc: '用肉垫优雅地按下一串随机字符并强制 git push -f 到 main 主分支。',
      style: 'cyber',
      filter: 'holo'
    },
    {
      name: '黄金架构师 · 零 Bug 领域',
      rarity: 'CYBER · GOD',
      type: '☕ Java / Engine',
      number: `NO. ${Math.floor(Math.random() * 900 + 100)} / 999`,
      hp: 19999,
      atk: 14500,
      skill: '垃圾回收结界 (Full GC Buster)',
      desc: '在毫秒间清空所有技术债务，让服务器 CPU 利用率恒定在最优雅的 42%。',
      style: 'gold',
      filter: 'gold'
    },
    {
      name: '时空碎钻 · 极光幻影',
      rarity: 'HOLO · SPEC',
      type: '🌌 Quantum / Space',
      number: `NO. ${Math.floor(Math.random() * 900 + 100)} / 999`,
      hp: 9200,
      atk: 8900,
      skill: '视差全息棱镜 (Prism Refraction)',
      desc: '折射出五彩斑斓的黑与流光溢彩的白，直接震撼产品经理的视觉审美。',
      style: 'diamond',
      filter: 'dither'
    }
  ];

  btnRandom.addEventListener('click', () => {
    const item = randomPool[Math.floor(Math.random() * randomPool.length)];
    
    inputName.value = item.name;
    displayName.textContent = item.name;
    
    inputRarity.value = item.rarity;
    displayRarity.textContent = item.rarity;
    
    inputType.value = item.type;
    displayType.textContent = item.type;
    
    inputNumber.value = item.number;
    displayNumber.textContent = item.number;
    
    inputHp.value = item.hp;
    displayHp.textContent = item.hp;
    
    inputAtk.value = item.atk;
    displayAtk.textContent = item.atk;
    
    inputSkillName.value = item.skill;
    displaySkillName.textContent = item.skill;
    
    inputSkillDesc.value = item.desc;
    displaySkillDesc.textContent = item.desc;

    // Trigger Style & Filter
    const targetStyleBtn = document.querySelector(`.style-btn[data-style="${item.style}"]`);
    if (targetStyleBtn) targetStyleBtn.click();

    const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${item.filter}"]`);
    if (targetFilterBtn) targetFilterBtn.click();

    playSSRChime();
  });

  // 9. 📸 Card Snapshot Export
  btnExport.addEventListener('click', async () => {
    const originalText = btnExport.textContent;
    btnExport.textContent = '⏳ 生成中...';
    btnExport.disabled = true;

    try {
      // Temporarily remove 3D transform for clean screenshot
      const prevTransform = holoCard.style.transform;
      holoCard.style.transform = 'none';

      const canvas = await html2canvas(holoCard, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      holoCard.style.transform = prevTransform;

      // Download trigger
      const link = document.createElement('a');
      link.download = `HoloCard-${inputName.value.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('导出图片时遇到问题，您可以直接对卡片进行截图保存！');
    } finally {
      btnExport.textContent = originalText;
      btnExport.disabled = false;
    }
  });
});
