import { Link, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { news, bearers } from '../data/content'
import { useLang } from '../i18n/LangContext'
import './Page.css'

/**
 * Generic inner-page shell with a navy banner.
 * Each route passes a strings key for its title; content for the inner pages goes inside <PageBody>.
 */
export default function Page({ titleKey, children }) {
  const { t, tx, lang, date } = useLang()
  const { pathname } = useLocation()
  const params = useParams()
  const article = params.id ? news.find((n) => String(n.id) === params.id) : null
  const title = t(titleKey)
  const heading = article ? tx(article.title) : title

  return (
    <main>
      <section className="pg__banner">
        <div className="container">
          <nav className="pg__crumbs" aria-label="Breadcrumb">
            <Link to="/">{t('pg.home')}</Link><ChevronRight size={14} /><span>{title}</span>
          </nav>
          <motion.h1 key={`${pathname}-${lang}`} className="pg__title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {heading}
          </motion.h1>
        </div>
      </section>
      <section className="section">
        <div className="container pg__body">
          {article ? (
            <article className="pg__article">
              <p className="pg__meta">{date(article.date)} · {article.readTime} {t('pg.min')} · {tx(bearers[0].name)}</p>
              <p>{tx(article.excerpt)}</p>
              <p className="pg__placeholder en">[ARTICLE BODY — load from CMS / API for news id {article.id}]</p>
            </article>
          ) : children || (
            <p className="pg__placeholder en">[{t(titleKey).toUpperCase()} PAGE CONTENT — route: {pathname}]</p>
          )}
        </div>
      </section>
    </main>
  )
}
