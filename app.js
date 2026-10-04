// Cristina Alexandre Peluquería · interacción mínima: idioma, estado de apertura, antes/después, cita por WhatsApp.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WA = '34683465559';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };

  /* ---------- Horario (Google Business Profile + Bing, oct. 2026) ---------- */
  // Día de la semana (0 = domingo) → tramos [apertura, cierre] en horas decimales
  const HOURS = { 0: [], 1: [[9.5, 18]], 2: [[9.5, 13.5]], 3: [[9.5, 18]], 4: [[9.5, 18]], 5: [[9.5, 18]], 6: [[9, 14]] };

  /* ---------- Textos ---------- */
  const T = {
    es: {
      open: (h) => `<strong>Abierto ahora</strong> · hasta las ${h}`,
      opensToday: (h) => `Cerrado ahora · abrimos hoy a las ${h}`,
      opensOn: (d, h, tmw) => `Cerrado ahora · abrimos ${tmw ? '' : 'el '}${d} a las ${h}`,
      days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      tomorrow: 'mañana',
      hello: 'Hola, quería pedir cita en Cristina Alexandre.',
      helloSpa: 'Hola, quería reservar un Spa Mist en Cristina Alexandre.',
      service: 'Servicio',
      day: 'Día preferido',
      morning: 'por la mañana',
      afternoon: 'por la tarde',
      name: 'Me llamo',
      photo: 'Os mando una foto de mi pelo y de lo que me gustaría.',
      services: { color: 'color / mechas', corte: 'corte de mujer', hombre: 'corte de hombre', spa: 'tratamiento / Spa Mist', peinado: 'peinado / evento', nose: 'aún no lo sé, necesito consejo' },
      mapTitle: 'Mapa de Cristina Alexandre Peluquería en la calle Quevedo, Dénia',
      cases: {
        nordico: { title: 'Un rubio nórdico desde la raíz', text: 'El objetivo era eliminar los restos de un rosa fantasía y llegar a un rubio nórdico desde la raíz.', steps: ['Tratamiento', 'Color', 'Corrección de reflejos'], src: 'Del Instagram del salón · agosto 2026', before: 'Antes: melena con mechas irregulares y restos de color', after: 'Después: rubio nórdico desde la raíz, con ondas' },
        castano: { title: 'Iluminada sin perder su esencia', text: 'Una melena castaño claro a la que quisimos dar luz sin que dejara de ser ella: trabajada con freestyle.', steps: ['Freestyle', 'Tratamiento', 'Corte', 'Peinado'], src: 'Del Instagram del salón · agosto 2026', before: 'Antes: melena castaña lisa y uniforme', after: 'Después: castaño claro iluminado con puntas más claras y ondas' },
        reflejos: { title: 'Luz y movimiento para un castaño', text: 'Reflejos para cabellos castaños que aportan luz y movimiento a la melena, sin perder la base oscura.', steps: ['Reflejos', 'K18', 'Peinado'], src: 'Del Instagram del salón · mayo 2026', before: 'Antes: melena oscura y lisa', after: 'Después: melena oscura con reflejos cálidos y ondas' },
        rubio: { title: 'Rubios de temporada', text: 'Los nuevos tonos de rubio de la primavera: de una base oscura con las puntas castigadas a un rubio luminoso.', steps: ['Color', 'Tratamiento epres', 'Peinado'], src: 'Del Instagram del salón · abril 2025', before: 'Antes: melena oscura con puntas gastadas', after: 'Después: rubio fundido desde la raíz con ondas' },
      },
    },
    en: {
      open: (h) => `<strong>Open now</strong> · until ${h}`,
      opensToday: (h) => `Closed now · we open today at ${h}`,
      opensOn: (d, h, tmw) => `Closed now · we open ${tmw ? '' : 'on '}${d} at ${h}`,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      tomorrow: 'tomorrow',
      hello: 'Hello, I’d like to book an appointment at Cristina Alexandre.',
      helloSpa: 'Hello, I’d like to book a Spa Mist at Cristina Alexandre.',
      service: 'Service',
      day: 'Preferred day',
      morning: 'morning',
      afternoon: 'afternoon',
      name: 'My name is',
      photo: 'I’ll send you a photo of my hair and of what I’d like.',
      services: { color: 'colour / highlights', corte: 'women’s cut', hombre: 'men’s cut', spa: 'treatment / Spa Mist', peinado: 'styling / event', nose: 'not sure yet, I’d like advice' },
      mapTitle: 'Map of Cristina Alexandre hair salon on Calle Quevedo, Dénia',
      cases: {
        nordico: { title: 'Nordic blonde from the root', text: 'The goal was to remove what was left of a fantasy pink and reach a Nordic blonde right from the root.', steps: ['Treatment', 'Colour', 'Tone correction'], src: 'From the salon’s Instagram · August 2026', before: 'Before: hair with uneven highlights and leftover colour', after: 'After: Nordic blonde from the root, with soft waves' },
        castano: { title: 'Lit up, still herself', text: 'Light brown hair we wanted to bring light to without losing its character — worked freestyle.', steps: ['Freestyle', 'Treatment', 'Cut', 'Styling'], src: 'From the salon’s Instagram · August 2026', before: 'Before: straight, even brown hair', after: 'After: lit-up light brown with brighter ends and waves' },
        reflejos: { title: 'Light and movement for brunettes', text: 'Highlights for brown hair that add light and movement while keeping the dark base.', steps: ['Highlights', 'K18', 'Styling'], src: 'From the salon’s Instagram · May 2026', before: 'Before: straight dark hair', after: 'After: dark hair with warm highlights and waves' },
        rubio: { title: 'Seasonal blondes', text: 'This spring’s new blonde tones: from a dark base with worn-out ends to a luminous blonde.', steps: ['Colour', 'epres treatment', 'Styling'], src: 'From the salon’s Instagram · April 2025', before: 'Before: dark hair with worn-out ends', after: 'After: blonde blended from the root, with waves' },
      },
    },
  };
  const CASES = ['nordico', 'castano', 'reflejos', 'rubio'];

  let lang = store.get('ca-lang') === 'en' ? 'en' : 'es';
  let currentCase = 'nordico';

  /* ---------- Idioma ---------- */
  const originals = new Map();
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    $$('[data-en]').forEach((el) => {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = lang === 'en' ? el.dataset.en : originals.get(el);
    });
    $$('[data-en-alt]').forEach((el) => {
      if (!el.dataset.esAlt) el.dataset.esAlt = el.alt;
      el.alt = lang === 'en' ? el.dataset.enAlt : el.dataset.esAlt;
    });
    $$('[data-en-aria-label]').forEach((el) => {
      if (!el.dataset.esAria) el.dataset.esAria = el.getAttribute('aria-label');
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAriaLabel : el.dataset.esAria);
    });
    $$('[data-only="en"]').forEach((el) => { el.hidden = lang !== 'en'; });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    store.set('ca-lang', lang);
    renderStatus();
    renderCase(currentCase, false);
    renderPreview();
    updateWaLinks();
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---------- Estado de apertura (hora de Dénia) ---------- */
  function nowInDenia() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, h: Number(get('hour')) + Number(get('minute')) / 60 };
  }
  const fmt = (x) => `${Math.floor(x)}:${String(Math.round((x % 1) * 60)).padStart(2, '0')}`;
  function renderStatus() {
    const t = T[lang];
    const { day, h } = nowInDenia();
    let html;
    const slot = HOURS[day].find(([a, b]) => h >= a && h < b);
    if (slot) html = t.open(fmt(slot[1]));
    else {
      const later = HOURS[day].find(([a]) => h < a);
      if (later) html = t.opensToday(fmt(later[0]));
      else {
        for (let i = 1; i <= 7; i++) {
          const d = (day + i) % 7;
          if (HOURS[d].length) { html = t.opensOn(i === 1 ? t.tomorrow : t.days[d], fmt(HOURS[d][0][0]), i === 1); break; }
        }
      }
    }
    $$('.js-status').forEach((el) => { el.innerHTML = html; el.classList.toggle('is-open', Boolean(slot)); });
    $$('.js-hours tr').forEach((tr) => tr.classList.toggle('is-today', Number(tr.dataset.day) === day));
  }
  setInterval(renderStatus, 60_000);

  /* ---------- El espejo: antes / después ---------- */
  const compare = $('.compare');
  const range = $('#compare-range');
  const arch = $('.arch--compare');
  const setPos = (v) => { compare.style.setProperty('--pos', v); range.value = v; };

  let anim = 0; // se incrementa para cancelar la animación en curso cuando alguien toca el comparador
  range.addEventListener('input', () => { anim++; setPos(range.value); });
  let dragging = false;
  const fromPointer = (e) => {
    const r = arch.getBoundingClientRect();
    setPos(Math.round(Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * 100));
  };
  arch.addEventListener('pointerdown', (e) => { anim++; dragging = true; try { arch.setPointerCapture(e.pointerId); } catch { /* puntero sintético */ } fromPointer(e); });
  arch.addEventListener('pointermove', (e) => { if (dragging) fromPointer(e); });
  ['pointerup', 'pointercancel'].forEach((ev) => arch.addEventListener(ev, () => { dragging = false; }));
  range.style.pointerEvents = 'none';
  arch.addEventListener('dragstart', (e) => e.preventDefault());

  function animatePos(from, to, ms) {
    const id = ++anim;
    if (reduce) { setPos(to); return; }
    const t0 = performance.now();
    const step = (t) => {
      if (id !== anim) return;
      const k = Math.min((t - t0) / ms, 1);
      const e = 1 - Math.pow(1 - k, 3);
      setPos(Math.round(from + (to - from) * e));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function renderCase(id, swap = true) {
    currentCase = id;
    const c = T[lang].cases[id];
    const n = CASES.indexOf(id) + 1;
    $('.js-case-n').textContent = `0${n} / 0${CASES.length}`;
    $('.js-case-title').textContent = c.title;
    $('.js-case-text').textContent = c.text;
    $('.js-case-steps').innerHTML = c.steps.map((s) => `<li>${s}</li>`).join('');
    $('.js-case-src').textContent = c.src;
    const before = $('.js-before');
    const after = $('.js-after');
    const load = () => {
      before.src = `assets/img/caso-${id}-antes-720.webp`;
      before.srcset = `assets/img/caso-${id}-antes-480.webp 480w, assets/img/caso-${id}-antes-720.webp 720w`;
      after.src = `assets/img/caso-${id}-despues-720.webp`;
      after.srcset = `assets/img/caso-${id}-despues-480.webp 480w, assets/img/caso-${id}-despues-720.webp 720w`;
      before.alt = c.before;
      after.alt = c.after;
    };
    if (!swap) { before.alt = c.before; after.alt = c.after; return; }
    const panel = $('.js-case');
    panel.classList.remove('is-in'); void panel.offsetWidth; panel.classList.add('is-in');
    compare.classList.add('is-swapping');
    setTimeout(() => {
      load();
      after.decode?.().catch(() => {}).finally(() => {
        compare.classList.remove('is-swapping');
        setPos(15);
        animatePos(15, 70, 1300);
      });
    }, reduce ? 0 : 260);
  }

  const tabs = $$('.cases__tabs [role="tab"]');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
      renderCase(tab.dataset.case);
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); next.click();
    });
    tab.tabIndex = i === 0 ? 0 : -1;
  });

  // Primera vez que el espejo entra en pantalla: se «enciende» mostrando el después
  new IntersectionObserver((entries, obs) => {
    if (entries.some((e) => e.isIntersecting)) { animatePos(18, 70, 1600); obs.disconnect(); }
  }, { threshold: 0.55 }).observe(arch);

  /* ---------- Cita por WhatsApp ---------- */
  const form = $('.js-booker');
  const tarde = $('.js-tarde input');
  function buildMessage() {
    const t = T[lang];
    const fd = new FormData(form);
    const services = fd.getAll('s').map((s) => t.services[s]);
    const d = fd.get('d');
    const tm = fd.get('t');
    const lines = [t.hello];
    if (services.length) lines.push(`• ${t.service}: ${services.join(', ')}`);
    if (d || tm) {
      const when = [d ? t.days[Number(d)] : '', tm === 'm' ? t.morning : tm === 't' ? t.afternoon : ''].filter(Boolean).join(' ');
      lines.push(`• ${t.day}: ${when}`);
    }
    const name = (fd.get('n') || '').toString().trim();
    if (name) lines.push(`• ${t.name} ${name}`);
    if (fd.get('f')) lines.push(t.photo);
    return lines.join('\n');
  }
  function renderPreview() {
    const d = new FormData(form).get('d');
    const morningOnly = d === '2' || d === '6';
    tarde.disabled = morningOnly;
    if (morningOnly && tarde.checked) form.querySelector('input[name="t"][value="m"]').checked = true;
    $('.js-tarde-hint').hidden = !morningOnly;
    $('.js-preview').textContent = buildMessage();
  }
  form.addEventListener('input', renderPreview);
  form.addEventListener('change', renderPreview);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(buildMessage())}`, '_blank', 'noopener');
  });

  function updateWaLinks() {
    $$('a.js-wa').forEach((a) => {
      const msg = a.dataset.service === 'spa' ? T[lang].helloSpa : T[lang].hello;
      a.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    });
  }

  /* ---------- Mapa bajo demanda ---------- */
  $('.js-map-btn').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=PELUQUERIA+CRISTINA+ALEXANDRE+D%C3%89NIA,+Calle+Quevedo+1,+03700+D%C3%A9nia&z=17&output=embed';
    f.title = T[lang].mapTitle;
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    $('.js-map').replaceChildren(f);
  });

  /* ---------- Menú móvil ---------- */
  const burger = $('.burger');
  const nav = $('#nav');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 961px)').addEventListener('change', () => setMenu(false));

  /* ---------- Barra fija móvil: aparece al pasar los botones del inicio ---------- */
  const dock = $('.dock');
  new IntersectionObserver(([e]) => dock.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe($('.hero__actions'));
  // se oculta cuando el formulario de cita está en pantalla (ya tiene su botón)
  new IntersectionObserver(([e]) => dock.classList.toggle('is-hidden-by-form', e.isIntersecting)).observe($('.booker .btn--block'));

  /* ---------- Revelado suave ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.espejo__head, .cases, .servicios__head, .menu__item, .precio, .lavado__text > *, .salon__head, .galeria figure, .marcas, .opiniones__score, .opiniones__voces blockquote, .cita__form > *, .cita__info > *');
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  applyLang(lang);
})();
