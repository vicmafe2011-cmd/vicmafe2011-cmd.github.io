# Web académica de Víctor Manuel Ferrer García — versión 2

## Archivos

- `index.html`
- `styles.css`
- `script.js`
- `data/publications.json`

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


## Working Papers

La sección `Working Papers` se actualiza editando:

`data/working-papers.json`

Estados recomendados:

- `En preparación / In preparation`
- `Manuscrito completado / Completed manuscript`
- `Preparando envío / Preparing submission`
- `En evaluación / Under review`
- `Aceptado, pendiente de publicación / Forthcoming`
- `Publicado / Published`

No debe utilizarse `Under review` hasta que el manuscrito haya sido enviado formalmente y la revista haya confirmado que está en evaluación.


## Corrección v2.3

Se ha corregido el orden de inicialización de JavaScript para que la sección
`Working Papers` cargue correctamente su contenido desde
`data/working-papers.json`.


## Actualización v2.4 — envío a SCIO

- El Working Paper aparece directamente en el HTML como contenido de respaldo.
- `script.js` incluye también los datos de respaldo.
- `data/working-papers.json` conserva el sistema sencillo de actualización.
- Estado editorial mostrado:
  `Enviado a SCIO · Pendiente de evaluación editorial`.
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

- Título SEO, descripción y Open Graph con la identidad de filósofo, investigador,
  docente y autor; Schema.org `Person` con ORCID y líneas de investigación.
- Sección `#libros` con los tres títulos de autoría, usando el diseño existente.
  No se añaden fechas, editoriales, ISBN ni enlaces de compra sin confirmar.
- Publicaciones académicas (`data/publications.json`), working papers
  (`data/working-papers.json`), libros y proyectos educativos diferenciados.
- `robots.txt` permite el rastreo y anuncia `sitemap.xml`, que incluye la URL
  canónica de la página. Las secciones con fragmentos no son páginas adicionales.
- `styles.css`, `script.js` y los archivos JSON mantienen su funcionamiento.

Para revisar los cambios, sirve la carpeta con un servidor HTTP local y comprueba
la navegación, el menú móvil, los idiomas ES/EN, los temas y la carga de ambos JSON.
Revisa también `/robots.txt`, `/sitemap.xml` y el JSON-LD de `index.html`.
Los cambios se proponen mediante `seo-v2-6` contra `main`, sin merge directo.
