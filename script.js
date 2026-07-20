const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

let currentLang = localStorage.getItem("preferredLanguage") || "es";

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-es][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langToggle.textContent = lang === "es" ? "EN" : "ES";
  localStorage.setItem("preferredLanguage", lang);
  renderPublications();
}

langToggle?.addEventListener("click", () => {
  applyLanguage(currentLang === "es" ? "en" : "es");
});

const storedTheme = localStorage.getItem("preferredTheme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = storedTheme || (systemDark ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("preferredTheme", next);
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
        <p>${currentLang === "es" ? "Todavía no hay publicaciones disponibles." : "No publications are available yet."}</p>
        <span>${currentLang === "es" ? "Las incorporaremos aquí cuando se publiquen." : "They will be added here once published."}</span>
      </div>`;
    return;
  }

  container.innerHTML = publications.map(item => {
    const title = item.title?.[currentLang] || item.title?.es || "";
    const description = item.description?.[currentLang] || item.description?.es || "";
    const links = [
      item.doi ? `<a href="https://doi.org/${item.doi}" target="_blank" rel="noopener">DOI</a>` : "",
      item.pdf ? `<a href="${item.pdf}" target="_blank" rel="noopener">PDF</a>` : "",
      item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${currentLang === "es" ? "Enlace" : "Link"}</a>` : ""
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
