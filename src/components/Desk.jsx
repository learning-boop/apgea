import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import { news, bearers, archive, newsImages } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from './SafeImg'
import './Desk.css'

const ease = [0.22, 1, 0.36, 1]

/** Editorial "newspaper" section: the President's current series + the full article index from apgea.org */
export default function Desk() {
  const { t, tx, date } = useLang()
  const president = bearers[0]
  const series = news.filter((n) => n.series).slice().reverse() // Part 1 → 3

  return (
    <section className="section desk" aria-labelledby="desk-title">
      <div className="container">
        <header className="desk__mast">
          <p className="eyebrow">{t('desk.eyebrow')}</p>
          <h2 id="desk-title" className="desk__title">{t('desk.title')}</h2>
        </header>

        <div className="desk__grid">
          {/* Byline column */}
          <motion.aside className="desk__by" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease }}>
            <span className="desk__avatar"><SafeImg src={president.photo} alt={tx(president.name)} /></span>
            <span className="desk__name">{tx(president.name)}</span>
            <span className="desk__role">{t('hero.presRole')}</span>
            <blockquote className="desk__quote">
              <Quote size={26} aria-hidden="true" />
              <p>{t('desk.quote')}</p>
            </blockquote>
          </motion.aside>

          {/* Series */}
          <div className="desk__series">
            <p className="desk__label">{t('desk.series')}</p>
            <ol className="desk__parts">
              {series.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.12, ease }}>
                  <Link to={`/news/${n.id}`} className={`desk__part ${i === series.length - 1 ? 'is-new' : ''}`}>
                    {newsImages[n.id] && <span className="desk__img"><SafeImg src={newsImages[n.id]} alt="" loading="lazy" /></span>}
                    <span className="desk__num en">{String(i + 1).padStart(2, '0')}</span>
                    <span className="desk__part-body">
                      <span className="desk__part-tag">{tx(n.tag)} · {date(n.date, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="desk__part-title">{tx(n.title)}</span>
                      <span className="desk__part-ex">{tx(n.excerpt)}</span>
                    </span>
                    <ArrowUpRight size={22} className="desk__go" />
                  </Link>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Index */}
          <div className="desk__index">
            <p className="desk__label">{t('desk.index')}</p>
            <ol className="desk__list">
              {archive.slice(3).map((a, i) => (
                <li key={a.en}>
                  <Link to={a.to} className="desk__row">
                    <span className="desk__row-n en">{String(i + 4).padStart(2, '0')}</span>
                    <span className="desk__row-t">{tx(a)}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link to="/news" className="link-arrow">{t('news.viewAll')} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
