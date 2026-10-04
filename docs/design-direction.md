# Dirección creativa — Cristina Alexandre Peluquería

## De dónde sale el concepto

Tres hechos de la investigación:

1. El salón se ha reformado alrededor de **espejos en arco con luz cálida por detrás**. Es lo primero que se ve en todas sus fotos de 2025 y en el fondo de sus reels.
2. Su trabajo estrella, contado por ellos mismos, es **iluminar el pelo sin perder la esencia**: «Melena iluminada sin perder su esencia castaño claro», «Morena iluminada en tonos cálidos», «naturalizar su color», «reflejos que aportan luz y movimiento».
3. El espejo es donde la clienta ve el resultado. Y sus reels son eso: un antes de espaldas y un después en el mismo sillón, frente al arco.

## Concepto central

> **Luz que respeta quién eres.**

En el salón la luz está en dos sitios: en los arcos de la pared y en el pelo que sale de allí. La web los une.

## Idea visual

**Una sala en penumbra con arcos de luz cálida.** La web se recorre como el pasillo del salón: fondo de techo negro y pared petróleo, y cada momento importante (el local, los antes/después, el lavado) aparece **dentro de un arco con halo ámbar**, como los espejos reales. Al revelar un «después», el halo del arco se enciende: más luz = el trabajo hecho.

Titular: **«Iluminar sin perder tu esencia.»** (adaptado de su propio texto de Instagram).

## Personalidad

| Es | No es |
|---|---|
| Cálida, de luz baja, acogedora | Spa genérico «bienestar, salud, belleza» |
| Técnica en color, precisa | Lujo frío de negro y dorado brillante |
| Cuidadosa con el pelo | Salón de tendencia ruidoso |
| Con oficio (desde 1987) y local nuevo | Peluquería antigua de barrio |
| Cercana, de tú | Distante o «exclusiva» |

## Color — sacado del local

| Token | Hex | Origen | Uso |
|---|---|---|---|
| `--noche` | `#15171A` | Techo negro | Fondo de hero, espejo, lavado |
| `--noche-2` | `#1E2225` | Techo con luz | Superficies sobre noche |
| `--petroleo` | `#2C3B3D` | Pared verde petróleo | Fondo de «El lavado», bloques |
| `--petroleo-claro` | `#5B6D6E` | Pared iluminada | Filetes, detalles sobre oscuro |
| `--roble` | `#C39A6B` | Roble en espiga | Patrón de espiga, detalles |
| `--ambar` | `#F2C27B` | Luz LED de los espejos | Halo de los arcos, CTA sobre oscuro (texto noche encima, 11:1) |
| `--oro` | `#B07A1E` | La A del logotipo | Wordmark, iconos; texto solo grande |
| `--oro-tinta` | `#7E5510` | Oro en sombra | Texto de acento sobre claro (6,4:1) |
| `--hueso` | `#F3EEE6` | Encimeras blancas cálidas | Fondo de secciones de lectura; texto sobre oscuro |
| `--piedra` | `#DCD7CF` | Suelo de gres | Filetes, fondos suaves |
| `--tinta` | `#1A1C1E` | — | Texto sobre claro |

Ritmo: oscuro (hero) → oscuro (espejo) → claro (servicios) → petróleo (lavado) → claro (salón, opiniones) → oscuro (cita). Como entrar del escaparate a la sala.

## Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Titulares y frases | **Newsreader** (variable, eje óptico, cursiva) | Serifa editorial cálida, con cursiva expresiva para las frases de las clientas y los títulos de los casos. No es la didona típica de «peluquería premium» (ya usada en otro proyecto de la agencia) ni una serif de moda. |
| Texto e interfaz | **Albert Sans** (variable) | Grotesca geométrica con mayúsculas limpias, prima del rótulo «CRISTINA ALEXANDRE» de la fachada. Muy legible en móvil, buenas cifras para horarios y teléfonos. |
| Wordmark | Albert Sans en versalitas espaciadas, la **A** central en `--oro` | Reproduce la idea del logotipo real (CRISTIN**A**LEXANDRE) sin copiar su tipografía anticuada. |

Fuentes alojadas en el propio sitio (woff2 latino). Sin Google Fonts.

## Fotografía

- **Solo fotos reales del salón y de sus clientas** (web actual, Google Business Profile, fotogramas de sus reels).
- Local: los arcos encendidos, la espiga de roble, la cortina de cadenas, el Spa Mist con vapor.
- Trabajos: siempre **de espaldas**, como los publica el salón (respeta a la clienta y es como se juzga un color).
- Tratamiento: ligero empuje cálido y contraste suave para unificar móvil e iPhone; nunca filtros.
- Las fotos clave viven dentro de **arcos**; las secundarias, en rectángulos con esquinas rectas y filete fino (no tarjetas redondeadas).

## Composición

- Pocas secciones, cada una con un motivo. Mucho aire en oscuro, densidad informativa en claro.
- Arcos verticales altos (proporción 5:8 aprox.) junto a columnas de texto estrechas.
- Servicios como **índice editorial con filetes**, no rejilla de tarjetas.
- Patrón de **espiga de roble** solo como textura de transición entre secciones (fina, en CSS).

## Elementos gráficos propios

1. **El arco con halo** (`.arch`): `border-radius` superior completo, filete interior claro de 1px y resplandor ámbar exterior. Reproduce el espejo retroiluminado.
2. **La A compartida**: en el wordmark y como monograma/favicon.
3. **Espiga**: separador de roble.
4. **Vapor**: en «El lavado», niebla lenta en CSS (se desactiva con `prefers-reduced-motion`).

## Movimiento

- Al cargar, el halo del arco del hero **se enciende** (0 → luz) en ~1,2 s, como un espejo al encender la sala.
- Revelado suave de secciones al hacer scroll (opacidad + 12px), una vez.
- Comparador: el halo crece con la posición del deslizador.
- Vapor lento en «El lavado».
- Todo respeta `prefers-reduced-motion`.

## Navegación

Cabecera fina y fija, sobre noche: wordmark · Trabajos · Servicios · El lavado · Salón · Cita · ES/EN · botón «Pedir cita». En móvil: menú a pantalla completa y barra inferior fija WhatsApp/Llamar.

## Signature element

**El arco de luz** — todas las imágenes protagonistas se enmarcan como los espejos reales del salón.

## Signature moment

**«El espejo»**: un arco grande con el antes de una clienta; al arrastrar aparece el después y el halo se enciende. Cuatro casos reales, cada uno con el objetivo explicado con las palabras del salón («eliminar restos de rosa fantasía y conseguir un rubio nórdico desde la raíz»).

## Test de concepto vs negocio

El arco no es un adorno: es el mueble real del salón y el lugar donde se ve el resultado. Si el concepto compitiera con las fotos, se reduce el halo; las fotos y los trabajos mandan.
