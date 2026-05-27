/* eslint-disable */
function Promises() {
  const items = [
    'Wir finden gemeinsam Lösungen.',
    'Wir leben Termintreue.',
    'Wir sind fokussiert auf Ihr Ziel.',
    'Wir sind pragmatisch.',
  ];
  return (
    <section className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div className="eyebrow">Was uns auszeichnet</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 720 }}>
          Weil Ihre Zufriedenheit<br />
          unser Antrieb ist.
        </h2>

        <div style={{
          marginTop: 56,
          borderTop: '1px solid var(--border)',
        }}>
          {items.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 24,
              padding: '24px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <img src="assets/logo-x.svg" alt=""
                style={{ width: 26, height: 26, flex: '0 0 auto' }} />
              <div style={{ fontSize: 22, fontWeight: 400, color: 'var(--fg)' }}>
                {t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Promises = Promises;
