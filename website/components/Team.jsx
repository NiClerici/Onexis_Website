import CONTENT from '../content/de.js'

function Team() {
  const c = CONTENT.team
  return (
    <section id="team" className="section muted">
      <div className="container-wide">
        <div className="split-grid" style={{
          '--split-cols': '1.2fr 1fr', '--split-gap': '80px', alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow">{c.eyebrow}</div>
            <h2 className="h-section" style={{ marginTop: 16, maxWidth: 540 }}>
              {c.heading[0]}<br />{c.heading[1]}
            </h2>
            <p style={{
              marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'var(--fg)',
              maxWidth: 540,
            }}>
              {c.body}
            </p>

            <div style={{
              marginTop: 32, paddingTop: 24,
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--onexis-anthrazit)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 500, fontSize: 16,
              }} aria-hidden="true">{c.memberInitials}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{c.memberName}</div>
                <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
                  {c.memberTitle}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            position: 'relative', aspectRatio: '1',
            maxWidth: 420, justifySelf: 'end', width: '100%',
            background: 'var(--onexis-anthrazit)', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img src="/assets/logo-x-negativ.svg" alt=""
              aria-hidden="true"
              style={{ width: '50%', height: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
