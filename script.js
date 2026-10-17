document.addEventListener('DOMContentLoaded', () => {
  // Birthday Candle & Letter Unseal
  const flame = document.getElementById('candleFlame');
  const glow = document.getElementById('candleGlow');
  const blowBtn = document.getElementById('blowBtn');
  const letter = document.getElementById('sealedLetter');

  function makeWish() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    if (glow) glow.style.display = 'none';

    blowBtn.textContent = 'Wish Sealed & Letter Unsealed \u2665';
    blowBtn.style.borderColor = '#b88648';
    blowBtn.style.color = '#b88648';
    blowBtn.disabled = true;

    // Smooth scroll down to reveal the parchment letter
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
