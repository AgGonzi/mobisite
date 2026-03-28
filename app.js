// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile menu on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ── DARK MODE ──
const darkToggle = document.getElementById('darkToggle');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  darkToggle.textContent = dark ? '☀️' : '🌙';
  darkToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Initialise from localStorage or system preference
const saved = localStorage.getItem('mobi-theme');
if (saved) {
  applyTheme(saved === 'dark');
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  darkToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('mobi-theme', isDark ? 'dark' : 'light');
});

// ── NOTIFY FORM ──
const notifyForm = document.getElementById('notifyForm');
const notifyMsg  = document.getElementById('notifyMsg');
if (notifyForm) {
  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    notifyForm.style.display = 'none';
    notifyMsg.style.display  = 'block';
  });
}

// ── SMOOTH REVEAL ON SCROLL ──
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
