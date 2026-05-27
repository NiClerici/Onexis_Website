/* eslint-disable */
function Team() {
  return (
    <section id="team" className="section muted">
      <div className="container-wide">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          gap: 80, alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow">Team</div>
            <h2 className="h-section" style={{ marginTop: 16, maxWidth: 540 }}>
              Ein Team aus 10+<br />Professionals.
            </h2>
            <p style={{
              marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'var(--fg)',
              maxWidth: 540,
            }}>
              Wir durften in unserer Laufbahn mehr als 30 Kunden national und
              international bedienen und viele Mandate zum Erfolg bringen.
              Unser Rezept: ziel- und lösungs­orientiert, klar, strukturiert
              und pragmatisch.
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
              }}>SB</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Stefan Büttler</div>
                <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
                  Gründer und Geschäftsführer
                </div>
              </div>
            </div>
          </div>

          {/* Brand-Tile */}
          <div style={{
            position: 'relative', aspectRatio: '1',
            maxWidth: 420, justifySelf: 'end', width: '100%',
            background: 'var(--onexis-anthrazit)', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img src="assets/logo-x-negativ.svg" alt=""
              style={{ width: '50%', height: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
window.Team = Team;
