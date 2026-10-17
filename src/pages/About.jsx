import { Award, FileCheck2, Landmark } from 'lucide-react'
import { org, intro } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from '../components/Emblem'
import Story from '../components/Story'
import Join from '../components/Join'
import PageShell, { Reveal } from './PageShell'

const facts = [
  { icon: Landmark, k: 'ab.f1.k', v: 'ab.f1.v' },
  { icon: Award, k: 'ab.f2.k', v: 'ab.f2.v' },
  { icon: FileCheck2, k: 'ab.f3.k', v: 'ab.f3.v' },
]

export default function About() {
  const { t, tx } = useLang()
  return (
    <PageShell title={t('pg.about')} lede={tx(intro)}>
      <section className="section">
        <div className="container ip-about">
          <div>
            <p className="eyebrow">{t('ab.facts')}</p>
            <div className="ip-facts">
              {facts.map(({ icon: Icon, k, v }, i) => (
                <Reveal key={k} className="ip-fact" delay={i * 0.08}>
                  <span className="ip-fact__icon"><Icon size={22} /></span>
                  <span className="ip-fact__k">{t(k)}</span>
                  <span className="ip-fact__v">{t(v)}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="ip-slogan" delay={0.15}>
            <Emblem size={120} title="" />
            <p className="eyebrow eyebrow--light">{t('ab.slogan')}</p>
            <p className="ip-slogan__line" lang="te">{org.taglineLeft}</p>
            <p className="ip-slogan__line" lang="te">{org.taglineRight}</p>
          </Reveal>
        </div>
      </section>
      <Story />
      <Join />
    </PageShell>
  )
}
