/* ============================================================
   HANA FIXER ID — Base de datos de Fixers y consulta
   ============================================================ */
(function() {
  'use strict';

  // ============================================================
  // FIXER DATA — Edita esta sección para agregar/modificar Fixers
  // ============================================================
  var FIXERS = {
    "FIX-001": {
      name: "Ejemplo Fixer Alpha",
      grade: 7,
      association: "Hana Association",
      status: "Activo",
      specialization: "Combate cuerpo a cuerpo / Investigación",
      description: "Fixer de rango medio con experiencia en operaciones de desalojo y contención. Ha participado en 12 misiones certificadas por Hana. Porta prótesis de combate grado militar (R Corp).",
      notes: "Asignado actualmente a la oficina del Distrito 15. Buen historial de cumplimiento. Se recomienda para misiones de hasta rango Leyenda.",
      observations: "Muestra tendencia a acciones unilaterales. Supervisión recomendada en operaciones que requieran trabajo en equipo."
    },
    "FIX-002": {
      name: "Ejemplo Fixer Beta",
      grade: 5,
      association: "Liu Association",
      status: "Activo",
      specialization: "Supresión / Combate con arma blanca",
      description: "Fixer de alto rango transferido desde Liu Association. Especialista en supresión de disturbios y operaciones de alto riesgo. Temperamento explosivo pero resultados consistentes.",
      notes: "Tiene conexiones con la oficina principal de Liu. Historial de 34 misiones completadas con éxito.",
      observations: "Se le ha advertido por daños colaterales excesivos en 2 ocasiones. Vigilar su conducta en zonas residenciales."
    },
    "FIX-003": {
      name: "Ejemplo Fixer Gamma",
      grade: 9,
      association: "Independiente",
      status: "Inactivo",
      specialization: "Rastreo / Recuperación",
      description: "Fixer novato que opera de manera independiente. Sin afiliación a ninguna asociación. Busca abrirse camino en la Ciudad. Sus únicos casos han sido escoltas y recuperaciones menores.",
      notes: "Registro limpio pero sin experiencia en combate real. Se recomienda asignarle un mentor antes de misiones de alto riesgo.",
      observations: "Muestra potencial pero carece de disciplina. Podría ser un buen candidato para reclutamiento por alguna Asociación."
    },
    "FIX-004": {
      name: "——",
      grade: "—",
      association: "——",
      status: "DESCONOCIDO",
      specialization: "——",
      description: "No hay suficientes datos para generar un perfil completo. Los archivos de este Fixer están incompletos o han sido sellados por orden de la Asociación.",
      notes: "Registro clasificado. Se requiere autorización de Grado 3 o superior para acceder a la información completa.",
      observations: "Última actividad registrada: Sector 7, Distrito 19. No se reporta actividad reciente."
    },
    "689343333331": {
      name: "Jia Jia",
      grade: "7",
      association: "Mercenario",
      status: "Activo",
      specialization: "Combate con bastón / Control de estados / Táctica",
      description: "Último heredero de los Jia, originario del Daguanyuan. Porta un Bastón Réplica al del Jerarca. Su estilo de combate prioriza la inteligencia y la velocidad sobre la fuerza bruta — reflejo de su entrenamiento bajo la tutela del Jerarca.",
      notes: "Carga un profundo rencor hacia el Jerarca de H y R Corp, aunque reconoce que su única habilidad real proviene del entrenamiento que él le impuso. Consciente de ser una 'copia' de su mentor, busca desesperadamente forjar su propia identidad y camino. Muestra una inteligencia táctica excepcional, pero su falta de fuerza física y destreza lo limita en enfrentamientos directos. Heredero de un legado caído, su motivación principal es la venganza, aunque sus palabras sugieren un deseo más profundo de encontrar su propio propósito.",
      observations: "Parece ser Amable con sus 2 guardias, cuidadanos de Y Corp comentan que parece tener conexion con Luminox, Paso las pruebas de Grado 7 por demasiado poco, sus aptitudes fisicas son horribles junto con su fisico, queda en obseravacion descubrir que tipo de entrenamiento le brindaba el Jerarca.",
      photo: "https://i.pinimg.com/736x/84/b8/d1/84b8d178443258f9dc11c30f3eae4386.jpg"
    },
    "477299569921": {
      name: "Katarina",
      grade: 7,
      association: "Oficina Crimson",
      status: "Activo",
      specialization: "Alta Destreza / Combate ágil / Usuaria de Abraxas",
      description: "Fixer afiliada a la Oficina Crimson, Grado 7. 1.60 m de altura. Porta Un Prototipo Hana Roto y La Reliquia Abraxas, una reliquia que empuña sin ser completamente apta. Su estilo de combate se basa casi enteramente en su destreza sobrehumana, realizando movimientos ágiles e insonoros. Parece Albergar algo que aun desconocemos, Se Necesita mas observaciones.",
      notes: "Hija de dos Fixers de la Asociación Hana, Sus padres participaban en experimentos de contención con una Anormalidad de clasificación [REDACTED] Antes de Fallecer. / Habil Combatiente Con Destreza, sus capacidades con Destreza parecen ser iguales a las de un fixer grado 5/6, aunque sus otras capacidades aun son algo pedantes.",
      observations: "Durante una misión no autorizada, Katarina se enfrentó a Luminox y Renzo, Dos Sottocapos del Pulgar —uno de ellos el ejecutor más temidos Entre Los 5 Dedos. Las probabilidades estaban en su contra. El combate fue breve, brutal y contra todo pronóstico, ella sobrevivió. Se desconoce el Como, pero el informe de [REDACTED] indican Cienpies saliendo de su cabidad Ocular, El Segundo Azul se niega a entregar mas Datos del Asunto pero se conoce que el hizo huir al Pulgar y al Index / Katarina empuña Abraxas, una reliquia antigua para la cual no es apta. El arma no la rechaza del todo —le otorga Fuerza por el simple hecho de sostenerla— pero nunca alcanzará su verdadero potencial en sus manos. Es como si Abraxas hubiera aceptado un préstamo temporal, a la espera de un portador más digno. El Antiguo usuario esta muerto / Complementa su arsenal con el Prototipo Hana Roto, un vestigio de sus padres que no termina de funcionar como debería.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7P2Bv8kKymJeEJ_vUKtL-f_Bi_lLIDvyPw&s"
    },
    "100090187618": {
      name: "Tyler",
      grade: 6,
      association: "——",
      status: "REGISTRADO",
      specialization: "——",
      description: "Fixer de Grado 6 registrado en el sistema. Los datos de perfil están pendientes de ingreso por parte de la oficina de Hana.",
      notes: "Pendiente de actualización.",
      observations: "——"
    },
    "100037992240": {
      name: "Franco",
      grade: 7,
      association: "——",
      status: "REGISTRADO",
      specialization: "——",
      description: "Fixer de Grado 7 registrado en el sistema. Los datos de perfil están pendientes de ingreso por parte de la oficina de Hana.",
      notes: "Pendiente de actualización.",
      observations: "——"
    },
    "1776": {
      name: "Thomas",
      grade: "COLOR",
      association: "——",
      status: "Activo",
      specialization: "——",
      description: "Fixer de GRADO COLOR, portador del título 'El Segundo Azul'. Uno de los Color Fixers más enigmáticos de la Ciudad. Su rango trasciende las clasificaciones convencionales de Grado. Los archivos de Hana contienen poca información verificable sobre sus capacidades, pero su designación como 'El Segundo Azul' sugiere un linaje de poder formidable. Se requiere autorización de alto nivel para acceder a los detalles completos de su registro.",
      notes: "REGISTRO CLASIFICADO — AUTORIZACIÓN REQUERIDA. Los detalles operativos de este Fixer están sellados por orden de la Asociación.",
      observations: "INFORMACIÓN RESTRINGIDA. Solo la Oficina Central de Hana tiene autorización para divulgar datos de Color Fixers. Se recomienda extrema precaución al tratar con este individuo."
    },
    "385427424120": {
      name: "Cain",
      grade: 7,
      association: "Oficina Full-Stop",
      status: "Activo",
      specialization: "Combate a distancia / Pistolero",
      description: "Fixer afiliado a la Oficina Full-Stop, Grado 7. 189 cm de altura. Operador de la Pistola, un arma de fuego de alta precisión con sistema de acumulación de 19 Balas. Porta además un arma secundaria, Un Machete Full-Stop. Su armadura es un traje custom-made Full-Stop.",
      notes: "Parece provenir de una familia rica en busca de provarles algo o capaz provarse algo a el mismo, sea como sea posee la aptitud para el trabajo, sus reportes fisicos provenientes de la Oficina Full-Stop son exepcionales, tiene talento para las armas.",
      observations: "Posee una personalidad Carismatica a pesar de su aspecto, aunque su inteligencia no es su punto mas fuerte, se acerca a miembros del Pulgar en busca de cigarros, no parece estar muy al tanto del peligro que sus acciones pueden conllevar, se recomienda precaucion al trabajar con este individuo.",
      photo: "https://i.pinimg.com/736x/45/9b/9f/459b9f92ad0fdab72818af4fd659ceee.jpg"
    }
  };

  // ============================================================
  // DOM REFS
  // ============================================================
  var fixerModal = document.getElementById('fixerModal');
  var modalBackdrop = document.getElementById('fixerModalBackdrop');
  var modalClose = document.getElementById('fixerModalClose');
  var toggleBtn = document.getElementById('fixerToggleBtn');
  var fixerInput = document.getElementById('fixerIdInput');
  var consultBtn = document.getElementById('fixerConsultBtn');
  var fixerError = document.getElementById('fixerError');
  var fixerDocument = document.getElementById('fixerDocument');

  // ============================================================
  // MODAL TOGGLE
  // ============================================================
  function openFixerModal() {
    if (!fixerModal) return;
    fixerModal.classList.add('visible');
    if (fixerInput) {
      fixerInput.focus();
      fixerInput.select();
    }
  }

  function closeFixerModal() {
    if (!fixerModal) return;
    fixerModal.classList.remove('visible');
    fixerDocument.style.display = 'none';
    if (fixerError) fixerError.textContent = '';
    if (fixerInput) fixerInput.value = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openFixerModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeFixerModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeFixerModal);
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fixerModal && fixerModal.classList.contains('visible')) {
      closeFixerModal();
    }
  });

  // ============================================================
  // RENDER FIXER DOCUMENT
  // ============================================================
  function renderFixer(id) {
    var data = FIXERS[id];
    if (!data) {
      if (fixerError) fixerError.textContent = '✕ ERROR: CÓDIGO DE FIXER NO REGISTRADO EN EL SISTEMA';
      if (fixerDocument) fixerDocument.style.display = 'none';
      return;
    }

    if (fixerError) fixerError.textContent = '';
    document.getElementById('fixerIdDisplay').textContent = id;
    document.getElementById('fixerName').textContent = data.name;
    document.getElementById('fixerGrade').textContent = typeof data.grade === 'number' ? 'Grado ' + data.grade : data.grade;
    document.getElementById('fixerAssociation').textContent = data.association;
    document.getElementById('fixerSpecialization').textContent = data.specialization;
    document.getElementById('fixerStatus').textContent = data.status;
    document.getElementById('fixerDescription').textContent = data.description;
    document.getElementById('fixerNotes').textContent = data.notes;
    document.getElementById('fixerObservations').textContent = data.observations;

    // Render photo if available
    var photoEl = document.getElementById('fixerPhoto');
    if (photoEl) {
      if (data.photo) {
        photoEl.innerHTML = '<img class="fid-photo-img" src="' + data.photo + '" alt="' + data.name + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="fid-photo-placeholder" style="display:none">☰</span>';
      } else {
        photoEl.innerHTML = '<span class="fid-photo-placeholder">☰</span>';
      }
    }

    // Status styling
    var statusEl = document.getElementById('fixerStatus');
    statusEl.className = 'fid-field-value';
    if (data.status === 'Activo') {
      statusEl.style.color = '#3A8A5A';
    } else if (data.status === 'Inactivo' || data.status === 'DESCONOCIDO') {
      statusEl.style.color = '#999';
    }

    if (fixerDocument) fixerDocument.style.display = 'block';
  }

  // ============================================================
  // CONSULTAR
  // ============================================================
  function consultarFixer() {
    var code = fixerInput.value.trim().toUpperCase();
    if (!code) {
      if (fixerError) fixerError.textContent = '✕ INGRESE UN CÓDIGO DE FIXER VÁLIDO';
      if (fixerDocument) fixerDocument.style.display = 'none';
      return;
    }
    renderFixer(code);
  }

  // ============================================================
  // EVENTS
  // ============================================================
  if (consultBtn) {
    consultBtn.addEventListener('click', consultarFixer);
  }

  if (fixerInput) {
    fixerInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        consultarFixer();
      }
    });
  }

  // Expose for debugging / extensibility
  window.HanaApp = window.HanaApp || {};
  window.HanaApp.FIXERS = FIXERS;
  window.HanaApp.consultarFixer = consultarFixer;
  window.HanaApp.openFixerModal = openFixerModal;
  window.HanaApp.closeFixerModal = closeFixerModal;
})();
