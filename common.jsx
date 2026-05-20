// common.jsx — SketchyPhone, primitives, data and i18n shared by all approaches.

// ─── Sketchy phone frame ─────────────────────────────────────────────
function SketchyPhone({ children, width = 300, height = 620, dark = false, accent = '#c89432', noChrome = false }) {
  const ink = dark ? '#f1ebdc' : '#1a1a1a';
  const paper = dark ? '#1a1a1a' : '#f7f1e3';
  return (
    <div style={{
      width, height, background: paper, color: ink,
      border: `2.5px solid ${ink}`, borderRadius: 36,
      position: 'relative', overflow: 'hidden',
      boxShadow: `4px 4px 0 ${ink}33`,
      fontFamily: '"Kalam", "Patrick Hand", cursive',
      fontSize: 14,
      '--ink': ink, '--paper': paper, '--accent': accent,
    }}>
      {!noChrome && (
        <>
          {/* dynamic island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 84, height: 20, borderRadius: 14, background: ink, opacity: 0.9,
            zIndex: 50,
          }} />
          {/* status bar tiny scribbles */}
          <div style={{
            position: 'absolute', top: 14, right: 22, fontSize: 10, opacity: 0.6,
            fontFamily: '"Kalam", cursive', fontWeight: 700,
          }}>
            9:41
          </div>
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 4, borderRadius: 99, background: ink, opacity: 0.7,
          }} />
        </>
      )}
      <div style={{
        position: 'absolute', inset: 0,
        paddingTop: noChrome ? 0 : 40, paddingBottom: noChrome ? 0 : 24,
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Sketchy primitives ──────────────────────────────────────────────
function SkBox({ children, style = {}, accent = false, dashed = false, fill = false, rotate = 0, onClick }) {
  return (
    <div onClick={onClick} style={{
      border: `${accent ? 2.5 : 2}px ${dashed ? 'dashed' : 'solid'} ${accent ? 'var(--accent)' : 'var(--ink)'}`,
      borderRadius: 14,
      padding: '10px 14px',
      background: fill ? 'var(--accent)' : 'transparent',
      color: fill ? 'var(--paper)' : 'inherit',
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      boxShadow: accent ? '3px 3px 0 var(--ink)' : undefined,
      ...style,
    }}>{children}</div>
  );
}

function SkBtn({ children, fill = true, full = false, small = false, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      border: '2.5px solid var(--ink)',
      borderRadius: 14,
      padding: small ? '6px 12px' : '10px 18px',
      background: fill ? 'var(--accent)' : 'transparent',
      color: fill ? '#1a1a1a' : 'inherit',
      boxShadow: '3px 3px 0 var(--ink)',
      fontWeight: 700, fontSize: small ? 13 : 15,
      width: full ? '100%' : undefined,
      boxSizing: 'border-box',
      ...style,
    }}>{children}</div>
  );
}

function SkChip({ children, fill = false, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      border: '1.5px solid var(--ink)', borderRadius: 999,
      padding: '4px 10px', fontSize: 12, fontWeight: 600,
      background: fill ? 'var(--accent)' : 'transparent',
      color: fill ? '#1a1a1a' : 'inherit',
      ...style,
    }}>{children}</span>
  );
}

// Sketchy line/divider
function SkDivider({ thick = false, dashed = false, style = {} }) {
  return <div style={{
    height: 0,
    borderTop: `${thick ? 2 : 1.2}px ${dashed ? 'dashed' : 'solid'} var(--ink)`,
    opacity: dashed ? 0.6 : 0.4,
    margin: '8px 0',
    ...style,
  }} />;
}

// Sketchy header bar with line code badge
function SkLineBadge({ code, big = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: big ? 64 : 44, height: big ? 44 : 30,
      padding: '0 10px',
      background: 'var(--accent)', color: '#1a1a1a',
      border: '2.5px solid var(--ink)', borderRadius: 10,
      fontWeight: 800, fontSize: big ? 22 : 15,
      fontFamily: '"Kalam", cursive',
      boxShadow: '2px 2px 0 var(--ink)',
    }}>{code}</div>
  );
}

// Wireframe placeholder block with diagonal stripes
function SkPlaceholder({ children, height = 80, style = {} }) {
  return (
    <div style={{
      height, border: '2px dashed var(--ink)', borderRadius: 12,
      background: `repeating-linear-gradient(135deg, transparent 0 6px, color-mix(in oklab, var(--ink) 8%, transparent) 6px 7px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, opacity: 0.65, fontStyle: 'italic',
      ...style,
    }}>{children}</div>
  );
}

// ─── i18n strings ────────────────────────────────────────────────────
const I18N = {
  es: {
    appName: 'SDBussApp',
    tag: 'Buses de Santo Domingo',
    from: 'Desde', to: 'Hasta',
    findBus: 'Buscar bus', goingTo: '¿A dónde vas?',
    nearby: 'Paradas cercanas', recents: 'Recientes', popular: 'Más buscados',
    every: 'cada', min: 'min',
    operator: 'Opera esta semana', units: 'unidades',
    schedule: 'Horario', cycle: 'Ciclo', interval: 'Frecuencia',
    outbound: 'Ida', inbound: 'Retorno',
    seeRoute: 'Ver itinerario', viewMap: 'Ver en mapa',
    favLines: 'Mis líneas', allLines: 'Todas las líneas',
    pickRoute: 'Toca una línea', linesOnMap: 'Líneas sobre el mapa',
    typeOrTap: 'Escribe o toca un destino',
    me: 'Tú', bot: 'SD',
    hi: '¡Hola! ¿A dónde necesitas ir hoy?',
    suggestion: 'Toma la línea',
    arrivesIn: 'pasa cada',
    minutesAway: 'aprox.',
    independent: 'Proyecto independiente · datos públicos',
    week: 'Semana',
    lines: 'líneas',
    home: 'Inicio', search: 'Buscar', map: 'Mapa', saved: 'Guardadas',
  },
  en: {
    appName: 'SDBussApp',
    tag: 'Santo Domingo buses',
    from: 'From', to: 'To',
    findBus: 'Find bus', goingTo: 'Where to?',
    nearby: 'Nearby stops', recents: 'Recent', popular: 'Most searched',
    every: 'every', min: 'min',
    operator: 'This week’s operator', units: 'units',
    schedule: 'Hours', cycle: 'Cycle', interval: 'Frequency',
    outbound: 'Outbound', inbound: 'Return',
    seeRoute: 'See route', viewMap: 'View on map',
    favLines: 'My lines', allLines: 'All lines',
    pickRoute: 'Tap a line', linesOnMap: 'Lines on the map',
    typeOrTap: 'Type or tap a destination',
    me: 'You', bot: 'SD',
    hi: 'Hi! Where do you need to go today?',
    suggestion: 'Take line',
    arrivesIn: 'every',
    minutesAway: 'approx.',
    independent: 'Independent project · public data',
    week: 'Week',
    lines: 'lines',
    home: 'Home', search: 'Search', map: 'Map', saved: 'Saved',
  },
};

// ─── Sample data (subset of the PDF) ─────────────────────────────────
const LINES = [
  { code: '06A', from: 'Centro Rehab.', to: 'Terminal Terrestre', hours: '05:30–20:15', interval: 12, ops: ['TRANSMETRO', 'EJECUTTRANS'], thisWeek: 'TRANSMETRO' },
  { code: '07',  from: 'La Cadena',     to: 'San Carlos',         hours: '05:30–20:00', interval: 12, ops: ['EJECUTTRANS', 'TRANSMETRO'], thisWeek: 'EJECUTTRANS' },
  { code: '08A', from: 'Ramiro Gallo',  to: 'Terminal Terrestre', hours: '05:45–21:30', interval: 10, ops: ['TRANSMETRO'], thisWeek: 'TRANSMETRO' },
  { code: '09A', from: 'Mira Flores',   to: 'Bombolí',            hours: '05:00–22:00', interval: 13, ops: ['TRANSMETRO'], thisWeek: 'TRANSMETRO' },
  { code: '10A', from: 'Cristo Vive',   to: 'U.E. Kasama',        hours: '05:27–20:42', interval: 16, ops: ['EJECUTTRANS', 'TRANSMETRO'], thisWeek: 'EJECUTTRANS' },
  { code: '11A', from: 'El Proletariado', to: 'Hospital G.D.',    hours: '05:37–22:00', interval: 12, ops: ['TRANSMETRO', 'EJECUTTRANS'], thisWeek: 'TRANSMETRO' },
  { code: '16',  from: 'Chiguilpe',     to: 'Terminal Terrestre', hours: '05:44–20:37', interval: 8,  ops: ['EJECUTTRANS', 'TRANSMETRO'], thisWeek: 'EJECUTTRANS' },
  { code: '17A', from: 'Av. Italia',    to: 'Portal del Lago',    hours: '05:40–23:30', interval: 12, ops: ['EJECUTTRANS'], thisWeek: 'EJECUTTRANS' },
  { code: '18A', from: 'Quevedo Km 8',  to: 'Terminal Terrestre', hours: '05:28–22:03', interval: 12, ops: ['TRANSMETRO', 'EJECUTTRANS'], thisWeek: 'TRANSMETRO' },
  { code: '19',  from: 'Duragas',       to: 'C.C. Shopping',      hours: '05:50–20:15', interval: 10, ops: ['TRANSMETRO'], thisWeek: 'TRANSMETRO' },
  { code: '24A', from: 'Anillo Vial',   to: 'Anillo Vial',        hours: '05:40–22:10', interval: 2,  ops: ['EJECUTTRANS', 'TRANSMETRO'], thisWeek: 'EJECUTTRANS' },
];

const DESTINATIONS = [
  { id: 'terminal', name_es: 'Terminal Terrestre', name_en: 'Bus Terminal', icon: '🚏' },
  { id: 'hospital', name_es: 'Hospital G. Domínguez', name_en: 'G. Domínguez Hospital', icon: '🏥' },
  { id: 'centro',   name_es: 'Centro',              name_en: 'Downtown',         icon: '🏛' },
  { id: 'shopping', name_es: 'C.C. Shopping',       name_en: 'Shopping Mall',    icon: '🛍' },
  { id: 'kasama',   name_es: 'U.E. Kasama',         name_en: 'Kasama School',    icon: '🎓' },
  { id: 'ute',      name_es: 'UTE / Portal Lago',   name_en: 'UTE / Lake Portal', icon: '🎓' },
  { id: 'boli',     name_es: 'Bombolí',             name_en: 'Bombolí',           icon: '⛰' },
  { id: 'anillo',   name_es: 'Anillo Vial',         name_en: 'Ring Road',         icon: '🔄' },
];

// Sample itinerary streets for line detail (from PDF, line 06A)
const ITINERARY_06A = {
  outbound: ['Centro Rehabilitación', 'Av. Anturios', 'Coop. Nuevo Amanecer', 'Av. Quevedo', 'Av. Esmeraldas', 'Redondel Terminal'],
  inbound:  ['Redondel Terminal', 'Av. Esmeraldas', 'Av. Quevedo', 'Calle 12 — Unión Cívica', 'Com. Sagradas Escrituras', 'Centro Rehabilitación'],
};

Object.assign(window, {
  SketchyPhone, SkBox, SkBtn, SkChip, SkDivider, SkLineBadge, SkPlaceholder,
  I18N, LINES, DESTINATIONS, ITINERARY_06A,
});
