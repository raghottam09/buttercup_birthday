document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Controller
  const audioWidget = document.getElementById('audioToggle');
  const audio = document.getElementById('bgSong');
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

  // 2. Birthday Candle & Letter Unseal
  const flame = document.getElementById('candleFlame');
  const blowBtn = document.getElementById('blowBtn');
  const letterSection = document.getElementById('sealedLetter');

  function extinguishCandle() {
    if (flame.classList.contains('extinguished')) return;

    flame.classList.add('extinguished');
    blowBtn.textContent = 'Wish Sealed &hearts;';
    blowBtn.disabled = true;

    // Reveal the letter smoothly
    setTimeout(() => {
      letterSection.classList.remove('hidden');
      letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  }

  flame.addEventListener('click', extinguishCandle);
  blowBtn.addEventListener('click', extinguishCandle);
});
