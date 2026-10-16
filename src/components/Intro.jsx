import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Emblem from './Emblem'

/** Short brand intro shown once per browser session: seal spins in, curtain lifts. */
export default function Intro() {
  const [show, setShow] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      if (new URLSearchParams(window.location.search).has('nointro')) return false
      return !sessionStorage.getItem('apgea-intro')
    } catch { return false }
  })

  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem('apgea-intro', '1') } catch { /* storage blocked */ }
    const t = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro" aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          onClick={() => setShow(false)}
        >
          <motion.div initial={{ scale: 0.4, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <Emblem size={140} spin title="" />
          </motion.div>
          <motion.span className="intro__name" initial={{ opacity: 0, y: 14, letterSpacing: '0.6em' }} animate={{ opacity: 1, y: 0, letterSpacing: '0.18em' }} transition={{ duration: 0.8, delay: 0.35 }}>
            APGEA
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
