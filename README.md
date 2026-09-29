# Iglesia de Cristo Palabra Viva y Eficaz

Sitio web estático de la Iglesia de Cristo Palabra Viva y Eficaz, ubicada en Barberena, Santa Rosa, Guatemala.

El sitio está publicado con GitHub Pages en:

https://palabravivayeficaz.org

## Secciones

- Inicio
- Horarios de servicios
- Contacto y ubicación
- Transmisión en vivo
- Discipulado virtual

## Tecnologías

- HTML5
- Tailwind CSS
- JavaScript vanilla
- GitHub Pages

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Compilar estilos para producción:

```bash
npm run build
```

Trabajar con Tailwind en modo observador:

```bash
npm run dev
```

El CSS fuente vive en `src/input.css` y el archivo compilado que sirve GitHub Pages queda en `dist/styles.css`.

La tarjeta de próxima reunión usa JavaScript y la zona horaria `America/Guatemala` para mostrar el siguiente servicio del horario semanal. Para cambiar los horarios, edita la lista `meetings` en `scripts/site.js`.

La página de discipulado carga la playlist mediante YouTube Data API desde `scripts/discipulado.js`. La clave se usa en el navegador; para probar la lista en `localhost`, ese origen debe estar permitido entre los referentes HTTP de la clave en Google Cloud. El enlace «Abrir playlist» queda disponible si la API no responde.

## Estructura

```text
Pagina-Iglesia/
|-- index.html
|-- Enlaces/
|   |-- Transmision.html
|   `-- Discipulado.html
|-- Imagenes/
|-- scripts/
|   |-- site.js
|   `-- discipulado.js
|-- src/
|   `-- input.css
|-- dist/
|   `-- styles.css
|-- CNAME
|-- robots.txt
|-- package.json
`-- tailwind.config.js
```
