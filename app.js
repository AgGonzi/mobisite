// ── DARK / LIGHT TOGGLE ──
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

if (themeToggle) {
  themeToggle.addEventListener('click', () =>
    setTheme(document.body.classList.contains('light'))
  );
}

// ── WAITLIST FORM ──
const waitlistForm    = document.getElementById('waitlistForm');
const waitlistMessage = document.getElementById('waitlistMessage');

if (waitlistForm && waitlistMessage) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('waitlistEmail')?.value.trim();
    waitlistMessage.textContent = email
      ? `🎉 Thanks! We’ll notify ${email} when MOBi launches.`
      : '🎉 You’re on the list!';
    waitlistForm.querySelector('.input-wrap').style.display = 'none';
  });
}

// ── FEATURE PILLS ──
const overlay  = document.getElementById('featOverlay');
const allCards = document.querySelectorAll('.feat-card');
const allPills = document.querySelectorAll('.feat[data-feat]');

function openCard(featId) {
  const card = document.getElementById('feat-' + featId);
  if (!card) return;

  // Close any open card first
  closeAll();

  card.removeAttribute('hidden');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');

  // Mark pill as expanded
  const pill = document.querySelector(`.feat[data-feat="${featId}"]`);
  if (pill) pill.setAttribute('aria-expanded', 'true');

  // Focus the close button for accessibility
  card.querySelector('.feat-card-close')?.focus();
}

function closeAll() {
  allCards.forEach(c => {
    c.setAttribute('hidden', '');
  });
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  allPills.forEach(p => p.setAttribute('aria-expanded', 'false'));
}

// Pill click
allPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const featId = pill.dataset.feat;
    const isOpen = pill.getAttribute('aria-expanded') === 'true';
    isOpen ? closeAll() : openCard(featId);
  });
});

// Close button
allCards.forEach(card => {
  card.querySelector('.feat-card-close')?.addEventListener('click', closeAll);
});

// Overlay click
overlay.addEventListener('click', closeAll);

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feat').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`;
  observer.observe(el);
});
