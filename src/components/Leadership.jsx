import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Phone, Search } from 'lucide-react'
import { bearers, districts } from '../data/content'
import { useTilt } from '../hooks/useReveal'
import { useLang } from '../i18n/LangContext'
import './Leadership.css'

const ease = [0.22, 1, 0.36, 1]

function Photo({ b, name }) {
  const [err, setErr] = useState(false)
  if (err) return <span className="ld__initials" aria-hidden="true">{b.initials}</span>
  return <img src={b.photo} alt={name} loading="lazy" onError={() => setErr(true)} />
}

function Person({ b, i }) {
  const { tx } = useLang()
  const tilt = useTilt(6)
  return (
    <motion.article
      className="ld__person spot" {...tilt}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: i * 0.12, ease }}
    >
      <div className="ld__photo"><Photo b={b} name={tx(b.name)} /></div>
      <div className="ld__info">
        <p className="ld__role">{tx(b.role)}</p>
        <h3>{tx(b.name)}</h3>
        <div className="ld__phones">
          {b.phones.map((p) => <a key={p} href={`tel:+91${p}`} className="en"><Phone size={13} /> {p}</a>)}
        </div>
      </div>
    </motion.article>
  )
}

export default function Leadership() {
  const { t, tx } = useLang()
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState(() => districts.find((d) => d.en === 'Krishna'))
  const needle = q.trim().toLowerCase()
  const match = (d) => !needle || d.en.toLowerCase().includes(needle) || d.te.includes(q.trim())

  return (
    <section className="section ld" id="bearers" aria-labelledby="ld-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t('lead.eyebrow')}</p>
            <h2 id="ld-title" className="h2">{t('lead.title')}</h2>
          </div>
          <Link to="/office-bearers" className="link-arrow">{t('br.all')} <ArrowRight size={16} /></Link>
        </div>

        <div className="ld__grid">
          <div className="ld__people">
            {bearers.map((b, i) => <Person key={b.name.en} b={b} i={i} />)}
          </div>

          <div className="ld__board" id="districts">
            <div className="ld__board-head">
              <div>
                <h3>{t('lead.districts')}</h3>
                <p>{t('br.findSub')}</p>
              </div>
              <label className="ld__search">
                <Search size={15} />
                <span className="sr-only">{t('br.search')}</span>
                <input type="search" placeholder={t('br.search')} value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
            </div>

            <div className="ld__tiles" role="listbox" aria-label={t('lead.pick')}>
              {districts.map((d, i) => (
                <motion.button
                  key={d.en} role="option" aria-selected={picked.en === d.en}
                  className={`ld__tile ${picked.en === d.en ? 'is-active' : ''} ${match(d) ? '' : 'is-dim'}`}
                  onClick={() => setPicked(d)}
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.02, ease }}
                >
                  <span className="ld__tile-n en">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ld__tile-t">{tx(d)}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={picked.en} className="ld__pick"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              >
                <span className="ld__pick-k">{tx(picked)} {t('br.district')}</span>
                <span className="ld__pick-n en">[DISTRICT PRESIDENT NAME]</span>
                <span className="ld__pick-m en">[PHONE] · [EMAIL]</span>
                <Link to={`/office-bearers#${picked.en.toLowerCase().replace(/\s+/g, '-')}`} className="link-arrow">{t('br.full')} <ArrowRight size={14} /></Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
