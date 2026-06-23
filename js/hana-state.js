/* ============================================================
   HANA STATE — Persistencia de misiones
   ============================================================ */
(function() {
  'use strict';

  const STORAGE_KEY = 'hana_misiones';
  let misionesEstado = {};

  // Load saved state
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        parsed.forEach(function(id) { misionesEstado[id] = 'taken'; });
      } else if (parsed && typeof parsed === 'object') {
        misionesEstado = parsed;
      }
    }
  } catch (e) {}

  // Pre-set missions that should start as completed
  // Caníbales — los jugadores ya la completaron antes del inicio de la campaña
  if (misionesEstado['canibales'] !== 'completed') {
    misionesEstado['canibales'] = 'completed';
  }

  // Migrate old format (pre-refactor)
  try {
    const oldSaved = localStorage.getItem('hana_misiones_tomadas');
    if (oldSaved) {
      const oldArr = JSON.parse(oldSaved);
      if (Array.isArray(oldArr)) {
        oldArr.forEach(function(id) {
          if (!misionesEstado[id]) misionesEstado[id] = 'taken';
        });
      }
      localStorage.removeItem('hana_misiones_tomadas');
      saveState();
    }
  } catch (e) {}

  // ============================================================
  // RANK UNLOCK SYSTEM
  // ============================================================
  var RANK_ORDER = ['rumor', 'mito', 'leyenda', 'plaga', 'pesadilla', 'estrella'];
  var RANK_UNLOCK_REQUIRE = 4;

  function getRangoPrevious(rangoName) {
    var idx = RANK_ORDER.indexOf(rangoName);
    if (idx <= 0) return null;
    return RANK_ORDER[idx - 1];
  }

  function contarCompletadasEnRango(rangoName) {
    var cards = document.querySelectorAll('.rango[data-rango="' + rangoName + '"] .mision');
    var count = 0;
    cards.forEach(function(card) {
      var id = card.getAttribute('data-id');
      if (misionesEstado[id] === 'completed') count++;
    });
    return count;
  }

  function isRangoUnlocked(rangoName) {
    if (rangoName === 'rumor') return true;
    var prev = getRangoPrevious(rangoName);
    if (!prev) return true;
    return contarCompletadasEnRango(prev) >= RANK_UNLOCK_REQUIRE;
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(misionesEstado)); } catch (e) {}
  }

  // Expose via shared namespace
  window.HanaApp = window.HanaApp || {};
  window.HanaApp.state = misionesEstado;
  window.HanaApp.saveState = saveState;
  window.HanaApp.RANK_ORDER = RANK_ORDER;
  window.HanaApp.RANK_UNLOCK_REQUIRE = RANK_UNLOCK_REQUIRE;
  window.HanaApp.isRangoUnlocked = isRangoUnlocked;
  window.HanaApp.contarCompletadasEnRango = contarCompletadasEnRango;
  window.HanaApp.getRangoPrevious = getRangoPrevious;
})();
