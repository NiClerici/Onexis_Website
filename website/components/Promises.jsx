import CONTENT from '../content/de.js'

function Promises() {
  const c = CONTENT.promises
  return (
    <section className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 720 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>

        <div style={{
          marginTop: 56,
          borderTop: '1px solid var(--border)',
        }}>
          {c.items.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 24,
              padding: '24px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <img src="/assets/logo-x.svg" alt="" aria-hidden="true"
                style={{ width: 26, height: 26, flex: '0 0 auto' }} />
              <div style={{ fontSize: 22, fontWeight: 400, color: 'var(--fg)' }}>
                {t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promises
