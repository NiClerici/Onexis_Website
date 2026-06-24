/* eslint-disable */
/* Module-scope field component — defining it inside Contact() would remount it
   on every keystroke and steal focus from the input. */
function ContactField({ id, label, value, onChange, onBlur, error, type, textarea, autoComplete }) {
  const describedBy = error ? id + '-err' : undefined;
  const shared = {
    id, name: id, className: 'field', value, onChange, onBlur,
    required: true,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
  };
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea {...shared} style={{ minHeight: 120, resize: 'vertical' }} />
      ) : (
        <input {...shared} type={type || 'text'} autoComplete={autoComplete} />
      )}
      {error && <p id={id + '-err'} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function Contact() {
  const c = window.CONTENT.contact;
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [form, setForm] = React.useState({
    vorname: '', nachname: '', email: '', mitteilung: '',
  });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validate = (f) => {
    const e = {};
    if (!f.vorname.trim())    e.vorname = c.errRequired;
    if (!f.nachname.trim())   e.nachname = c.errRequired;
    if (!f.email.trim())      e.email = c.errRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = c.errEmail;
    if (!f.mitteilung.trim()) e.mitteilung = c.errRequired;
    return e;
  };

  const set = (k) => (ev) => {
    const next = { ...form, [k]: ev.target.value };
    setForm(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(form));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (sending) return;                       // guard against double-submit
    const e = validate(form);
    setErrors(e);
    setTouched({ vorname: true, nachname: true, email: true, mitteilung: true });
    if (Object.keys(e).length) {
      const first = ['vorname', 'nachname', 'email', 'mitteilung'].find((k) => e[k]);
      const el = document.getElementById('contact-' + first);
      if (el) el.focus();
      return;
    }
    setSending(true);
    // No backend wired yet — simulate the request so the UI is honest about state.
    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  };

  return (
    <section id="kontakt" className="section">
      <div className="container-wide split-grid" style={{
        '--split-cols': '1fr 1.1fr', '--split-gap': '80px', alignItems: 'start',
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

          <address style={{
            marginTop: 36, fontSize: 16, lineHeight: 1.8, color: 'var(--fg)',
            fontStyle: 'normal',
          }}>
            <strong style={{ fontWeight: 600 }}>{c.companyName}</strong><br />
            {c.street}<br />
            {c.city}<br />
            <a href={c.phoneHref}>{c.phone}</a><br />
            <a href={c.emailHref}>{c.email}</a>
          </address>
        </div>

        <form onSubmit={onSubmit} noValidate
          style={{
            background: 'var(--bg-muted)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 32,
          }}>
          {submitted ? (
            <div role="status" style={{ padding: '48px 0', textAlign: 'center' }}>
              <div aria-hidden="true" style={{
                width: 56, height: 56, margin: '0 auto 16px',
                background: 'var(--accent-soft)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-ink)', fontSize: 28, fontWeight: 600,
              }}>✓</div>
              <h3 style={{ margin: 0, fontWeight: 300, fontSize: 26 }}>{c.successTitle}</h3>
              <p style={{
                marginTop: 8, fontSize: 15, color: 'var(--fg-muted)',
              }}>{c.successBody}</p>
            </div>
          ) : (
            <>
              <div className="field-row" style={{ marginBottom: 14 }}>
                <ContactField id="contact-vorname" label={c.labelFirstName} autoComplete="given-name"
                  value={form.vorname} onChange={set('vorname')} onBlur={blur('vorname')}
                  error={touched.vorname && errors.vorname} />
                <ContactField id="contact-nachname" label={c.labelLastName} autoComplete="family-name"
                  value={form.nachname} onChange={set('nachname')} onBlur={blur('nachname')}
                  error={touched.nachname && errors.nachname} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <ContactField id="contact-email" label={c.labelEmail} type="email" autoComplete="email"
                  value={form.email} onChange={set('email')} onBlur={blur('email')}
                  error={touched.email && errors.email} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <ContactField id="contact-mitteilung" label={c.labelMessage} textarea
                  value={form.mitteilung} onChange={set('mitteilung')} onBlur={blur('mitteilung')}
                  error={touched.mitteilung && errors.mitteilung} />
              </div>
              <button type="submit" className="btn btn-dark" disabled={sending}
                style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
                {sending ? c.sending : c.labelSubmit} <Arrow />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.Contact = Contact;
