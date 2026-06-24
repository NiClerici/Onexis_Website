import CONTENT from '../content/de.js'

function Vorgehen() {
  const c = CONTENT.vorgehen
  return (
    <section id="vorgehen" className="section">
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 760 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>

        <div className="steps-grid" style={{ marginTop: 56 }}>
          {c.steps.map(s => (
            <div key={s.n}>
              <div style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '0.16em',
                color: 'var(--accent-ink)',
              }}>{s.n}</div>
              <h3 style={{
                margin: '12px 0 10px',
                fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em',
              }}>{s.title}</h3>
              <p style={{
                margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)',
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Vorgehen
