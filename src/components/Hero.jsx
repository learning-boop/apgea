import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight, CalendarDays, FileText, HeartHandshake, Mail, MapPin, MessageSquareText, Newspaper, Phone,
} from 'lucide-react'
import { org, news } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from './Emblem'
import SafeImg from './SafeImg'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]
const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }
const stagger = { show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }

// The circle's three segments (public/hero): left half, top-right, bottom-right
const quarters = [
  { src: '/hero/felicitation.jpg', alt: 'APGEA leaders felicitated at a state meeting', pos: '52% 30%' },
  { src: '/hero/meeting.jpg', alt: 'APGEA delegation submitting a representation', pos: '45% 35%' },
  { src: '/hero/cm-meeting.jpg', alt: 'APGEA leaders meeting the Chief Minister', pos: '62% 25%' },
]

const services = [
  { icon: HeartHandshake, k: 'hc.s1', to: '/services' },
  { icon: FileText, k: 'hc.s2', to: '/downloads#gos' },
  { icon: Newspaper, k: 'hc.s3', to: '/news' },
  { icon: CalendarDays, k: 'hc.s4', to: '/activities' },
]

/** Circle-collage hero: headline left, a photo circle with the APGEA seal at its centre on the right. */
export default function Hero() {
  const { t, lang } = useLang()
  const latest = news[0]

  // Gentle pointer parallax on the photo circle
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const circleX = useTransform(sx, (v) => v * -16)
  const circleY = useTransform(sy, (v) => v * -16)
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section className="hc" aria-labelledby="hero-title" onPointerMove={onMove}>
      <div className="hc__swoosh hc__swoosh--l" aria-hidden="true" />
      <div className="hc__swoosh hc__swoosh--r" aria-hidden="true" />
      <div className="hc__mapmark" aria-hidden="true"><Emblem size={520} mono title="" /></div>

      <div className="container hc__grid">
        {/* Copy */}
        <motion.div className="hc__copy" variants={stagger} initial="hidden" animate="show">
          <motion.p className="hc__eyebrow" variants={rise}>{t('hc.eyebrow')}</motion.p>
          <motion.h1 key={lang} id="hero-title" className="hc__title" variants={rise}>
            <span>{t('hc.t1')}</span>
            <span>{t('hc.t2')}</span>
            <span className="hc__title-red">{t('hc.t3')}</span>
          </motion.h1>
          <motion.p className="hc__lede" variants={rise}>{t('hc.lede')}</motion.p>
          <motion.p className="hc__slogan" lang="te" variants={rise}>{org.taglineLeft} · {org.taglineRight}</motion.p>
          <motion.div className="hc__actions" variants={rise}>
            <Link to="/enroll" className="hc__btn hc__btn--red btn--shine">{t('hc.join')} <ArrowRight size={17} /></Link>
            <Link to={`/news/${latest.id}`} className="hc__btn hc__btn--line">{t('hc.news')}</Link>
          </motion.div>
          <motion.ul className="hc__svc" variants={rise}>
            {services.map(({ icon: Icon, k, to }) => (
              <li key={k}>
                <Link to={to} className="hc__svc-item">
                  <span className="hc__svc-icon"><Icon size={20} /></span>
                  <span>{t(k)}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Photo circle */}
        <div className="hc__visual">
          <motion.div className="hc__circle-wrap" style={{ x: circleX, y: circleY }}>
            <motion.span className="hc__ring" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease }} aria-hidden="true" />
            <div className="hc__circle">
              {quarters.map((q, i) => (
                <motion.figure
                  key={q.src}
                  className={`hc__q hc__q--${i}`}
                  initial={{ opacity: 0, scale: 1.25 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.15, ease }}
                >
                  <SafeImg src={q.src} alt={q.alt} style={{ objectPosition: q.pos }} />
                </motion.figure>
              ))}
            </div>
            <motion.div
              className="hc__seal"
              initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.8, ease }}
            >
              <Emblem size={190} title="APGEA" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <QuickBar />
    </section>
  )
}

/** The four contact cards from apgea.org, as a floating dock */
function QuickBar() {
  const { t } = useLang()
  const items = [
    { icon: Mail, k: t('quick.mail'), v: org.emails[1], href: `mailto:${org.emails[1]}` },
    { icon: MapPin, k: t('quick.loc'), v: t('quick.loc.v'), href: org.mapLink, ext: true },
    { icon: MessageSquareText, k: t('quick.sug'), v: t('quick.sug.v'), to: '/suggestions' },
    { icon: Phone, k: t('quick.call'), v: org.phones.join(', '), href: `tel:${org.phonesIntl[0]}` },
  ]
  return (
    <div className="container">
      <motion.ul className="qb" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease }}>
        {items.map(({ icon: Icon, k, v, href, to, ext }) => {
          const inner = (<><span className="qb__icon"><Icon size={22} /></span><span className="qb__txt"><small>{k}</small><b>{v}</b></span></>)
          return (
            <li key={k}>
              {to ? <Link to={to} className="qb__item">{inner}</Link>
                : <a href={href} className="qb__item" {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{inner}</a>}
            </li>
          )
        })}
      </motion.ul>
    </div>
  )
}
