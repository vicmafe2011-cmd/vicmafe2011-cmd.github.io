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
2. Pulsa **Commit to main**.
3. Pulsa **Push origin**.

## Añadir ORCID

Busca en `index.html` las dos apariciones de:

`Pendiente de añadir`

y sustituye la parte correspondiente por un enlace como este:

```html
<a href="https://orcid.org/0000-0000-0000-0000" target="_blank" rel="noopener">
  0000-0000-0000-0000
</a>
```

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
