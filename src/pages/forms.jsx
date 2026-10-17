import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, RotateCcw, Send } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'

/*
 * Front-end forms. Until the backend is ready, a submitted form opens WhatsApp to the APGEA office number
 * with every field already written into the message; the visitor only presses send.
 * When the backend lands, replace `deliver()` with an API call — the forms themselves stay the same.
 */

const WA_NUMBER = org.phonesIntl[0].replace('+', '')

/** Short reference like APGEA-G-261017-4821 (kind letter, yymmdd, random) */
export function makeRef(kind) {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `APGEA-${kind}-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`
}

function waUrl(text) {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`
}

/**
 * Form state + validation + delivery.
 * fields: { name: { required?, type?: 'phone'|'email'|'consent' } }
 * build(values) → the message text sent to WhatsApp.
 */
export function useWaForm(fields, build) {
  const { t } = useLang()
  const initial = Object.fromEntries(Object.keys(fields).map((k) => [k, fields[k].type === 'consent' ? false : '']))
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null) // { url, ref }

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const validate = () => {
    const errs = {}
    for (const [k, f] of Object.entries(fields)) {
      const v = values[k]
      if (f.type === 'consent') { if (f.required && !v) errs[k] = t('p.err.consent'); continue }
      const s = String(v).trim()
      if (f.required && !s) errs[k] = t('p.err.required')
      else if (s && f.type === 'phone' && !/^[6-9]\d{9}$/.test(s.replace(/\D/g, '').slice(-10))) errs[k] = t('p.err.phone')
      else if (s && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) errs[k] = t('p.err.email')
    }
    return errs
  }

  const onSubmit = (e, ref) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(`f-${first}`)?.focus(); return }
    const url = waUrl(build(values, ref))
    window.open(url, '_blank', 'noopener')
    setSent({ url, ref })
  }

  const reset = () => { setValues(initial); setErrors({}); setSent(null) }
  const field = (k) => ({ id: `f-${k}`, name: k, value: values[k], onChange: set(k), 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `e-${k}` : undefined })
  return { values, errors, sent, field, onSubmit, reset }
}

/** Labelled form control with error text */
export function Field({ id, label, required, optional, error, hint, wide, children }) {
  const { t } = useLang()
  return (
    <div className={`fm__field ${wide ? 'fm__field--wide' : ''} ${error ? 'has-error' : ''}`}>
      <label htmlFor={`f-${id}`} className="fm__label">
        {label}{required && <span className="fm__req" aria-label={t('p.required')}> *</span>}
        {optional && <span className="fm__opt"> ({t('p.optional')})</span>}
      </label>
      {children}
      {hint && !error && <span className="fm__hint">{hint}</span>}
      <AnimatePresence>
        {error && <motion.span id={`e-${id}`} className="fm__err" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</motion.span>}
      </AnimatePresence>
    </div>
  )
}

/** Submit row with the WhatsApp note */
export function SubmitRow({ label }) {
  const { t } = useLang()
  return (
    <div className="fm__submit">
      <button type="submit" className="fm__btn btn--shine"><Send size={17} /> {label || t('p.submit')}</button>
      <p className="fm__note"><MessageCircle size={15} /> {t('p.viaWa')}</p>
    </div>
  )
}

/** Shown after submitting */
export function SentCard({ sent, onReset }) {
  const { t } = useLang()
  return (
    <motion.div className="fm__sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} role="status">
      <span className="fm__sent-icon"><CheckCircle2 size={34} /></span>
      <h3>{t('p.sentTitle')}</h3>
      {sent.ref && <p className="fm__ref">{t('p.ref')}: <b className="en">{sent.ref}</b></p>}
      <p>{t('p.sentBody')}</p>
      <div className="fm__sent-actions">
        <a href={sent.url} target="_blank" rel="noreferrer" className="fm__btn"><MessageCircle size={17} /> {t('p.openAgain')}</a>
        <button type="button" className="fm__btn fm__btn--ghost" onClick={onReset}><RotateCcw size={16} /> {t('p.newForm')}</button>
      </div>
    </motion.div>
  )
}
