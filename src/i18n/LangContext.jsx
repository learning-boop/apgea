import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings'

const LangContext = createContext(null)
const KEY = 'apgea-lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'te') return saved
  } catch { /* storage blocked */ }
  return 'te'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = useCallback((l) => {
    setLangState(l)
    try { localStorage.setItem(KEY, l) } catch { /* storage blocked */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
  }, [lang])

  const value = useMemo(() => {
    /** UI string by key, e.g. t('hero.join'). Falls back to English, then the key. */
    const t = (key) => strings[lang][key] ?? strings.en[key] ?? key
    /** Pick the current language from a { en, te } field; plain strings pass through. */
    const tx = (v) => (v == null || typeof v !== 'object' || Array.isArray(v) ? v : v[lang] ?? v.en)
    const locale = lang === 'te' ? 'te-IN' : 'en-IN'
    const date = (d, opts = { day: 'numeric', month: 'long', year: 'numeric' }) => new Date(d).toLocaleDateString(locale, opts)
    return { lang, setLang, toggle: () => setLang(lang === 'te' ? 'en' : 'te'), t, tx, locale, date }
  }, [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
