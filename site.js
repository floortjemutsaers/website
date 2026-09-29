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
