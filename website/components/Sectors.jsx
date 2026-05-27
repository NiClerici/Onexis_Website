/* eslint-disable */
function Sectors() {
  const c = window.CONTENT.sectors;
  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container-wide" style={{
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        gap: 56, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h3 style={{
            margin: '16px 0 0', fontWeight: 300, fontSize: 32,
            letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            {c.heading}
          </h3>
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
  );
}
window.Sectors = Sectors;
