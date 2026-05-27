/* eslint-disable */
const CASES = [
  {
    sector: 'Versicherungen',
    role: 'Interim · PMO',
    headline: 'Eskaliertes Kernsystem-Programm stabilisiert.',
    body: 'Schaden­plattform-Programm 11 Monate hinter Plan, Reporting unbrauchbar, vier Lieferanten im Konflikt. Wir haben Interim-Programm­leitung übernommen, ein schlankes PMO aufgesetzt und auf ein realistisches 18-Monats-Fenster re-geplant.',
    metric: { v: '90 Tage', l: 'bis Stabilisierung' },
  },
  {
    sector: 'Öffentliche Verwaltung',
    role: 'IT-Architektur',
    headline: 'Architektur-Zielbild für ein Bürgerportal.',
    body: 'Fachseite und IT diskutierten seit über einem Jahr ohne tragfähige Entscheidung. Wir haben drei Szenarien sauber gerechnet, eine Roadmap inkl. TCO erstellt — einstimmig im Lenkungs­ausschuss verabschiedet.',
    metric: { v: '8 Wochen', l: 'bis Entscheid' },
  },
  {
    sector: 'Energie',
    role: 'PMO · Projektleitung',
    headline: 'Portfolio-Cockpit aufgebaut und übergeben.',
    body: 'Vierzehn parallele IT-Vorhaben ohne gemeinsame Methodik. Wir haben ein PMO aufgebaut, das Portfolio-Cockpit etabliert und nach neun Monaten an die interne Leitung übergeben.',
    metric: { v: '9 Monate', l: 'bis interne Übergabe' },
  },
];

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
  return (
    <section id="referenzen" className="section muted">
      <div className="container-wide">
        <div className="eyebrow">Referenzen</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 760 }}>
          Drei Mandate.<br />
          Drei sehr unterschiedliche Lagen.
        </h2>
        <p style={{
          marginTop: 20, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 640,
        }}>
          Namen unserer Kunden teilen wir auf Anfrage. Hier exemplarisch,
          anonymisiert — was wir konkret bewirkt haben.
        </p>

        <div style={{ marginTop: 40, borderBottom: '1px solid var(--border)' }}>
          {CASES.map((c, i) => <CaseRow key={i} c={c} />)}
        </div>
      </div>
    </section>
  );
}

window.Cases = Cases;
