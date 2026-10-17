import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Clock, Search } from 'lucide-react'
import { news, archive, newsImages } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from '../components/SafeImg'
import PageShell, { Reveal } from './PageShell'

const heroFallbacks = ['/hero/felicitation.jpg', '/hero/meeting.jpg', '/hero/cm-meeting.jpg']
const ease = [0.22, 1, 0.36, 1]

export default function News() {
  const { t, tx, date } = useLang()
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const match = (v) => !needle || `${v.en} ${v.te}`.toLowerCase().includes(needle)

  const latest = news.filter((n) => match(n.title) || match(n.excerpt))
  // Archive entries that aren't already among the dated statements
  const older = useMemo(() => archive.filter((a) => a.to === '/news'), [])
  const olderShown = older.filter(match)

  return (
    <PageShell title={t('pg.news')} lede={t('nw.lede')}>
      <section className="section">
        <div className="container">
          <label className="ip-search">
            <Search size={18} />
            <span className="sr-only">{t('nw.search')}</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('nw.search')} />
          </label>

          <h2 className="ip-h2">{t('nw.latest')}</h2>
          <div className="ip-news">
            <AnimatePresence mode="popLayout">
              {latest.map((n, i) => (
                <motion.article key={n.id} layout className="ip-news__card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, delay: i * 0.05, ease }}>
                  <Link to={`/news/${n.id}`} className="ip-news__link">
                    <span className="ip-news__img">
                      <SafeImg src={newsImages[n.id] || heroFallbacks[i % 3]} fallback={heroFallbacks[i % 3]} alt="" loading="lazy" />
                      <span className="ip-news__tag">{tx(n.tag)}</span>
                    </span>
                    <span className="ip-news__body">
                      <span className="ip-news__meta"><span><Calendar size={13} /> {date(n.date)}</span><span><Clock size={13} /> {n.readTime} {t('up.read')}</span></span>
                      <span className="ip-news__title">{tx(n.title)}</span>
                      <span className="ip-news__ex">{tx(n.excerpt)}</span>
                    </span>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          {latest.length === 0 && olderShown.length === 0 && <p className="ip-empty">{t('nw.none')}</p>}

          {olderShown.length > 0 && (
            <>
              <h2 className="ip-h2">{t('nw.archive')}</h2>
              <ol className="ip-archive">
                {olderShown.map((a, i) => (
                  <Reveal as="li" key={a.en} delay={Math.min(i, 6) * 0.04}>
                    <span className="ip-archive__n en">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ip-archive__t">{tx(a)}</span>
                    <ArrowUpRight size={18} className="ip-archive__go" aria-hidden="true" />
                  </Reveal>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </PageShell>
  )
}
