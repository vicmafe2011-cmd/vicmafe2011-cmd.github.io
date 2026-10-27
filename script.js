const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

// Preferences must not prevent navigation when storage is unavailable.
function readPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Session-only preference. */ }
}

function closeMenu() {
  nav?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}
menuButton?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") || false;
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menuButton?.focus();
  }
});
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    const wasOpen = nav?.classList.contains("open");
    closeMenu();
    if (wasOpen) {
      const target = document.querySelector(link.getAttribute("href"));
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    }
  });
});
const mobileNavigation = window.matchMedia("(max-width: 1100px)");
mobileNavigation.addEventListener("change", () => {
  const focusWasInNav = nav?.contains(document.activeElement);
  closeMenu();
  if (mobileNavigation.matches && focusWasInNav) menuButton?.focus();
});

let currentLang = readPreference("preferredLanguage") === "en" ? "en" : "es";

function updateControlLabels() {
  const isSpanish = currentLang === "es";
  const isDark = document.documentElement.dataset.theme === "dark";
  const themeLabel = isSpanish
    ? (isDark ? "Activar modo claro" : "Activar modo oscuro")
    : (isDark ? "Switch to light mode" : "Switch to dark mode");
  const languageLabel = isSpanish ? "Cambiar a inglés" : "Switch to Spanish";
  themeToggle?.setAttribute("aria-label", themeLabel);
  themeToggle?.setAttribute("title", themeLabel);
  langToggle?.setAttribute("aria-label", languageLabel);
  langToggle?.setAttribute("title", languageLabel);
  if (langToggle) langToggle.textContent = isSpanish ? "EN" : "ES";
}

function applyLanguage(lang) {
  currentLang = lang === "en" ? "en" : "es";
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-es][data-en]").forEach(el => {
    el.textContent = el.getAttribute("data-" + currentLang);
  });
  ["aria-label", "title", "alt"].forEach(attribute => {
    document.querySelectorAll("[data-" + attribute + "-es][data-" + attribute + "-en]").forEach(el => {
      el.setAttribute(attribute, el.getAttribute("data-" + attribute + "-" + currentLang));
    });
  });
  updateControlLabels();
  savePreference("preferredLanguage", currentLang);
  renderPublications();
}

langToggle?.addEventListener("click", () => {
  applyLanguage(currentLang === "es" ? "en" : "es");
});

const storedTheme = readPreference("preferredTheme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = ["light", "dark"].includes(storedTheme)
  ? storedTheme : (systemDark ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  savePreference("preferredTheme", next);
  updateControlLabels();
});

let publications = [];

async function loadPublications() {
  try {
    const response = await fetch("data/publications.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No se pudo cargar publications.json");
    publications = await response.json();
  } catch (error) {
    publications = [];
    console.warn(error);
  }
  renderPublications();
}

function renderPublications() {
  const container = document.getElementById("publications-list");
  if (!container) return;

  if (!publications.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${currentLang === "es" ? "No hay artículos académicos publicados disponibles." : "No published academic articles are available."}</p>
        <span>${currentLang === "es" ? "Los libros cuentan con una sección propia." : "Books have their own section."}</span>
      </div>`;
    return;
  }

  container.innerHTML = publications.map(item => {
    const title = item.title?.[currentLang] || item.title?.es || "";
    const description = item.description?.[currentLang] || item.description?.es || "";
    const links = [
      item.doi ? `<a href="https://doi.org/${item.doi}" target="_blank" rel="noopener noreferrer">DOI</a>` : "",
      item.pdf ? `<a href="${item.pdf}" target="_blank" rel="noopener noreferrer">PDF</a>` : "",
      item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${currentLang === "es" ? "Enlace" : "Link"}</a>` : ""
    ].filter(Boolean).join("");

    return `
      <article class="publication">
        <h3>${title}</h3>
        <p class="publication-meta">${[item.journal, item.year].filter(Boolean).join(" · ")}</p>
        ${description ? `<p>${description}</p>` : ""}
        ${links ? `<div class="publication-links">${links}</div>` : ""}
      </article>`;
  }).join("");
}

applyLanguage(currentLang);
loadPublications();
