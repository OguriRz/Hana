/* ============================================================
   HANA UI — Componentes visuales (toast, stats, progress, expandable)
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;

  // ============================================================
  // TOAST
  // ============================================================
  var toastTimer = null;

  function mostrarToast(msg) {
    var t = document.getElementById('hanaToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { t.classList.remove('visible'); }, 2500);
  }

  // ============================================================
  // UPDATE STATS
  // ============================================================
  function actualizarEstadisticas() {
    var values = Object.values(HanaApp.state);
    var enProgreso = values.filter(function(v) { return v === 'taken'; }).length;
    var completadas = values.filter(function(v) { return v === 'completed'; }).length;
    var progEl = document.getElementById('enProgresoCount');
    var compEl = document.getElementById('completadasCount');
    if (progEl) progEl.textContent = enProgreso;
    if (compEl) compEl.textContent = completadas;
  }

  // ============================================================
  // PER-RANK PROGRESS
  // ============================================================
  function actualizarProgresoRangos() {
    document.querySelectorAll('.rango').forEach(function(rango) {
      var rangoName = rango.getAttribute('data-rango');
      var cards = rango.querySelectorAll('.mision');
      var total = cards.length;
      var completadas = 0;
      var tomadas = 0;

      cards.forEach(function(card) {
        var id = card.getAttribute('data-id');
        if (HanaApp.state[id] === 'completed') completadas++;
        else if (HanaApp.state[id] === 'taken') tomadas++;
      });

      var progEl = document.getElementById('prog-' + rangoName);
      if (progEl) {
        progEl.textContent = completadas + '/' + total;
        progEl.className = 'rango-progress';
        if (completadas === total && total > 0) {
          progEl.classList.add('complete');
        } else if (completadas > 0 || tomadas > 0) {
          progEl.classList.add('partial');
        }
      }
    });
  }

  // ============================================================
  // RANK UNLOCK — Lock indicators & visual state
  // ============================================================
  function actualizarBloqueos() {
    var prevCompletadas = 0;

    HanaApp.RANK_ORDER.forEach(function(rangoName, index) {
      var rango = document.querySelector('.rango[data-rango="' + rangoName + '"]');
      if (!rango) return;

      if (index === 0) {
        // Rumor siempre desbloqueado
        rango.classList.remove('rango-locked');
        prevCompletadas = HanaApp.contarCompletadasEnRango(rangoName);
        actualizarLockIndicator(rango, true, 0);
        return;
      }

      var unlocked = prevCompletadas >= HanaApp.RANK_UNLOCK_REQUIRE;
      var faltan = Math.max(0, HanaApp.RANK_UNLOCK_REQUIRE - prevCompletadas);

      if (unlocked) {
        rango.classList.remove('rango-locked');
      } else {
        rango.classList.add('rango-locked');
      }

      actualizarLockIndicator(rango, unlocked, faltan);

      // Recalcular completadas del rango actual para el siguiente
      prevCompletadas = HanaApp.contarCompletadasEnRango(rangoName);
    });

    // Also update all mission buttons to reflect lock state
    document.querySelectorAll('.mision-boton').forEach(function(btn) {
      var card = btn.closest('.mision');
      if (!card) return;
      var rango = card.closest('.rango');
      if (!rango) return;
      var rangoName = rango.getAttribute('data-rango');
      var id = card.getAttribute('data-id');

      if (!HanaApp.isRangoUnlocked(rangoName) && HanaApp.state[id] !== 'taken' && HanaApp.state[id] !== 'completed') {
        btn.disabled = true;
        btn.textContent = '🔒 Bloqueado';
      } else if (HanaApp.state[id] !== 'taken' && HanaApp.state[id] !== 'completed') {
        btn.disabled = false;
        btn.textContent = 'Tomar Misión';
      }
    });
  }

  function actualizarLockIndicator(rango, unlocked, faltan) {
    // Find or create the lock indicator element
    var indicator = rango.querySelector('.rango-lock-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'rango-lock-indicator';
      // Prevent click from collapsing the rango section
      indicator.addEventListener('click', function(e) {
        e.stopPropagation();
      });
      var header = rango.querySelector('.rango-header');
      if (header) {
        // Insert before the collapse icon (last element)
        var collapseIcon = header.querySelector('.rango-collapse-icon');
        if (collapseIcon) {
          header.insertBefore(indicator, collapseIcon);
        } else {
          header.appendChild(indicator);
        }
      }
    }

    if (unlocked) {
      indicator.textContent = '✓ Desbloqueado';
      indicator.className = 'rango-lock-indicator unlocked';
    } else {
      indicator.textContent = '🔒 ' + faltan + '/' + HanaApp.RANK_UNLOCK_REQUIRE;
      indicator.className = 'rango-lock-indicator locked';
    }
  }

  // ============================================================
  // EXPANDABLE DESCRIPTIONS
  // ============================================================
  function initExpandableDescs() {
    document.querySelectorAll('.mision-descripcion').forEach(function(desc) {
      // Skip if already processed
      if (desc.nextElementSibling && desc.nextElementSibling.classList.contains('mision-desc-link')) return;

      // Check if content overflows the max-height
      var isTruncated = desc.scrollHeight > desc.clientHeight;

      if (isTruncated) {
        var link = document.createElement('span');
        link.className = 'mision-desc-link';
        link.textContent = '+ Leer más';
        link.addEventListener('click', function(e) {
          e.stopPropagation();
          var expanded = desc.classList.toggle('expanded');
          link.textContent = expanded ? '– Leer menos' : '+ Leer más';
        });
        desc.parentNode.insertBefore(link, desc.nextSibling);
      }
    });
  }

  // Expose via shared namespace
  HanaApp.mostrarToast = mostrarToast;
  HanaApp.actualizarEstadisticas = actualizarEstadisticas;
  HanaApp.actualizarProgresoRangos = actualizarProgresoRangos;
  HanaApp.initExpandableDescs = initExpandableDescs;
  HanaApp.actualizarBloqueos = actualizarBloqueos;
})();
