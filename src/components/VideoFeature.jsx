import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play, Volume2 } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import './VideoFeature.css'

// Featured video on the home page: https://youtu.be/uM1dSuqGZQU
const VIDEO_ID = 'uM1dSuqGZQU'
const ease = [0.22, 1, 0.36, 1]

/**
 * Featured video. The player loads once the section scrolls into view and starts playing on its own —
 * muted, because browsers block autoplay with sound; visitors turn sound on from the player controls.
 */
export default function VideoFeature() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const params = new URLSearchParams({
    autoplay: '1', mute: '1', playsinline: '1', loop: '1', playlist: VIDEO_ID, rel: '0', modestbranding: '1',
  })

  return (
    <section className="vf" aria-labelledby="vf-title">
      <div className="vf__glow" aria-hidden="true" />
      <div className="container vf__in">
        <motion.div
          className="vf__head"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow eyebrow--light">{t('vf.eyebrow')}</p>
          <h2 id="vf-title" className="vf__title">{t('vf.title')}</h2>
          <p className="vf__lede">{t('vf.lede')}</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="vf__frame"
          initial={{ opacity: 0, y: 50, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="vf__player">
            {inView ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params}`}
                title={t('vf.title')}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="vf__poster">
                <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="vf__play"><Play size={28} fill="currentColor" /></span>
              </div>
            )}
          </div>
          <span className="vf__badge"><span className="vf__live" aria-hidden="true" />APGEA TV</span>
        </motion.div>

        <div className="vf__foot">
          <span className="vf__hint"><Volume2 size={16} /> {t('vf.sound')}</span>
          <a href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noreferrer" className="vf__yt">{t('vf.youtube')} <ArrowRight size={16} /></a>
          <a href={org.social.youtube} target="_blank" rel="noreferrer" className="vf__yt vf__yt--ghost">{t('news.moreVideos')} <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  )
}
