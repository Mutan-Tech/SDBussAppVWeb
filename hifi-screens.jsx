// hifi-screens.jsx — formal hi-fi screens for the 4 approaches.

const HF_Row = ({ children, style = {}, ...rest }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }} {...rest}>{children}</div>
);
const HF_Col = ({ children, gap = 12, style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>
);
const HF_Scroll = ({ children, style = {} }) => (
  <div style={{
    flex: 1, overflow: 'hidden', padding: '0 16px',
    display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, ...style,
  }}>{children}</div>
);

// Pretty itinerary timeline node
function StopNode({ first, last, isAccent, label, sub }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
      <div style={{ width: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <div style={{
          width: 12, height: 12, borderRadius: 99,
          background: first || last || isAccent ? 'var(--accent)' : 'var(--surface)',
          border: '2px solid var(--text)',
          zIndex: 1,
        }} />
      </div>
      <div style={{ flex: 1, paddingBottom: last ? 0 : 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Timeline({ stops, accentIndex = -1 }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 5 }}>
      <div style={{
        position: 'absolute', left: 11, top: 8, bottom: 8, width: 2,
        background: 'var(--text)', opacity: 0.18,
      }} />
      {stops.map((s, i) => (
        <StopNode key={i} first={i === 0} last={i === stops.length - 1} isAccent={i === accentIndex} label={s} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH A — SEARCH-FIRST
// ════════════════════════════════════════════════════════════════════

function HF_A_Home({ t }) {
  return (
    <>
      <div style={{ padding: '6px 16px 14px' }}>
        <HF_Row style={{ justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{t.greeting}</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 2 }}>{t.goingTo}</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>S</div>
        </HF_Row>
      </div>
      <HF_Scroll>
        <Card raised style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
            <div style={{ color: 'var(--accent)' }}><Icons.locate /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>{t.from}</div>
              <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 1 }}>{t.myLocation}</div>
            </div>
            <Icons.swap />
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ color: 'var(--text)' }}><Icons.flag /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>{t.to}</div>
              <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 1, color: 'var(--muted)' }}>Terminal Terrestre</div>
            </div>
          </div>
        </Card>

        <PrimaryBtn>
          <Icons.search />
          {t.findBus}
        </PrimaryBtn>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{t.popular}</div>
          <HF_Row style={{ flexWrap: 'wrap', gap: 6 }}>
            <Pill><Icons.hospital /> Hospital</Pill>
            <Pill>Terminal</Pill>
            <Pill>Shopping</Pill>
            <Pill>UTE</Pill>
            <Pill>Centro</Pill>
          </HF_Row>
        </div>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{t.recent}</div>
          <Card style={{ padding: '4px 14px' }}>
            <ListRow
              left={<div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.clock /></div>}
              title="Hospital G. Domínguez"
              subtitle="Mi ubicación · ayer 18:42"
            />
            <ListRow
              left={<div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.clock /></div>}
              title="Terminal Terrestre"
              subtitle="Centro · lun 07:15"
              style={{ borderBottom: 'none' }}
            />
          </Card>
        </div>
      </HF_Scroll>
      <TabBar active="home" t={t} />
    </>
  );
}

function HF_A_Results({ t }) {
  const lines = LINES.filter(l => l.to.includes('Terminal')).slice(0, 5);
  return (
    <>
      <TopBar title="Resultados" right={<Pill small>{lines.length} {t.lines}</Pill>} />
      <div style={{ padding: '0 16px 12px' }}>
        <Card style={{ padding: 12 }}>
          <HF_Row style={{ gap: 10 }}>
            <div style={{ flex: 1 }}>
              <HF_Row style={{ gap: 8, fontSize: 13, fontWeight: 700 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)' }} />
                <span>{t.myLocation}</span>
              </HF_Row>
              <HF_Row style={{ gap: 8, fontSize: 13, fontWeight: 700, marginTop: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--text)' }} />
                <span>Terminal Terrestre</span>
              </HF_Row>
            </div>
            <div style={{ color: 'var(--muted)' }}><Icons.swap /></div>
          </HF_Row>
        </Card>
      </div>
      <HF_Scroll style={{ gap: 10 }}>
        {lines.map(l => (
          <Card key={l.code} style={{ padding: 14 }}>
            <HF_Row style={{ gap: 12 }}>
              <LineBadge code={l.code} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.from} → {l.to}</div>
                <HF_Row style={{ gap: 10, marginTop: 5, color: 'var(--muted)', fontSize: 11.5, fontWeight: 600 }}>
                  <HF_Row style={{ gap: 4 }}><Icons.clock /> {t.every} {l.interval} {t.min}</HF_Row>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{l.hours}</span>
                </HF_Row>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
              </svg>
            </HF_Row>
          </Card>
        ))}
      </HF_Scroll>
      <TabBar active="search" t={t} />
    </>
  );
}

function HF_A_Detail({ t }) {
  const l = LINES[0];
  return (
    <>
      <TopBar title={`Línea ${l.code}`} right={<div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.star /></div>} />
      <HF_Scroll style={{ gap: 14 }}>
        <Card style={{ padding: 16 }}>
          <HF_Row style={{ gap: 14 }}>
            <LineBadge code={l.code} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.outbound}</div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{l.from}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', margin: '2px 0' }}>↓</div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{l.to}</div>
            </div>
          </HF_Row>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Card style={{ padding: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.schedule}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4, lineHeight: 1.15 }}>{l.hours}</div>
          </Card>
          <Card style={{ padding: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.interval}</div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>{l.interval} {t.min}</div>
          </Card>
          <Card style={{ padding: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.cycle}</div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>69 min</div>
          </Card>
        </div>

        <Card style={{ padding: 12, background: 'color-mix(in oklab, var(--accent) 12%, var(--surface))', border: '1px solid color-mix(in oklab, var(--accent) 35%, transparent)' }}>
          <HF_Row style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>{t.operator} · {t.week} 14</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{l.thisWeek}</div>
            </div>
            <Pill small accent fill>↻ Rota lun</Pill>
          </HF_Row>
        </Card>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>{t.outbound} · 11.06 km</div>
          <Card style={{ padding: 14 }}>
            <Timeline stops={ITINERARY_06A.outbound} accentIndex={2} />
          </Card>
        </div>
      </HF_Scroll>
      <TabBar active="search" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH B — QUICK DESTINATIONS
// ════════════════════════════════════════════════════════════════════

const DEST_ICONS = {
  terminal: Icons.terminal, hospital: Icons.hospital, centro: Icons.building,
  shopping: Icons.shop, kasama: Icons.school, ute: Icons.school,
  boli: Icons.mountain, anillo: Icons.loop,
};

function HF_B_Home({ t }) {
  return (
    <>
      <div style={{ padding: '6px 16px 14px' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{t.appName} · {t.tag}</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>{t.chooseDestination}</div>
      </div>
      <HF_Scroll>
        <Card style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icons.search />
          <span style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 500, flex: 1 }}>Buscar parada o destino…</span>
          <Icons.mic />
        </Card>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{t.quickAccess}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {DESTINATIONS.slice(0, 6).map(d => {
              const Ic = DEST_ICONS[d.id] || Icons.pin;
              return (
                <Card key={d.id} style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 92 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: 'color-mix(in oklab, var(--accent) 20%, var(--surface2))',
                    color: 'var(--text)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Ic /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.15 }}>{d.name_es}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>3 líneas</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{t.nearby}</div>
          <Card style={{ padding: '4px 14px' }}>
            <ListRow
              left={<div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.pin /></div>}
              title="Av. Quevedo · Centro"
              subtitle="80 m · 06A, 11A, 18A"
              meta="1 min"
            />
            <ListRow
              left={<div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.pin /></div>}
              title="Av. Esmeraldas"
              subtitle="240 m · 07, 09A, 17A"
              meta="3 min"
              style={{ borderBottom: 'none' }}
            />
          </Card>
        </div>
      </HF_Scroll>
      <TabBar active="home" t={t} />
    </>
  );
}

function HF_B_Lines({ t }) {
  const lines = LINES.filter(l => l.to.includes('Hospital'));
  return (
    <>
      <TopBar title="Hospital G.D." right={<Icons.star />} />
      <div style={{ padding: '0 16px 12px' }}>
        <Card style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: 'color-mix(in oklab, var(--accent) 22%, var(--surface2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icons.hospital /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Hospital G. Domínguez</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{lines.length} líneas · cada 8–12 min</div>
          </div>
        </Card>
      </div>
      <HF_Scroll style={{ gap: 10 }}>
        {lines.map(l => (
          <Card key={l.code} style={{ padding: 14 }}>
            <HF_Row style={{ gap: 12 }}>
              <LineBadge code={l.code} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800 }}>desde {l.from}</div>
                <HF_Row style={{ gap: 10, marginTop: 4, color: 'var(--muted)', fontSize: 11.5, fontWeight: 600 }}>
                  <HF_Row style={{ gap: 4 }}><Icons.clock /> {l.interval} {t.min}</HF_Row>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{l.hours}</span>
                </HF_Row>
              </div>
              <Pill small fill accent>~ {l.interval} min</Pill>
            </HF_Row>
          </Card>
        ))}
      </HF_Scroll>
      <TabBar active="home" t={t} />
    </>
  );
}

function HF_B_Detail({ t }) {
  const l = LINES[5];
  return (
    <>
      <TopBar title={`Línea ${l.code}`} right={<Icons.more />} />
      <HF_Scroll style={{ gap: 14 }}>
        <Card style={{ padding: 14 }}>
          <HF_Row style={{ gap: 12, alignItems: 'flex-start' }}>
            <LineBadge code={l.code} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{l.from} ↔ {l.to}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>Ciclo 84 min · 4 unidades · 8.70 km</div>
            </div>
          </HF_Row>
        </Card>

        <Card style={{ padding: 12, background: 'color-mix(in oklab, var(--accent) 12%, var(--surface))', border: '1px solid color-mix(in oklab, var(--accent) 35%, transparent)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>{t.operator}</div>
          <HF_Row style={{ marginTop: 4, justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{l.thisWeek}</div>
            <Pill small>{t.week} 14 · rota</Pill>
          </HF_Row>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>
            La operadora cambia cada semana entre TRANSMETRO y EJECUTTRANS.
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Card style={{ padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>{t.schedule}</div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>{l.hours}</div>
          </Card>
          <Card style={{ padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>{t.interval}</div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>cada {l.interval} {t.min}</div>
          </Card>
        </div>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{t.viaStops}</div>
          <Card style={{ padding: '4px 14px' }}>
            <ListRow left={<div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)' }} />} title="El Proletariado" subtitle="origen" chevron={false} />
            <ListRow left={<div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--text)', opacity: 0.3 }} />} title="Av. Quevedo · La Pepsi" chevron={false} />
            <ListRow left={<div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--text)', opacity: 0.3 }} />} title="Calle Galápagos" chevron={false} />
            <ListRow left={<div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--text)' }} />} title="Hospital G. Domínguez" subtitle="destino" chevron={false} style={{ borderBottom: 'none' }} />
          </Card>
        </div>
      </HF_Scroll>
      <TabBar active="home" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH C — MAP-FIRST
// ════════════════════════════════════════════════════════════════════

function HiFiMap({ height = 360, dark = false }) {
  const bg = dark ? '#13182A' : '#E8EDF5';
  const road = dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,37,64,0.10)';
  const roadBig = dark ? 'rgba(255,255,255,0.10)' : 'rgba(15,37,64,0.18)';
  const water = dark ? '#1A2138' : '#D5E0F0';
  const green = dark ? '#1A2C24' : '#DCE8DC';
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden', background: bg, borderBottom: '1px solid var(--line)' }}>
      <svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* river */}
        <path d="M-10 250 Q 80 220 160 245 T 380 220 L 380 280 Q 280 290 160 275 T -10 290 Z" fill={water} />
        {/* park */}
        <ellipse cx="80" cy="80" rx="50" ry="38" fill={green} />
        <ellipse cx="280" cy="160" rx="40" ry="30" fill={green} />
        {/* small streets */}
        <g stroke={road} strokeWidth="1" fill="none">
          <path d="M0 50 H 360"/><path d="M0 110 H 360"/><path d="M0 200 H 360"/>
          <path d="M60 0 V 360"/><path d="M180 0 V 360"/><path d="M250 0 V 360"/>
        </g>
        {/* main avenues */}
        <g stroke={roadBig} strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M-10 160 Q 130 150 200 165 T 380 180" />
          <path d="M120 -10 Q 130 130 150 200 T 200 380" />
        </g>
        {/* bus line 06A */}
        <path d="M50 60 Q 110 90 140 130 Q 180 180 230 220 L 280 290" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* bus line 18A (dotted) */}
        <path d="M30 290 Q 100 250 170 220 T 320 80" stroke={dark ? '#fff' : '#0F2540'} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
        {/* stops */}
        {[[50,60],[140,130],[230,220],[280,290],[170,220],[320,80]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill={dark ? '#0A0E1A' : '#fff'} stroke="#F59E0B" strokeWidth="2" />
          </g>
        ))}
        {/* you-are-here */}
        <g>
          <circle cx="120" cy="180" r="16" fill="#F59E0B" fillOpacity="0.18" />
          <circle cx="120" cy="180" r="9" fill="#F59E0B" stroke={dark ? '#0A0E1A' : '#fff'} strokeWidth="3" />
        </g>
      </svg>
      {/* zoom buttons */}
      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(15,37,64,0.15)' }}><Icons.plus /></div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(15,37,64,0.15)' }}><Icons.minus /></div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 44, height: 44, borderRadius: 99, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-ink)', boxShadow: '0 6px 14px rgba(245,158,11,0.4)' }}><Icons.locate /></div>
    </div>
  );
}

function HF_C_Map({ t, dark }) {
  return (
    <>
      <div style={{ padding: '0 16px 12px' }}>
        <Card style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icons.search />
          <span style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 500, flex: 1 }}>{t.findBus}…</span>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--chip)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.star /></div>
        </Card>
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <HiFiMap height={400} dark={dark} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: 'var(--surface)',
          borderRadius: '22px 22px 0 0',
          padding: '8px 16px 14px',
          boxShadow: '0 -10px 30px -10px rgba(15,37,64,0.15)',
          borderTop: '1px solid var(--line)',
        }}>
          <div style={{ width: 40, height: 5, borderRadius: 99, background: 'var(--line)', margin: '0 auto 12px' }} />
          <HF_Row style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{t.linesOnMap}</div>
            <Pill small>3 cerca</Pill>
          </HF_Row>
          <HF_Col gap={8}>
            <HF_Row style={{ gap: 10 }}>
              <LineBadge code="06A" small />
              <div style={{ flex: 1, fontSize: 12.5, fontWeight: 700 }}>Centro Rehab. → Terminal</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>4 min</span>
            </HF_Row>
            <HF_Row style={{ gap: 10 }}>
              <LineBadge code="18A" small />
              <div style={{ flex: 1, fontSize: 12.5, fontWeight: 700 }}>Quevedo Km 8 → Terminal</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>9 min</span>
            </HF_Row>
          </HF_Col>
        </div>
      </div>
      <TabBar active="map" t={t} />
    </>
  );
}

function HF_C_Sheet({ t, dark }) {
  const l = LINES[0];
  return (
    <>
      <div style={{ padding: '0 16px 12px' }}>
        <Card style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icons.search />
          <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>Línea 06A</span>
          <span style={{ color: 'var(--muted)', fontSize: 18 }}>×</span>
        </Card>
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <HiFiMap height={200} dark={dark} />
        <div style={{
          flex: 1, background: 'var(--surface)',
          borderRadius: '22px 22px 0 0',
          marginTop: -22,
          padding: '8px 16px 14px',
          boxShadow: '0 -10px 30px -10px rgba(15,37,64,0.15)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ width: 40, height: 5, borderRadius: 99, background: 'var(--line)', margin: '0 auto 4px' }} />
          <HF_Row style={{ gap: 12 }}>
            <LineBadge code={l.code} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{l.from} → {l.to}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{l.hours} · cada {l.interval} min</div>
            </div>
          </HF_Row>
          <Pill small accent fill style={{ alignSelf: 'flex-start' }}>{t.operator}: {l.thisWeek}</Pill>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.nextStop}</div>
          <Card style={{ padding: '6px 14px' }}>
            <ListRow left={<div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--accent)' }} />} title="Av. Quevedo · La Pepsi" subtitle="próxima" meta="~ 4 min" chevron={false} />
            <ListRow left={<div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--text)', opacity: 0.3 }} />} title="Calle Galápagos" meta="~ 9 min" chevron={false} style={{ borderBottom: 'none' }} />
          </Card>
        </div>
      </div>
      <TabBar active="map" t={t} />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// APPROACH D — CONVERSACIONAL
// ════════════════════════════════════════════════════════════════════

function HF_Bubble({ children, from = 'bot' }) {
  const isMe = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '84%',
        borderRadius: isMe ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
        padding: '10px 14px',
        background: isMe ? 'var(--text)' : 'var(--surface)',
        color: isMe ? 'var(--bg)' : 'var(--text)',
        fontSize: 13.5, lineHeight: 1.4, fontWeight: 500,
        border: isMe ? 'none' : '1px solid var(--line)',
        boxShadow: '0 1px 2px rgba(15,37,64,0.03)',
      }}>
        {children}
      </div>
    </div>
  );
}

function HF_D_Chat({ t }) {
  return (
    <>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 99, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>SD</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{t.appName} Asistente</div>
          <HF_Row style={{ gap: 5, fontSize: 11, color: 'var(--muted)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#16A34A' }} />en línea
          </HF_Row>
        </div>
        <Icons.more />
      </div>
      <HF_Scroll style={{ gap: 10, paddingTop: 14 }}>
        <div style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--muted)', fontWeight: 600 }}>HOY · 9:41</div>

        <HF_Bubble>
          <b>👋 {t.hi}</b>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--muted)' }}>{t.writeOrTap}</div>
        </HF_Bubble>

        <HF_Row style={{ gap: 6, flexWrap: 'wrap' }}>
          <Pill>🏥 Hospital</Pill>
          <Pill>🚏 Terminal</Pill>
          <Pill>🛍 Shopping</Pill>
          <Pill>🎓 UTE</Pill>
        </HF_Row>

        <HF_Bubble from="me">Quiero ir al Terminal</HF_Bubble>

        <HF_Bubble>
          {t.suggestion} la <b>línea 06A</b>:
          <Card style={{ marginTop: 8, padding: 10 }}>
            <HF_Row style={{ gap: 10 }}>
              <LineBadge code="06A" small />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800 }}>Centro Rehab. → Terminal</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>cada 12 min · 4 min de espera</div>
              </div>
            </HF_Row>
          </Card>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 8 }}>también la <b>18A</b> o la <b>16</b>.</div>
        </HF_Bubble>

        <div style={{ flexShrink: 0 }}>
          <Card style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--muted)', fontSize: 13.5, flex: 1 }}>Escribe a dónde vas…</span>
            <Icons.mic />
          </Card>
        </div>
      </HF_Scroll>
    </>
  );
}

function HF_D_Detail({ t }) {
  const l = LINES[0];
  return (
    <>
      <TopBar title={`Línea ${l.code}`} right={<Icons.star />} />
      <HF_Scroll style={{ gap: 10 }}>
        <HF_Bubble>
          <HF_Row style={{ gap: 12 }}>
            <LineBadge code={l.code} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{l.from}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>↓ {l.to}</div>
            </div>
          </HF_Row>
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 10, fontSize: 12.5, lineHeight: 1.6 }}>
            ⏱ cada <b>{l.interval} min</b><br/>
            🕐 {l.hours}<br/>
            🚌 esta semana opera <b>{l.thisWeek}</b>
          </div>
        </HF_Bubble>

        <HF_Bubble from="me">¿Dónde la tomo?</HF_Bubble>

        <HF_Bubble>
          La parada más cerca es <b>Av. Quevedo</b> 📍
          <Card style={{ marginTop: 8, padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Icons.pin />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800 }}>Av. Quevedo · 80 m</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>~ 1 min caminando</div>
            </div>
            <Pill small fill accent>Ver</Pill>
          </Card>
        </HF_Bubble>

        <HF_Row style={{ gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingBottom: 6 }}>
          <Pill>Ver itinerario</Pill>
          <Pill>Guardar línea</Pill>
        </HF_Row>
      </HF_Scroll>
    </>
  );
}

// ─── Approaches ─────────────────────────────────────────────────────
const HF_APPROACHES = [
  {
    id: 'a1', title: 'A · Buscador',
    subtitle: 'Estilo app de viajes · Desde → Hasta',
    screens: [
      { id: 'home', label: 'Home', Comp: HF_A_Home },
      { id: 'results', label: 'Resultados', Comp: HF_A_Results },
      { id: 'detail', label: 'Detalle de línea', Comp: HF_A_Detail },
    ],
  },
  {
    id: 'a2', title: 'B · Destinos rápidos',
    subtitle: 'Grid grande tocable · mínimo teclado',
    screens: [
      { id: 'home', label: 'Home', Comp: HF_B_Home },
      { id: 'lines', label: 'Líneas al destino', Comp: HF_B_Lines },
      { id: 'detail', label: 'Detalle de línea', Comp: HF_B_Detail },
    ],
  },
  {
    id: 'a3', title: 'C · Mapa primero',
    subtitle: 'Mapa con líneas activas + bottom sheet',
    screens: [
      { id: 'home', label: 'Mapa', Comp: HF_C_Map },
      { id: 'sheet', label: 'Línea seleccionada', Comp: HF_C_Sheet },
    ],
  },
  {
    id: 'a4', title: 'D · Asistente',
    subtitle: 'Conversacional · amigable para todos',
    screens: [
      { id: 'chat', label: 'Conversación', Comp: HF_D_Chat },
      { id: 'detail', label: 'Detalle en chat', Comp: HF_D_Detail },
    ],
  },
];

Object.assign(window, { HF_APPROACHES });
