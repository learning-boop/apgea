import { useEffect, useState } from 'react'
import { photoFallbacks } from '../data/content'
import Emblem from './Emblem'

/**
 * <img> that never shows broken: it tries `src`, then the photo's original on apgea.org (photoFallbacks),
 * then swaps to a branded placeholder (navy + seal watermark).
 */
export default function SafeImg({ src, alt = '', className = '', ...rest }) {
  const sources = [src, photoFallbacks[src]].filter(Boolean)
  const [step, setStep] = useState(0)
  useEffect(() => { setStep(0) }, [src])

  if (step >= sources.length) {
    return (
      <span className={`safe-ph ${className}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        <Emblem size={64} mono title="" />
      </span>
    )
  }
  return <img src={sources[step]} alt={alt} className={className} onError={() => setStep((n) => n + 1)} {...rest} />
}
