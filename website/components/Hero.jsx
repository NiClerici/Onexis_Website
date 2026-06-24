import CONTENT from '../content/de.js'

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function Hero() {
  const c = CONTENT.hero
  return (
    <section id="top" className="hero" style={{
      position: 'relative',
      background: 'var(--onexis-anthrazit)',
      color: '#fff',
      overflow: 'hidden',
    }}>
      <img src="/assets/logo-x-negativ.svg" alt="" aria-hidden="true"
        className="hero-watermark"
        style={{
          position: 'absolute',
          right: '-12%', top: '-10%',
          width: '70%',
          opacity: 0.05,
          pointerEvents: 'none',
        }} />

      <div className="container-wide hero-inner" style={{ position: 'relative' }}>
        <div className="hero-eyebrow-row" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="hero-rule" />
          <div style={{
            fontSize: 13, fontWeight: 600,
            letterSpacing: 'clamp(0.22em, 1.1vw, 0.42em)',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>Projects in Motion</div>
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
            {c.title}
          </span>
        </h1>

        <p className="hero-line" style={{
          '--d': '0.55s',
          marginTop: 36, fontSize: 19, lineHeight: 1.6,
          color: 'var(--fg-on-dark-muted)', maxWidth: 620,
        }}>
          {c.subtitle}
        </p>

        <div className="hero-line" style={{
          '--d': '0.7s',
          display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap',
        }}>
          <a href="#leistungen" className="btn btn-primary">
            {c.ctaPrimary} <Arrow />
          </a>
          <a href="#kontakt" className="btn btn-ghost-inverse">
            {c.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
