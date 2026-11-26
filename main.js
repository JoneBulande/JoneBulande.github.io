/* Jone Bulande — Portfolio 2026 */
(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------------- i18n ---------------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const i18nEls = $$('[data-en]');
  i18nEls.forEach((el) => { el.dataset.pt = el.innerHTML.trim(); });

  function setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') lang = 'pt';
    root.lang = lang;
    i18nEls.forEach((el) => { el.innerHTML = el.dataset[lang]; });
    const sw = $('.lang');
    sw.dataset.lang = lang;
    $$('[data-set-lang]', sw).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));
    store.set('jb-lang', lang);
    splitWords();
    // re-show already revealed masks/elements after innerHTML swap (classes are on parents, so fine)
  }
  $$('[data-set-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.setLang)));

  /* ---------------- Word split for scroll-linked statement ---------------- */
  let words = [];
  function splitWords() {
    words = [];
    $$('.js-words').forEach((el) => {
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span');
              s.className = 'w';
              s.textContent = part;
              frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
        });
      };
      walk(el);
      words.push(...$$('.w', el));
    });
    updateWords();
  }

  function updateWords() {
    if (!words.length) return;
    const el = $('.js-words');
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  }

  const initial = store.get('jb-lang') || ((navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en');
  setLang(initial);

  /* ---------------- Hero name split ---------------- */
  let ci = 0;
  $$('.hero__name .word').forEach((w) => {
    const t = w.textContent;
    w.textContent = '';
    [...t].forEach((c) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', ci++);
      s.textContent = c;
      w.appendChild(s);
    });
  });

  /* ---------------- Clock ---------------- */
  const timeEls = $$('.js-time');
  const fmt = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Maputo' });
  const tick = () => { const t = fmt.format(new Date()) + ' CAT'; timeEls.forEach((e) => (e.textContent = t)); };
  tick(); setInterval(tick, 15000);

  /* ---------------- Smooth scroll ---------------- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? document.body : $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { offset: 0, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------------- Loader ---------------- */
  function startPage() {
    body.classList.remove('is-loading');
    requestAnimationFrame(() => root.classList.add('is-ready'));
    if (lenis) lenis.start();
  }
  if (root.classList.contains('no-loader')) {
    startPage();
  } else {
    if (lenis) lenis.stop();
    const loader = $('.loader');
    const count = $('.loader__count');
    const bar = $('.loader__bar span');
    const dur = 1400;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      const v = ease(p);
      count.textContent = Math.round(v * 100);
      bar.style.transform = `scaleX(${v})`;
      if (p < 1) requestAnimationFrame(step);
      else {
        try { sessionStorage.setItem('jb-loaded', '1'); } catch (e) {}
        setTimeout(() => {
          loader.classList.add('is-done');
          setTimeout(startPage, 250);
          setTimeout(() => loader.remove(), 1000);
        }, 120);
      }
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Reveal on view ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
      if (e.target.dataset.count !== undefined) countUp(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  $$('[data-reveal], [data-reveal-mask], [data-count]').forEach((el) => io.observe(el));

  function countUp(el) {
    const end = +el.dataset.count;
    const nf = new Intl.NumberFormat('de-DE');
    if (reduceMotion) { el.textContent = nf.format(end); return; }
    const dur = 1600, t0 = performance.now();
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = nf.format(Math.round(end * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Header: hide on scroll down ---------------- */
  const header = $('#header');
  let lastY = 0;

  /* ---------------- Marquee (scroll-velocity aware) ---------------- */
  const track = $('.marquee__track');
  const group = $('.marquee__group');
  // duplicate enough groups to fill
  for (let i = 0; i < 3; i++) track.appendChild(group.cloneNode(true));
  let mx = 0, dir = -1, velocity = 0;

  /* ---------------- Sticky cards ---------------- */
  const cards = $$('.card');
  const shades = cards.map((c) => $('.card__shade', c));

  /* ---------------- Active nav ---------------- */
  const sections = ['work', 'about', 'services', 'contact'].map((id) => document.getElementById(id));
  const navLinks = $$('.nav a');

  /* ---------------- Main loop ---------------- */
  let prevY = window.scrollY;
  function frame() {
    const y = window.scrollY;
    const dy = y - prevY;
    prevY = y;

    // header
    header.classList.toggle('is-scrolled', y > 40);
    if (Math.abs(y - lastY) > 6) {
      header.classList.toggle('is-hidden', y > lastY && y > 400 && !body.classList.contains('menu-open'));
      lastY = y;
    }

    // marquee
    if (!reduceMotion) {
      if (dy !== 0) dir = dy > 0 ? -1 : 1;
      velocity = lerp(velocity, Math.min(Math.abs(dy), 60), 0.1);
      mx += dir * (0.6 + velocity * 0.25);
      const w = group.offsetWidth;
      if (w) { if (mx <= -w) mx += w; if (mx > 0) mx -= w; }
      track.style.transform = `translate3d(${mx}px,0,0)`;
    }

    // cards stack
    if (!reduceMotion) {
      const vh = window.innerHeight;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const top = next.getBoundingClientRect().top;
        const stickTop = parseFloat(getComputedStyle(next).top) || 0;
        const p = clamp(1 - (top - stickTop) / (vh - stickTop), 0, 1);
        card.style.transform = `scale(${1 - p * 0.06})`;
        shades[i].style.opacity = (p * 0.55).toFixed(3);
      });
    }

    // words
    updateWords();

    // active nav
    let cur = '';
    sections.forEach((s) => { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id; });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur));

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------- Cursor ---------------- */
  if (finePointer && !reduceMotion) {
    const dot = $('.cursor');
    const label = $('.cursor__label');
    let x = innerWidth / 2, y = innerHeight / 2, dx = x, dy2 = y, lx = x, ly = y;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => {
      dx = lerp(dx, x, 0.35); dy2 = lerp(dy2, y, 0.35);
      lx = lerp(lx, x, 0.16); ly = lerp(ly, y, 0.16);
      dot.style.transform = `translate3d(${dx}px,${dy2}px,0)`;
      label.style.transform = `translate3d(${lx}px,${ly}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
    $$('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => { label.classList.add('is-on'); dot.style.opacity = '0'; });
      el.addEventListener('pointerleave', () => { label.classList.remove('is-on'); dot.style.opacity = ''; });
    });

    // Magnetic buttons
    $$('.magnet').forEach((m) => {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      const run = () => {
        cx = lerp(cx, tx, 0.15); cy = lerp(cy, ty, 0.15);
        m.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        if (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) raf = requestAnimationFrame(run);
        else raf = null;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
      m.addEventListener('pointermove', (e) => {
        const r = m.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * 0.35;
        ty = (e.clientY - (r.top + r.height / 2)) * 0.35;
        kick();
      });
      m.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    });
  }

  /* ---------------- Services accordion ---------------- */
  $$('.svc__head').forEach((btn) => {
    btn.addEventListener('click', () => {
      const li = btn.closest('.svc');
      const open = !li.classList.contains('is-open');
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = $('.menu-btn');
  function closeMenu() {
    if (!body.classList.contains('menu-open')) return;
    body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
  }
  menuBtn.addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    header.classList.remove('is-hidden');
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------------- Copy email ---------------- */
  const toast = $('.toast');
  let toastT;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('is-on'), 2200);
  }
  $$('.js-copy').forEach((b) => {
    b.addEventListener('click', async () => {
      const v = b.dataset.copy;
      try {
        await navigator.clipboard.writeText(v);
        showToast(root.lang === 'en' ? 'Email copied ✓' : 'Email copiado ✓');
      } catch (e) {
        location.href = 'mailto:' + v;
      }
    });
  });
})();
