import React from 'react'
import CONTENT from '../content/de.js'

const TOM_QUADRANTS = CONTENT.tom.quadrants
const SERVICES = CONTENT.tom.services

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                  */
/* ------------------------------------------------------------------ */
const CX = 250, CY = 250
const R_RING = 218
const R_LABEL = 188
const R_ICON = 120

const ARC_ANGLES = [
  { start: 180, end: 270 },
  { start: 270, end: 360 },
  { start: 0,   end: 90  },
  { start: 90,  end: 180 },
]

function polar(angleDeg, r) {
  const a = (angleDeg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function arcPath(startDeg, endDeg, r, sweep = 1) {
  const [sx, sy] = polar(startDeg, r)
  const [ex, ey] = polar(endDeg, r)
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${ex.toFixed(2)} ${ey.toFixed(2)}`
}

const LABEL_PATHS = [
  { id: 'lp-0', d: arcPath(192, 258, R_LABEL, 1) },
  { id: 'lp-1', d: arcPath(282, 348, R_LABEL, 1) },
  { id: 'lp-2', d: arcPath(78, 12, R_LABEL, 0) },
  { id: 'lp-3', d: arcPath(168, 102, R_LABEL, 0) },
]

const ICON_CENTERS = [
  polar(225, R_ICON),
  polar(315, R_ICON),
  polar(45,  R_ICON),
  polar(135, R_ICON),
]

const ICON_SRCS = [
  '/assets/icon-tom-organisation.svg',
  '/assets/icon-tom-prozesse.svg',
  '/assets/icon-tom-people.svg',
  '/assets/icon-tom-infrastruktur.svg',
]
const ICON_SIZE = 78

/* ------------------------------------------------------------------ */
/*  Diagram — aria-hidden; keyboard control lives in the tab buttons  */
/* ------------------------------------------------------------------ */
function TOMCircle({ activeIdx, onPick, mounted, prefersReduced }) {
  const dur = (base) => prefersReduced ? '0ms' : base
  const circumQuarter = (Math.PI * R_RING * 2) / 4

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 560,
      margin: '0 auto',
      aspectRatio: '1 / 1',
    }}>
      {/* aria-hidden: keyboard users control TOM via the tablist above */}
      <svg viewBox="0 0 500 500" width="100%" height="100%"
        aria-hidden="true"
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          {LABEL_PATHS.map(p => (
            <path key={p.id} id={p.id} d={p.d} />
          ))}
        </defs>

        <g style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: (mounted || prefersReduced) ? 'scale(1)' : 'scale(0)',
          transition: prefersReduced ? 'none' : 'transform 700ms cubic-bezier(.22,.61,.36,1) 250ms',
        }}>
          <line x1={CX - R_RING} y1={CY} x2={CX + R_RING} y2={CY}
            stroke="var(--onexis-blau-50)" strokeWidth="1.5" />
          <line x1={CX} y1={CY - R_RING} x2={CX} y2={CY + R_RING}
            stroke="var(--onexis-blau-50)" strokeWidth="1.5" />
        </g>

        {ARC_ANGLES.map((a, i) => {
          const isActive = activeIdx === i
          return (
            <g key={i}>
              <path
                d={arcPath(a.start + 0.3, a.end - 0.3, R_RING, 1)}
                fill="none"
                stroke="var(--onexis-anthrazit-25)"
                strokeWidth="6"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: circumQuarter,
                  strokeDashoffset: (mounted || prefersReduced) ? 0 : circumQuarter,
                  transition: prefersReduced ? 'none' : `stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1) ${i * 140}ms`,
                }}
              />
              <path
                d={arcPath(a.start + 0.3, a.end - 0.3, R_RING, 1)}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: circumQuarter,
                  strokeDashoffset: isActive ? 0 : circumQuarter,
                  transition: prefersReduced ? 'none' : 'stroke-dashoffset 600ms cubic-bezier(.22,.61,.36,1)',
                  filter: isActive ? 'drop-shadow(0 4px 12px rgba(98,189,204,.35))' : 'none',
                }}
              />
            </g>
          )
        })}

        {ARC_ANGLES.map((a, i) => {
          const isActive = activeIdx === i
          const [sx, sy] = polar(a.start, R_RING - 4)
          const [ex, ey] = polar(a.end, R_RING - 4)
          const d = `M ${CX} ${CY} L ${sx} ${sy} A ${R_RING - 4} ${R_RING - 4} 0 0 1 ${ex} ${ey} Z`
          return (
            <path
              key={'fill-' + i}
              d={d}
              fill="var(--accent)"
              style={{
                opacity: isActive ? 0.06 : 0,
                transition: prefersReduced ? 'none' : 'opacity 500ms var(--ease-out)',
                pointerEvents: 'all',
                cursor: 'pointer',
              }}
              onMouseEnter={() => onPick(i, 'hover')}
              onClick={() => onPick(i, 'click')}
            />
          )
        })}

        {ARC_ANGLES.map((a, i) => {
          const [sx, sy] = polar(a.start, R_RING - 4)
          const [ex, ey] = polar(a.end, R_RING - 4)
          const d = `M ${CX} ${CY} L ${sx} ${sy} A ${R_RING - 4} ${R_RING - 4} 0 0 1 ${ex} ${ey} Z`
          return (
            <path
              key={'hit-' + i}
              d={d}
              fill="transparent"
              onMouseEnter={() => onPick(i, 'hover')}
              onClick={() => onPick(i, 'click')}
              style={{ cursor: 'pointer' }}
            />
          )
        })}

        {TOM_QUADRANTS.map((q, i) => {
          const isActive = activeIdx === i
          return (
            <text
              key={'lbl-' + i}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 17,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.01em',
                fill: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                transition: prefersReduced ? 'none' : 'fill 400ms, font-weight 400ms, opacity 600ms',
                opacity: (mounted || prefersReduced) ? 1 : 0,
                transitionDelay: (mounted && !prefersReduced) ? `${600 + i * 90}ms` : '0ms',
                pointerEvents: 'none',
              }}
            >
              <textPath href={`#lp-${i}`} startOffset="50%" textAnchor="middle">
                {q.title}
              </textPath>
            </text>
          )
        })}

        {ICON_CENTERS.map(([x, y], i) => {
          const isActive = activeIdx === i
          return (
            <g
              key={'icn-' + i}
              transform={`translate(${x}, ${y})`}
              style={{
                opacity: (mounted || prefersReduced) ? 1 : 0,
                transition: prefersReduced ? 'none' : 'opacity 500ms var(--ease-out)',
                transitionDelay: (mounted && !prefersReduced) ? `${500 + i * 90}ms` : '0ms',
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
                  transition: prefersReduced ? 'none' : 'filter 400ms var(--ease-out)',
                }}
              />
            </g>
          )
        })}

        <g style={{
          opacity: (mounted || prefersReduced) ? 1 : 0,
          transform: (mounted || prefersReduced) ? 'scale(1)' : 'scale(.4)',
          transformOrigin: `${CX}px ${CY}px`,
          transition: prefersReduced ? 'none' : 'opacity 500ms, transform 700ms cubic-bezier(.22,.61,.36,1)',
          transitionDelay: prefersReduced ? '0ms' : '950ms',
        }}>
          <circle cx={CX} cy={CY} r="50" fill="var(--bg-muted)" />
          <circle cx={CX} cy={CY} r="40" fill="var(--onexis-anthrazit)" />
          <image href="/assets/logo-x-negativ.svg"
            x={CX - 18} y={CY - 18} width="36" height="36" />
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Narration panel                                                   */
/* ------------------------------------------------------------------ */
function NarrationPanel({ q, idx, tabId }) {
  return (
    <div
      role="tabpanel"
      aria-labelledby={tabId}
      className="tom-narration"
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        letterSpacing: '0.16em', color: 'var(--accent-ink)', fontWeight: 600,
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
        fontSize: 15, color: 'var(--accent-ink)', fontWeight: 500,
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
  )
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */
function TOMSection() {
  const prefersReduced = React.useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current

  const sectionRef = React.useRef(null)
  const [activeIdx, setActiveIdx] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const userOverrideRef = React.useRef(null)
  const [pinned, setPinned] = React.useState(false)

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (prefersReduced) { setMounted(true); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { setMounted(true); io.disconnect() }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReduced])

  React.useEffect(() => {
    let ticking = false
    const measure = () => {
      ticking = false
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const total = rect.height - viewport
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, total)))
      const inPin = rect.top <= 0 && rect.bottom > viewport
      setPinned(inPin)
      if (inPin && userOverrideRef.current !== 'user') {
        const step = Math.min(3, Math.floor(progress * 4))
        userOverrideRef.current = 'scroll'
        setActiveIdx(step)
      }
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  React.useEffect(() => {
    if (!mounted || prefersReduced) return
    const id = setInterval(() => {
      if (userOverrideRef.current === 'user') return
      if (pinned) return
      setActiveIdx(i => (i + 1) % 4)
    }, 2800)
    return () => clearInterval(id)
  }, [mounted, pinned, prefersReduced])

  const pick = (i, source) => {
    userOverrideRef.current = source === 'click' ? 'user' : userOverrideRef.current
    setActiveIdx(i)
  }
  const clearOverride = () => {
    if (userOverrideRef.current === 'user') userOverrideRef.current = null
  }

  const handleTabKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') {
      const next = (i + 1) % 4
      pick(next, 'click')
      document.getElementById(`tom-tab-${next}`)?.focus()
    } else if (e.key === 'ArrowLeft') {
      const prev = (i + 3) % 4
      pick(prev, 'click')
      document.getElementById(`tom-tab-${prev}`)?.focus()
    }
  }

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
            <div>
              <div className="eyebrow">{CONTENT.tom.eyebrow}</div>
              <h2 className="h-section" style={{
                marginTop: 14, marginBottom: 32, maxWidth: 540,
              }}>
                {CONTENT.tom.heading[0]}<br />
                {CONTENT.tom.heading[1]}
              </h2>

              {/* Tablist — the primary keyboard control for the TOM diagram */}
              <div
                role="tablist"
                aria-label="TOM-Dimensionen"
                style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
                  marginBottom: 28,
                }}
              >
                {TOM_QUADRANTS.map((q, i) => (
                  <button
                    key={q.title}
                    id={`tom-tab-${i}`}
                    role="tab"
                    aria-selected={activeIdx === i}
                    tabIndex={activeIdx === i ? 0 : -1}
                    onClick={() => pick(i, 'click')}
                    onMouseEnter={() => pick(i, 'hover')}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    style={{
                      appearance: 'none', background: 'transparent', border: 0,
                      padding: 0, cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{
                      height: 2,
                      background: activeIdx === i ? 'var(--accent)' : 'var(--border-strong)',
                      transition: prefersReduced ? 'none' : 'background 300ms var(--ease-out)',
                    }} />
                    <div style={{
                      marginTop: 8,
                      fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontWeight: 600,
                      color: activeIdx === i ? 'var(--fg)' : 'var(--fg-muted)',
                      transition: prefersReduced ? 'none' : 'color 300ms',
                    }}>{q.short}</div>
                  </button>
                ))}
              </div>

              <NarrationPanel
                q={TOM_QUADRANTS[activeIdx]}
                idx={activeIdx}
                tabId={`tom-tab-${activeIdx}`}
              />
            </div>

            <div>
              <TOMCircle
                activeIdx={activeIdx}
                onPick={pick}
                mounted={mounted}
                prefersReduced={prefersReduced}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section muted" style={{
        paddingTop: 0, paddingBottom: 120, background: 'var(--bg-muted)',
        marginTop: -1,
      }}>
        <div className="container-wide">
          <div className="services-row">
            {SERVICES.map((s) => (
              <div key={s.name} className="service-cell">
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
  )
}

export default TOMSection
