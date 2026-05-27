/* eslint-disable */
function Footer() {
  const c = window.CONTENT.footer;
  const linkStyle = {
    color: '#CECECE', fontSize: 14, textDecoration: 'none', cursor: 'pointer',
    padding: '4px 0',
  };
  const colTitle = {
    fontSize: 12, fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
  };
  return (
    <footer style={{
      background: 'var(--onexis-anthrazit)', color: '#fff',
      padding: '72px 0 32px',
    }}>
      <div className="container-wide">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
          gap: 48,
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.1)',
        }}>
          <div>
            <img src="assets/logo-negativ.svg" alt="ONEXIS"
              style={{ height: 28, marginBottom: 18 }} />
            <p style={{
              margin: 0, fontSize: 14, color: '#CECECE', lineHeight: 1.7, maxWidth: 360,
            }}>
              {c.tagline}
            </p>
          </div>
          <div>
            <div style={colTitle}>{c.addressTitle}</div>
            <div style={{ fontSize: 14, color: '#CECECE', lineHeight: 1.7 }}>
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
                <a key={l} style={linkStyle}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', fontSize: 12, color: '#9D9D9D',
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
  );
}
window.Footer = Footer;
