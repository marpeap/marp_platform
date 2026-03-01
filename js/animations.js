/**
 * MARPEAP DIGITALS — Enhanced Animations
 * Curseur amélioré, scroll reveals directionnels, shimmer, magnétisme, particules.
 * Aucune dépendance externe. Ne touche pas au style existant.
 */
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // 0. INJECT CSS DYNAMIQUEMENT
  // ─────────────────────────────────────────────────────────────────────────

  const css = document.createElement('style');
  css.id = 'marp-animations-css';
  css.textContent = `

    /* ── Curseur custom ── */
    .marp-cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 38px; height: 38px;
      border: 2px solid rgba(59, 130, 246, 0.85);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition:
        width   .35s cubic-bezier(.4,0,.2,1),
        height  .35s cubic-bezier(.4,0,.2,1),
        border-color .25s ease,
        background   .25s ease,
        opacity .25s ease;
      will-change: left, top;
    }
    .marp-cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 7px; height: 7px;
      background: #fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000000;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
      will-change: left, top;
      transition: transform .1s ease, opacity .2s ease;
    }

    /* États du curseur */
    body.cursor-on-btn .marp-cursor-ring {
      width: 58px; height: 58px;
      border-color: rgba(139, 92, 246, 0.9);
      background: rgba(139, 92, 246, 0.08);
    }
    body.cursor-on-link .marp-cursor-ring {
      width: 26px; height: 26px;
      border-color: rgba(6, 182, 212, 0.9);
    }
    body.cursor-on-text .marp-cursor-ring {
      width: 20px; height: 20px;
      border-color: rgba(255,255,255,0.3);
    }
    body.cursor-clicking .marp-cursor-dot  { transform: translate(-50%,-50%) scale(.6); }
    body.cursor-clicking .marp-cursor-ring { transform: translate(-50%,-50%) scale(.8); }

    /* ── Scroll reveals ── */
    .rv-up {
      opacity: 0;
      transform: translateY(48px);
      transition: opacity .75s cubic-bezier(.4,0,.2,1),
                  transform .75s cubic-bezier(.4,0,.2,1);
    }
    .rv-left {
      opacity: 0;
      transform: translateX(-64px);
      transition: opacity .75s cubic-bezier(.4,0,.2,1),
                  transform .75s cubic-bezier(.4,0,.2,1);
    }
    .rv-right {
      opacity: 0;
      transform: translateX(64px);
      transition: opacity .75s cubic-bezier(.4,0,.2,1),
                  transform .75s cubic-bezier(.4,0,.2,1);
    }
    .rv-scale {
      opacity: 0;
      transform: scale(.88);
      transition: opacity .75s cubic-bezier(.4,0,.2,1),
                  transform .75s cubic-bezier(.4,0,.2,1);
    }
    .rv-title {
      overflow: hidden;
    }
    .rv-title-inner {
      display: block;
      transform: translateY(105%);
      transition: transform .85s cubic-bezier(.4,0,.2,1);
    }
    .rv-visible,
    .rv-visible.rv-up,
    .rv-visible.rv-left,
    .rv-visible.rv-right,
    .rv-visible.rv-scale  { opacity: 1; transform: none; }
    .rv-visible .rv-title-inner { transform: translateY(0); }

    .rv-d1 { transition-delay: .08s; }
    .rv-d2 { transition-delay: .16s; }
    .rv-d3 { transition-delay: .24s; }
    .rv-d4 { transition-delay: .32s; }

    /* ── Hero title animation ── */
    .hero-line-wrap { display: block; overflow: hidden; }
    .hero-line-inner {
      display: block;
      transform: translateY(110%);
      animation: heroLineIn .95s cubic-bezier(.4,0,.2,1) forwards;
    }
    .title-line-2 .hero-line-inner { animation-delay: .18s; }
    .hero-subtitle {
      opacity: 0;
      transform: translateY(22px);
      animation: heroFadeUp .8s ease .55s forwards;
    }
    .hero-cta {
      opacity: 0;
      transform: translateY(22px);
      animation: heroFadeUp .8s ease .75s forwards;
    }
    .hero-stats {
      opacity: 0;
      transform: translateY(22px);
      animation: heroFadeUp .8s ease .95s forwards;
    }
    @keyframes heroLineIn  { to { transform: translateY(0); } }
    @keyframes heroFadeUp  { to { opacity: 1; transform: translateY(0); } }

    /* ── Shimmer sur les cartes ── */
    .card-shimmer-layer {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity .35s ease;
      background: radial-gradient(
        circle 140px at var(--sx, 50%) var(--sy, 50%),
        rgba(255,255,255,0.09) 0%,
        transparent 70%
      );
    }
    .service-card:hover .card-shimmer-layer { opacity: 1; }

    /* ── Particules au clic ── */
    .click-burst {
      position: fixed;
      width: 5px; height: 5px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      animation: burstOut .65s ease-out forwards;
    }
    @keyframes burstOut {
      0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
      100% { opacity: 0; transform: translate(calc(-50% + var(--bx)), calc(-50% + var(--by))) scale(0); }
    }

    /* ── Barre de scroll (si pas déjà dans main-new.js) ── */
    #marp-scroll-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4);
      z-index: 100001;
      pointer-events: none;
      transition: width .08s linear;
    }

    /* ── Magnétisme boutons : override transform propre ── */
    .btn-large { will-change: transform; }
  `;
  document.head.appendChild(css);


  // ─────────────────────────────────────────────────────────────────────────
  // 1. CUSTOM CURSOR (desktop uniquement, pointer: fine)
  // ─────────────────────────────────────────────────────────────────────────

  if (window.matchMedia('(pointer: fine)').matches) {

    /* Cacher le curseur système */
    const cursorHideStyle = document.createElement('style');
    cursorHideStyle.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(cursorHideStyle);

    const ring = document.createElement('div');
    ring.className = 'marp-cursor-ring';
    const dot  = document.createElement('div');
    dot.className  = 'marp-cursor-dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      ring.style.opacity = '0';
      dot.style.opacity  = '0';
    });
    document.addEventListener('mouseenter', () => {
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    });

    /* Lerp ring */
    (function loopRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loopRing);
    })();

    /* États selon l'élément survolé */
    function addCursorState(selector, cls) {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add(cls));
        el.addEventListener('mouseleave', () => document.body.classList.remove(cls));
      });
    }

    addCursorState('.btn-primary, .btn-secondary, .btn-primary-nav, .btn-outline, .btn-large, .whatsapp-float', 'cursor-on-btn');
    addCursorState('a:not(.btn-primary):not(.btn-secondary):not(.btn-primary-nav):not(.btn-large)', 'cursor-on-link');
    addCursorState('p, h1, h2, h3, h4, h5, li, span', 'cursor-on-text');

    /* Click */
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));
  }


  // ─────────────────────────────────────────────────────────────────────────
  // 2. BARRE DE PROGRESSION DU SCROLL
  //    (ne crée que si main-new.js n'en a pas déjà créé une)
  // ─────────────────────────────────────────────────────────────────────────

  if (!document.querySelector('.scroll-progress')) {
    const bar = document.createElement('div');
    bar.id = 'marp-scroll-bar';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const st = window.scrollY;
      const sh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (sh > 0 ? (st / sh) * 100 : 0) + '%';
    }, { passive: true });
  }


  // ─────────────────────────────────────────────────────────────────────────
  // 3. HERO TITLE — STAGGERED REVEAL
  // ─────────────────────────────────────────────────────────────────────────

  ['title-line-1', 'title-line-2'].forEach(cls => {
    const el = document.querySelector('.' + cls);
    if (!el) return;
    const text = el.innerHTML;
    el.innerHTML = `<span class="hero-line-wrap"><span class="hero-line-inner">${text}</span></span>`;
  });


  // ─────────────────────────────────────────────────────────────────────────
  // 4. SCROLL REVEALS DIRECTIONNELS
  // ─────────────────────────────────────────────────────────────────────────

  function tag(selector, ...classes) {
    document.querySelectorAll(selector).forEach((el, i) => {
      classes.forEach(c => el.classList.add(c));
    });
  }
  function tagStagger(selector, baseClass) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(baseClass);
      if (i > 0) el.classList.add(`rv-d${Math.min(i, 4)}`);
    });
  }

  /* Titres de sections : wrap pour clip-path */
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('rv-title');
    el.innerHTML = `<span class="rv-title-inner">${el.innerHTML}</span>`;
  });

  /* Sous-titres */
  tag('.section-subtitle', 'rv-up', 'rv-d2');

  /* Fenêtre de code */
  tag('.code-window', 'rv-right');

  /* Section referral */
  tagStagger('#referral .container > *', 'rv-up');

  /* CTA box */
  tag('.cta-box', 'rv-scale');

  /* Footer */
  tagStagger('.footer-content > *', 'rv-up');
  tag('.footer-bottom', 'rv-up', 'rv-d3');

  /* Observer unique */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('rv-visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.rv-up, .rv-left, .rv-right, .rv-scale, .rv-title'
  ).forEach(el => revealObs.observe(el));


  // ─────────────────────────────────────────────────────────────────────────
  // 5. SHIMMER DE LUMIÈRE SUR LES CARTES
  // ─────────────────────────────────────────────────────────────────────────

  document.querySelectorAll('.service-card').forEach(card => {
    /* S'assurer que position est relative pour le shimmer absolu */
    if (getComputedStyle(card).position === 'static') {
      card.style.position = 'relative';
    }
    card.style.overflow = 'hidden';

    const shimmer = document.createElement('div');
    shimmer.className = 'card-shimmer-layer';
    card.appendChild(shimmer);

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--sx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--sy', ((e.clientY - r.top)  / r.height * 100) + '%');
    }, { passive: true });
  });


  // ─────────────────────────────────────────────────────────────────────────
  // 6. MAGNÉTISME SUR LES BOUTONS CTA
  // ─────────────────────────────────────────────────────────────────────────

  document.querySelectorAll('.btn-primary.btn-large, .btn-secondary.btn-large').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const dx  = (e.clientX - r.left - r.width  / 2) * 0.18;
      const dy  = (e.clientY - r.top  - r.height / 2) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1)';
      btn.style.transform  = '';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform .1s ease';
    });
  });


  // ─────────────────────────────────────────────────────────────────────────
  // 7. PARTICULES AU CLIC
  // ─────────────────────────────────────────────────────────────────────────

  const BURST_COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  document.addEventListener('click', e => {
    /* Éviter de faire exploser des clics sur liens/nav */
    const N = 7;
    for (let i = 0; i < N; i++) {
      const p     = document.createElement('div');
      p.className = 'click-burst';
      const angle = (i / N) * Math.PI * 2 + (Math.random() * 0.5);
      const dist  = 28 + Math.random() * 38;
      p.style.left       = e.clientX + 'px';
      p.style.top        = e.clientY + 'px';
      p.style.background = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      p.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 650);
    }
  });


  // ─────────────────────────────────────────────────────────────────────────
  // 8. NAV LINKS — HOVER UNDERLINE ANIMÉ
  // ─────────────────────────────────────────────────────────────────────────

  const navUnderlineStyle = document.createElement('style');
  navUnderlineStyle.textContent = `
    .nav-link {
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 0;
      width: 0; height: 2px;
      background: linear-gradient(90deg, #3B82F6, #06B6D4);
      border-radius: 2px;
      transition: width .3s cubic-bezier(.4,0,.2,1);
    }
    .nav-link:hover::after { width: 100%; }
  `;
  document.head.appendChild(navUnderlineStyle);


  // ─────────────────────────────────────────────────────────────────────────
  // 9. SCROLL INDICATOR — PULSE ÉLABORÉ
  // ─────────────────────────────────────────────────────────────────────────

  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    const scrollIndStyle = document.createElement('style');
    scrollIndStyle.textContent = `
      .scroll-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        opacity: 1;
        transition: opacity .4s ease;
      }
      .scroll-indicator::before {
        content: '';
        width: 1px;
        height: 40px;
        background: linear-gradient(to bottom, transparent, rgba(59,130,246,.8));
        animation: scrollPulse 1.8s ease-in-out infinite;
      }
      .scroll-indicator::after {
        content: '';
        width: 6px; height: 6px;
        border-right: 2px solid rgba(59,130,246,.9);
        border-bottom: 2px solid rgba(59,130,246,.9);
        transform: rotate(45deg);
        animation: scrollPulse 1.8s ease-in-out infinite .15s;
      }
      @keyframes scrollPulse {
        0%, 100% { opacity: .3; transform: translateY(-4px) rotate(45deg); }
        50%       { opacity: 1;  transform: translateY( 4px) rotate(45deg); }
      }
      .scroll-indicator::before {
        transform: none;
        animation: linePulse 1.8s ease-in-out infinite;
      }
      @keyframes linePulse {
        0%, 100% { opacity: .2; transform: scaleY(.6); transform-origin: top; }
        50%       { opacity: 1;  transform: scaleY(1);  transform-origin: top; }
      }
    `;
    document.head.appendChild(scrollIndStyle);

    /* Masquer au scroll */
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }

})();
