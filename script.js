
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const langToggle = document.getElementById('lang-toggle');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
  langToggle.setAttribute('aria-label', lang === 'es' ? 'Cambiar a inglés' : 'Cambiar a español');
  localStorage.setItem('preferredLanguage', lang);
}

langToggle?.addEventListener('click', () => {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
});

setLanguage(localStorage.getItem('preferredLanguage') || 'es');
