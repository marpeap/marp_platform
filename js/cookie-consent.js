/**
 * Cookie Consent Banner — Marpeap Digitals
 * Bloque GTM jusqu'au consentement utilisateur (RGPD)
 * Stocke le choix dans localStorage
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'marpeap_cookie_consent';
  var GTM_ID = 'GTM-WC9X9MFL';

  // Si déjà consenti, charger GTM immédiatement
  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent === 'accepted') {
    loadGTM();
    return;
  }
  if (consent === 'refused') {
    return; // Pas de GTM, pas de bandeau
  }

  // Injecter le bandeau
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Consentement cookies');
  banner.innerHTML =
    '<div class="cb-inner">' +
      '<p class="cb-text">Nous utilisons des cookies analytiques pour mesurer la frequentation du site. ' +
        '<a href="/mentions-legales.html#cookies">En savoir plus</a></p>' +
      '<div class="cb-actions">' +
        '<button id="cb-refuse" class="cb-btn cb-btn-secondary">Refuser</button>' +
        '<button id="cb-accept" class="cb-btn cb-btn-primary">Accepter</button>' +
      '</div>' +
    '</div>';

  // Styles
  var style = document.createElement('style');
  style.textContent =
    '#cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:10000;' +
    'background:rgba(10,15,28,0.97);backdrop-filter:blur(12px);' +
    'border-top:1px solid rgba(59,130,246,0.2);padding:1rem 1.5rem;' +
    'animation:cb-slide-up .4s ease}' +
    '@keyframes cb-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
    '.cb-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;' +
    'justify-content:space-between;gap:1.5rem;flex-wrap:wrap}' +
    '.cb-text{color:#cbd5e1;font-size:.9rem;line-height:1.5;flex:1;min-width:200px;' +
    'font-family:Inter,sans-serif}' +
    '.cb-text a{color:#60a5fa;text-decoration:underline;text-underline-offset:2px}' +
    '.cb-actions{display:flex;gap:.75rem;flex-shrink:0}' +
    '.cb-btn{font-family:Inter,sans-serif;font-size:.85rem;font-weight:500;' +
    'padding:.5rem 1.25rem;border-radius:6px;border:none;cursor:pointer;transition:all .2s}' +
    '.cb-btn-primary{background:#3b82f6;color:#fff}' +
    '.cb-btn-primary:hover{background:#2563eb}' +
    '.cb-btn-secondary{background:transparent;color:#94a3b8;border:1px solid rgba(148,163,184,0.3)}' +
    '.cb-btn-secondary:hover{border-color:#94a3b8;color:#e2e8f0}' +
    '@media(max-width:600px){.cb-inner{flex-direction:column;text-align:center}' +
    '.cb-actions{width:100%;justify-content:center}}';

  document.head.appendChild(style);
  document.body.appendChild(banner);

  document.getElementById('cb-accept').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    loadGTM();
    removeBanner();
  });

  document.getElementById('cb-refuse').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'refused');
    removeBanner();
  });

  function removeBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.remove();
  }

  function loadGTM() {
    // Inject GTM script
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);

    // Inject noscript iframe
    var ns = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + GTM_ID;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    ns.appendChild(iframe);
    document.body.insertBefore(ns, document.body.firstChild);
  }
})();
