import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Calendar, Clock, Download, FileText, MapPin, Newspaper, Play, X } from 'lucide-react'
import { news, events, gos, org, newsImages } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from './SafeImg'
import './Updates.css'

// YouTube videos from the association's channel (title shown is generic until real titles are added)
const videos = ['dkb6ILgyzpU', 'Q1Ltf7IiOmk']

const ease = [0.22, 1, 0.36, 1]
const filters = [
  { key: 'all', label: 'up.all' },
  { key: 'news', label: 'up.news', icon: Newspaper },
  { key: 'event', label: 'up.events', icon: Calendar },
  { key: 'go', label: 'up.gos', icon: FileText },
]

/** Unfilled "[PLACEHOLDER]" entries from content.js are kept out of the public list */
const isReal = (v) => !String(typeof v === 'object' && v ? v.en : v).trim().startsWith('[')

/** Updates: filterable timeline of news, events and GOs beside a lead story, then videos that play on the page. */
export default function Updates() {
  const { t, tx, date, lang } = useLang()
  const [filter, setFilter] = useState('all')
  const [playing, setPlaying] = useState(null)
  const lead = news[0]

  // One dated feed, newest first
  const feed = useMemo(() => [
    ...news.slice(1).map((n) => ({ type: 'news', key: `n${n.id}`, date: n.date, title: n.title, tag: n.tag, readTime: n.readTime, to: `/news/${n.id}` })),
    ...events.filter((e) => isReal(e.title)).map((e) => ({ type: 'event', key: `e${e.id}`, date: e.date, title: e.title, place: e.place, to: `/activities#event-${e.id}` })),
    ...gos.filter((g) => isReal(g.title)).map((g) => ({ type: 'go', key: `g${g.id}`, date: g.date, title: g.title, dept: g.dept, file: g.file })),
  ].sort((a, b) => b.date.localeCompare(a.date)), [])
  const shown = filter === 'all' ? feed : feed.filter((f) => f.type === filter)
  const count = (k) => (k === 'all' ? feed.length : feed.filter((f) => f.type === k).length)

  // Video modal: Esc closes, page doesn't scroll behind it
  useEffect(() => {
    if (!playing) return
    const onKey = (e) => { if (e.key === 'Escape') setPlaying(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [playing])

  const typeLabel = { news: t('up.news'), event: t('up.events'), go: t('up.gos') }

  return (
    <section className="section up" id="news" aria-labelledby="up-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t('up.eyebrow')}</p>
            <h2 id="up-title" className="h2">{t('up.title')}</h2>
          </div>
          <Link to="/news" className="link-arrow">{t('news.viewAll')} <ArrowRight size={16} /></Link>
        </div>

        <div className="up__grid">
          {/* Lead story */}
          <motion.article
            className="up__lead"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
          >
            <Link to={`/news/${lead.id}`} className="up__lead-link">
              <span className="up__lead-media">
                <SafeImg src={newsImages[lead.id]} fallback="/hero/felicitation.jpg" alt="" loading="lazy" />
                <span className="up__lead-chip">{t('up.lead')} · {tx(lead.tag)}</span>
              </span>
              <span className="up__lead-body">
                <span className="up__meta">
                  <span><Calendar size={14} /> {date(lead.date)}</span>
                  <span><Clock size={14} /> {lead.readTime} {t('up.read')}</span>
                </span>
                <span key={lang} className="up__lead-title lang-fade">{tx(lead.title)}</span>
                <span className="up__lead-ex">{tx(lead.excerpt)}</span>
                <span className="up__lead-more">{t('desk.read')} <ArrowRight size={17} /></span>
              </span>
            </Link>
          </motion.article>

          {/* Filterable timeline */}
          <motion.div
            className="up__feed"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="up__filters" role="tablist" aria-label={t('up.title')}>
              {filters.map((f) => (
                <button
                  key={f.key} type="button" role="tab" aria-selected={filter === f.key}
                  className={`up__filter ${filter === f.key ? 'is-on' : ''}`} onClick={() => setFilter(f.key)}
                >
                  {filter === f.key && <motion.span layoutId="up-filter" className="up__filter-pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                  <span className="up__filter-label">{t(f.label)}</span>
                  <span className="up__filter-n en">{count(f.key)}</span>
                </button>
              ))}
            </div>

            <ol className="up__list" role="tabpanel">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((f, i) => {
                  const d = new Date(f.date)
                  const body = (
                    <>
                      <span className="up__cal en"><b>{d.getDate()}</b><small>{date(f.date, { month: 'short' })}</small><i>{d.getFullYear()}</i></span>
                      <span className="up__item-body">
                        <span className={`up__type up__type--${f.type}`}>{typeLabel[f.type]}{f.tag ? ` · ${tx(f.tag)}` : ''}</span>
                        <span className="up__item-t">{tx(f.title)}</span>
                        <span className="up__item-m">
                          {f.type === 'news' && <><Clock size={12} /> {f.readTime} {t('up.read')}</>}
                          {f.type === 'event' && <><MapPin size={12} /> {tx(f.place)}</>}
                          {f.type === 'go' && <><FileText size={12} /> {tx(f.dept)}</>}
                        </span>
                      </span>
                      {f.type === 'go' ? <Download size={18} className="up__go" aria-label={t('up.pdf')} /> : <ArrowUpRight size={18} className="up__go" />}
                    </>
                  )
                  return (
                    <motion.li
                      key={f.key} layout
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    >
                      {f.type === 'go'
                        ? <a href={f.file} className="up__item" download>{body}</a>
                        : <Link to={f.to} className="up__item">{body}</Link>}
                    </motion.li>
                  )
                })}
              </AnimatePresence>
              {shown.length === 0 && <li className="up__empty">{t('up.soon')}</li>}
            </ol>
          </motion.div>
        </div>

        {/* Videos */}
        <div className="up__videos">
          <div className="up__videos-head">
            <h3><Play size={18} /> {t('up.videos')}</h3>
            <a href={org.social.youtube} target="_blank" rel="noreferrer" className="link-arrow">{t('news.moreVideos')} <ArrowRight size={14} /></a>
          </div>
          <div className="up__vids">
            {videos.map((id, i) => (
              <motion.button
                key={id} type="button" className="up__vid" onClick={() => setPlaying(id)} aria-label={`${t('up.watch')}: ${t('up.vid')}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="up__vid-shade" />
                <span className="up__play"><Play size={22} fill="currentColor" /></span>
                <span className="up__vid-t">{t('up.vid')}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div className="up__modal" role="dialog" aria-modal="true" aria-label={t('up.vid')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)}>
            <motion.div className="up__player" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ duration: 0.35, ease }} onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&rel=0`}
                title={t('up.vid')}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
              <button type="button" className="up__close" onClick={() => setPlaying(null)} aria-label={t('up.close')}><X size={22} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
