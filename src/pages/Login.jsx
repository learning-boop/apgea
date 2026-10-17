import { Link } from 'react-router-dom'
import { Lock, MessageCircle } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from '../components/Emblem'
import PageShell, { Reveal } from './PageShell'

/** Sign-in screen. Inactive until the members' portal (backend) is built. */
export default function Login() {
  const { t } = useLang()
  return (
    <PageShell title={t('pg.login')} lede={t('lg.lede')}>
      <section className="section">
        <div className="container ip-narrow">
          <Reveal className="ip-login">
            <Emblem size={88} title="" />
            <span className="ip-badge ip-badge--red"><Lock size={14} /> {t('lg.soonT')}</span>
            <p>{t('lg.soonD')}</p>
            <form className="fm" onSubmit={(e) => e.preventDefault()} aria-disabled="true">
              <div className="fm__field fm__field--wide">
                <label htmlFor="f-member" className="fm__label">{t('lg.id')}</label>
                <input id="f-member" disabled placeholder="APGEA-XXXX / 98XXXXXXXX" />
              </div>
              <button type="submit" className="fm__btn" disabled>{t('lg.otp')}</button>
            </form>
            <div className="ip-login__alt">
              <Link to="/grievance" className="ip-btn ip-btn--ghost">{t('sv.grv.t')}</Link>
              <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn"><MessageCircle size={17} /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
