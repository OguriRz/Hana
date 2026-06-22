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

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(misionesEstado)); } catch (e) {}
  }

  // Expose via shared namespace
  window.HanaApp = window.HanaApp || {};
  window.HanaApp.state = misionesEstado;
  window.HanaApp.saveState = saveState;
})();
