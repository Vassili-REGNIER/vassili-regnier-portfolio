(function () {
  'use strict';

  // Update the current year in the footer
  document.querySelectorAll('.year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  // Smooth scrolling for anchor links
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

  // Language switcher logic
  var body = document.body;
  var langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      
      // Update document body classes
      body.classList.remove('lang-fr', 'lang-en');
      body.classList.add('lang-' + lang);
      
      // Update active state styling on buttons
      langBtns.forEach(function (b) {
        if (b.getAttribute('data-lang') === lang) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
      });
    });
  });

  // Mobile Navigation Toggle
  var burgerBtn = document.getElementById('burger-btn');
  var navLinks = document.getElementById('main-nav');
  var navItems = document.querySelectorAll('.nav-link');

  if (burgerBtn && navLinks) {
      // Toggle mobile menu visibility
      burgerBtn.addEventListener('click', function () {
          navLinks.classList.toggle('nav-active');
          burgerBtn.classList.toggle('toggle');
          
          // Update ARIA expanded attribute for accessibility
          var isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
          burgerBtn.setAttribute('aria-expanded', !isExpanded);
      });

      // Close mobile menu automatically when a link is clicked
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
})();