# Cibeelization — Web oficial

Sitio estático responsive del videojuego indie **Cibeelization**, desarrollado en HTML, CSS y JavaScript modular. No requiere compilación, dependencias de Node ni backend.

## Abrir en tu computadora

1. Descargá y extraé la carpeta `cibeelization-web`.
2. Abrí esa carpeta en Visual Studio Code.
3. Instalá **Live Server** si aún no lo tenés.
4. Hacé clic derecho sobre `index.html` → **Open with Live Server**.
5. Navegá la web localmente. Usá un servidor local (Live Server o `python -m http.server`) porque los módulos de JS no funcionan de forma fiable desde `file://`.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub y subí **el contenido de esta carpeta** a la raíz del repositorio (incluido `index.html`).
2. Entrá en **Settings → Pages**.
3. En **Build and deployment** seleccioná **Deploy from a branch**.
4. Elegí `main` y `/ (root)`; guardá.
5. GitHub Pages te indicará la URL de publicación. No se necesita workflow de build.

Todas las referencias locales empiezan por `./` o son enlaces de ancla, por lo que también funcionan en repositorios publicados bajo `/nombre-del-repo/`.

## Qué editar antes de publicar

En **`js/config.js`** cambiá las claves:

- `studioName`: nombre definitivo del estudio.
- `contactEmail`: email de contacto; hasta establecerlo, el formulario explica que no puede enviar mensajes.
- `socials`: URLs oficiales de Discord, Instagram y YouTube. Los enlaces no configurados se muestran como «Próximamente».
- `team`: nombres, roles reales, fotografías (si las hay) y biografías confirmadas.
- `gallery`: añadí o reemplazá imágenes en `assets/screenshots/` y actualizá sus referencias.
- `news`: agregá anuncios reales como objetos `{ date: 'AAAA-MM-DD', title: '...', description: '...', category: '...', image: '' }`. Sin noticias publicadas se muestra un estado vacío.

No hay información de cuentas, correos, fechas de lanzamiento o roles inventada. Las modalidades de juego no implementadas se presentan como previstas.

## Organización

- `index.html`: estructura y contenido general.
- `css/styles.css`: estilos e identidad visual.
- `css/animations.css`: transiciones y ajustes para movimiento reducido.
- `css/responsive.css`: adaptación a tablets y móviles.
- `js/config.js`: información editable del proyecto.
- `js/main.js`: render de equipo/redes, validación de contacto y animaciones.
- `js/navigation.js`: navegación móvil accesible.
- `js/gallery.js`: galería y visor con teclado.
- `js/news.js`: noticias locales sin servidor.
- `assets/`: recursos gráficos locales.

## Fuente del material visual

Las imágenes en `assets/` se extrajeron de la presentación original **«Planificación de negocios - Cibeelization.pdf»** aportada por el equipo. Las cuatro capturas de la galería corresponden a las páginas 4, 22, 23 y 24; las imágenes adicionales son de las páginas 1, 3 y 19. Las capturas pertenecen al prototipo, no a una versión final.

## Limitaciones conscientes

El formulario utiliza `mailto:` y requiere un correo configurado y una aplicación de correo del visitante. No confirma el envío de ningún mensaje. El sitio utiliza fuentes de Google Fonts como mejora visual opcional; sin conexión, se renderizan alternativas locales.
