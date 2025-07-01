document.querySelectorAll('.header-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById('menu-toggle').checked = false;
        document.body.classList.remove('no-scroll');
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }, 100); // 100ms de retraso, puedes ajustar
    }
  });
});