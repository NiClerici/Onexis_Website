/* eslint-disable */
function CaseRow({ c }) {
  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
      gap: 56,
      padding: '48px 0',
      borderTop: '1px solid var(--border)',
      alignItems: 'start',
    }}>
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16,
          fontSize: 13, color: 'var(--fg-muted)',
        }}>
          <span>{c.sector}</span>
          <span style={{ color: 'var(--accent)' }}>·</span>
          <span style={{ color: 'var(--accent)' }}>{c.role}</span>
        </div>
        <h3 style={{
          margin: 0, fontWeight: 300, fontSize: 'clamp(26px, 2.6vw, 34px)',
          lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: 640,
        }}>{c.headline}</h3>
        <p style={{
          marginTop: 20, fontSize: 16, lineHeight: 1.65, color: 'var(--fg)',
          maxWidth: 640,
        }}>{c.body}</p>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 4,
      }}>
        <div className="tabular" style={{
          fontSize: 56, fontWeight: 300, letterSpacing: '-0.03em',
          lineHeight: 1, color: 'var(--fg)',
        }}>{c.metric.v}</div>
        <div style={{ fontSize: 14, color: 'var(--fg-muted)' }}>{c.metric.l}</div>
      </div>
    </article>
  );
}

function Cases() {
  const c = window.CONTENT.cases;
  return (
    <section id="referenzen" className="section muted">
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 760 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>
        <p style={{
          marginTop: 20, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 640,
        }}>
          {c.intro}
        </p>

        <div style={{ marginTop: 40, borderBottom: '1px solid var(--border)' }}>
          {c.items.map((item, i) => <CaseRow key={i} c={item} />)}
        </div>
      </div>
    </section>
  );
}

window.Cases = Cases;
