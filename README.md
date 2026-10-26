# Web académica de Víctor Manuel Ferrer García — versión 2

## Archivos

- `index.html`
- `styles.css`
- `script.js`
- `data/publications.json`
- `data/working-papers.json`
- `robots.txt`
- `sitemap.xml`

## Cómo actualizar la web

Copia todos los archivos y la carpeta `data` en la raíz del repositorio:

`vicmafe2011-cmd.github.io`

Después, en GitHub Desktop:

1. Escribe un resumen del cambio.
2. Crea una rama de trabajo desde `main` y realiza el commit en esa rama.
3. Publica la rama y abre un pull request contra `main` para revisión.

## Identidad académica

El ORCID ya está configurado: `https://orcid.org/0009-0008-2470-1369`.
Los enlaces de identidad en la cabecera, contacto y Schema.org deben mantenerse
sincronizados con OSF (`https://osf.io/user/jkeu6`) y GitHub
(`https://github.com/vicmafe2011-cmd`).

## Añadir una publicación

Edita `data/publications.json`. Ejemplo:

```json
[
  {
    "title": {
      "es": "Título del artículo",
      "en": "Article title"
    },
    "journal": "Nombre de la revista",
    "year": "2027",
    "doi": "10.0000/ejemplo",
    "pdf": "",
    "url": "",
    "description": {
      "es": "Breve descripción.",
      "en": "Brief description."
    }
  }
]
```

Cada nueva publicación se añade como otro bloque dentro de la lista.


## ORCID configurado

Este paquete ya incorpora el ORCID:

- 0009-0008-2470-1369
- https://orcid.org/0009-0008-2470-1369


## Manuscritos y trabajos en desarrollo

La sección se actualiza editando `data/working-papers.json`.
El trabajo actual se presenta como **Manuscrito en revisión / Manuscript in revision**,
con el tipo **Trabajo de investigación en desarrollo / Research work in progress**.
Mantén sincronizados el JSON, el contenido de respaldo de `script.js` y el de
`index.html`, en español e inglés.

Los libros y materiales de autor tienen su sección propia. Los manuscritos no se
incorporan a `data/publications.json` como si fueran artículos publicados.

## Corrección v2.3

Se ha corregido el orden de inicialización de JavaScript para que la sección
`Working Papers` cargue correctamente su contenido desde
`data/working-papers.json`.


## Actualización v2.4 — carga y contenido de respaldo

- El Working Paper aparece directamente en el HTML como contenido de respaldo.
- `script.js` incluye también los datos de respaldo.
- `data/working-papers.json` conserva el sistema sencillo de actualización.
- Se añadió control de caché para que GitHub Pages muestre antes los cambios.


## Actualización v2.5 - perfil OSF

Se ha incorporado el perfil público de OSF:

`https://osf.io/user/jkeu6`

Cambios:

- Enlace OSF en la cabecera social.
- Enlace OSF en la sección de contacto.
- Relación de identidad mediante `rel="me"`.
- Datos estructurados `Person` de Schema.org con ORCID, GitHub y OSF.
- Actualización de caché de estilos y JavaScript.

## Actualización v2.6 — SEO y autoría

- Título SEO, descripción y Open Graph con la identidad de filósofo, profesor,
  investigador, autor y doctorando en Filosofía por la Universidad de Murcia.
  Schema.org `Person`, `WebPage`, `Book` y `CreativeWork` relacionan identidad
  y autoría sin atribuir cargos o relaciones laborales universitarias.
- Doctorado y formación académica con universidades, fechas y datos aportados
  por el autor. Máster finalizado; estudios de Teología diferenciados de títulos
  obtenidos. Formación complementaria e idiomas con sus niveles declarados.
- Investigación presentada mediante once áreas generales.
- Experiencia docente y trayectoria profesional con secciones propias.
- Estado del manuscrito actualizado en HTML, JavaScript y JSON. La sección de
  publicaciones utiliza el texto neutral «Publicaciones académicas en preparación».
- Sección `#libros` con El reino de un solo habitante, su edición de 2026, ISBN
  y ASIN; materiales FiloCards y colaboraciones en prensa diferenciados.
- Recursos educativos: FiloCards, La Voz de la Ética, Mi Brújula de Valores,
  Tribunal Filosófico y HABLAS: Palabra del Día.
- Publicaciones académicas (`data/publications.json`), manuscritos
  (`data/working-papers.json`), libros y proyectos educativos diferenciados.
- `robots.txt` permite el rastreo y anuncia `sitemap.xml`, que incluye la URL
  canónica de la página. Las secciones con fragmentos no son páginas adicionales.
- `styles.css`, `script.js` y los archivos JSON mantienen su funcionamiento.
- El menú se adapta a la navegación ampliada y permite desplazamiento vertical
  en pantallas de poca altura.

Para revisar los cambios, sirve la carpeta con un servidor HTTP local y comprueba
la navegación, el menú móvil, los idiomas ES/EN, los temas y la carga de ambos JSON.
Revisa también `/robots.txt`, `/sitemap.xml` y el JSON-LD de `index.html`.
Los cambios se proponen mediante `seo-v2-6` contra `main`, sin merge directo.
