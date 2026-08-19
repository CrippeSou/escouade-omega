(function () {
  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowRight','ArrowRight','ArrowRight','ArrowRight','a','b'];
  const LS_KEY = 'omega-indian-mode';
  const RAIN_EMOJI = ['🧀','🍛','🐘','🛺','🙏','🥘','🐅'];
  const TICKER = [
    'cheese naan localisé ✓',
    'poulet tikka massala : coordonnées acquises ✓',
    'samosa chaud détecté (croustillant confirmé) ✓',
    'lassi mangue : stock validé ✓',
    'biryani géolocalisé à 200 m ✓',
    'tuk-tuk en approche — tarif négocié ✓',
    '⚠ vache sacrée sur la voie : contournement',
    'klaxon calibré à 128 dB ✓',
    'Taj Mahal indexé en haute résolution ✓',
    'thé masala chai infusé ✓',
    'chorégraphie Bollywood synchronisée ✓',
    'MISSION TOURISTA : SUCCÈS — NAMASTÉ 🙏'
  ];
  const INDIAN_WORDS = [
    'Namasté','Diwali','Holi','Chai','Curry','Naan','Bollywood','Maharaja',
    'Ashram','Yoga','Karma','Mousson','Gange','Taj Mahal','Sari','Henné',
    'Guru','Raja','Samosa','Masala'
  ];

  let progress = 0;
  let indianAudio = null;
  let indianOn = false;
  let banner = null;
  let rain = null;

  window.addEventListener('keydown', function (e) {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === SEQ[progress]) {
      progress++;
      if (progress === SEQ.length) {
        progress = 0;
        if (indianOn) { disableIndian(); } else { showActivationModal(); }
      }
    } else {
      progress = (key === SEQ[0]) ? 1 : 0;
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && indianOn) disableIndian();
  });

  function showActivationModal() {
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
        enableIndian();
        setTimeout(closeModal, 1400);
      }
    }, 140);

    function closeModal() {
      clearInterval(timer);
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    }
    function onEsc(e) { if (e.key === 'Escape') closeModal(); }
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', onEsc);
  }

  function fillTicker(track) {
    track.innerHTML = TICKER.concat(TICKER).map(function (t) { return '<span>' + t + '</span>'; }).join('');
  }

  function startRain() {
    rain = document.createElement('div');
    rain.id = 'indian-rain';
    document.body.appendChild(rain);
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.textContent = RAIN_EMOJI[Math.floor(Math.random() * RAIN_EMOJI.length)];
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (5 + Math.random() * 6) + 's';
      s.style.animationDelay = (Math.random() * 6) + 's';
      s.style.fontSize = (1.1 + Math.random() * 2) + 'rem';
      rain.appendChild(s);
    }
  }

  function showBanner() {
    banner = document.createElement('div');
    banner.id = 'indian-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-label', 'Mode indien activé');
    banner.innerHTML = `
      <span class="ib-flag">🇮🇳</span>
      <strong class="ib-title">MODE INDIEN ACTIVÉ</strong>
      <div class="ib-ticker"><div class="ib-track"></div></div>
      <button id="ib-close" title="Quitter le mode indien" aria-label="Quitter le mode indien">&times;</button>`;
    document.body.appendChild(banner);
    fillTicker(banner.querySelector('.ib-track'));
    banner.querySelector('#ib-close').addEventListener('click', disableIndian);
  }

  function swapText(selector, from, to) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (el.textContent.trim() === from) el.textContent = to;
    });
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function renameImportantThings() {
    const targets = document.querySelectorAll('nav > a, .quicklink-title');
    const words = shuffle(INDIAN_WORDS);
    targets.forEach(function (el, i) {
      if (!el.dataset.indianOriginal) el.dataset.indianOriginal = el.textContent;
      el.textContent = words[i % words.length];
    });
  }

  function restoreImportantThings() {
    document.querySelectorAll('[data-indian-original]').forEach(function (el) {
      el.textContent = el.dataset.indianOriginal;
      delete el.dataset.indianOriginal;
    });
  }

  function enableIndian() {
    if (indianOn) return;
    indianOn = true;
    document.body.classList.add('indian');
    showBanner();
    startRain();
    playIndianAudio();
    swapText('.nav-brand', 'ESCOUADE OMEGA', 'ESCOUADE INDIEN');
    swapText('.hero-number', 'OMEGA', 'OMEGADIEN');
    renameImportantThings();
    try { localStorage.setItem(LS_KEY, '1'); } catch (_) {}
  }

  function disableIndian() {
    if (!indianOn) return;
    indianOn = false;
    document.body.classList.remove('indian');
    if (banner) { banner.remove(); banner = null; }
    if (rain) { rain.remove(); rain = null; }
    stopIndianAudio();
    swapText('.nav-brand', 'ESCOUADE INDIEN', 'ESCOUADE OMEGA');
    swapText('.hero-number', 'OMEGADIEN', 'OMEGA');
    restoreImportantThings();
    try { localStorage.removeItem(LS_KEY); } catch (_) {}
  }

  function playIndianAudio() {
    if (!indianAudio) {
      indianAudio = new Audio('audio/indian-meme-song-original.mp3');
      indianAudio.loop = true;
      indianAudio.volume = 0.8;
    }
    indianAudio.currentTime = 0;
    indianAudio.play().catch(function () {
      // Lecture auto bloquée par le navigateur : on retentera au premier clic
      document.addEventListener('click', resumeAudioOnce, { once: true });
    });
  }

  function resumeAudioOnce() {
    if (indianOn && indianAudio) indianAudio.play().catch(function () {});
  }

  function stopIndianAudio() {
    if (indianAudio) {
      indianAudio.pause();
      indianAudio.currentTime = 0;
    }
  }

  // Persistance : le mode indien reste actif quand on navigue sur le site
  try {
    if (localStorage.getItem(LS_KEY) === '1') enableIndian();
  } catch (_) {}
})();
