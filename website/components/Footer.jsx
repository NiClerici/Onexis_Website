import CONTENT from '../content/de.js'

function Footer() {
  const c = CONTENT.footer
  const linkStyle = {
    color: 'var(--fg-on-dark-muted)', fontSize: 14, textDecoration: 'none',
    padding: '4px 0', borderRadius: 4,
  }
  const colTitle = {
    fontSize: 12, fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
  }
  return (
    <footer style={{
      background: 'var(--onexis-anthrazit)', color: '#fff',
      padding: '72px 0 32px',
    }}>
      <div className="container-wide">
        <div className="footer-grid" style={{
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.1)',
        }}>
          <div>
            <img src="/assets/logo-negativ.svg" alt="ONEXIS"
              style={{ height: 28, marginBottom: 18 }} />
            <p style={{
              margin: 0, fontSize: 14, color: 'var(--fg-on-dark-muted)', lineHeight: 1.7, maxWidth: 360,
            }}>
              {c.tagline}
            </p>
          </div>
          <div>
            <div style={colTitle}>{c.addressTitle}</div>
            <div style={{ fontSize: 14, color: 'var(--fg-on-dark-muted)', lineHeight: 1.7 }}>
              {c.company}<br />
              {c.street}<br />
              {c.city}<br />
              {c.phone}
            </div>
          </div>
          <div>
            <div style={colTitle}>{c.legalTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {c.legalLinks.map(l => (
                <a key={l.href} href={l.href} className="footer-link" style={linkStyle}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', fontSize: 12, color: 'var(--fg-on-dark-subtle)',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>{c.copyright}</div>
          <div style={{
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--accent)', fontWeight: 600,
          }}>
            {c.slogan}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
