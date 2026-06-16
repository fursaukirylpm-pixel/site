// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
const easeOut = t => 1 - Math.pow(1 - t, 3);
function runCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1500;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(easeOut(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runCount(e.target);
      countObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Subtle hero parallax on pointer move (desktop)
const orbs = document.querySelectorAll('.orb');
const finePointer = window.matchMedia('(pointer:fine)').matches;
if (finePointer) {
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    orbs.forEach((o, i) => {
      const f = (i + 1) * 18;
      o.style.transform = `translate(${x * f}px, ${y * f}px)`;
    });
  }, { passive: true });
}

/* ===== ReactBits-style effects (vanilla) ===== */
const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

// 1) BlurText — split [data-split] into animated words, preserving inline tags & <br>
function splitToWords(root) {
  const frag = [];
  root.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      node.textContent.split(/(\s+)/).forEach((tok) => {
        if (tok === '') return;
        if (/^\s+$/.test(tok)) { frag.push(document.createTextNode(tok)); return; }
        const s = document.createElement('span');
        s.className = 'word';
        s.textContent = tok;
        frag.push(s);
      });
    } else if (node.tagName === 'BR') {
      frag.push(node.cloneNode());
    } else {
      const wrap = node.cloneNode(false);
      splitToWords(node).forEach((n) => wrap.appendChild(n));
      frag.push(wrap);
    }
  });
  return frag;
}
document.querySelectorAll('[data-split]').forEach((el) => {
  if (reduceMotion) return;
  const pieces = splitToWords(el);
  el.textContent = '';
  pieces.forEach((p) => el.appendChild(p));
  const words = el.querySelectorAll('.word');
  words.forEach((w, i) => { w.style.transitionDelay = (i * 70) + 'ms'; });
  // hero is above the fold → kick off shortly after load
  requestAnimationFrame(() => setTimeout(() => words.forEach((w) => w.classList.add('in')), 180));
});

// 2) SpotlightCard — cursor-follow glow
if (finePointer) {
  document.querySelectorAll('.card, .role').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

// 3) Magnet — subtle magnetic pull on pill buttons
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.btn-pill').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${mx * 0.22}px, ${my * 0.32}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

// Preview helper: ?preview forces all reveals/counters visible (for static screenshots)
if (location.search.includes('preview')) {
  document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in'));
  document.querySelectorAll('.word').forEach((e) => e.classList.add('in'));
  document.querySelectorAll('[data-count]').forEach((e) => {
    e.textContent = e.dataset.count + (e.dataset.suffix || '');
  });
  const heroEl = document.querySelector('.hero');
  if (heroEl) heroEl.style.minHeight = '760px';
}
