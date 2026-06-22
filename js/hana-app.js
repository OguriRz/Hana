/* ============================================================
   HANA APP — Inicialización principal y atajos de teclado
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;

  // ============================================================
  // RESTORE & INIT
  // ============================================================
  (function restaurarMisiones() {
    Object.keys(HanaApp.state).forEach(function(id) {
      if (HanaApp.actualizarCard) HanaApp.actualizarCard(id);
    });
    if (HanaApp.actualizarEstadisticas) HanaApp.actualizarEstadisticas();
    if (HanaApp.actualizarProgresoRangos) HanaApp.actualizarProgresoRangos();
  })();

  // ============================================================
  // KEYBOARD
  // ============================================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.getElementById('confirmModal').classList.remove('visible');
      document.getElementById('hanaToast').classList.remove('visible');
      var searchInput = document.getElementById('searchInput');
      if (searchInput && document.activeElement === searchInput) {
        searchInput.value = '';
        HanaApp.filtroTexto = '';
        if (HanaApp.aplicarFiltros) HanaApp.aplicarFiltros();
      }
    } else if (e.key === 'Enter') {
      var m = document.getElementById('confirmModal');
      if (m && m.classList.contains('visible')) window.confirmarCompletar();
    } else if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      var active = document.activeElement;
      if (active && active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA') {
        e.preventDefault();
        var searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
      }
    }
  });

})();
