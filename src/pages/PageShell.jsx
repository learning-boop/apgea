import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import Emblem from '../components/Emblem'
import './Page.css'
import './pages.css'

const ease = [0.22, 1, 0.36, 1]

/**
 * Inner-page shell: navy banner with breadcrumb, title and an optional intro line; the page's own sections follow.
 * `crumbs` = [[label, to], …] between Home and the current page.
 */
export default function PageShell({ title, lede, crumbs = [], children }) {
  const { t, lang } = useLang()
  const { pathname } = useLocation()
  return (
    <main>
      <section className="pg__banner">
        <div className="pg__seal" aria-hidden="true"><Emblem size={360} spin mono title="" /></div>
        <div className="container">
          <nav className="pg__crumbs" aria-label="Breadcrumb">
            <Link to="/">{t('pg.home')}</Link>
            {crumbs.map(([label, to]) => (
              <span key={to} className="pg__crumb"><ChevronRight size={14} /><Link to={to}>{label}</Link></span>
            ))}
            <ChevronRight size={14} /><span aria-current="page">{title}</span>
          </nav>
          <motion.h1 key={`${pathname}-${lang}`} className="pg__title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            {title}
          </motion.h1>
          {lede && (
            <motion.p key={`l-${pathname}-${lang}`} className="pg__lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
              {lede}
            </motion.p>
          )}
        </div>
      </section>
      {children}
    </main>
  )
}

/** Fade-and-rise wrapper for blocks inside inner pages */
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease }} {...rest}>
      {children}
    </M>
  )
}
