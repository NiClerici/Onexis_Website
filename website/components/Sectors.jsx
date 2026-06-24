import CONTENT from '../content/de.js'

function Sectors() {
  const c = CONTENT.sectors
  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container-wide split-grid" style={{
        '--split-cols': '1fr 2fr', '--split-gap': '56px', alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 style={{
            margin: '16px 0 0', fontWeight: 300, fontSize: 'clamp(26px, 2.8vw, 32px)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            {c.heading}
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {c.items.map(s => (
            <span key={s} style={{
              background: '#fff', color: 'var(--fg)',
              padding: '12px 20px', borderRadius: 999,
              fontSize: 14, fontWeight: 500,
              border: '1px solid var(--border)',
            }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sectors
