/* eslint-disable */
function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    vorname: '', nachname: '', email: '', mitteilung: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const inputStyle = {
    fontFamily: 'var(--font-sans)', fontSize: 15,
    padding: '12px 14px',
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 8, width: '100%',
    color: 'var(--fg)', boxSizing: 'border-box',
    outline: 'none',
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 500, color: 'var(--fg)',
    marginBottom: 6, display: 'block',
  };

  return (
    <section id="kontakt" className="section">
      <div className="container-wide" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.1fr',
        gap: 80, alignItems: 'start',
      }}>
        <div>
          <div className="eyebrow">Kontakt</div>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            Sprechen wir.
          </h2>
          <p style={{
            marginTop: 24, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)',
            maxWidth: 460,
          }}>
            Erst­gespräch innerhalb von 48 Stunden, ohne Vertriebs­schleife.
            Wir hören zu — und sagen ehrlich, ob wir die Richtigen sind.
          </p>

          <div style={{
            marginTop: 36, fontSize: 16, lineHeight: 1.8, color: 'var(--fg)',
          }}>
            <strong style={{ fontWeight: 600 }}>ONEXIS GmbH</strong><br />
            Sissacherstrasse 20<br />
            4460 Gelterkinden<br />
            <a href="tel:+41615561010" style={{ color: 'var(--accent)' }}>
              061 556 10 10
            </a><br />
            <a href="mailto:kontakt@onexis.ch" style={{ color: 'var(--accent)' }}>
              kontakt@onexis.ch
            </a>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          style={{
            background: 'var(--bg-muted)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 32,
          }}>
          {submitted ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, margin: '0 auto 16px',
                background: 'var(--accent-soft)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', fontSize: 28, fontWeight: 600,
              }}>✓</div>
              <h3 style={{ margin: 0, fontWeight: 300, fontSize: 26 }}>Vielen Dank.</h3>
              <p style={{
                marginTop: 8, fontSize: 15, color: 'var(--fg-muted)',
              }}>Wir melden uns innerhalb von 48 Stunden.</p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 14, marginBottom: 14,
              }}>
                <div>
                  <label style={labelStyle}>Vorname</label>
                  <input style={inputStyle} value={form.vorname} onChange={set('vorname')} />
                </div>
                <div>
                  <label style={labelStyle}>Nachname</label>
                  <input style={inputStyle} value={form.nachname} onChange={set('nachname')} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>E-Mail</label>
                <input style={inputStyle} type="email" value={form.email} onChange={set('email')} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Mitteilung</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: 'vertical', fontFamily: 'var(--font-sans)' }}
                  value={form.mitteilung} onChange={set('mitteilung')}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Senden <Arrow />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.Contact = Contact;
