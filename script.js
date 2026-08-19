const canvas = document.getElementById('stars-canvas');
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

// Easter egg : code Konami -> Mode Indien
(function () {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowRight','ArrowRight','ArrowRight','ArrowRight','KeyA','KeyB'];
  let progress = 0;
  let indianAudio = null;

  window.addEventListener('keydown', function (e) {
    if (e.code === KONAMI[progress]) {
      progress++;
      if (progress === KONAMI.length) {
        progress = 0;
        triggerIndianMode();
      }
    } else {
      progress = (e.code === KONAMI[0]) ? 1 : 0;
    }
  });

  function triggerIndianMode() {
    if (document.getElementById('indian-mode-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'indian-mode-overlay';
    overlay.innerHTML = `
      <div class="im-box">
        <button class="im-close" aria-label="Fermer">&times;</button>
        <div class="im-status">TRANSFERT SÉCURISÉ EN COURS...</div>
        <div class="im-bar"><div class="im-bar-fill"></div></div>
        <div class="im-pct">0%</div>
        <div class="im-result" hidden>
          <span class="im-flag">🇮🇳</span>
          <span class="im-label">MODE INDIEN ACTIVÉ</span>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const fill = overlay.querySelector('.im-bar-fill');
    const pct = overlay.querySelector('.im-pct');
    const status = overlay.querySelector('.im-status');
    const result = overlay.querySelector('.im-result');
    const closeBtn = overlay.querySelector('.im-close');

    let pctVal = 0;
    const timer = setInterval(function () {
      pctVal = Math.min(100, pctVal + Math.ceil(Math.random() * 18));
      fill.style.width = pctVal + '%';
      pct.textContent = pctVal + '%';
      if (pctVal >= 100) {
        clearInterval(timer);
        status.textContent = 'CONNEXION ÉTABLIE';
        result.hidden = false;
        playIndianAudio();
      }
    }, 140);

    function close() {
      clearInterval(timer);
      stopIndianAudio();
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    }
    function onEsc(e) { if (e.code === 'Escape') close(); }
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onEsc);
  }

  function playIndianAudio() {
    if (!indianAudio) {
      indianAudio = new Audio('audio/indian-meme-song-original.mp3');
      indianAudio.loop = true;
      indianAudio.volume = 0.8;
    }
    indianAudio.currentTime = 0;
    indianAudio.play().catch(function () {});
  }

  function stopIndianAudio() {
    if (indianAudio) {
      indianAudio.pause();
      indianAudio.currentTime = 0;
    }
  }
})();
