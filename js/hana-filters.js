/* ============================================================
   HANA FILTERS — Búsqueda, filtros y collapse de rangos
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;

  // filtroTexto se comparte via HanaApp para que otros módulos (app.js) puedan leerlo/escribirlo
  HanaApp.filtroTexto = '';
  var filtroRango = 'all';

  // ============================================================
  // SEARCH & FILTER
  // ============================================================
  function aplicarFiltros() {
    var cards = document.querySelectorAll('.mision');
    var secciones = document.querySelectorAll('.rango');

    cards.forEach(function(card) {
      var titulo = (card.querySelector('.mision-titulo') || {}).textContent || '';
      var desc = (card.querySelector('.mision-descripcion') || {}).textContent || '';
      var rango = card.closest('.rango');
      var rangoName = rango ? rango.getAttribute('data-rango') : '';

      var matchTexto = titulo.toLowerCase().indexOf(HanaApp.filtroTexto) !== -1 ||
                       desc.toLowerCase().indexOf(HanaApp.filtroTexto) !== -1;
      var matchRango = filtroRango === 'all' || rangoName === filtroRango;

      card.classList.toggle('hidden', !(matchTexto && matchRango));
    });

    secciones.forEach(function(sec) {
      var visible = sec.querySelectorAll('.mision:not(.hidden)').length > 0;
      sec.classList.toggle('empty', !visible);
    });

    // Re-observe sections that became visible after filtering
    if (HanaApp.iniciarScrollObserver) HanaApp.iniciarScrollObserver();
  }

  // Search input
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      HanaApp.filtroTexto = this.value.trim().toLowerCase();
      aplicarFiltros();
    });
  }

  // Filter buttons
  document.querySelectorAll('.hana-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.hana-filter-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      filtroRango = this.getAttribute('data-filter');
      aplicarFiltros();
    });
  });

  // ============================================================
  // COLLAPSIBLE RANGOS
  // ============================================================
  document.querySelectorAll('.rango-header').forEach(function(h) {
    h.addEventListener('click', function(e) {
      var rango = this.closest('.rango');
      if (!rango) return;
      rango.classList.toggle('collapsed');
    });
  });

  // Override aplicarFiltros to also re-init expandable descriptions
  var _origAplicar = aplicarFiltros;
  aplicarFiltros = function() {
    _origAplicar();
    if (HanaApp.initExpandableDescs) {
      requestAnimationFrame(HanaApp.initExpandableDescs);
    }
  };

  // Expose
  HanaApp.aplicarFiltros = aplicarFiltros;
  HanaApp.searchInput = searchInput;
})();
