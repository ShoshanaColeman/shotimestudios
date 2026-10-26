window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      loader.classList.add('loader-hidden');
    }, 200);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
});

/* ---------- Hero slideshow ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('hero-slideshow');
  if (!container) return;
  var slides = Array.prototype.slice.call(container.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  var dotsWrap = document.getElementById('hero-dots');
  var dots = [];
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var d = document.createElement('span');
      if (i === 0) d.classList.add('active');
      dotsWrap.appendChild(d);
      dots.push(d);
    });
  }

  var current = 0;
  var INTERVAL = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  var timer = null;
  function start() { stop(); timer = setInterval(function () { goTo((current + 1) % slides.length); }, INTERVAL); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  start();

  /* swipe left/right on the slideshow to change photo */
  var sx = 0, sy = 0, tracking = false;
  var hero = container.closest('.hero') || container;
  hero.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
  }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    goTo(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
    start();
  }, { passive: true });
});
