/* eslint-disable */
const STEPS = [
  { n: '01', title: 'Aufnahme',  body: 'Erstanalyse: Zielbild, Stakeholder, Status, Risiken.' },
  { n: '02', title: 'Diagnose',  body: 'Lage entlang der TOM-Dimensionen, mit klaren Hypothesen.' },
  { n: '03', title: 'Mandat',    body: 'Rolle, Befugnisse und Erfolgs­kriterien verschriftlicht.' },
  { n: '04', title: 'Lieferung', body: 'Iterative Lieferung mit schlankem Reporting.' },
  { n: '05', title: 'Übergabe',  body: 'Sauberer Hand-over an Linie oder internes Team.' },
];

function Vorgehen() {
  return (
    <section id="vorgehen" className="section">
      <div className="container-wide">
        <div className="eyebrow">Vorgehen</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 760 }}>
          Fünf Schritte —<br />
          transparent vom ersten Tag.
        </h2>

        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32,
        }}>
          {STEPS.map(s => (
            <div key={s.n}>
              <div style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '0.16em',
                color: 'var(--accent)',
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
  );
}
window.Vorgehen = Vorgehen;
