document.addEventListener('DOMContentLoaded', () => {
  // 1. Video Element Safeguard
  const video = document.getElementById('proposalVideo');
  if (video) {
    // Ensure playsinline behavior on iOS Safari
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
  }

  // 2. Birthday Candle & Unseal Logic
  const flame = document.getElementById('candleFlame');
  const blowBtn = document.getElementById('blowBtn');
  const letter = document.getElementById('sealedLetter');
  const halo = document.querySelector('.glow-halo');

  function extinguishCandle() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    if (halo) halo.style.display = 'none';

    blowBtn.textContent = 'Wish Sealed & Letter Unsealed \u2665';
    blowBtn.disabled = true;

    // Smooth reveal of the parchment letter
    setTimeout(() => {
      letter.classList.remove('hidden');
      letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
  }

  if (flame && blowBtn) {
    flame.addEventListener('click', extinguishCandle);
    blowBtn.addEventListener('click', extinguishCandle);
  }
});
