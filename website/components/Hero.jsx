/* eslint-disable */
function Hero() {
  return (
    <section id="top" className="hero" style={{
      position: 'relative',
      background: 'var(--onexis-anthrazit)',
      color: '#fff',
      overflow: 'hidden',
    }}>
      {/* faint X watermark -- slowly settles in on load */}
      <img src="assets/logo-x-negativ.svg" alt="" aria-hidden="true"
        className="hero-watermark"
        style={{
          position: 'absolute',
          right: '-12%', top: '-10%',
          width: '70%',
          opacity: 0.05,
          pointerEvents: 'none',
        }} />

      <div className="container-wide" style={{
        position: 'relative',
        paddingTop: 140,
        paddingBottom: 140,
      }}>
        {/* Eyebrow with growing rule */}
        <div className="hero-eyebrow-row" style={{
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span className="hero-rule" />
          <div style={{
            fontSize: 13, fontWeight: 600, letterSpacing: '0.42em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>P&nbsp;R&nbsp;O&nbsp;J&nbsp;E&nbsp;C&nbsp;T&nbsp;S&nbsp;&nbsp;&nbsp;I&nbsp;N&nbsp;&nbsp;&nbsp;M&nbsp;O&nbsp;T&nbsp;I&nbsp;O&nbsp;N</div>
        </div>
<h1 style={{
          margin: '32px 0 0',
          fontWeight: 300,
          fontSize: 'clamp(48px, 7vw, 92px)',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          maxWidth: 1040,
        }}>
          <span className="hero-line" style={{ display: 'block', '--d': '0.2s' }}>
            Nico machts alles
          </span>
          <span className="hero-line" style={{ display: 'block', '--d': '0.35s' }}>
            IT-Projekte sicher ins{' '}
            <span style={{ color: 'var(--accent)' }}>Ziel.</span>
          </span>
        </h1>
<p className="hero-line" style={{
          '--d': '0.55s',
          marginTop: 36, fontSize: 19, lineHeight: 1.6,
          color: '#D6D6D6', maxWidth: 620,
        }}>
          ONEXIS leitet und steuert IT-Vorhaben von der Planung bis zur
          Betriebsuebergabe - national wie international. Auf Wunsch auch
          als Health Check, Interim-Manager oder PMO.
        </p>

        <div className="hero-line" style={{
          '--d': '0.7s',
          display: 'flex', gap: 12, marginTop: 44,
        }}>
          <a href="#leistungen" className="btn btn-primary">
            Leistungen ansehen <Arrow />
          </a>
          <a href="#kontakt" className="btn btn-ghost-inverse">
            Gespraech vereinbaren
          </a>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

window.Hero = Hero;
window.Arrow = Arrow;