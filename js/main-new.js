/**
 * MARPEAP DIGITALS - MAIN JAVASCRIPT
 * @author Marpeap Digitals
 * @version 2025.1.0
 */

(function() {
  'use strict';

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  }
  
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // GRADIENT ORB MOUSE FOLLOW EFFECT
  // ========================================
  
  const orbs = document.querySelectorAll('.gradient-orb');
  
  if (orbs.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateOrbs() {
      orbX += (mouseX - orbX) * 0.05;
      orbY += (mouseY - orbY) * 0.05;
      
      orbs.forEach((orb, index) => {
        const speed = 0.02 + (index * 0.01);
        const currentX = parseFloat(orb.style.left) || 0;
        const currentY = parseFloat(orb.style.top) || 0;
        
        orb.style.transform = `translate(${orbX * speed}px, ${orbY * speed}px)`;
      });
      
      requestAnimationFrame(animateOrbs);
    }
    
    animateOrbs();
  }

  // ========================================
  // SERVICE CARD TILT EFFECT
  // ========================================
  
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ========================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.service-card, .why-item, .stat-item').forEach(el => {
    observer.observe(el);
  });

  // ========================================
  // TYPING EFFECT FOR HERO SUBTITLE (Optional)
  // ========================================
  
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  
  if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.renderTime || entry.loadTime);
        }
      }
    });
    
    try {
      perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('Performance monitoring not supported');
    }
  }

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // SCROLL PROGRESS INDICATOR
  // ========================================
  
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: #4F8AFF;
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(scrollProgress);
  
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = scrollPercentage + '%';
  }
  
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ========================================
  // ANALYTICS & TRACKING (Placeholder)
  // ========================================
  
  function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    
    console.log('Event tracked:', category, action, label);
  }
  
  // Track CTA clicks
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
      const text = this.textContent.trim();
      trackEvent('CTA', 'click', text);
    });
  });
  
  // Track phone number clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'phone_click', this.getAttribute('href'));
    });
  });
  
  // Track email clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'email_click', this.getAttribute('href'));
    });
  });

  // ========================================
  // INITIALIZE ON DOM READY
  // ========================================
  
  console.log('%c🚀 MARPEAP DIGITALS', 'font-size: 24px; font-weight: bold; color: #4F8AFF;');
  console.log('%cCode. Growth. Results.', 'font-size: 14px; color: #00E0C6;');
  console.log('%cWebsite loaded successfully!', 'font-size: 12px; color: #0DD9A4;');
  console.log('%cContact: contact@marpeap.com | +33 2 30 96 40 30', 'font-size: 10px; color: #8492A6;');

})();
