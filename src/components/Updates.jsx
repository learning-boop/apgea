import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Download, FileText, MapPin, Play } from 'lucide-react'
import { news, events, gos, org, newsImages } from '../data/content'
import { spotlight } from '../hooks/useReveal'
import { useLang } from '../i18n/LangContext'
import SafeImg from './SafeImg'
import './Updates.css'

// Replace with real YouTube video IDs from the association's channel.
const videos = [
  { id: 'dkb6ILgyzpU', title: '[VIDEO TITLE]' },
  { id: 'Q1Ltf7IiOmk', title: '[VIDEO TITLE]' },
]

const ease = [0.22, 1, 0.36, 1]
const tile = (i) => ({
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, delay: i * 0.08, ease },
})

/** Bento grid: lead story, events, GOs and videos at a glance (replaces the old tabs). */
export default function Updates() {
  const { t, tx, date } = useLang()
  const lead = news[0]
  const short = { day: '2-digit', month: 'short', year: 'numeric' }

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

        <div className="bento">
          {/* Lead story */}
          <motion.article className="bento__tile bento__lead" {...tile(0)}>
            <Link to={`/news/${lead.id}`} className="bento__lead-link">
              <SafeImg src={newsImages[lead.id]} alt="" loading="lazy" className="bento__lead-img" />
              <span className="bento__lead-shade" />
              <span className="bento__chip">{t('up.latest')} · {tx(lead.tag)}</span>
              <span className="bento__lead-body">
                <span className="bento__date"><Calendar size={13} /> {date(lead.date)}</span>
                <span className="bento__lead-title">{tx(lead.title)}</span>
                <span className="bento__lead-ex">{tx(lead.excerpt)}</span>
                <span className="bento__more">{t('desk.read')} <ArrowRight size={16} /></span>
              </span>
            </Link>
          </motion.article>

          {/* Events */}
          <motion.article className="bento__tile bento__events spot" onPointerMove={spotlight} {...tile(1)}>
            <h3 className="bento__h"><Calendar size={18} /> {t('up.events')}</h3>
            <ul>
              {events.map((e) => (
                <li key={e.id}>
                  <Link to={`/activities#event-${e.id}`} className="bento__ev">
                    <span className="bento__cal en"><b>{new Date(e.date).getDate()}</b><small>{date(e.date, { month: 'short' })}</small></span>
                    <span className="bento__ev-body">
                      <span className="bento__ev-t">{tx(e.title)}</span>
                      <span className="bento__meta"><MapPin size={12} /> {tx(e.place)} · {new Date(e.date).getFullYear()}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/activities" className="link-arrow">{t('news.all')} <ArrowRight size={14} /></Link>
          </motion.article>

          {/* GOs */}
          <motion.article className="bento__tile bento__gos" {...tile(2)}>
            <h3 className="bento__h"><FileText size={18} /> {t('up.gos')}</h3>
            <ul>
              {gos.map((g) => (
                <li key={g.id}>
                  <a href={g.file} className="bento__go" download>
                    <span className="bento__pdf en">PDF</span>
                    <span className="bento__ev-body">
                      <span className="bento__ev-t">{tx(g.title)}</span>
                      <span className="bento__meta">{tx(g.dept)} · {date(g.date, short)}</span>
                    </span>
                    <Download size={16} className="bento__dl" />
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/downloads#gos" className="link-arrow">{t('news.all')} <ArrowRight size={14} /></Link>
          </motion.article>

          {/* Videos */}
          <motion.article className="bento__tile bento__videos" {...tile(3)}>
            <h3 className="bento__h"><Play size={18} /> {t('up.videos')}</h3>
            <div className="bento__vids">
              {videos.map((v) => (
                <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="bento__vid">
                  <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className="bento__play"><Play size={18} fill="currentColor" /></span>
                  <span className="bento__vid-t en">{v.title}</span>
                </a>
              ))}
            </div>
            <a href={org.social.youtube} target="_blank" rel="noreferrer" className="link-arrow">{t('news.moreVideos')} <ArrowRight size={14} /></a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
