import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Download, FileText, ShieldCheck, Users, MessageSquare, Link2 } from 'lucide-react'
import { affiliates, resolve } from '../data/content'
import { spotlight } from '../hooks/useReveal'
import { useLang } from '../i18n/LangContext'
import Emblem from './Emblem'
import './Join.css'

const ease = [0.22, 1, 0.36, 1]
const services = [
  { icon: FileText, k: 'svc.gos.t', to: '/downloads#gos' },
  { icon: Users, k: 'svc.dist.t', to: '/office-bearers#districts' },
  { icon: ShieldCheck, k: 'svc.rti.t', to: '/services#rti' },
  { icon: Download, k: 'svc.dl.t', to: '/downloads' },
  { icon: MessageSquare, k: 'svc.issue.t', to: '/suggestions' },
  { icon: Link2, k: 'ft.weblinks', to: '/weblinks' },
]

export default function Join() {
  const { t, tx, lang } = useLang()
  return (
    <section className="section join" aria-labelledby="join-title">
      <div className="container join__grid">
        <motion.div
          className="join__cta"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease }}
        >
          <div className="join__seal" aria-hidden="true"><Emblem size={340} spin mono title="" /></div>
          <p className="eyebrow eyebrow--light">{t('join.eyebrow')}</p>
          <h2 key={lang} id="join-title" className="join__title lang-fade">{t('cta.title')}</h2>
          <p className="join__lede">{t('cta.lede')}</p>
          <p className="join__resolve">{tx(resolve)}</p>
          <div className="join__actions">
            <Link to="/enroll" className="btn btn--white btn--shine">{t('cta.enroll')} <ArrowRight size={16} /></Link>
            <a href="/brochure.pdf" className="btn btn--ghost-light" download><Download size={16} /> {t('about.brochure')}</a>
          </div>
        </motion.div>

        <div className="join__side">
          <div>
            <p className="join__label">{t('join.aff')}</p>
            <div className="join__affs">
              {affiliates.map((a, i) => (
                <motion.div key={a.code} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease }}>
                  <Link to={a.to} className="join__aff spot" onPointerMove={spotlight}>
                    <span className="join__aff-code en">{a.code}</span>
                    <span className="join__aff-name">{lang === 'te' ? a.nameTe : a.nameEn}</span>
                    <ArrowUpRight size={20} className="join__aff-go" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="join__label">{t('join.services')}</p>
            <ul className="join__svc">
              {services.map(({ icon: Icon, k, to }, i) => (
                <motion.li key={k} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease }}>
                  <Link to={to}><Icon size={18} /> {t(k)}</Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
