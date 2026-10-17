import { ExternalLink } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import PageShell, { Reveal } from './PageShell'

// Official sites. Check these links before launch and add any the association uses.
const links = [
  { k: 'wl.ap', url: 'https://www.ap.gov.in' },
  { k: 'wl.cfms', url: 'https://cfms.ap.gov.in' },
  { k: 'wl.goir', url: 'https://goir.ap.gov.in' },
  { k: 'wl.apgli', url: 'https://apgli.ap.gov.in' },
  { k: 'wl.appsc', url: 'https://psc.ap.gov.in' },
  { k: 'wl.rti', url: 'https://rtionline.gov.in' },
]

export default function Weblinks() {
  const { t } = useLang()
  return (
    <PageShell title={t('pg.weblinks')} lede={t('wl.lede')}>
      <section className="section">
        <div className="container">
          <ul className="ip-links">
            {links.map((l, i) => (
              <Reveal as="li" key={l.url} delay={(i % 3) * 0.06}>
                <a href={l.url} target="_blank" rel="noreferrer" className="ip-link spot">
                  <span className="ip-link__domain en">{new URL(l.url).hostname.replace(/^www\./, '')}</span>
                  <span className="ip-link__t">{t(l.k)}</span>
                  <ExternalLink size={18} className="ip-link__go" />
                </a>
              </Reveal>
            ))}
          </ul>
          <p className="ip-fine">{t('wl.note')}</p>
        </div>
      </section>
    </PageShell>
  )
}
