# QA — Cristina Alexandre Peluquería

Fecha: 4 de octubre de 2026 · Herramientas: Playwright (Chromium) + axe-core · URL publicada: https://alexsivera.github.io/cristina-alexandre-peluqueria-denia/

## Qué se ha comprobado

| Área | Cómo | Resultado |
|---|---|---|
| Escritorio 1440 / 1280 | Capturas completas y por sección | OK tras correcciones (ver abajo) |
| Tablet 768 | Página completa | OK |
| Móvil 390 | Página completa, menú, comparador, formulario de cita | OK tras correcciones |
| Desbordamiento horizontal | `scrollWidth` y búsqueda de elementos fuera del viewport | Sin desbordamiento |
| Comparador antes/después | Arrastre con ratón, táctil (pointer events), flechas de teclado, 4 pestañas | Funciona; el halo crece al revelar el después |
| Estado de apertura | Zona horaria Europe/Madrid, texto ES/EN, día de hoy resaltado en el horario | Correcto (domingo: «abrimos mañana a las 9:30») |
| Asistente de cita | Servicios, día, franja, nombre, foto; martes y sábado desactivan «tarde» | Mensaje correcto en ES y EN; abre wa.me con el texto codificado |
| Enlaces de WhatsApp | Mensaje precargado en el idioma activo (general y Spa Mist) | OK |
| Idioma | ES ⇄ EN: textos, alt, aria-label, atributo `lang`, nota de reseñas traducidas | OK; se recuerda en localStorage (con try/catch) |
| Mapa | Carga bajo demanda (sin cookies de Google hasta pulsar) | OK |
| Accesibilidad | axe-core sobre la página completa | 0 violaciones (se corrigió 1 menor: `article` con `role=tabpanel`) |
| Foco y teclado | Foco visible en ámbar, pestañas con flechas, Escape cierra el menú, enlace «Saltar al contenido» | OK |
| Movimiento reducido | `prefers-reduced-motion`: sin encendido, vapor, revelado ni animación del comparador | OK |
| Versión publicada | Consola, peticiones ≥ 400, imágenes, fuentes, JSON-LD | 0 errores, 0 fallos, 3 fuentes cargadas, `HairSalon` válido |

## Errores encontrados y corregidos

1. **Desbordamiento horizontal en escritorio** (1505 px): el resplandor ambiente del hero salía del borde. Se recolocó y se añadió `overflow-x: clip` en `main`.
2. **«abrimos el mañana»**: gramática del estado cuando abre al día siguiente. Corregido en ES y EN.
3. **Comparador desbordado en móvil**: las columnas `1fr` crecían por el min-content de las pestañas. Cambiado a `minmax(0, 1fr)`.
4. **El comparador no se arrastraba con ratón**: el navegador iniciaba el arrastre nativo de la imagen. Se bloquea `dragstart` y se añade `user-drag: none`.
5. **La animación de entrada peleaba con el arrastre**: ahora se cancela en cuanto alguien toca el comparador.
6. **Menú móvil transparente**: el `backdrop-filter` de la cabecera atrapaba el panel fijo. El desenfoque pasó a un pseudoelemento.
7. **Columnas de servicios desiguales**: la imagen de la primera columna era más grande. Sustituido por hueco + filetes en pseudoelementos.
8. **Galería con alturas descuadradas**: la foto ancha manda ahora la altura de las filas.
9. **Arco pequeño cortado en móvil** y hero que empujaba el CTA demasiado abajo: arco más pequeño y mini arco recolocado.

## Autocrítica y decisiones

- **La misma pared de espejos se repetía** en el hero, la galería y el mapa. La galería usa ahora la foto de los sillones, el mural de palmeras, la cortina de cadenas y el escaparate de QIQI; el mapa, un fondo neutro.
- **Acento en cursiva ámbar repetido en 6 titulares**: tic de plantilla que gastaba el recurso. Se mantiene solo en el hero, «El espejo» y «El lavado».
- **Pasos no verificados en los casos**: los del caso «Rubio de temporada» estaban deducidos («Mechas, Matiz»). Cambiados a lo que se ve en la propia publicación del salón (color, tratamiento epres, peinado).
- **Marca de agua** (CapCut) en un fotograma de reel: eliminada con el recorte.

## Tests finales

- **5 segundos**: en escritorio y en móvil se ve «Peluquería en Dénia · desde 1987», el titular, el salón real con sus arcos y «Pedir cita por WhatsApp» sin hacer scroll.
- **WOW**: el arco del hero encendiéndose como los espejos reales, y el comparador dentro del arco cuyo halo crece al revelar el después.
- **Identidad**: sin logotipo ni fotos quedan arcos de luz cálida en penumbra, espiga de roble y petróleo. Es el salón de la calle Quevedo, no una plantilla.

## Pendiente (necesita a la propietaria)

- Confirmar 1987 como fecha de apertura.
- Permiso de uso de las fotos de clientas (de espaldas, ya publicadas por el salón).
- Precios orientativos, si quieren mostrarlos.
- Si siguen haciendo manicura/pedicura y maquillaje.
- Página de aviso legal y privacidad con los datos de la titular antes de publicar en su dominio.
