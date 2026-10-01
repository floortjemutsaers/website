/* Google Analytics, pas na toestemming van de bezoeker */
(function () {
  var me = document.currentScript;
  var id = me && me.getAttribute('data-ga');
  var bar = document.getElementById('cookiebar');
  if (!id || !bar) return;
  var KEY = 'cookiekeuze';
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var loaded = false;
  var load = function () {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  };
  var keuze = get();
  if (keuze === 'ja') load();
  else if (keuze !== 'nee') bar.hidden = false;
  bar.querySelectorAll('[data-keuze]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-keuze');
      set(v); bar.hidden = true;
      if (v === 'ja') load();
      else if (loaded) location.reload();
    });
  });
  document.querySelectorAll('.cookie-open').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); bar.hidden = false; });
  });
})();
