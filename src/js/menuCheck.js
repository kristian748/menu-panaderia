const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('change', function() {
  document.body.classList.toggle('no-scroll', this.checked);
});