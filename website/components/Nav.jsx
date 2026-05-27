/* eslint-disable */
function Nav() {
  const c = window.CONTENT.nav;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: scrolled ? 'rgba(255,255,255,.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background 200ms, border-color 200ms',
    }}>
      <div className="container-wide" style={{
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/logo.svg" alt="ONEXIS" style={{ height: 28 }} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {c.links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 14, color: 'var(--fg)', fontWeight: 500, textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <a href="#kontakt" className="btn btn-dark" style={{ padding: '10px 18px' }}>
            {c.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
window.Nav = Nav;
