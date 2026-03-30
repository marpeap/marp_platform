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

    /* ── Magnétisme boutons : override transform propre ── */
    .btn-large { will-change: transform; }
  `;
  document.head.appendChild(css);


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
      background: #4F8AFF;
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
        background: linear-gradient(to bottom, transparent, rgba(79,138,255,.8));
        animation: scrollPulse 1.8s ease-in-out infinite;
      }
      .scroll-indicator::after {
        content: '';
        width: 6px; height: 6px;
        border-right: 2px solid rgba(79,138,255,.9);
        border-bottom: 2px solid rgba(79,138,255,.9);
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
