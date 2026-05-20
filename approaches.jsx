// approaches.jsx — 4 distinct wireframe approaches for SDBussApp.

// Tiny helpers
function H({ children, level = 1, style = {} }) {
  const sizes = [0, 22, 18, 15];
  return <div style={{ fontWeight: 800, fontSize: sizes[level], lineHeight: 1.15, ...style }}>{children}</div>;
}
function Row({ children, style = {} }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>{children}</div>;
}
function Col({ children, gap = 10, style = {} }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>;
}
function Pad({ children, style = {} }) {
  return <div style={{ padding: '0 16px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, ...style }}>{children}</div>;
}
function TopBar({ title, right }) {
  return (
    <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: '"Caveat", cursive', fontWeight: 700, fontSize: 22, lineHeight: 1 }}>{title}</div>
      <div>{right}</div>
    </div>
  );
}
function BottomNav({ active = 'home', t }) {
  const items = [
    ['home', t.home, '⌂'],
    ['search', t.search, '⌕'],
    ['map', t.map, '◎'],
    ['saved', t.saved, '★'],
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 12px', borderTop: '1.5px dashed var(--ink)', opacity: 0.95,
    }}>
      {items.map(([id, label, ic]) => (
        <div key={id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          opacity: active === id ? 1 : 0.45,
          fontWeight: active === id ? 800 : 500, fontSize: 11,
        }}>
          <div style={{ fontSize: 18 }}>{ic}</div>
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH 1 — SEARCH-FIRST  ("Desde → Hasta" como app de vuelos)
// ════════════════════════════════════════════════════════════════════

function A1_Home({ t }) {
  return (
    <>
      <TopBar title={t.appName} right={<SkChip>ES</SkChip>} />
      <Pad>
        <div style={{ marginTop: 6 }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, lineHeight: 1, fontWeight: 700 }}>{t.goingTo}</div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{t.tag}</div>
        </div>

        <SkBox accent style={{ padding: 12 }}>
          <Col gap={6}>
            <Row style={{ gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--ink)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t.from}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Mi ubicación</div>
              </div>
              <span style={{ opacity: 0.4 }}>◎</span>
            </Row>
            <SkDivider dashed />
            <Row style={{ gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)', border: '1.5px solid var(--ink)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t.to}</div>
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.5, fontStyle: 'italic' }}>Terminal Terrestre…</div>
              </div>
            </Row>
          </Col>
        </SkBox>

        <SkBtn full>{t.findBus} →</SkBtn>

        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.7, marginBottom: 6 }}>{t.popular.toUpperCase()}</div>
          <Row style={{ flexWrap: 'wrap', gap: 6 }}>
            <SkChip>🏥 Hospital</SkChip>
            <SkChip>🚏 Terminal</SkChip>
            <SkChip>🛍 Shopping</SkChip>
            <SkChip>🏛 Centro</SkChip>
            <SkChip>🎓 UTE</SkChip>
          </Row>
        </div>

        <div style={{ marginTop: 'auto', fontSize: 10, opacity: 0.5, fontStyle: 'italic', textAlign: 'center', paddingBottom: 6 }}>
          {t.independent}
        </div>
      </Pad>
      <BottomNav active="home" t={t} />
    </>
  );
}

function A1_Results({ t }) {
  return (
    <>
      <TopBar title="← Resultados" right={<SkChip>{t.lines}: 4</SkChip>} />
      <Pad>
        <SkBox style={{ padding: 10 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12 }}><b>Mi ubicación</b> → <b>Terminal Terrestre</b></span>
            <span style={{ opacity: 0.5 }}>✎</span>
          </Row>
        </SkBox>

        <Col gap={10}>
          {LINES.filter(l => l.to.includes('Terminal')).slice(0, 4).map(l => (
            <SkBox key={l.code} style={{ padding: 10 }}>
              <Row style={{ gap: 10 }}>
                <SkLineBadge code={l.code} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.from} → {l.to}</div>
                  <Row style={{ gap: 6, marginTop: 3, fontSize: 11, opacity: 0.7, flexWrap: 'wrap' }}>
                    <span>⏱ {t.every} {l.interval} {t.min}</span>
                    <span>·</span>
                    <span>🕐 {l.hours}</span>
                  </Row>
                </div>
                <span style={{ opacity: 0.4 }}>›</span>
              </Row>
            </SkBox>
          ))}
        </Col>
      </Pad>
      <BottomNav active="search" t={t} />
    </>
  );
}

function A1_Detail({ t }) {
  const l = LINES[0];
  return (
    <>
      <TopBar title="← Línea" right={<span style={{ opacity: 0.55 }}>★</span>} />
      <Pad>
        <Row style={{ gap: 10 }}>
          <SkLineBadge code={l.code} big />
          <div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{l.from}</div>
            <div style={{ fontSize: 11, opacity: 0.5 }}>↓</div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{l.to}</div>
          </div>
        </Row>

        <Row style={{ gap: 6, flexWrap: 'wrap' }}>
          <SkChip fill>{t.operator}: {l.thisWeek}</SkChip>
          <SkChip>🕐 {l.hours}</SkChip>
          <SkChip>⏱ {l.interval} {t.min}</SkChip>
        </Row>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginBottom: 4 }}>{t.outbound.toUpperCase()}  ➜</div>
          <div style={{ position: 'relative', paddingLeft: 18 }}>
            <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 2, background: 'var(--ink)', opacity: 0.5 }} />
            {ITINERARY_06A.outbound.map((s, i) => (
              <div key={i} style={{ position: 'relative', padding: '3px 0', fontSize: 12 }}>
                <span style={{
                  position: 'absolute', left: -16, top: 7,
                  width: 8, height: 8, borderRadius: 99,
                  background: i === 0 || i === ITINERARY_06A.outbound.length - 1 ? 'var(--accent)' : 'var(--paper)',
                  border: '1.5px solid var(--ink)',
                }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </Pad>
      <BottomNav active="search" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH 2 — QUICK DESTINATIONS  (grid of big chips, mínimo teclado)
// ════════════════════════════════════════════════════════════════════

function A2_Home({ t }) {
  return (
    <>
      <TopBar title={t.appName} right={<SkChip>ES</SkChip>} />
      <Pad>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, lineHeight: 1, fontWeight: 700, marginTop: 4 }}>{t.goingTo}</div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>{t.typeOrTap}</div>

        <SkBox dashed style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ opacity: 0.5 }}>⌕</span>
          <span style={{ opacity: 0.5, fontStyle: 'italic', fontSize: 13 }}>Buscar destino…</span>
        </SkBox>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 2 }}>
          {DESTINATIONS.slice(0, 6).map(d => (
            <SkBox key={d.id} style={{ padding: '12px 10px', minHeight: 70 }}>
              <div style={{ fontSize: 22, lineHeight: 1 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 4, lineHeight: 1.15 }}>{d.name_es}</div>
            </SkBox>
          ))}
        </div>

        <div style={{ marginTop: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginBottom: 4 }}>{t.nearby.toUpperCase()}</div>
          <Row style={{ gap: 6, flexWrap: 'wrap' }}>
            <SkChip>📍 Av. Quevedo · 80 m</SkChip>
            <SkChip>📍 Av. Esmeraldas · 240 m</SkChip>
          </Row>
        </div>
      </Pad>
      <BottomNav active="home" t={t} />
    </>
  );
}

function A2_Lines({ t }) {
  return (
    <>
      <TopBar title="← Hospital G.D." right={<SkChip>3 {t.lines}</SkChip>} />
      <Pad>
        <SkBox style={{ padding: 8, background: 'color-mix(in oklab, var(--accent) 25%, transparent)' }}>
          <Row style={{ gap: 6, fontSize: 12 }}>
            <span>🏥</span>
            <span><b>Hospital Gustavo Domínguez</b></span>
          </Row>
        </SkBox>

        {LINES.filter(l => l.to.includes('Hospital')).map(l => (
          <SkBox key={l.code} style={{ padding: 10 }}>
            <Row style={{ gap: 10 }}>
              <SkLineBadge code={l.code} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{l.from}</div>
                <Row style={{ gap: 6, marginTop: 2, fontSize: 11, opacity: 0.7 }}>
                  <span>{t.every} {l.interval} {t.min}</span>
                  <span>·</span>
                  <span>{l.hours}</span>
                </Row>
              </div>
              <span style={{ opacity: 0.4 }}>›</span>
            </Row>
          </SkBox>
        ))}

        <SkPlaceholder height={70}>croquis del recorrido</SkPlaceholder>
      </Pad>
      <BottomNav active="home" t={t} />
    </>
  );
}

function A2_Detail({ t }) {
  const l = LINES[5]; // 11A
  return (
    <>
      <TopBar title="← 11A · Detalle" right={<span style={{ opacity: 0.5 }}>⇪</span>} />
      <Pad>
        <Row style={{ gap: 10 }}>
          <SkLineBadge code={l.code} big />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{l.from} ↔ {l.to}</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>{t.cycle}: 84 min · 4 {t.units}</div>
          </div>
        </Row>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <SkBox style={{ padding: 8 }}>
            <div style={{ fontSize: 10, opacity: 0.6 }}>{t.schedule}</div>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{l.hours}</div>
          </SkBox>
          <SkBox style={{ padding: 8 }}>
            <div style={{ fontSize: 10, opacity: 0.6 }}>{t.interval}</div>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{t.every} {l.interval} {t.min}</div>
          </SkBox>
        </div>

        <SkBox accent dashed style={{ padding: 10 }}>
          <div style={{ fontSize: 10, opacity: 0.65, textTransform: 'uppercase' }}>{t.operator} · {t.week} 14</div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{l.thisWeek}</div>
          <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>↻ rota cada 7 días</div>
        </SkBox>

        <SkPlaceholder height={80}>mapa del recorrido</SkPlaceholder>
      </Pad>
      <BottomNav active="home" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH 3 — MAP-FIRST  (mapa con líneas + bottom sheet)
// ════════════════════════════════════════════════════════════════════

function SketchyMap({ height = 320 }) {
  return (
    <div style={{
      position: 'relative', height, overflow: 'hidden',
      background: 'color-mix(in oklab, var(--accent) 8%, var(--paper))',
      borderBottom: '2px solid var(--ink)',
    }}>
      <svg viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* faint streets */}
        <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" fill="none">
          <path d="M0 80 Q 150 70 300 90" />
          <path d="M0 150 Q 140 165 300 160" />
          <path d="M0 230 Q 160 215 300 240" />
          <path d="M70 0 Q 90 160 60 320" />
          <path d="M180 0 Q 170 160 200 320" />
        </g>
        {/* line 06A */}
        <path d="M40 50 Q 100 80 130 130 T 220 220 L 260 270" stroke="var(--accent)" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* line 18A */}
        <path d="M20 270 Q 90 230 150 200 T 280 60" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
        {/* line 24 ring */}
        <ellipse cx="150" cy="160" rx="100" ry="70" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" fill="none" strokeDasharray="2 3" />
        {/* stops */}
        {[[40,50],[130,130],[220,220],[260,270],[20,270],[150,200],[280,60]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
        {/* you-are-here */}
        <g>
          <circle cx="120" cy="180" r="10" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="120" cy="180" r="3" fill="var(--ink)" />
        </g>
      </svg>
      {/* map controls */}
      <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkBox style={{ padding: '4px 8px', background: 'var(--paper)', fontSize: 14, fontWeight: 800 }}>+</SkBox>
        <SkBox style={{ padding: '4px 8px', background: 'var(--paper)', fontSize: 14, fontWeight: 800 }}>−</SkBox>
      </div>
    </div>
  );
}

function A3_MapHome({ t }) {
  return (
    <>
      <div style={{ padding: '4px 16px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <SkBox dashed style={{ flex: 1, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ opacity: 0.5 }}>⌕</span>
          <span style={{ fontSize: 13, opacity: 0.6, fontStyle: 'italic' }}>{t.findBus}…</span>
        </SkBox>
        <SkChip>★</SkChip>
      </div>
      <SketchyMap />
      <div style={{
        marginTop: -22, background: 'var(--paper)',
        borderTop: '2px solid var(--ink)', borderRadius: '20px 20px 0 0',
        padding: '8px 14px 4px', position: 'relative',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: 'var(--ink)', opacity: 0.4, margin: '0 auto 8px' }} />
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{t.linesOnMap}</div>
        <div style={{ fontSize: 11, opacity: 0.6 }}>{t.pickRoute}</div>
        <Row style={{ gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          <SkChip fill>● 06A</SkChip>
          <SkChip>◌ 18A</SkChip>
          <SkChip>○ 24A Anillo</SkChip>
        </Row>
      </div>
      <BottomNav active="map" t={t} />
    </>
  );
}

function A3_LineSheet({ t }) {
  const l = LINES[0];
  return (
    <>
      <div style={{ padding: '4px 16px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <SkBox dashed style={{ flex: 1, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ opacity: 0.5 }}>⌕</span>
          <span style={{ fontSize: 13, opacity: 0.6, fontStyle: 'italic' }}>Línea 06A</span>
        </SkBox>
      </div>
      <SketchyMap height={220} />
      <div style={{
        marginTop: -22, background: 'var(--paper)',
        borderTop: '2px solid var(--ink)', borderRadius: '20px 20px 0 0',
        padding: '8px 14px', position: 'relative', flex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: 'var(--ink)', opacity: 0.4, margin: '0 auto' }} />
        <Row style={{ gap: 10 }}>
          <SkLineBadge code={l.code} big />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{l.from} ↔ {l.to}</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>{l.hours} · {t.every} {l.interval} {t.min}</div>
          </div>
        </Row>
        <SkChip fill style={{ alignSelf: 'flex-start' }}>{t.operator}: {l.thisWeek}</SkChip>

        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginTop: 4 }}>PRÓXIMAS PARADAS</div>
        <Col gap={4}>
          {ITINERARY_06A.outbound.slice(0, 4).map((s, i) => (
            <Row key={i} style={{ fontSize: 12 }}>
              <span style={{
                width: 8, height: 8, borderRadius: 99,
                background: i === 0 ? 'var(--accent)' : 'var(--paper)',
                border: '1.5px solid var(--ink)', marginRight: 8,
              }} />
              {s}
              {i === 0 && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, opacity: 0.7 }}>~ 4 min</span>}
            </Row>
          ))}
        </Col>
      </div>
      <BottomNav active="map" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH 4 — CONVERSACIONAL  (chat-style, amigable para mayores)
// ════════════════════════════════════════════════════════════════════

function Bubble({ children, from = 'bot', t }) {
  const isMe = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '82%',
        border: '2px solid var(--ink)',
        borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        padding: '8px 12px',
        background: isMe ? 'var(--accent)' : 'var(--paper)',
        color: isMe ? '#1a1a1a' : 'inherit',
        fontSize: 13,
        lineHeight: 1.3,
        boxShadow: isMe ? '2px 2px 0 var(--ink)' : undefined,
      }}>
        {children}
      </div>
    </div>
  );
}

function A4_Chat({ t }) {
  return (
    <>
      <TopBar title={t.appName} right={<SkChip>ES</SkChip>} />
      <Pad style={{ gap: 10 }}>
        <div style={{ fontSize: 11, opacity: 0.6, textAlign: 'center', fontStyle: 'italic' }}>hoy, 9:41</div>

        <Bubble t={t}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>👋 {t.hi}</div>
          <div style={{ opacity: 0.7, fontSize: 11 }}>{t.typeOrTap}</div>
        </Bubble>

        <Row style={{ gap: 6, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <SkChip>🏥 Hospital</SkChip>
          <SkChip>🚏 Terminal</SkChip>
          <SkChip>🛍 Shopping</SkChip>
          <SkChip>🎓 UTE</SkChip>
        </Row>

        <Bubble from="me" t={t}>Quiero ir al Terminal</Bubble>

        <Bubble t={t}>
          <div style={{ marginBottom: 6 }}>{t.suggestion} <b>06A</b> 👇</div>
          <SkBox style={{ padding: 8, background: 'var(--paper)' }}>
            <Row style={{ gap: 8 }}>
              <SkLineBadge code="06A" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>Centro Rehab. → Terminal</div>
                <div style={{ fontSize: 10, opacity: 0.65 }}>{t.arrivesIn} 12 {t.min}</div>
              </div>
            </Row>
          </SkBox>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>también puedes tomar la <b>18A</b> o la <b>16</b></div>
        </Bubble>

        <div style={{ marginTop: 'auto' }}>
          <SkBox dashed style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: 0.4 }}>⌨</span>
            <span style={{ fontSize: 12, opacity: 0.5, fontStyle: 'italic', flex: 1 }}>Escribe a dónde vas…</span>
            <span style={{ opacity: 0.6 }}>🎤</span>
          </SkBox>
        </div>
      </Pad>
    </>
  );
}

function A4_Detail({ t }) {
  const l = LINES[0];
  return (
    <>
      <TopBar title="← Línea 06A" right={<span style={{ opacity: 0.5 }}>★</span>} />
      <Pad style={{ gap: 10 }}>
        <Bubble t={t}>
          <Row style={{ gap: 10 }}>
            <SkLineBadge code={l.code} big />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13 }}>{l.from}</div>
              <div style={{ fontSize: 11, opacity: 0.6 }}>↓ {l.to}</div>
            </div>
          </Row>
          <SkDivider />
          <div style={{ fontSize: 12 }}>
            ⏱ {t.every} <b>{l.interval} {t.min}</b><br/>
            🕐 {l.hours}<br/>
            🚌 {t.operator}: <b>{l.thisWeek}</b>
          </div>
        </Bubble>

        <Bubble from="me" t={t}>¿Dónde la tomo?</Bubble>

        <Bubble t={t}>
          La parada más cerca es <b>Av. Quevedo</b> a ~80 m 📍
          <SkPlaceholder height={70} style={{ marginTop: 6 }}>croquis del recorrido</SkPlaceholder>
        </Bubble>

        <Row style={{ gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
          <SkChip fill>¿Ruta completa?</SkChip>
          <SkChip>Guardar línea</SkChip>
        </Row>
      </Pad>
    </>
  );
}

// ─── Approaches metadata ─────────────────────────────────────────────
const APPROACHES = [
  {
    id: 'a1-search',
    title: 'A · Buscador directo',
    subtitle: 'Estilo app de vuelos · familiar y rápido para el usuario digital',
    screens: [
      { id: 'home', label: 'Home · Desde/Hasta', Comp: A1_Home },
      { id: 'results', label: 'Resultados', Comp: A1_Results },
      { id: 'detail', label: 'Detalle de línea', Comp: A1_Detail },
    ],
  },
  {
    id: 'a2-chips',
    title: 'B · Destinos rápidos',
    subtitle: 'Grid grande tocable · mínimo teclado, ideal para la calle',
    screens: [
      { id: 'home', label: 'Home · ¿A dónde vas?', Comp: A2_Home },
      { id: 'lines', label: 'Líneas al destino', Comp: A2_Lines },
      { id: 'detail', label: 'Detalle con operadora', Comp: A2_Detail },
    ],
  },
  {
    id: 'a3-map',
    title: 'C · Mapa primero',
    subtitle: 'Mapa con líneas dibujadas + bottom sheet · pensamiento visual',
    screens: [
      { id: 'home', label: 'Mapa + líneas', Comp: A3_MapHome },
      { id: 'sheet', label: 'Línea seleccionada', Comp: A3_LineSheet },
    ],
  },
  {
    id: 'a4-chat',
    title: 'D · Conversacional',
    subtitle: 'Diálogo simple · amable con mayores y baja alfabetización digital',
    screens: [
      { id: 'chat', label: 'Conversación', Comp: A4_Chat },
      { id: 'detail', label: 'Detalle dentro del chat', Comp: A4_Detail },
    ],
  },
];

Object.assign(window, { APPROACHES });
