/* Hamburgermenu openen en sluiten */
(function () {
  var btn = document.querySelector('.menu-btn');
  var label = document.querySelector('.menu-btn .label');
  if (btn) {
    var setOpen = function (open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Sluiten' : 'Menu';
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setOpen(false);
    });
  }
  /* Jaartal in de footer */
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Logo laadt niet? Toon dan netjes de naam */
document.querySelectorAll('.org img').forEach(function (img) {
  var fail = function () {
    var b = document.createElement('b');
    b.textContent = img.alt;
    img.replaceWith(b);
  };
  if (img.complete && img.naturalWidth === 0) fail();
  else img.addEventListener('error', fail);
});

/* Aanbevelingen-slider met bolletjes */
document.querySelectorAll('.slider').forEach(function (slider) {
  var track = slider.querySelector('.slides');
  var slides = slider.querySelectorAll('.slide');
  var dotsBox = slider.querySelector('.dots');
  var prev = slider.querySelector('.prev');
  var next = slider.querySelector('.next');
  var dots = [];
  var current = 0;
  var goTo = function (i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };
  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Aanbeveling ' + (i + 1));
    b.addEventListener('click', function () { goTo(i); });
    dotsBox.appendChild(b);
    dots.push(b);
  });
  var update = function () {
    var i = Math.round(track.scrollLeft / (track.clientWidth || 1));
    current = Math.max(0, Math.min(slides.length - 1, i));
    dots.forEach(function (d, k) { d.setAttribute('aria-selected', String(k === current)); });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
  };
  prev.addEventListener('click', function () { goTo(current - 1); });
  next.addEventListener('click', function () { goTo(current + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
