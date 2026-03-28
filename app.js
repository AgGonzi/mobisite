// ── DARK / LIGHT TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.querySelector('.theme-toggle-icon');

function setTheme(dark) {
  // We default to dark; light mode adds the .light class
  document.body.classList.toggle('light', !dark);
  if (themeIcon) themeIcon.textContent = dark ? '🌙' : '☀️';
  if (themeToggle) themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('mobi-theme', dark ? 'dark' : 'light');
}

(function initTheme() {
  const saved = localStorage.getItem('mobi-theme');
  if (saved === 'light') { setTheme(false); return; }
  if (saved === 'dark')  { setTheme(true);  return; }
  // Fall back to OS preference
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
      : '🎉 You’re on the list! We’ll reach out when MOBi launches.';
    waitlistForm.querySelector('.input-wrap').style.display = 'none';
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
}, { threshold: 0.1 });

document.querySelectorAll('.feat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});
