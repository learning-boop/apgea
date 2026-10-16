import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Download, Eye, Target } from 'lucide-react'
import { story, intro, vision, mission } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from './Emblem'
import './Story.css'

const ease = [0.22, 1, 0.36, 1]

/** Sticky-scroll storytelling of the four "About APGEA" paragraphs, then Vision / Mission */
export default function Story() {
  const { t, tx } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section story" id="about" aria-labelledby="story-title">
      <div className="container">
        <div className="story__grid" ref={ref}>
          <div className="story__sticky">
            <p className="eyebrow eyebrow--light">{t('story.eyebrow')}</p>
            <h2 id="story-title" className="story__title">{t('story.title')}</h2>
            <div className="story__year">
              <span className="story__year-k">{t('story.since')}</span>
              <span className="story__year-v en">2010</span>
            </div>
            <p className="story__intro">{tx(intro)}</p>
            <div className="story__actions">
              <Link to="/about" className="btn btn--red">{t('about.more')} <ArrowRight size={16} /></Link>
              <a href="/brochure.pdf" className="btn btn--ghost-light" download><Download size={16} /> {t('about.brochure')}</a>
            </div>
            <div className="story__seal" aria-hidden="true"><Emblem size={300} spin mono title="" /></div>
          </div>

          <div className="story__track">
            <div className="story__rail" aria-hidden="true"><motion.span style={{ scaleY: fill }} /></div>
            {story.map((p, i) => (
              <motion.article
                key={i}
                className="story__chapter"
                initial={{ opacity: 0.15, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="story__dot en">{String(i + 1).padStart(2, '0')}</span>
                <p>{tx(p)}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="vm">
          {[
            { icon: Eye, h: t('about.vision'), body: tx(vision), to: '/about#vision', more: t('about.fullVision'), cls: '' },
            { icon: Target, h: t('about.mission'), body: tx(mission), to: '/about#mission', more: t('about.fullMission'), cls: 'vm__card--gold' },
          ].map(({ icon: Icon, h, body, to, more, cls }, i) => (
            <motion.article
              key={h} className={`vm__card ${cls}`}
              initial={{ opacity: 0, y: 50, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              <span className="vm__icon"><Icon size={26} /></span>
              <h3>{h}</h3>
              <p>{body}</p>
              <Link to={to} className="vm__more">{more} <ArrowRight size={15} /></Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
