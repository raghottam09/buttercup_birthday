document.addEventListener('DOMContentLoaded', () => {

  // 1. Audio and Cinematic Intro Curtain
  const intro = document.getElementById('introCurtain');
  const enterBtn = document.getElementById('enterStoryBtn');
  const bgMusic = document.getElementById('bgMusic');
  const audioToggle = document.getElementById('audioToggleBtn');

  function unlockAndPlayAudio() {
    if (!bgMusic) return;

    bgMusic.volume = 0.5;
    
    // Direct promise handling for iOS Safari & Android Chrome
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (audioToggle) {
            audioToggle.classList.remove('muted');
            audioToggle.querySelector('.music-text').textContent = 'Playing: Sun Priye';
          }
        })
        .catch((error) => {
          console.warn('Audio play restricted by browser policy:', error);
          if (audioToggle) {
            audioToggle.classList.add('muted');
            audioToggle.querySelector('.music-text').textContent = 'Tap to Play Music';
          }
        });
    }
  }

  function startExperience(e) {
    if (e) e.stopPropagation();

    // Trigger audio synchronously on direct user gesture
    unlockAndPlayAudio();

    if (intro) {
      intro.classList.add('opened');
      setTimeout(() => {
        intro.style.display = 'none';
      }, 1100);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', startExperience, { once: true });
    enterBtn.addEventListener('touchend', startExperience, { once: true });
  }

  if (intro) {
    intro.addEventListener('click', (e) => {
      if (e.target === intro) startExperience(e);
    }, { once: true });
  }

  // Floating Sound Pill Toggle (Backup manual trigger)
  if (audioToggle && bgMusic) {
    audioToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          audioToggle.classList.remove('muted');
          audioToggle.querySelector('.music-text').textContent = 'Playing: Sun Priye';
        }).catch((err) => console.log(err));
      } else {
        bgMusic.pause();
        audioToggle.classList.add('muted');
        audioToggle.querySelector('.music-text').textContent = 'Sound: OFF';
      }
    });
  }

  // 2. Prevent Audio Overlap with Proposal Video
  const cinemaBox = document.querySelector('.cinema-box');
  if (cinemaBox && bgMusic) {
    cinemaBox.addEventListener('pointerdown', () => {
      if (!bgMusic.paused) {
        bgMusic.pause();
        if (audioToggle) {
          audioToggle.classList.add('muted');
          audioToggle.querySelector('.music-text').textContent = 'Sound: Paused for Video';
        }
      }
    });

    window.addEventListener('blur', () => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        if (bgMusic && !bgMusic.paused) {
          bgMusic.pause();
          if (audioToggle) {
            audioToggle.classList.add('muted');
            audioToggle.querySelector('.music-text').textContent = 'Sound: Paused for Video';
          }
        }
      }
    });
  }

  // 3. Falling 3D Rose Petals
  const canvas = document.getElementById('petalsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalColors = ['#c41e3a', '#e63956', '#d4af37', '#850c20', '#f8c8dc'];

    for (let i = 0; i < 35; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6,
        d: Math.random() * 2 + 1,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleInc: Math.random() * 0.05 + 0.02,
        tiltAngle: 0
      });
    }

    function drawPetals() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.d) + 1 + p.r / 6);
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.y > height) {
          petals[i].x = Math.random() * width;
          petals[i].y = -20;
        }
      }
      requestAnimationFrame(drawPetals);
    }
    drawPetals();
  }

  // 4. Golden Sparklers on Candle Blowout
  const flame = document.getElementById('candleFlame');
  const glow = document.getElementById('candleGlow');
  const blowBtn = document.getElementById('blowBtn');
  const letter = document.getElementById('sealedLetter');

  function triggerSparklerExplosion() {
    const particles = 80;
    const body = document.body;
    const rect = flame.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < particles; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'fixed';
      spark.style.width = Math.random() * 6 + 3 + 'px';
      spark.style.height = spark.style.width;
      spark.style.backgroundColor = ['#d4af37', '#ff2a55', '#fff', '#f8c8dc'][Math.floor(Math.random() * 4)];
      spark.style.borderRadius = '50%';
      spark.style.boxShadow = '0 0 10px #d4af37';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';
      spark.style.left = originX + 'px';
      spark.style.top = originY + 'px';
      body.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 60;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;

      spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 1200 + 800,
        easing: 'cubic-bezier(0, .9, .57, 1)'
      }).onfinish = () => spark.remove();
    }
  }

  function makeWish() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    if (glow) glow.style.display = 'none';

    triggerSparklerExplosion();

    blowBtn.textContent = 'WISH SEALED \u2665 LETTER REVEALED';
    blowBtn.style.background = '#2a1a1f';
    blowBtn.style.borderColor = '#d4af37';
    blowBtn.disabled = true;

    setTimeout(() => {
      letter.classList.remove('hidden');
      letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  }

  if (flame && blowBtn) {
    flame.addEventListener('click', makeWish);
    blowBtn.addEventListener('click', makeWish);
  }
});
