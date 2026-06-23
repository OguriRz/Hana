/* ============================================================
   HANA MISSIONS — Lógica de misiones (tomar, completar, reset)
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;
  if (!HanaApp) throw new Error('hana-state.js must be loaded first');

  // ============================================================
  // UPDATE CARD VISUALS
  // ============================================================
  function actualizarCard(id) {
    var estado = HanaApp.state[id];
    var card = document.querySelector('.mision[data-id="' + id + '"]');
    if (!card) return;

    card.classList.remove('taken', 'completed');

    var btn = card.querySelector('.mision-boton');
    if (!btn) return;

    if (estado === 'taken') {
      card.classList.add('taken');
      btn.textContent = 'En Progreso';
      btn.disabled = false;
    } else if (estado === 'completed') {
      card.classList.add('completed');
      btn.textContent = '✓ Completada';
      btn.disabled = true;
    }
  }

  // ============================================================
  // MODAL — Reset UI helpers
  // ============================================================
  function resetModalUI() {
    document.querySelector('.hana-modal-titulo').textContent = 'Confirmar Finalización';
    document.querySelector('.hana-modal-btn.confirm').textContent = '✓ Completar Misión';
  }

  // Exposed globally for inline onclick handlers
  window.cancelarConfirmacion = function() {
    var modal = document.getElementById('confirmModal');
    modal.classList.remove('visible');
    if (modal.dataset.targetId === '__RESET_ALL__') resetModalUI();
    modal.dataset.targetId = '';
  };

  window.confirmarCompletar = function() {
    var modal = document.getElementById('confirmModal');
    var id = modal.dataset.targetId;
    if (!id) return;

    if (id === '__RESET_ALL__') {
      // Reiniciar todo
      Object.keys(HanaApp.state).forEach(function(k) { delete HanaApp.state[k]; });
      HanaApp.saveState();
      document.querySelectorAll('.mision').forEach(function(card) {
        actualizarCard(card.getAttribute('data-id'));
      });
      modal.classList.remove('visible');
      resetModalUI();
      if (HanaApp.mostrarToast) HanaApp.mostrarToast('🔄 Todas las misiones han sido reiniciadas');
      if (HanaApp.actualizarEstadisticas) HanaApp.actualizarEstadisticas();
      if (HanaApp.actualizarProgresoRangos) HanaApp.actualizarProgresoRangos();
      if (HanaApp.actualizarBloqueos) HanaApp.actualizarBloqueos();
      return;
    }

    if (HanaApp.state[id] !== 'taken') return;

    HanaApp.state[id] = 'completed';
    HanaApp.saveState();
    actualizarCard(id);
    modal.classList.remove('visible');
    if (HanaApp.mostrarToast) HanaApp.mostrarToast('✅ Misión completada — ¡Buen trabajo!');
    if (HanaApp.actualizarEstadisticas) HanaApp.actualizarEstadisticas();
    if (HanaApp.actualizarProgresoRangos) HanaApp.actualizarProgresoRangos();
    if (HanaApp.actualizarBloqueos) HanaApp.actualizarBloqueos();
  };

  // ============================================================
  // TOMAR / COMPLETAR MISIÓN
  // ============================================================
  window.tomarMision = function(btn, id) {
    if (HanaApp.state[id] === 'completed') return;

    // Check if the mission's rank is unlocked
    var card = document.querySelector('.mision[data-id="' + id + '"]');
    var rango = card ? card.closest('.rango') : null;
    var rangoName = rango ? rango.getAttribute('data-rango') : '';
    if (rangoName && !HanaApp.isRangoUnlocked(rangoName) && HanaApp.state[id] !== 'taken') {
      if (HanaApp.mostrarToast) HanaApp.mostrarToast('🔒 Rango bloqueado — Completa más misiones del nivel anterior');
      return;
    }

    if (HanaApp.state[id] === 'taken') {
      resetModalUI();
      var card = document.querySelector('.mision[data-id="' + id + '"]');
      var titulo = card ? card.querySelector('.mision-titulo').textContent : 'esta misión';
      document.getElementById('confirmMsg').textContent =
        '¿Estás seguro de que la misión "' + titulo + '" ha sido completada?';
      document.getElementById('confirmModal').dataset.targetId = id;
      document.getElementById('confirmModal').classList.add('visible');
      return;
    }

    HanaApp.state[id] = 'taken';
    HanaApp.saveState();
    actualizarCard(id);
    if (HanaApp.mostrarToast) HanaApp.mostrarToast('✅ Misión asignada correctamente');
    if (HanaApp.actualizarEstadisticas) HanaApp.actualizarEstadisticas();
    if (HanaApp.actualizarProgresoRangos) HanaApp.actualizarProgresoRangos();
    if (HanaApp.actualizarBloqueos) HanaApp.actualizarBloqueos();
  };

  // ============================================================
  // RESET ALL — Evento del botón
  // ============================================================
  var resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      var modal = document.getElementById('confirmModal');
      var msg = document.getElementById('confirmMsg');
      document.querySelector('.hana-modal-titulo').textContent = 'Reiniciar todo';
      document.querySelector('.hana-modal-btn.confirm').textContent = '✕ Reiniciar';
      msg.textContent = '¿Estás seguro de reiniciar TODAS las misiones? Se perderá todo el progreso.';
      modal.dataset.targetId = '__RESET_ALL__';
      modal.classList.add('visible');
    });
  }

  // Expose via shared namespace
  HanaApp.actualizarCard = actualizarCard;
  HanaApp.resetModalUI = resetModalUI;
})();
