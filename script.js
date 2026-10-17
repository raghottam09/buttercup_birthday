document.addEventListener('DOMContentLoaded', () => {
  // 1. Video Loading and Tap-to-Play Fix
  const video = document.getElementById('proposalVideo');
  if (video) {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Allow clicking the screen container to trigger play/pause
    const screen = document.querySelector('.video-screen');
    if (screen) {
      screen.addEventListener('click', (e) => {
        if (e.target !== video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    }
  }

  // 2. Birthday Candle & Letter Unseal
  const flame = document.getElementById('candleFlame');
  const glow = document.getElementById('candleGlow');
  const blowBtn = document.getElementById('blowBtn');
  const letter = document.getElementById('sealedLetter');

  function makeWish() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    if (glow) glow.style.display = 'none';

    blowBtn.textContent = 'Wish Sealed & Letter Unsealed \u2665';
    blowBtn.style.background = '#8c7578';
    blowBtn.disabled = true;

    // Smooth reveal of the letter
    setTimeout(() => {
      letter.classList.remove('hidden');
      letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
  }

  if (flame && blowBtn) {
    flame.addEventListener('click', makeWish);
    blowBtn.addEventListener('click', makeWish);
  }
});
