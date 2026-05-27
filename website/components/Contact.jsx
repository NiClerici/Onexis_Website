/* eslint-disable */
function Contact() {
  const c = window.CONTENT.contact;
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
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            {c.heading}
          </h2>
          <p style={{
            marginTop: 24, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)',
            maxWidth: 460,
          }}>
            {c.intro}
          </p>

          <div style={{
            marginTop: 36, fontSize: 16, lineHeight: 1.8, color: 'var(--fg)',
          }}>
            <strong style={{ fontWeight: 600 }}>{c.companyName}</strong><br />
            {c.street}<br />
            {c.city}<br />
            <a href={c.phoneHref} style={{ color: 'var(--accent)' }}>
              {c.phone}
            </a><br />
            <a href={c.emailHref} style={{ color: 'var(--accent)' }}>
              {c.email}
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
              <h3 style={{ margin: 0, fontWeight: 300, fontSize: 26 }}>{c.successTitle}</h3>
              <p style={{
                marginTop: 8, fontSize: 15, color: 'var(--fg-muted)',
              }}>{c.successBody}</p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 14, marginBottom: 14,
              }}>
                <div>
                  <label style={labelStyle}>{c.labelFirstName}</label>
                  <input style={inputStyle} value={form.vorname} onChange={set('vorname')} />
                </div>
                <div>
                  <label style={labelStyle}>{c.labelLastName}</label>
                  <input style={inputStyle} value={form.nachname} onChange={set('nachname')} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>{c.labelEmail}</label>
                <input style={inputStyle} type="email" value={form.email} onChange={set('email')} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{c.labelMessage}</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: 'vertical', fontFamily: 'var(--font-sans)' }}
                  value={form.mitteilung} onChange={set('mitteilung')}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                {c.labelSubmit} <Arrow />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.Contact = Contact;
