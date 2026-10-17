import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Check, Clock, Link2, MessageCircle } from 'lucide-react'
import { news, bearers, newsImages } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from '../components/SafeImg'
import PageShell, { Reveal } from './PageShell'
import NotFound from './NotFound'

export default function Article() {
  const { id } = useParams()
  const { t, tx, date } = useLang()
  const [copied, setCopied] = useState(false)
  const i = news.findIndex((n) => String(n.id) === id)
  if (i < 0) return <NotFound />
  const a = news[i]
  const newer = news[i - 1]
  const older = news[i + 1]
  const author = bearers[0]
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard blocked */ }
  }

  return (
    <PageShell title={tx(a.title)} crumbs={[[t('pg.news'), '/news']]}>
      <section className="section">
        <div className="container ip-article">
          <article>
            <Reveal className="ip-article__meta">
              <span className="ip-article__author">
                <SafeImg src={author.photo} alt="" />
                <span><b>{tx(author.name)}</b><small>{t('hero.presRole')}</small></span>
              </span>
              <span><Calendar size={15} /> {date(a.date)}</span>
              <span><Clock size={15} /> {a.readTime} {t('up.read')}</span>
              <span className="ip-article__tag">{tx(a.tag)}</span>
            </Reveal>
            <Reveal className="ip-article__img" delay={0.05}>
              <SafeImg src={newsImages[a.id] || '/hero/felicitation.jpg'} fallback="/hero/felicitation.jpg" alt="" />
            </Reveal>
            <Reveal as="p" className="ip-article__lead" delay={0.1}>{tx(a.excerpt)}</Reveal>
            <p className="ip-article__note">{t('nw.full')}</p>

            <div className="ip-article__share">
              <span>{t('nw.share')}:</span>
              <a className="ip-chip" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${tx(a.title)} — ${url}`)}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
              <button type="button" className="ip-chip" onClick={copy}>{copied ? <><Check size={15} /> {t('nw.copied')}</> : <><Link2 size={15} /> {t('nw.copy')}</>}</button>
            </div>

            <nav className="ip-article__pager" aria-label={t('nw.more')}>
              {older ? (
                <Link to={`/news/${older.id}`} className="ip-pager"><small><ArrowLeft size={14} /> {t('nw.prev')}</small><span>{tx(older.title)}</span></Link>
              ) : <span />}
              {newer && (
                <Link to={`/news/${newer.id}`} className="ip-pager ip-pager--next"><small>{t('nw.next')} <ArrowRight size={14} /></small><span>{tx(newer.title)}</span></Link>
              )}
            </nav>
          </article>

          <aside className="ip-article__side">
            <h2 className="ip-side-h">{t('nw.more')}</h2>
            <ul>
              {news.filter((n) => n.id !== a.id).map((n) => (
                <li key={n.id}>
                  <Link to={`/news/${n.id}`} className="ip-side-item">
                    <small>{date(n.date, { day: 'numeric', month: 'short', year: 'numeric' })} · {tx(n.tag)}</small>
                    <span>{tx(n.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </PageShell>
  )
}
