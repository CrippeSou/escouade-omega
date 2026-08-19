const canvas = document.getElementById('stars-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5,
        a: Math.random(),
        speed: 0.2 + Math.random() * 0.3,
        drift: Math.random() * 0.15 - 0.075
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += 0.005 * s.speed;
      if (s.a > 1) s.a = 0;
      s.x += s.drift;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      s.y -= s.speed;
      if (s.y < 0) s.y = H;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 235, 255, ${Math.sin(s.a * Math.PI)})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  initStars();
  drawStars();
}

// Révélation au défilement
const reveals = document.querySelectorAll('.reveal');
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const revealObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, observerOptions);

reveals.forEach(reveal => { revealObserver.observe(reveal); });

// Bascule casque / visage sur le portfolio d'armures
function setArmorVariant(btn, viewerId, src, exposure) {
  const viewer = document.getElementById(viewerId);
  if (viewer) {
    viewer.setAttribute('src', src);
    viewer.setAttribute('exposure', exposure || '1.6');
  }
  const group = btn.parentElement.querySelectorAll('.armor-toggle-btn');
  group.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

(function () {
  var s = document.createElement('script');
  s.src = 'assets/theme-x92.js';
  s.async = true;
  document.head.appendChild(s);
})();
