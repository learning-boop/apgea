import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { events, org, photos } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from '../components/SafeImg'
import VideoFeature from '../components/VideoFeature'
import PageShell, { Reveal } from './PageShell'

const isReal = (v) => !String(typeof v === 'object' && v ? v.en : v).trim().startsWith('[')
const activityPhotos = ['/hero/felicitation.jpg', '/hero/meeting.jpg', '/hero/cm-meeting.jpg', ...photos.slice(0, 3)]

export default function Activities() {
  const { t, tx, date } = useLang()
  const list = events.filter((e) => isReal(e.title)).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <PageShell title={t('pg.activities')} lede={t('ac.lede')}>
      <section className="section">
        <div className="container ip-acts">
          <div>
            <h2 className="ip-h2">{t('ac.events')}</h2>
            <ol className="ip-events">
              {list.map((e, i) => (
                <Reveal as="li" key={e.id} id={`event-${e.id}`} className="ip-event" delay={i * 0.06}>
                  <span className="ip-event__date en"><b>{new Date(e.date).getDate()}</b><small>{date(e.date, { month: 'short' })}</small><i>{new Date(e.date).getFullYear()}</i></span>
                  <span className="ip-event__body">
                    <span className="ip-event__t">{tx(e.title)}</span>
                    <span className="ip-event__m"><MapPin size={13} /> {tx(e.place)}</span>
                  </span>
                </Reveal>
              ))}
              {list.length === 0 && <li className="ip-empty">{t('ac.none')}</li>}
            </ol>
            <Reveal className="ip-callout">
              <MessageCircle size={20} />
              <p>{t('ac.district')}</p>
              <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn ip-btn--sm">WhatsApp</a>
            </Reveal>
          </div>

          <div>
            <h2 className="ip-h2">{t('ac.photos')}</h2>
            <div className="ip-mosaic">
              {activityPhotos.map((src, i) => (
                <Reveal key={src} className={`ip-mosaic__item ip-mosaic__item--${i}`} delay={i * 0.05}>
                  <Link to="/gallery"><SafeImg src={src} alt="" loading="lazy" /></Link>
                </Reveal>
              ))}
            </div>
            <Link to="/gallery" className="link-arrow">{t('gal.all')} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <VideoFeature />
    </PageShell>
  )
}
