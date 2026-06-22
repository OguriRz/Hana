/* ============================================================
   HANA EFFECTS — Animaciones de scroll y tooltips
   ============================================================ */
(function() {
  'use strict';

  var HanaApp = window.HanaApp;

  // ============================================================
  // SCROLL ANIMATIONS
  // ============================================================
  var scrollObserver = null;

  function iniciarScrollObserver() {
    if (scrollObserver) {
      document.querySelectorAll('.rango').forEach(function(s) { scrollObserver.unobserve(s); });
    }
    if ('IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.rango:not(.empty)').forEach(function(section) {
        scrollObserver.observe(section);
      });
    } else {
      document.querySelectorAll('.rango').forEach(function(section) {
        section.classList.add('visible');
      });
    }
  }

  iniciarScrollObserver();

  // ============================================================
  // POTENCIAL TOOLTIP (hover to see explanation)
  // ============================================================
  document.querySelectorAll('.mision-estado.potencial').forEach(function(el) {
    var showTimer = null;
    var hideTimer = null;

    function removeTooltip() {
      var tip = el.nextElementSibling;
      if (tip && tip.classList.contains('potencial-tooltip')) tip.remove();
    }

    el.addEventListener('mouseenter', function() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      showTimer = setTimeout(function() {
        document.querySelectorAll('.potencial-tooltip').forEach(function(t) { t.remove(); });
        var tip = document.createElement('div');
        tip.className = 'potencial-tooltip';
        tip.textContent = 'El nivel de amenaza real puede ser superior al reportado. Se recomienda precaución.';
        tip.addEventListener('mouseenter', function() {
          if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        });
        tip.addEventListener('mouseleave', function() {
          hideTimer = setTimeout(removeTooltip, 200);
        });
        el.parentNode.insertBefore(tip, el.nextSibling);
      }, 300);
    });

    el.addEventListener('mouseleave', function(e) {
      if (showTimer) { clearTimeout(showTimer); showTimer = null; }
      hideTimer = setTimeout(removeTooltip, 200);
    });
  });

  // Expose
  HanaApp.iniciarScrollObserver = iniciarScrollObserver;
})();
