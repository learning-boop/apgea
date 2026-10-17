import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import PageShell from './PageShell'

export default function NotFound() {
  const { t } = useLang()
  return (
    <PageShell title={t('nf.title')} lede={t('nf.lede')}>
      <section className="section">
        <div className="container ip-404">
          <span className="ip-404__code en" aria-hidden="true">404</span>
          <div className="ip-404__links">
            <Link to="/" className="ip-btn"><ArrowLeft size={17} /> {t('p.backHome')}</Link>
            <Link to="/news" className="ip-btn ip-btn--ghost">{t('pg.news')}</Link>
            <Link to="/contact" className="ip-btn ip-btn--ghost">{t('pg.contact')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
