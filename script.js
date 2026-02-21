(function () {
    'use strict';
  
    // Met à jour l'année dans le footer
    document.querySelectorAll('.year').forEach(function(el) {
      el.textContent = new Date().getFullYear();
    });
  
    // Smooth scroll pour les ancres du menu
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
  
    // Gestionnaire de changement de langue
    var body = document.body;
    var langBtns = document.querySelectorAll('.lang-btn');
  
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        
        // Update body classes
        body.classList.remove('lang-fr', 'lang-en');
        body.classList.add('lang-' + lang);
        
        // Update active state of buttons
        langBtns.forEach(function (b) {
          if(b.getAttribute('data-lang') === lang) {
              b.classList.add('active');
          } else {
              b.classList.remove('active');
          }
        });
      });
    });
  })();