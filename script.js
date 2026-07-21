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
  renderWorkingPapers();
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

let workingPapers = [
  {
    title: {
      es: "Inteligencia artificial, cognición distribuida y pensamiento social cristiano",
      en: "Artificial Intelligence, Distributed Cognition and Catholic Social Thought"
    },
    status: {
      es: "Enviado a SCIO · Pendiente de evaluación editorial",
      en: "Submitted to SCIO · Awaiting editorial assessment"
    },
    type: {
      es: "Artículo de investigación",
      en: "Research article"
    },
    updated: {
      es: "Julio de 2026",
      en: "July 2026"
    },
    description: {
      es: "Análisis filosófico de la externalización cognitiva y de la organización política de las infraestructuras de inteligencia artificial, en diálogo con la antropología filosófica y el pensamiento social cristiano.",
      en: "A philosophical analysis of cognitive externalization and the political organization of artificial-intelligence infrastructures, in dialogue with philosophical anthropology and Catholic social thought."
    }
  }
];

async function loadWorkingPapers() {
  try {
    const response = await fetch("data/working-papers.json?v=2.4.0", { cache: "no-store" });
    if (!response.ok) throw new Error("No se pudo cargar working-papers.json");
    workingPapers = await response.json();
  } catch (error) {
    console.warn("Se utilizará el contenido integrado de Working Papers.", error);
  }
  renderWorkingPapers();
}

function renderWorkingPapers() {
  const container = document.getElementById("working-papers-list");
  if (!container) return;

  if (!workingPapers.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${currentLang === "es"
          ? "No hay trabajos en curso disponibles."
          : "No working papers are currently available."}</p>
      </div>`;
    return;
  }

  container.innerHTML = workingPapers.map(item => {
    const title = item.title?.[currentLang] || item.title?.es || "";
    const description = item.description?.[currentLang] || item.description?.es || "";
    const status = item.status?.[currentLang] || item.status?.es || "";
    const type = item.type?.[currentLang] || item.type?.es || "";
    const updated = item.updated?.[currentLang] || item.updated?.es || "";
    const updatedLabel = currentLang === "es" ? "Actualizado" : "Updated";
    const typeLabel = currentLang === "es" ? "Tipo" : "Type";

    return `
      <article class="working-paper">
        <div class="working-paper-top">
          <div>
            <p class="project-tag">WORKING PAPER</p>
            <h3>${title}</h3>
            ${description ? `<p>${description}</p>` : ""}
          </div>
          <span class="status-badge">${status}</span>
        </div>
        <div class="working-paper-meta">
          ${type ? `<span><strong>${typeLabel}:</strong> ${type}</span>` : ""}
          ${updated ? `<span><strong>${updatedLabel}:</strong> ${updated}</span>` : ""}
        </div>
      </article>`;
  }).join("");
}

applyLanguage(currentLang);
loadPublications();
loadWorkingPapers();
