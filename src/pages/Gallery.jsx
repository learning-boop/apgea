import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { photos, bearers } from '../data/content'
import { useLang } from '../i18n/LangContext'
import SafeImg from '../components/SafeImg'
import PageShell from './PageShell'

const allPhotos = ['/hero/felicitation.jpg', '/hero/meeting.jpg', '/hero/cm-meeting.jpg', ...photos, bearers[0].photo, bearers[1].photo]
const videos = ['uM1dSuqGZQU', 'dkb6ILgyzpU', 'Q1Ltf7IiOmk']
const ease = [0.22, 1, 0.36, 1]

export default function Gallery() {
  const { t } = useLang()
  const [tab, setTab] = useState('photos')
  const [open, setOpen] = useState(null) // photo index
  const [video, setVideo] = useState(null)

  const step = useCallback((d) => setOpen((i) => (i + d + allPhotos.length) % allPhotos.length), [])

  useEffect(() => {
    if (open === null && !video) return
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(null); setVideo(null) }
      if (open !== null && e.key === 'ArrowRight') step(1)
      if (open !== null && e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, video, step])

  return (
    <PageShell title={t('pg.gallery')} lede={t('ga.lede')}>
      <section className="section">
        <div className="container">
          <div className="up__filters ip-gap" role="tablist">
            {['photos', 'videos'].map((k) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} className={`up__filter ${tab === k ? 'is-on' : ''}`} onClick={() => setTab(k)}>
                {tab === k && <motion.span layoutId="ga-tab" className="up__filter-pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                <span className="up__filter-label">{t(`ga.${k}`)}</span>
                <span className="up__filter-n en">{k === 'photos' ? allPhotos.length : videos.length}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'photos' ? (
              <motion.ul key="p" className="ip-masonry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {allPhotos.map((src, i) => (
                  <motion.li key={src} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease }}>
                    <button type="button" className="ip-masonry__btn" onClick={() => setOpen(i)} aria-label={`${t('ga.photos')} ${i + 1}`}>
                      <SafeImg src={src} alt="" loading="lazy" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.div key="v" className="ip-videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {videos.map((id) => (
                  <button key={id} type="button" className="up__vid" onClick={() => setVideo(id)} aria-label={t('up.watch')}>
                    <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                    <span className="up__vid-shade" />
                    <span className="up__play"><Play size={22} fill="currentColor" /></span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="ip-lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div key={open} className="ip-lightbox__img" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()}>
              <SafeImg src={allPhotos[open]} alt="" />
            </motion.div>
            <button type="button" className="ip-lightbox__nav ip-lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label={t('ga.prev')}><ChevronLeft size={28} /></button>
            <button type="button" className="ip-lightbox__nav ip-lightbox__nav--next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label={t('ga.next')}><ChevronRight size={28} /></button>
            <button type="button" className="up__close" onClick={() => setOpen(null)} aria-label={t('ga.close')}><X size={22} /></button>
            <span className="ip-lightbox__count en">{open + 1} / {allPhotos.length}</span>
          </motion.div>
        )}
        {video && (
          <motion.div className="up__modal" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideo(null)}>
            <div className="up__player" onClick={(e) => e.stopPropagation()}>
              <iframe src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`} title={t('ga.videos')} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
              <button type="button" className="up__close" onClick={() => setVideo(null)} aria-label={t('ga.close')}><X size={22} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
