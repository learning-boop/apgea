import { Link } from 'react-router-dom'
import { ArrowUpRight, Download, FileText, Link2, MessageCircle, MessageSquare, Phone, ShieldCheck, Users, AlertCircle } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import { useTilt } from '../hooks/useReveal'
import PageShell, { Reveal } from './PageShell'

const cards = [
  { icon: AlertCircle, t: 'sv.grv.t', d: 'sv.grv.d', to: '/grievance', hot: true },
  { icon: FileText, t: 'svc.gos.t', d: 'svc.gos.d', to: '/downloads#gos' },
  { icon: Users, t: 'svc.dist.t', d: 'svc.dist.d', to: '/office-bearers#districts' },
  { icon: ShieldCheck, t: 'svc.rti.t', d: 'svc.rti.d', to: '/services#rti' },
  { icon: Download, t: 'svc.dl.t', d: 'svc.dl.d', to: '/downloads' },
  { icon: MessageSquare, t: 'svc.issue.t', d: 'svc.issue.d', to: '/suggestions' },
  { icon: Link2, t: 'ft.weblinks', d: 'wl.lede', to: '/weblinks' },
  { icon: Phone, t: 'svc.wa.t', d: 'svc.wa.d', href: org.whatsapp },
]

const steps = ['1', '2', '3', '4']

function Card({ c, i }) {
  const { t } = useLang()
  const tilt = useTilt(6)
  const Icon = c.icon
  const inner = (
    <>
      <span className="ip-svc__icon"><Icon size={24} /></span>
      <span className="ip-svc__t">{t(c.t)}</span>
      <span className="ip-svc__d">{c.href ? `+91 ${org.phones[0]} · ${t(c.d)}` : t(c.d)}</span>
      <ArrowUpRight size={20} className="ip-svc__go" />
    </>
  )
  const cls = `ip-svc spot ${c.hot ? 'ip-svc--hot' : ''}`
  return (
    <Reveal delay={(i % 4) * 0.06}>
      {c.href
        ? <a href={c.href} target="_blank" rel="noreferrer" className={cls} {...tilt}>{inner}</a>
        : <Link to={c.to} className={cls} {...tilt}>{inner}</Link>}
    </Reveal>
  )
}

export default function Services() {
  const { t } = useLang()
  return (
    <PageShell title={t('pg.services')} lede={t('sv.lede')}>
      <section className="section">
        <div className="container">
          <div className="ip-svcs">
            {cards.map((c, i) => <Card key={c.t} c={c} i={i} />)}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="rti" aria-labelledby="rti-title">
        <div className="container">
          <p className="eyebrow">RTI</p>
          <h2 id="rti-title" className="h2">{t('sv.rti')}</h2>
          <p className="lede ip-gap">{t('sv.rti.lede')}</p>
          <ol className="ip-steps">
            {steps.map((n, i) => (
              <Reveal as="li" key={n} className="ip-step" delay={i * 0.08}>
                <span className="ip-step__n en">{n}</span>
                <h3>{t(`sv.rti.${n}t`)}</h3>
                <p>{t(`sv.rti.${n}d`)}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="ip-callout">
            <MessageCircle size={20} />
            <p>{t('sv.rti.help')}</p>
            <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn ip-btn--sm">WhatsApp</a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
