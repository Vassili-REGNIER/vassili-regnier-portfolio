(function () {
  'use strict';

  document.querySelectorAll('.year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  var body = document.body;
  var langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      body.classList.remove('lang-fr', 'lang-en');
      body.classList.add('lang-' + lang);
      langBtns.forEach(function (b) {
        if (b.getAttribute('data-lang') === lang) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    });
  });

  var burgerBtn = document.getElementById('burger-btn');
  var navLinks = document.getElementById('main-nav');
  var navItems = document.querySelectorAll('.nav-link');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', function () {
      navLinks.classList.toggle('nav-active');
      burgerBtn.classList.toggle('toggle');
      var isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
    });

    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
          burgerBtn.classList.remove('toggle');
          burgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --- Projects Carousel ---
  var track = document.querySelector('.carousel__track');
  var prevBtn = document.querySelector('.carousel__btn--prev');
  var nextBtn = document.querySelector('.carousel__btn--next');
  var dotsContainer = document.querySelector('.carousel__dots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    var cards = track.querySelectorAll('.project-card');
    var totalCards = cards.length;

    function getVisibleCount() {
      return window.innerWidth < 768 ? 1 : 2;
    }

    function getTotalPages() {
      return Math.max(1, totalCards - getVisibleCount() + 1);
    }

    function getCurrentPage() {
      if (!cards.length) return 0;
      var trackLeft = track.scrollLeft;
      var cardWidth = cards[0].offsetWidth + 24;
      return Math.round(trackLeft / cardWidth);
    }

    function scrollToPage(page) {
      if (!cards.length) return;
      var cardWidth = cards[0].offsetWidth + 24;
      track.scrollTo({ left: page * cardWidth, behavior: 'smooth' });
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      var pages = getTotalPages();
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
        dot.dataset.page = i;
        dot.addEventListener('click', function () {
          scrollToPage(parseInt(this.dataset.page));
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateControls() {
      var page = getCurrentPage();
      var pages = getTotalPages();

      prevBtn.disabled = page <= 0;
      nextBtn.disabled = page >= pages - 1;

      var dots = dotsContainer.querySelectorAll('.carousel__dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('carousel__dot--active', i === page);
      });
    }

    prevBtn.addEventListener('click', function () {
      var page = getCurrentPage();
      if (page > 0) scrollToPage(page - 1);
    });

    nextBtn.addEventListener('click', function () {
      var page = getCurrentPage();
      if (page < getTotalPages() - 1) scrollToPage(page + 1);
    });

    track.addEventListener('scroll', function () {
      requestAnimationFrame(updateControls);
    });

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        buildDots();
        updateControls();
      }, 150);
    });

    buildDots();
    updateControls();
  }

  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll('.page-section');
  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
