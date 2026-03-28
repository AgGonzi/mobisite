// ── THEME ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.querySelector('.theme-toggle-icon');

function setTheme(dark) {
  document.body.classList.toggle('light', !dark);
  if (themeIcon) themeIcon.textContent = dark ? '🌙' : '☀️';
  if (themeToggle) themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('mobi-theme', dark ? 'dark' : 'light');
}
(function initTheme() {
  const saved = localStorage.getItem('mobi-theme');
  if (saved === 'light') { setTheme(false); return; }
  if (saved === 'dark')  { setTheme(true);  return; }
  setTheme(!window.matchMedia('(prefers-color-scheme: light)').matches);
})();
if (themeToggle) themeToggle.addEventListener('click', () => setTheme(document.body.classList.contains('light')));

// ── WAITLIST ──
const waitlistForm    = document.getElementById('waitlistForm');
const waitlistMessage = document.getElementById('waitlistMessage');
if (waitlistForm && waitlistMessage) {
  waitlistForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('waitlistEmail')?.value.trim();
    waitlistMessage.textContent = email
      ? `🎉 Thanks! We’ll notify ${email} when MOBi launches.`
      : '🎉 You’re on the list!';
    waitlistForm.querySelector('.input-wrap').style.display = 'none';
  });
}

// ── FEATURE PANEL ──
const DURATION  = 7000; // ms per card
const pills     = Array.from(document.querySelectorAll('.feat-pill'));
const cards     = Array.from(document.querySelectorAll('.feat-card'));
const fillEls   = Array.from(document.querySelectorAll('.pill-bar-fill'));

let current    = 0;
let timer      = null;
let fillStart  = null;
let fillRaf    = null;
let paused     = false;

function showCard(index, resetTimer = true) {
  // deactivate all
  pills.forEach((p, i) => {
    p.setAttribute('aria-selected', 'false');
    fillEls[i].style.transition = 'none';
    fillEls[i].style.width = '0%';
  });
  cards.forEach(c => c.classList.remove('active'));

  // activate target
  current = index;
  pills[current].setAttribute('aria-selected', 'true');
  cards[current].classList.add('active');

  if (resetTimer) startTimer();
}

function startTimer() {
  clearTimeout(timer);
  cancelAnimationFrame(fillRaf);

  fillEls[current].style.transition = 'none';
  fillEls[current].style.width = '0%';

  fillStart = performance.now();

  function tick(now) {
    if (paused) { fillRaf = requestAnimationFrame(tick); return; }
    const elapsed = now - fillStart;
    const pct = Math.min((elapsed / DURATION) * 100, 100);
    fillEls[current].style.transition = 'none';
    fillEls[current].style.width = pct + '%';
    if (pct < 100) {
      fillRaf = requestAnimationFrame(tick);
    } else {
      advance();
    }
  }
  fillRaf = requestAnimationFrame(tick);
}

function advance() {
  showCard((current + 1) % pills.length);
}

// Manual pill click
pills.forEach((pill, i) => {
  pill.addEventListener('click', () => showCard(i));
});

// Pause on hover over the panel
const panel = document.querySelector('.features-panel');
if (panel) {
  panel.addEventListener('mouseenter', () => { paused = true; });
  panel.addEventListener('mouseleave', () => {
    paused = false;
    fillStart = performance.now() - (parseFloat(fillEls[current].style.width) / 100) * DURATION;
  });
}

// Kick off
showCard(0);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.1 });

pills.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-14px)';
  el.style.transition = `opacity .4s ease ${i * 0.07}s, transform .4s ease ${i * 0.07}s`;
  observer.observe(el);
});
