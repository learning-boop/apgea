import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  AlertCircle, ArrowRight, Briefcase, Building2, ChevronDown, Eye, HeartHandshake, Info, LogIn, Mail, Menu, Phone, ShieldCheck, Target, X,
} from 'lucide-react'
import { org, nav, news } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from './Emblem'
import LangToggle from './LangToggle'
import './Header.css'

const ease = [0.22, 1, 0.36, 1]
const icons = {
  '/about': Info, '/about#vision': Eye, '/about#mission': Target,
  '/affiliated#vwsea': Building2, '/affiliated#apresa': HeartHandshake,
  '/services': Briefcase, '/services#rti': ShieldCheck, '/grievance': AlertCircle,
}

/* ---------- Top bar: news ticker + contact, login, language ---------- */
function TopBar() {
  const { t, tx } = useLang()
  const headlines = [...news, ...news]
  return (
    <div className="tb">
      <div className="container tb__in">
        <div className="tb__news" aria-label={t('hdr.latest')}>
          <span className="tb__badge"><span className="tb__pulse" aria-hidden="true" />{t('hdr.latest')}</span>
          <div className="tb__viewport">
            <div className="tb__track">
              {headlines.map((n, i) => (
                <Link key={`${n.id}-${i}`} to={`/news/${n.id}`} className="tb__item">{tx(n.title)}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="tb__right">
          <a href={`tel:${org.phonesIntl[0]}`} className="tb__link en"><Phone size={13} /> {org.phones[0]}</a>
          <a href={`mailto:${org.emails[0]}`} className="tb__link tb__mail en"><Mail size={13} /> {org.emails[0]}</a>
          <Link to="/login" className="tb__login"><LogIn size={13} /> {t('nav.login')}</Link>
          <LangToggle id="top" />
        </div>
      </div>
    </div>
  )
}

/* ---------- Masthead: the official letterhead ---------- */
function Masthead() {
  return (
    <div className="mast">
      <div className="mast__shine" aria-hidden="true" />
      <div className="container mast__in">
        <motion.span className="mast__seal-wrap" initial={{ opacity: 0, rotate: -120, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1.1, ease }}>
          <Emblem size={104} spin className="mast__seal" />
        </motion.span>

        <Link to="/" className="mast__brand" aria-label="APGEA home">
          <span className="mast__tags" lang="te">
            <span>{org.taglineLeft}</span>
            <span>{org.taglineRight}</span>
          </span>
          <motion.span className="mast__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            <span className="mast__line mast__line--1">Andhra Pradesh</span>
            <span className="mast__line mast__line--2">Govt. Employees Association</span>
          </motion.span>
          <span className="mast__meta">
            <span className="mast__regd">{org.regd}</span>
            <span className="mast__rec">{org.recognition}</span>
            <span className="mast__mem">{org.membership}</span>
          </span>
        </Link>

        <motion.span className="mast__seal-wrap mast__seal-wrap--r" initial={{ opacity: 0, rotate: 120, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1.1, ease }}>
          <Emblem size={104} spin className="mast__seal" />
        </motion.span>
      </div>
    </div>
  )
}

/* ---------- Floating nav capsule ---------- */
function NavBar({ onOpenMenu }) {
  const { t, tx } = useLang()
  const { pathname } = useLocation()
  const [stuck, setStuck] = useState(false)
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 240)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(null); setHover(null) }, [pathname])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (item) => (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to))

  return (
    <nav className={`nav ${stuck ? 'nav--stuck' : ''}`} aria-label="Primary">
      <div className="container">
        <div className="nav__cap">
          <Link to="/" className="nav__brand nav__brand--m" aria-label="APGEA home">
            <span className="nav__brand-seal"><Emblem size={36} spin title="" /></span>
            <span className="nav__brand-name">APGEA</span>
          </Link>
          <AnimatePresence initial={false}>
            {stuck && (
              <motion.span
                className="nav__brand-wrap"
                initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                <Link to="/" className="nav__brand" aria-label="APGEA home">
                  <span className="nav__brand-seal"><Emblem size={38} spin title="" /></span>
                  <span className="nav__brand-name">APGEA</span>
                </Link>
              </motion.span>
            )}
          </AnimatePresence>

          <ul className="nav__list" onMouseLeave={() => { setHover(null); setOpen(null) }}>
            {nav.map((item, i) => (
              <li
                key={item.to}
                className="nav__item"
                onMouseEnter={() => { setHover(i); setOpen(item.children ? i : null) }}
                onFocus={() => { setHover(i); setOpen(item.children ? i : null) }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={`nav__link ${isActive(item) ? 'is-active' : ''}`}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? open === i : undefined}
                >
                  {hover === i && !isActive(item) && (
                    <motion.span layoutId="nav-hover" className="nav__hover" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                  )}
                  <span className="nav__label">{tx(item.label)}</span>
                  {item.children && <ChevronDown size={15} className="nav__chev" />}
                </NavLink>

                <AnimatePresence>
                  {item.children && open === i && (
                    <motion.div
                      className="nav__drop"
                      initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      {item.children.map((c, j) => {
                        const Icon = icons[c.to] || Info
                        return (
                          <motion.div key={c.to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.05 + j * 0.04 }}>
                            <Link to={c.to} className="nav__drop-item">
                              <span className="nav__drop-icon"><Icon size={20} /></span>
                              <span className="nav__drop-txt">
                                <b>{tx(c.label)}</b>
                                {c.desc && <small>{tx(c.desc)}</small>}
                              </span>
                              <ArrowRight size={16} className="nav__drop-go" />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="nav__right">
            <span className="nav__lang"><LangToggle id="nav" showIcon={false} /></span>
            <Link to="/enroll" className="nav__cta btn--shine">
              <span>{t('nav.enroll')}</span>
              <span className="nav__cta-arrow"><ArrowRight size={16} /></span>
            </Link>
            <button className="nav__burger" aria-label={t('nav.openMenu')} onClick={onOpenMenu}>
              <Menu size={22} />
            </button>
          </div>

          <span className="nav__track" aria-hidden="true"><motion.span style={{ scaleX: progress }} /></span>
        </div>
      </div>
    </nav>
  )
}

/* ---------- Full-screen mobile menu ---------- */
function MobileMenu({ open, onClose }) {
  const { t, tx } = useLang()
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setExpanded(null)
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mnav" role="dialog" aria-modal="true" aria-label={t('nav.menu')}
          initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mnav__seal" aria-hidden="true"><Emblem size={420} spin mono title="" /></div>
          <div className="mnav__head">
            <Link to="/" className="mnav__brand" onClick={onClose}>
              <span className="nav__brand-seal"><Emblem size={42} title="" /></span>
              <span className="nav__brand-name">APGEA</span>
            </Link>
            <button className="mnav__close" aria-label={t('nav.closeMenu')} onClick={onClose}><X size={24} /></button>
          </div>

          <div className="mnav__lang"><LangToggle id="drawer" /></div>

          <ul className="mnav__list">
            {nav.map((item, i) => (
              <motion.li key={item.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}>
                <div className="mnav__row">
                  <Link to={item.to} onClick={onClose} className="mnav__link">
                    <span className="mnav__n en">{String(i + 1).padStart(2, '0')}</span>{tx(item.label)}
                  </Link>
                  {item.children && (
                    <button className={`mnav__exp ${expanded === i ? 'is-open' : ''}`} aria-label={tx(item.label)} aria-expanded={expanded === i} onClick={() => setExpanded(expanded === i ? null : i)}>
                      <ChevronDown size={20} />
                    </button>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {item.children && expanded === i && (
                    <motion.ul className="mnav__sub" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                      {item.children.map((c) => <li key={c.to}><Link to={c.to} onClick={onClose}>{tx(c.label)}</Link></li>)}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
            <motion.li initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + nav.length * 0.06, ease }}>
              <div className="mnav__row"><Link to="/login" onClick={onClose} className="mnav__link"><span className="mnav__n en"><LogIn size={14} /></span>{t('nav.login')}</Link></div>
            </motion.li>
          </ul>

          <motion.div className="mnav__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link to="/enroll" className="btn btn--red btn--shine mnav__cta" onClick={onClose}>{t('nav.enroll')} <ArrowRight size={16} /></Link>
            <div className="mnav__contact en">
              {org.phones.map((p, i) => <a key={p} href={`tel:${org.phonesIntl[i]}`}><Phone size={14} /> {p}</a>)}
              <a href={`mailto:${org.emails[1]}`}><Mail size={14} /> {org.emails[1]}</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [menu, setMenu] = useState(false)
  return (
    <>
      <header className="hdr">
        <TopBar />
        <Masthead />
      </header>
      <NavBar onOpenMenu={() => setMenu(true)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  )
}
