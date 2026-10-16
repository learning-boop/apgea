import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import './LangToggle.css'

const options = [
  { code: 'te', label: 'తెలుగు' },
  { code: 'en', label: 'English' },
]

/** Telugu / English segmented switch with a sliding thumb. `id` keeps thumbs independent when rendered twice. */
export default function LangToggle({ id = 'main', tone = 'dark', showIcon = true }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`lt lt--${tone}`} role="radiogroup" aria-label={t('lang.label')}>
      {showIcon && <Languages size={15} className="lt__icon" aria-hidden="true" />}
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          role="radio"
          aria-checked={lang === o.code}
          lang={o.code}
          className={`lt__opt lt__opt--${o.code} ${lang === o.code ? 'is-active' : ''}`}
          onClick={() => setLang(o.code)}
        >
          {lang === o.code && (
            <motion.span layoutId={`lt-thumb-${id}`} className="lt__thumb" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
          )}
          <span className="lt__label">{o.label}</span>
        </button>
      ))}
    </div>
  )
}
