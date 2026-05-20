// chatbot.jsx — Floating chatbot (JS-only) that answers using data/rutas-sd.json
// Loaded via <script type="text/babel" src="chatbot.jsx"></script>

(function initChatbotGlobal() {
  const DATA_URL = './data/rutas-sd.json';

  // -------- utils --------
  const norm = (s) => (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  const pad2 = (n) => String(n).padStart(2, '0');

  // ISO week number (Monday as first day). Used to decide odd/even week.
  function getISOWeek(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Thursday in current week decides the year.
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week: weekNo };
  }

  function isEvenWeek(date = new Date()) {
    return (getISOWeek(date).week % 2) === 0;
  }

  function prettyLine(line) {
    const parts = [];
    parts.push(`${line.id}${line.servicio ? ' (' + line.servicio + ')' : ''} — ${line.nombre}`);
    if (line.terminal_principal || line.terminal_secundario) {
      parts.push(`Terminales: ${line.terminal_principal || '?'} ↔ ${line.terminal_secundario || '?'}`);
    }
    if (line.horario_inicio && line.horario_fin) {
      parts.push(`Horario: ${line.horario_inicio} - ${line.horario_fin}`);
    }
    if (line.intervalo_min) parts.push(`Intervalo aprox.: ${line.intervalo_min} min`);
    if (line.unidades) parts.push(`Unidades: ${line.unidades}`);
    if (line.operadora_tipo) {
      if (line.operadora_tipo === 'fija' && (line.operadora_semana_impar || line.operadora_semana_par)) {
        parts.push(`Operadora: ${line.operadora_semana_impar || line.operadora_semana_par}`);
      } else if (line.operadora_tipo === 'rotativa') {
        const even = isEvenWeek(new Date());
        const op = even ? line.operadora_semana_par : line.operadora_semana_impar;
        parts.push(`Operadora (semana ${even ? 'par' : 'impar'}): ${op || 'N/D'}`);
      }
    }
    return parts.join('\n');
  }

  function findLineById(data, idRaw) {
    const id = norm(idRaw).toUpperCase();
    return (data.lineas || []).find(l => (l.id || '').toUpperCase() === id) || null;
  }

  function extractLineId(text, data) {
    // Try exact known IDs first (safer than regex-only)
    const t = norm(text);
    const candidates = (data.lineas || []).map(l => l.id).filter(Boolean);
    // longest first (so 06C2 before 06)
    candidates.sort((a, b) => b.length - a.length);
    for (const cid of candidates) {
      const c = norm(cid);
      // word boundary-ish: allow things like "linea 06a", "06A?"
      const re = new RegExp(`(^|[^a-z0-9])${c}([^a-z0-9]|$)`, 'i');
      if (re.test(t)) return cid;
    }
    // fallback regex: 1-2 digits + optional letters/numbers (covers 06A, 18C2, 24B, 07)
    const m = t.match(/\b(\d{1,2}[a-z]{0,2}\d?)\b/i);
    if (m) return m[1].toUpperCase();
    return null;
  }

  function findDestino(data, text) {
    const t = norm(text);
    const destinos = data.destinos_populares || [];

    // Match by destino id or nombre (normalized)
    for (const d of destinos) {
      if (!d) continue;
      if (d.id && norm(d.id) && t.includes(norm(d.id))) return d;
      if (d.nombre && norm(d.nombre) && t.includes(norm(d.nombre))) return d;
    }

    // Also allow matching against any "destinos_clave" or terminals from lines
    const names = new Set();
    (data.lineas || []).forEach(l => {
      (l.destinos_clave || []).forEach(x => x && names.add(x));
      if (l.terminal_principal) names.add(l.terminal_principal);
      if (l.terminal_secundario) names.add(l.terminal_secundario);
    });

    // try to find a name that appears in query
    const sorted = Array.from(names).sort((a, b) => b.length - a.length);
    for (const n of sorted) {
      const nn = norm(n);
      if (nn && t.includes(nn)) return { id: nn.replace(/\s+/g, '_'), nombre: n, lineas: null };
    }

    return null;
  }

  function answerFromJson(data, userText) {
    const t = norm(userText);

    if (!t) {
      return 'Escribe una consulta, por ejemplo: "06A", "paradas ida 06A", "lineas a Terminal Terrestre".';
    }

    // help
    if (/(ayuda|help|que puedes hacer|opciones)/.test(t)) {
      return [
        'Puedo responder usando el JSON de rutas. Ejemplos:',
        '- "06A" (info general de la línea)',
        '- "horario 06A"',
        '- "paradas ida 06A" / "paradas retorno 06A"',
        '- "lineas a Terminal Terrestre"',
        '- "operadora 06A"'
      ].join('\n');
    }

    // 1) Questions about a specific line
    const lineId = extractLineId(userText, data);
    if (lineId) {
      const line = findLineById(data, lineId);
      if (!line) {
        return `No encuentro la línea "${lineId}" en el JSON. Revisa el ID o actualiza el archivo de datos.`;
      }

      // paradas ida / retorno
      if (/(paradas|parada|stops)/.test(t) && /(ida|ir|salida)/.test(t)) {
        const stops = line.paradas_ida || [];
        return stops.length
          ? `Paradas (ida) de ${line.id}:\n- ` + stops.join('\n- ')
          : `No hay paradas de ida registradas para ${line.id}.`;
      }
      if (/(paradas|parada|stops)/.test(t) && /(retorno|vuelta|regreso)/.test(t)) {
        const stops = line.paradas_retorno || [];
        return stops.length
          ? `Paradas (retorno) de ${line.id}:\n- ` + stops.join('\n- ')
          : `No hay paradas de retorno registradas para ${line.id}.`;
      }

      // horario
      if (/(horario|hora|abre|cierra|inicio|fin)/.test(t)) {
        if (line.horario_inicio && line.horario_fin) {
          return `Horario de ${line.id}: ${line.horario_inicio} - ${line.horario_fin}.`;
        }
        return `No tengo horario registrado para ${line.id}.`;
      }

      // operadora
      if (/(operadora|operador|empresa)/.test(t)) {
        if (line.operadora_tipo === 'fija') {
          const op = line.operadora_semana_impar || line.operadora_semana_par;
          return `Operadora de ${line.id}: ${op || 'N/D'}.`;
        }
        if (line.operadora_tipo === 'rotativa') {
          const even = isEvenWeek(new Date());
          const op = even ? line.operadora_semana_par : line.operadora_semana_impar;
          const { year, week } = getISOWeek(new Date());
          return `Operadora de ${line.id} para la semana ISO ${year}-W${pad2(week)} (${even ? 'par' : 'impar'}): ${op || 'N/D'}.`;
        }
        return `No tengo información de operadora para ${line.id}.`;
      }

      // default: line summary
      return prettyLine(line);
    }

    // 2) Questions about destinos: "lineas a X"
    if (/(lineas|rutas|buses|bus|ir a|llegar a|para|hacia)/.test(t)) {
      const d = findDestino(data, userText);
      if (d) {
        // If it is one of destinos_populares and has .lineas, use it.
        if (Array.isArray(d.lineas) && d.lineas.length) {
          return `Líneas que van a ${d.nombre}: ${d.lineas.join(', ')}.`;
        }

        // otherwise compute: any line that includes that destino in destinos_clave/terminals
        const target = norm(d.nombre);
        const matches = (data.lineas || []).filter(l => {
          const keys = (l.destinos_clave || []).map(norm);
          if (keys.includes(target)) return true;
          if (norm(l.terminal_principal) === target) return true;
          if (norm(l.terminal_secundario) === target) return true;
          return false;
        }).map(l => l.id);

        if (matches.length) {
          return `Líneas relacionadas con ${d.nombre}: ${matches.join(', ')}.`;
        }
        return `No encontré líneas para el destino "${d.nombre}" en el JSON actual.`;
      }
    }

    // fallback
    return 'No entendí la consulta. Prueba con: "06A", "paradas ida 06A", "horario 06A", "lineas a Terminal Terrestre", o escribe "ayuda".';
  }

  // -------- data loader --------
  let _dataPromise = null;
  function loadData() {
    if (_dataPromise) return _dataPromise;
    _dataPromise = fetch(DATA_URL)
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
    return _dataPromise;
  }

  // -------- UI --------
  function ChatbotWidget() {
    const [open, setOpen] = React.useState(false);
    const [busy, setBusy] = React.useState(false);
    const [messages, setMessages] = React.useState([
      { from: 'bot', text: 'Hola. Pregúntame por una línea o destino (ej: "06A", "paradas ida 06A", "lineas a Terminal Terrestre").' }
    ]);
    const [input, setInput] = React.useState('');

    const send = async () => {
      const text = input.trim();
      if (!text) return;
      setInput('');
      setMessages(m => [...m, { from: 'user', text }]);
      setBusy(true);
      try {
        const data = await loadData();
        const reply = answerFromJson(data, text);
        setMessages(m => [...m, { from: 'bot', text: reply }]);
      } catch (e) {
        setMessages(m => [...m, { from: 'bot', text: 'No pude cargar los datos del chatbot. Verifica que exista ' + DATA_URL + ' y que estés sirviendo la carpeta por HTTP.' }]);
      } finally {
        setBusy(false);
      }
    };

    // auto-scroll
    const listRef = React.useRef(null);
    React.useEffect(() => {
      if (!open) return;
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, [open, messages.length]);

    const accent = '#c89432';

    return (
      <>
        {/* floating button */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 9999,
            border: 'none',
            cursor: 'pointer',
            padding: '10px 12px',
            borderRadius: 999,
            background: accent,
            color: '#1f1a12',
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,.18)'
          }}
          title="Chat"
        >
          {open ? 'Cerrar' : 'Chat'}
        </button>

        {/* panel */}
        {open && (
          <div
            style={{
              position: 'fixed',
              right: 16,
              bottom: 64,
              width: 340,
              maxWidth: 'calc(100vw - 32px)',
              height: 460,
              maxHeight: 'calc(100vh - 96px)',
              zIndex: 9999,
              background: '#fff',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 18px 60px rgba(0,0,0,.25)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
            }}
          >
            <div style={{ padding: '10px 12px', background: '#1f1a12', color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>SDBussBot</div>
              <div style={{ opacity: .8, fontSize: 12 }}>Responde usando el JSON de rutas</div>
            </div>

            <div ref={listRef} style={{ flex: 1, overflow: 'auto', padding: 12, background: '#faf8f4' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: 10, display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    whiteSpace: 'pre-wrap',
                    maxWidth: '90%',
                    padding: '8px 10px',
                    borderRadius: 12,
                    background: m.from === 'user' ? accent : '#fff',
                    color: '#1f1a12',
                    boxShadow: '0 2px 10px rgba(0,0,0,.08)',
                    border: m.from === 'user' ? 'none' : '1px solid rgba(0,0,0,.06)'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div style={{ fontSize: 12, opacity: .7 }}>Escribiendo…</div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, padding: 10, borderTop: '1px solid rgba(0,0,0,.06)', background: '#fff' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                placeholder="Ej: paradas ida 06A"
                style={{
                  flex: 1,
                  padding: '10px 10px',
                  borderRadius: 10,
                  border: '1px solid rgba(0,0,0,.15)',
                  outline: 'none'
                }}
              />
              <button
                onClick={send}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: accent,
                  fontWeight: 800
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Expose (optional) helpers for debugging
  window.SDBussBot = { loadData, answerFromJson };
  window.ChatbotWidget = ChatbotWidget;
})();
