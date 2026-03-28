// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
  navMobile.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navMobile.classList.remove('open'))
  );
}

// ── DARK MODE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.querySelector('.theme-toggle-icon');

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
  if (themeToggle) themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('mobi-theme', dark ? 'dark' : 'light');
}

// Initialise: saved preference → OS preference
(function () {
  const saved = localStorage.getItem('mobi-theme');
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved === 'dark');
  } else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () =>
    setTheme(!document.body.classList.contains('dark'))
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
      ? `🎉 Thanks! We'll notify ${email} when MOBi launches.`
      : '🎉 You're on the list! We'll reach out when MOBi launches.';
    waitlistForm.reset();
  });
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
