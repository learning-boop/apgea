import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, MoveHorizontal } from 'lucide-react'
import { photos } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from './SafeImg'
import './Filmstrip.css'

/**
 * Gallery as a film strip. On wide screens vertical scrolling pans it sideways (sticky, scroll-linked);
 * on phones and with reduced motion it is a plain swipeable row.
 */
export default function Filmstrip() {
  const { t } = useLang()
  const wrap = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const measure = () => {
      setPinned(mq.matches)
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    mq.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); mq.removeEventListener('change', measure); window.removeEventListener('resize', measure) }
  }, [])

  // Progress through the pinned section, measured live (the section's height changes once pinned)
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, (y) => {
    const el = wrap.current
    if (!el) return 0
    const start = el.getBoundingClientRect().top + window.scrollY
    const len = el.offsetHeight - window.innerHeight
    return len > 0 ? Math.min(1, Math.max(0, (y - start) / len)) : 0
  })
  const smooth = useSpring(progress, { stiffness: 90, damping: 24, restDelta: 0.001 })
  const x = useTransform(smooth, (v) => -v * dist)
  const bar = smooth

  return (
    <section
      className={`fs ${pinned ? 'fs--pinned' : ''}`}
      ref={wrap}
      style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}
      aria-labelledby="fs-title"
    >
      <div className="fs__sticky">
        <div className="container fs__head">
          <div>
            <p className="eyebrow eyebrow--light">{t('gal.eyebrow')}</p>
            <h2 id="fs-title" className="fs__title">{t('gal.title')}</h2>
          </div>
          <div className="fs__head-r">
            <span className="fs__hint"><MoveHorizontal size={16} /> {t('gal.drag')}</span>
            <Link to="/gallery" className="btn btn--white">{t('gal.all')} <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="fs__viewport">
          <motion.ul className="fs__track" ref={track} style={pinned ? { x } : undefined}>
            {photos.map((src, i) => (
              <li key={src} className={`fs__frame ${i % 3 === 1 ? 'fs__frame--tall' : ''}`}>
                <Link to="/gallery">
                  <SafeImg src={src} alt={`APGEA activity photo ${i + 1}`} loading="lazy" />
                  <span className="fs__no en">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {pinned && <div className="container"><div className="fs__bar"><motion.span style={{ scaleX: bar }} /></div></div>}
      </div>
    </section>
  )
}
