/* eslint-disable */
/*
  Leistungen — TOM als animierter 4-Quadranten-Kreis.

  Der äussere Ring besteht aus 4 Bogen-Segmenten (je 90°). Der aktive
  Quadrant ist teal-eingefärbt, die anderen anthrazit-25. Beim ersten
  Sichtbarwerden wird der Ring im Uhrzeigersinn "gezeichnet"
  (stroke-dashoffset). Solange weder Scroll-Pin noch Hover/Klick aktiv
  ist, rotiert die Auswahl automatisch durch die vier Dimensionen.
  Beim Pin übernimmt der Scroll-Fortschritt, beim Hover/Klick der User.
*/

const TOM_QUADRANTS = [
  {
    title: 'Organisation & Governance',
    short: 'Organisation',
    sub: 'Struktur, Rollen, Steuerung.',
    body: 'Wer entscheidet, wer berichtet, wer eskaliert? Wir setzen das PMO auf, definieren Rollen und Steuergremien — bis aus einem Projekt­wust wieder eine geführte Lieferung wird.',
    items: [
      'PMO und Projekt­organisation aufsetzen',
      'Steuerung, Reporting, Eskalation',
      'Rollen und Verantwortung klären',
    ],
  },
  {
    title: 'Prozesse & Daten',
    short: 'Prozesse',
    sub: 'Methodik, Lieferung, Qualität.',
    body: 'Klassisch, hybrid oder agil — wir wählen das Vorgehen, das zu Ihrem Vorhaben passt, und bauen die Quality Gates ein, die Sie schlafen lassen.',
    items: [
      'Projektmethodik — klassisch, hybrid, agil',
      'Daten- und Prozess-Health-Checks',
      'Betriebs­übergabe und Run-Modell',
    ],
  },
  {
    title: 'People & Skills',
    short: 'People',
    sub: 'Menschen, Wissen, Befähigung.',
    body: 'Interim-Mandat, CIO-Sparring, Inhouse-Seminar — wir bringen Senior-Köpfe ins Team und transferieren Wissen, statt Abhängig­keit aufzubauen.',
    items: [
      'Interim-Management',
      'Sparring für CIOs und IT-Leitung',
      'Seminare und Inhouse-Trainings',
    ],
  },
  {
    title: 'Infrastruktur & Technologie',
    short: 'Technologie',
    sub: 'Architektur, Stack, Integration.',
    body: 'Vom Enterprise-Zielbild bis zur Plattform-Wahl: wir bauen Architekturen, die nicht nur das nächste Vorhaben tragen, sondern die fünf danach.',
    items: [
      'Enterprise- und Applikations­architektur',
      'Zielbild und Plattform-Strategie',
      'Vendor- und Tech-Stack-Reviews',
    ],
  },
];

const SERVICES = [
  { name: 'Projektleitung',  body: 'Von der Planung bis zur Betriebs­übergabe — verlässlich zum Ziel.' },
  { name: 'Health Check',    body: 'Klarheit in zwei bis vier Wochen, wenn ein Projekt wackelt.' },
  { name: 'Interim',         body: 'Verantwortung auf Zeit, mit klarem Mandat und Übergabe.' },
  { name: 'PMO',             body: 'Aufbau und Betrieb eines wirkungsvollen Portfolio-Cockpits.' },
];

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                  */
/* ------------------------------------------------------------------ */
const CX = 250, CY = 250;
const R_RING = 218;        // outer ring radius
const R_LABEL = 188;       // label baseline radius (inside the ring)
const R_ICON = 120;        // icon centre distance from middle

// quadrant index → arc angles (deg, 0 = 3 o'clock, +ve clockwise in SVG)
// 0 = top-left, 1 = top-right, 2 = bottom-right, 3 = bottom-left
const ARC_ANGLES = [
  { start: 180, end: 270 }, // TL
  { start: 270, end: 360 }, // TR
  { start: 0,   end: 90  }, // BR
  { start: 90,  end: 180 }, // BL
];

// label paths — direction chosen so the text reads outwards
// (top half: clockwise; bottom half: counter-clockwise so it's right-side-up)
function polar(angleDeg, r) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function arcPath(startDeg, endDeg, r, sweep = 1) {
  const [sx, sy] = polar(startDeg, r);
  const [ex, ey] = polar(endDeg, r);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

// One label path per quadrant. Margins (12°) so text doesn't kiss the divider.
const LABEL_PATHS = [
  // TL: read upwards along the inside of the arc — path 192° → 258°, sweep clockwise
  { id: 'lp-0', d: arcPath(192, 258, R_LABEL, 1) },
  // TR: read downwards — 282° → 348° sweep 1
  { id: 'lp-1', d: arcPath(282, 348, R_LABEL, 1) },
  // BR: bottom — to keep it readable, reverse so text is right-side-up:
  // path from 78° → 12° sweep 0 (counter-clockwise)
  { id: 'lp-2', d: arcPath(78, 12, R_LABEL, 0) },
  // BL: 168° → 102° sweep 0
  { id: 'lp-3', d: arcPath(168, 102, R_LABEL, 0) },
];

// icon centres (midpoint of each quadrant, at R_ICON)
const ICON_CENTERS = [
  polar(225, R_ICON), // TL
  polar(315, R_ICON), // TR
  polar(45,  R_ICON), // BR
  polar(135, R_ICON), // BL
];

/* ------------------------------------------------------------------ */
/*  Official ONEXIS icons — loaded via <image>. Quadrant order:       */
/*  0 Organisation, 1 Prozesse, 2 People, 3 Infrastruktur             */
/* ------------------------------------------------------------------ */
const ICON_SRCS = [
  'assets/icon-tom-organisation.svg',
  'assets/icon-tom-prozesse.svg',
  'assets/icon-tom-people.svg',
  'assets/icon-tom-infrastruktur.svg',
];
const ICON_SIZE = 78;

/* ------------------------------------------------------------------ */
/*  Diagram                                                           */
/* ------------------------------------------------------------------ */
function TOMCircle({ activeIdx, onPick, mounted }) {
  // Each arc has its own stroke-dasharray for draw-in animation
  const circumQuarter = (Math.PI * R_RING * 2) / 4; // arc length of 90°

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 560,
      margin: '0 auto',
      aspectRatio: '1 / 1',
    }}>
      <svg viewBox="0 0 500 500" width="100%" height="100%"
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          {LABEL_PATHS.map(p => (
            <path key={p.id} id={p.id} d={p.d} />
          ))}
        </defs>

        {/* divider cross — grows from centre */}
        <g
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            transform: mounted ? 'scale(1)' : 'scale(0)',
            transition: 'transform 700ms cubic-bezier(.22,.61,.36,1) 250ms',
          }}
        >
          <line x1={CX - R_RING} y1={CY} x2={CX + R_RING} y2={CY}
            stroke="var(--onexis-blau-50)" strokeWidth="1.5" />
          <line x1={CX} y1={CY - R_RING} x2={CX} y2={CY + R_RING}
            stroke="var(--onexis-blau-50)" strokeWidth="1.5" />
        </g>

        {/* arcs — base gray + active overlay */}
        {ARC_ANGLES.map((a, i) => {
          const isActive = activeIdx === i;
          return (
            <g key={i}>
              {/* base track */}
              <path
                d={arcPath(a.start + 0.3, a.end - 0.3, R_RING, 1)}
                fill="none"
                stroke="var(--onexis-anthrazit-25)"
                strokeWidth="6"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: circumQuarter,
                  strokeDashoffset: mounted ? 0 : circumQuarter,
                  transition: `stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1) ${i * 140}ms`,
                }}
              />
              {/* active overlay */}
              <path
                d={arcPath(a.start + 0.3, a.end - 0.3, R_RING, 1)}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: circumQuarter,
                  strokeDashoffset: isActive ? 0 : circumQuarter,
                  transition: 'stroke-dashoffset 600ms cubic-bezier(.22,.61,.36,1)',
                  filter: isActive ? 'drop-shadow(0 4px 12px rgba(98,189,204,.35))' : 'none',
                }}
              />
            </g>
          );
        })}

        {/* per-quadrant fill (subtle teal tint) */}
        {ARC_ANGLES.map((a, i) => {
          const isActive = activeIdx === i;
          const [sx, sy] = polar(a.start, R_RING - 4);
          const [ex, ey] = polar(a.end, R_RING - 4);
          const d = `M ${CX} ${CY} L ${sx} ${sy} A ${R_RING - 4} ${R_RING - 4} 0 0 1 ${ex} ${ey} Z`;
          return (
            <path
              key={'fill-' + i}
              d={d}
              fill="var(--accent)"
              style={{
                opacity: isActive ? 0.06 : 0,
                transition: 'opacity 500ms var(--ease-out)',
                pointerEvents: 'all',
                cursor: 'pointer',
              }}
              onMouseEnter={() => onPick(i, 'hover')}
              onClick={() => onPick(i, 'click')}
            />
          );
        })}

        {/* invisible hit-areas for inactive quadrants too */}
        {ARC_ANGLES.map((a, i) => {
          const [sx, sy] = polar(a.start, R_RING - 4);
          const [ex, ey] = polar(a.end, R_RING - 4);
          const d = `M ${CX} ${CY} L ${sx} ${sy} A ${R_RING - 4} ${R_RING - 4} 0 0 1 ${ex} ${ey} Z`;
          return (
            <path
              key={'hit-' + i}
              d={d}
              fill="transparent"
              onMouseEnter={() => onPick(i, 'hover')}
              onClick={() => onPick(i, 'click')}
              style={{ cursor: 'pointer' }}
            />
          );
        })}

        {/* labels — curved along the arcs */}
        {TOM_QUADRANTS.map((q, i) => {
          const isActive = activeIdx === i;
          return (
            <text
              key={'lbl-' + i}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 17,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.01em',
                fill: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                transition: 'fill 400ms, font-weight 400ms, opacity 600ms',
                opacity: mounted ? 1 : 0,
                transitionDelay: mounted ? `${600 + i * 90}ms` : '0ms',
                pointerEvents: 'none',
              }}
            >
              <textPath href={`#lp-${i}`} startOffset="50%" textAnchor="middle">
                {q.title}
              </textPath>
            </text>
          );
        })}

        {/* icons — one per quadrant (official ONEXIS SVGs) */}
        {ICON_CENTERS.map(([x, y], i) => {
          const isActive = activeIdx === i;
          return (
            <g
              key={'icn-' + i}
              transform={`translate(${x}, ${y})`}
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 500ms var(--ease-out)',
                transitionDelay: mounted ? `${500 + i * 90}ms` : '0ms',
                pointerEvents: 'none',
              }}
            >
              <image
                href={ICON_SRCS[i]}
                x={-ICON_SIZE / 2}
                y={-ICON_SIZE / 2}
                width={ICON_SIZE}
                height={ICON_SIZE}
                style={{
                  filter: isActive
                    ? 'none'
                    : 'grayscale(1) brightness(1.1) opacity(.55)',
                  transition: 'filter 400ms var(--ease-out)',
                }}
              />
            </g>
          );
        })}

        {/* centre badge with ONEXIS X */}
        <g
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(.4)',
            transformOrigin: `${CX}px ${CY}px`,
            transition: 'opacity 500ms, transform 700ms cubic-bezier(.22,.61,.36,1)',
            transitionDelay: '950ms',
          }}
        >
          <circle cx={CX} cy={CY} r="50" fill="var(--bg-muted)" />
          <circle cx={CX} cy={CY} r="40" fill="var(--onexis-anthrazit)" />
          <image href="assets/logo-x-negativ.svg"
            x={CX - 18} y={CY - 18} width="36" height="36" />
        </g>

      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Narration                                                         */
/* ------------------------------------------------------------------ */
function NarrationPanel({ q, idx }) {
  return (
    <div key={idx} className="tom-narration">
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        letterSpacing: '0.16em', color: 'var(--accent)', fontWeight: 600,
      }}>
        {String(idx + 1).padStart(2, '0')}&nbsp;·&nbsp;DIMENSION
      </div>
      <h3 style={{
        margin: '14px 0 12px', fontWeight: 300,
        fontSize: 'clamp(34px, 3.8vw, 50px)',
        letterSpacing: '-0.025em', lineHeight: 1.05,
      }}>
        {q.title}.
      </h3>
      <div style={{
        fontSize: 15, color: 'var(--accent)', fontWeight: 500,
      }}>{q.sub}</div>
      <p style={{
        margin: '22px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--fg)',
        maxWidth: 460,
      }}>{q.body}</p>

      <ul style={{
        listStyle: 'none', padding: 0, margin: '24px 0 0',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {q.items.map((it, i) => (
          <li key={i} style={{
            fontSize: 15, color: 'var(--fg)', lineHeight: 1.45,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <span style={{
              marginTop: 8,
              width: 5, height: 5, borderRadius: 999,
              background: 'var(--accent)', flex: '0 0 auto',
            }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */
function TOMSection() {
  const sectionRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const userOverrideRef = React.useRef(null); // null | number | 'scroll'
  const [pinned, setPinned] = React.useState(false);

  // IntersectionObserver to trigger initial draw-in
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll progress while pinned drives the active quadrant
  React.useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      const inPin = rect.top <= 0 && rect.bottom > viewport;
      setPinned(inPin);
      if (inPin && userOverrideRef.current !== 'user') {
        const step = Math.min(3, Math.floor(progress * 4));
        userOverrideRef.current = 'scroll';
        setActiveIdx(step);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Auto-cycle when not pinned AND no user override
  React.useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      if (userOverrideRef.current === 'user') return;
      if (pinned) return;
      setActiveIdx(i => (i + 1) % 4);
    }, 2800);
    return () => clearInterval(id);
  }, [mounted, pinned]);

  const pick = (i, source) => {
    userOverrideRef.current = source === 'click' ? 'user' : userOverrideRef.current;
    setActiveIdx(i);
  };
  const clearOverride = () => {
    if (userOverrideRef.current === 'user') userOverrideRef.current = null;
  };

  return (
    <>
      <section
        id="leistungen"
        ref={sectionRef}
        className="tom-scroll-section"
        style={{
          position: 'relative',
          background: 'var(--bg-muted)',
          height: 'calc(100vh + 240vh)',
        }}
      >
        <div
          ref={stickyRef}
          className="tom-sticky"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseLeave={clearOverride}
        >
          <div className="container-wide" style={{
            display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
            gap: 64, alignItems: 'center', width: '100%',
          }}>
            {/* Narration */}
            <div>
              <div className="eyebrow">Leistungen</div>
              <h2 className="h-section" style={{
                marginTop: 14, marginBottom: 32, maxWidth: 540,
              }}>
                Vier Dimensionen.<br />
                Ein Target Operating&nbsp;Model.
              </h2>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
                marginBottom: 28,
              }}>
                {TOM_QUADRANTS.map((q, i) => (
                  <button
                    key={q.title}
                    onClick={() => pick(i, 'click')}
                    onMouseEnter={() => pick(i, 'hover')}
                    style={{
                      appearance: 'none', background: 'transparent', border: 0,
                      padding: 0, cursor: 'pointer', textAlign: 'left',
                    }}>
                    <div style={{
                      height: 2,
                      background: activeIdx === i ? 'var(--accent)' : 'var(--border-strong)',
                      transition: 'background 300ms var(--ease-out)',
                    }} />
                    <div style={{
                      marginTop: 8,
                      fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontWeight: 600,
                      color: activeIdx === i ? 'var(--fg)' : 'var(--fg-muted)',
                      transition: 'color 300ms',
                    }}>{q.short}</div>
                  </button>
                ))}
              </div>

              <NarrationPanel q={TOM_QUADRANTS[activeIdx]} idx={activeIdx} />
            </div>

            {/* Diagram */}
            <div>
              <TOMCircle
                activeIdx={activeIdx}
                onPick={pick}
                mounted={mounted}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service-Zeile nach der gepinnten Sektion */}
      <section className="section muted" style={{
        paddingTop: 0, paddingBottom: 120, background: 'var(--bg-muted)',
        marginTop: -1,
      }}>
        <div className="container-wide">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {SERVICES.map((s, i) => (
              <div key={s.name} style={{
                padding: '32px 24px',
                borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
              }}>
                <h4 style={{
                  margin: 0, fontWeight: 500, fontSize: 20,
                  letterSpacing: '-0.005em',
                }}>{s.name}</h4>
                <p style={{
                  margin: '10px 0 0', fontSize: 15, lineHeight: 1.55,
                  color: 'var(--fg-muted)',
                }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.TOMSection = TOMSection;
