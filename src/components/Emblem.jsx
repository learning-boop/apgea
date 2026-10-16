import { useId } from 'react'

const TEETH = 18
const FIGURES = 16

/**
 * APGEA seal.
 * Default: the official logo artwork (public/brand/apgea-logo.webp). It never spins — that would rotate the lettering.
 * `mono`: a single-colour SVG line version (currentColor) for decorative watermarks; `spin` slowly turns its cog.
 */
export default function Emblem({ size = 72, spin = false, mono = false, className = '', title = 'APGEA emblem' }) {
  const id = useId().replace(/:/g, '')
  const ring = `ring-${id}`

  if (!mono) {
    return (
      <img
        src="/brand/apgea-logo.webp" width={size} height={size} draggable="false"
        alt={title || ''} aria-hidden={title ? undefined : true}
        className={`emblem emblem--logo ${className}`}
      />
    )
  }
  // `mono` draws a single-colour line version (currentColor) for watermarks on dark backgrounds
  const red = mono ? 'currentColor' : 'var(--red, #C8102E)'
  const paper = mono ? 'none' : '#fff'
  const ink = mono ? 'currentColor' : '#1C1F26'

  return (
    <svg
      width={size} height={size} viewBox="0 0 200 200" role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}
      className={`emblem ${spin ? 'emblem--spin' : ''} ${className}`}
    >
      <defs>
        {/* Starts at the bottom, runs clockwise over the top so the lettering reads like the original seal */}
        <path id={ring} d="M100,166 a66,66 0 1,1 0.01,0" />
      </defs>

      {/* Cog */}
      <g className="emblem__cog">
        {Array.from({ length: TEETH }, (_, i) => (
          <rect key={i} x="92" y="1" width="16" height="16" rx="1.5" fill={red} transform={`rotate(${(360 / TEETH) * i} 100 100)`} />
        ))}
        {mono
          ? <circle cx="100" cy="100" r="84.5" fill="none" stroke={red} strokeWidth="7" />
          : <circle cx="100" cy="100" r="88" fill={red} />}
      </g>
      <circle cx="100" cy="100" r="81" fill={paper} />

      {/* Ring lettering */}
      <text fontFamily="Manrope, Arial, sans-serif" fontWeight="800" fontSize="13.5" fill={ink} letterSpacing="0.4">
        <textPath href={`#${ring}`} startOffset="5.5%" textLength="353" lengthAdjust="spacingAndGlyphs">
          ANDHRA PRADESH GOVT. EMPLOYEES ASSOCIATION
        </textPath>
      </text>

      {/* Stars */}
      {[-11, 0, 11].map((a) => (
        <path
          key={a}
          d="M0,-5 L1.47,-1.55 5,-1.55 2.2,0.6 3.1,4.3 0,2.1 -3.1,4.3 -2.2,0.6 -5,-1.55 -1.47,-1.55Z"
          fill={red}
          transform={`rotate(${a} 100 100) translate(100 171)`}
        />
      ))}

      {/* Inner ring */}
      <circle cx="100" cy="100" r="54" fill={paper} stroke={red} strokeWidth="5" />

      {/* Linked figures, heads toward the centre, arms raised to their neighbours */}
      <g className="emblem__people" stroke={red} strokeWidth="2.6" strokeLinecap="round" fill="none">
        {Array.from({ length: FIGURES }, (_, i) => (
          <g key={i} transform={`rotate(${(360 / FIGURES) * i} 100 100)`}>
            <circle cx="100" cy="69" r="3" fill={red} stroke="none" />
            <path d="M100,65 V55 M100,55 L97,48.5 M100,55 L103,48.5 M100,63 L93.5,68.5 M100,63 L106.5,68.5" />
          </g>
        ))}
      </g>

      <text x="100" y="106.5" textAnchor="middle" fontFamily="Manrope, Arial, sans-serif" fontWeight="800" fontSize="16" fill={red} textLength="50" lengthAdjust="spacingAndGlyphs">
        APGEA
      </text>
    </svg>
  )
}
