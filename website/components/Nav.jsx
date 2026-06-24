/* eslint-disable */
function Nav() {
  const c = window.CONTENT.nav;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel on Escape and when the viewport grows to desktop.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth > 820) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: solid ? 'rgba(255,255,255,.9)' : 'transparent',
      backdropFilter: solid ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
      borderBottom: solid ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background 200ms, border-color 200ms',
    }}>
      <div className="container-wide" style={{
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" aria-label="ONEXIS — Startseite" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/logo.svg" alt="ONEXIS" style={{ height: 28 }} />
        </a>

        {/* Desktop navigation */}
        <nav className="nav-desktop" aria-label="Hauptnavigation">
          {c.links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{
              fontSize: 14, color: 'var(--fg)', fontWeight: 500, textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <a href="#kontakt" className="btn btn-dark" style={{ padding: '10px 18px' }}>
            {c.cta}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open
              ? <path d="M5 5l14 14M19 5L5 19" />
              : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav id="mobile-nav" className="nav-panel" aria-label="Hauptnavigation">
          <div className="container-wide" style={{ display: 'flex', flexDirection: 'column' }}>
            {c.links.map(l => (
              <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#kontakt" className="btn btn-dark" onClick={() => setOpen(false)}>
              {c.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
window.Nav = Nav;
