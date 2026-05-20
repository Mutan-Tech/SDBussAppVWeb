// hifi-system.jsx — formal design system: tokens, primitives, Phone, data, i18n.

// ─── Tokens ──────────────────────────────────────────────────────────
const TOKENS = {
  light: {
    bg: '#F4F6FA',
    surface: '#FFFFFF',
    surface2: '#F7F8FB',
    line: 'rgba(15,37,64,0.08)',
    text: '#0F2540',
    muted: '#5B6678',
    chip: '#EEF1F6',
    chipText: '#0F2540',
  },
  dark: {
    bg: '#0A0E1A',
    surface: '#131826',
    surface2: '#1A2032',
    line: 'rgba(255,255,255,0.08)',
    text: '#F1F4F9',
    muted: '#8B95A8',
    chip: '#1F2638',
    chipText: '#F1F4F9',
  },
};

// ─── Phone frame ─────────────────────────────────────────────────────
function Phone({ children, width = 340, height = 720, dark = false, accent = '#F59E0B' }) {
  const tk = dark ? TOKENS.dark : TOKENS.light;
  const sc = dark ? '#fff' : '#0F2540';
  return (
    <div style={{
      width, height, borderRadius: 42, overflow: 'hidden',
      background: tk.bg, color: tk.text,
      position: 'relative',
      boxShadow: '0 40px 80px -30px rgba(15,37,64,0.35), 0 0 0 1px rgba(15,37,64,0.10), inset 0 0 0 1px rgba(255,255,255,0.5)',
      fontFamily: '"Manrope", system-ui, -apple-system, sans-serif',
      fontFeatureSettings: '"ss01", "cv11"',
      '--bg': tk.bg, '--surface': tk.surface, '--surface2': tk.surface2,
      '--line': tk.line, '--text': tk.text, '--muted': tk.muted,
      '--chip': tk.chip, '--chip-text': tk.chipText,
      '--accent': accent, '--accent-ink': dark ? '#0A0E1A' : '#0A0E1A',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 30, borderRadius: 18, background: '#000', zIndex: 100,
      }} />
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 16, left: 0, right: 0, height: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 28px', fontSize: 14, fontWeight: 600, color: sc, zIndex: 50,
      }}>
        <span style={{ fontFeatureSettings: '"tnum"' }}>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="17" height="11" viewBox="0 0 17 11" fill={sc}>
            <rect x="0" y="7" width="3" height="4" rx="0.5"/>
            <rect x="5" y="4.5" width="3" height="6.5" rx="0.5"/>
            <rect x="10" y="2" width="3" height="9" rx="0.5"/>
            <rect x="15" y="-0.5" width="3" height="11.5" rx="0.5" opacity="0.4"/>
          </svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill={sc}>
            <path d="M7 1.5C9 1.5 10.8 2.3 12 3.5L11 4.5C10 3.5 8.5 3 7 3S4 3.5 3 4.5L2 3.5C3.2 2.3 5 1.5 7 1.5Z"/>
            <path d="M7 4.5C8.2 4.5 9.3 5 10 5.7L9 6.7C8.5 6.2 7.8 6 7 6S5.5 6.2 5 6.7L4 5.7C4.7 5 5.8 4.5 7 4.5Z"/>
            <circle cx="7" cy="8.5" r="1.2"/>
          </svg>
          <svg width="24" height="11" viewBox="0 0 24 11">
            <rect x="0.5" y="0.5" width="21" height="10" rx="3" stroke={sc} strokeOpacity="0.4" fill="none"/>
            <rect x="2" y="2" width="14" height="7" rx="1.5" fill={sc}/>
            <path d="M22.5 3.5V7.5C23 7.3 23.3 6.8 23.3 5.5C23.3 4.2 23 3.7 22.5 3.5Z" fill={sc} fillOpacity="0.4"/>
          </svg>
        </span>
      </div>

      <div style={{
        paddingTop: 50, paddingBottom: 0, height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {children}
      </div>

      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 5, borderRadius: 99,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,14,26,0.3)', zIndex: 200,
      }} />
    </div>
  );
}

// ─── Primitives ──────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, raised = false, accent = false }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--surface)',
      borderRadius: 18,
      border: `1px solid ${accent ? 'var(--accent)' : 'var(--line)'}`,
      padding: 14,
      boxShadow: raised ? '0 4px 16px -8px rgba(15,37,64,0.12), 0 1px 2px rgba(15,37,64,0.04)' : '0 1px 2px rgba(15,37,64,0.03)',
      ...style,
    }}>{children}</div>
  );
}

function Pill({ children, fill = false, small = false, accent = false, style = {} }) {
  const bg = fill ? (accent ? 'var(--accent)' : 'var(--text)') : 'var(--chip)';
  const fg = fill ? (accent ? 'var(--accent-ink)' : 'var(--bg)') : 'var(--chip-text)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: small ? '3px 9px' : '5px 11px',
      borderRadius: 999,
      background: bg, color: fg,
      fontSize: small ? 11 : 12, fontWeight: 600, lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
}

function PrimaryBtn({ children, full = true, style = {} }) {
  return (
    <button type="button" style={{
      width: full ? '100%' : undefined, height: 50,
      borderRadius: 14, border: 'none',
      background: 'var(--text)', color: 'var(--bg)',
      fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: 'pointer',
      boxShadow: '0 8px 18px -10px rgba(15,37,64,0.45)',
      ...style,
    }}>{children}</button>
  );
}

function LineBadge({ code, small = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: small ? 40 : 48, height: small ? 28 : 36,
      padding: '0 9px',
      borderRadius: 10,
      background: 'var(--accent)', color: 'var(--accent-ink)',
      fontWeight: 800, fontSize: small ? 12 : 15, letterSpacing: '-0.01em',
      fontFeatureSettings: '"tnum"',
    }}>{code}</div>
  );
}

function ListRow({ left, title, subtitle, meta, chevron = true, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--line)',
      ...style,
    }}>
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {meta && <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{meta}</div>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
        </svg>
      )}
    </div>
  );
}

function TopBar({ title, back = true, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4px 16px 10px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {back && (
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 2px rgba(15,37,64,0.06)',
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em' }}>{title}</div>
      </div>
      <div>{right}</div>
    </div>
  );
}

function TabBar({ active = 'home', t }) {
  const items = [
    ['home', t.home, <svg width="22" height="22" viewBox="0 0 24 24" fill="none" key="h"><path d="M3 11L12 4L21 11V20A1 1 0 0 1 20 21H4A1 1 0 0 1 3 20V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>],
    ['search', t.search, <svg width="22" height="22" viewBox="0 0 24 24" fill="none" key="s"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>],
    ['map', t.map, <svg width="22" height="22" viewBox="0 0 24 24" fill="none" key="m"><path d="M9 4L3 6V20L9 18M9 4L15 6M9 4V18M15 6L21 4V18L15 20M15 6V20M9 18L15 20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>],
    ['saved', t.saved, <svg width="22" height="22" viewBox="0 0 24 24" fill="none" key="b"><path d="M6 3H18V21L12 17L6 21V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>],
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 8px 18px',
      borderTop: '1px solid var(--line)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      {items.map(([id, label, icon]) => (
        <div key={id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          color: active === id ? 'var(--text)' : 'var(--muted)',
          opacity: active === id ? 1 : 0.85,
        }}>
          <div>{icon}</div>
          <div style={{ fontSize: 10.5, fontWeight: active === id ? 800 : 600 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// Icon helpers (24px stroke icons)
const Icons = {
  pin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22S20 14.5 20 10A8 8 0 0 0 4 10C4 14.5 12 22 12 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>,
  flag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 21V4M5 4H16L14 8L16 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  swap: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 4V20M7 20L4 17M7 20L10 17M17 20V4M17 4L14 7M17 4L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  bus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M4 11H20M8 18V20M16 18V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="15" r="1" fill="currentColor"/></svg>,
  mic: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M5 11A7 7 0 0 0 19 11M12 18V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3L14.5 9L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  more: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>,
  plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  minus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  locate: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 1V4M12 20V23M1 12H4M20 12H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  hospital: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  terminal: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 12H21M7 17V19M17 17V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  shop: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 8L7 4H17L19 8M5 8V19A1 1 0 0 0 6 20H18A1 1 0 0 0 19 19V8M5 8H19M9 12A3 3 0 0 0 15 12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>,
  school: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9L12 4L21 9L12 14L3 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M7 11V16C7 16 9 18 12 18C15 18 17 16 17 16V11" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>,
  building: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 7H10M14 7H15M9 11H10M14 11H15M9 15H10M14 15H15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  mountain: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 20L9 9L13 15L16 11L21 20H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>,
  loop: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12A8 8 0 0 1 19 8M20 12A8 8 0 0 1 5 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 5L19 8L16 11M8 19L5 16L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ─── i18n ────────────────────────────────────────────────────────────
const HF_I18N = {
  es: {
    appName: 'SDBuss', greeting: 'Buenos días',
    goingTo: '¿A dónde vas?', tag: 'Buses de Santo Domingo',
    from: 'Desde', to: 'Hasta', myLocation: 'Mi ubicación',
    findBus: 'Buscar bus', recent: 'Recientes', popular: 'Populares',
    nearby: 'Paradas cerca de ti', favorites: 'Mis favoritos',
    every: 'cada', min: 'min', units: 'unidades',
    operator: 'Opera esta semana', schedule: 'Horario', interval: 'Frecuencia', cycle: 'Tiempo de ciclo',
    outbound: 'Ida', inbound: 'Retorno',
    home: 'Inicio', search: 'Buscar', map: 'Mapa', saved: 'Guardadas',
    chooseDestination: 'Elige tu destino',
    quickAccess: 'Acceso rápido', linesOnMap: 'Líneas activas',
    seeDetails: 'Ver detalle', shareTrip: 'Compartir',
    nextStop: 'Próximas paradas', viaStops: 'Pasa por',
    hi: 'Hola, ¿cómo puedo ayudarte?', suggestion: 'Te sugiero',
    independent: 'Proyecto independiente · datos públicos',
    week: 'Semana', lines: 'líneas',
    pasajeros: 'Demanda', km: 'km', units2: 'unidades',
    walkTo: 'Caminar a la parada', writeOrTap: 'Escribe o toca',
    suggested: 'Sugerencias',
  },
  en: {
    appName: 'SDBuss', greeting: 'Good morning',
    goingTo: 'Where to?', tag: 'Santo Domingo buses',
    from: 'From', to: 'To', myLocation: 'My location',
    findBus: 'Find bus', recent: 'Recent', popular: 'Popular',
    nearby: 'Stops near you', favorites: 'My favorites',
    every: 'every', min: 'min', units: 'units',
    operator: 'This week’s operator', schedule: 'Hours', interval: 'Frequency', cycle: 'Cycle time',
    outbound: 'Outbound', inbound: 'Return',
    home: 'Home', search: 'Search', map: 'Map', saved: 'Saved',
    chooseDestination: 'Choose your destination',
    quickAccess: 'Quick access', linesOnMap: 'Active lines',
    seeDetails: 'See details', shareTrip: 'Share',
    nextStop: 'Next stops', viaStops: 'Via',
    hi: 'Hi, how can I help?', suggestion: 'I suggest',
    independent: 'Independent project · public data',
    week: 'Week', lines: 'lines',
    pasajeros: 'Demand', km: 'km', units2: 'units',
    walkTo: 'Walk to stop', writeOrTap: 'Type or tap',
    suggested: 'Suggestions',
  },
};

Object.assign(window, {
  TOKENS, Phone, Card, Pill, PrimaryBtn, LineBadge, ListRow, TopBar, TabBar, Icons, HF_I18N,
});
