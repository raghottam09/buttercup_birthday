document.addEventListener('DOMContentLoaded', () => {
  // 1. Ensure Video has native mobile attributes
  const video = document.getElementById('proposalVideo');
  if (video) {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
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
