import { MessageCircle } from 'lucide-react'
import { affiliates, org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import PageShell, { Reveal } from './PageShell'

const about = { VWSEA: 'af.vwsea', APRESA: 'af.apresa' }

export default function Affiliated() {
  const { t, lang } = useLang()
  return (
    <PageShell title={t('pg.affiliated')} lede={t('af.lede')}>
      <section className="section">
        <div className="container ip-aff">
          {affiliates.map((a, i) => (
            <Reveal key={a.code} as="article" className={`ip-aff__card ${i % 2 ? 'ip-aff__card--gold' : ''}`} id={a.code.toLowerCase()} delay={i * 0.1}>
              <span className="ip-aff__code en">{a.code}</span>
              <h2 className="ip-aff__name">{lang === 'te' ? a.nameTe : a.nameEn}</h2>
              <p className="ip-aff__alt">{lang === 'te' ? a.nameEn : a.nameTe}</p>
              <p className="ip-aff__about">{t(about[a.code])}</p>
              <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn"><MessageCircle size={17} /> {t('af.contact')}</a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
