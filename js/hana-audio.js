/* ============================================================
   HANA AUDIO — Música de fondo con control flotante
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;

  var audioEl = document.getElementById('bgmAudio');
  var musicCtrl = document.getElementById('musicCtrl');
  var musicIcon = document.getElementById('musicIcon');
  var audioStarted = false;
  var audioMuted = false;

  function iniciarAudio() {
    if (audioStarted || !audioEl) return;
    audioStarted = true;

    audioEl.volume = 0.25;
    var playPromise = audioEl.play();

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(function() {
        if (musicCtrl) musicCtrl.classList.add('playing');
      }).catch(function() {
        audioStarted = false;
      });
    } else {
      if (musicCtrl) musicCtrl.classList.add('playing');
    }
  }

  function toggleAudio() {
    if (!audioEl) return;
    if (!audioStarted) {
      iniciarAudio();
      return;
    }
    audioMuted = !audioMuted;
    audioEl.muted = audioMuted;
    musicCtrl.classList.toggle('muted', audioMuted);
  }

  // Try autoplay immediately
  iniciarAudio();

  // Fallback: start on first user interaction
  function firstInteraction() {
    if (!audioStarted) iniciarAudio();
    document.removeEventListener('click', firstInteraction);
    document.removeEventListener('touchstart', firstInteraction);
  }
  document.addEventListener('click', firstInteraction);
  document.addEventListener('touchstart', firstInteraction);

  // Music control button toggle
  if (musicCtrl) {
    musicCtrl.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleAudio();
    });
  }

  // Expose
  HanaApp.audio = {
    iniciar: iniciarAudio,
    toggle: toggleAudio
  };
})();
