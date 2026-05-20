// app.jsx — Main composition: DesignCanvas + Tweaks + Approaches

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "lang": "es",
  "accent": "#c89432"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  '#c89432',  // mostaza (default)
  '#c66e3a',  // terracota
  '#5c8a4a',  // verde botella
];

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULS);
  const t = I18N[tweaks.lang] || I18N.es;

  return (
    <>
      <DesignCanvas>
        {APPROACHES.map(ap => (
          <DCSection key={ap.id} id={ap.id} title={ap.title} subtitle={ap.subtitle}>
            {ap.screens.map(s => (
              <DCArtboard key={s.id} id={`${ap.id}-${s.id}`} label={s.label} width={320} height={650}>
                <SketchyPhone width={320} height={650} dark={tweaks.dark} accent={tweaks.accent}>
                  <s.Comp t={t} />
                </SketchyPhone>
              </DCArtboard>
            ))}
          </DCSection>
        ))}
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Idioma · Language">
          <TweakRadio
            value={tweaks.lang}
            onChange={v => setTweak('lang', v)}
            options={[{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }]}
          />
        </TweakSection>
        <TweakSection label="Apariencia">
          <TweakToggle
            label="Modo oscuro"
            value={tweaks.dark}
            onChange={v => setTweak('dark', v)}
          />
        </TweakSection>
        <TweakSection label="Color de acento">
          <TweakColor
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
