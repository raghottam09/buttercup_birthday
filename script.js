document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Controller (Safely checks if widget exists)
  const audioWidget = document.getElementById('audioToggle');
  const audio = document.getElementById('bgSong');

  if (audioWidget && audio) {
    const audioLabel = audioWidget.querySelector('.audio-label');
    audioWidget.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          audioWidget.classList.add('playing');
          audioLabel.textContent = 'Pause Music';
        }).catch(err => {
          console.error("Audio playback interrupted:", err);
        });
      } else {
        audio.pause();
        audioWidget.classList.remove('playing');
        audioLabel.textContent = 'Listen to Anbe’s Song';
      }
    });
  }

  // 2. Birthday Candle & Letter Unseal
  const flame = document.getElementById('candleFlame');
  const blowBtn = document.getElementById('blowBtn');
  const letterSection = document.getElementById('sealedLetter');

  function extinguishCandle() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    blowBtn.textContent = 'Wish Sealed \u2665';
    blowBtn.disabled = true;

    // Smooth reveal of the letter
    setTimeout(() => {
      letterSection.classList.remove('hidden');
      letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  }

  if (flame && blowBtn) {
    flame.addEventListener('click', extinguishCandle);
    blowBtn.addEventListener('click', extinguishCandle);
  }
});
