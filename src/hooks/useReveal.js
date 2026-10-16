import { useEffect, useRef } from 'react'

/** Adds `.is-visible` to the element once it scrolls into view (one-shot). */
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-visible'); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add('is-visible'); io.unobserve(el) }
      })
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Counts from 0 to `end` once visible. Returns [ref, value]. */
export function useCountUp(end, duration = 1400) {
  const ref = useRef(null)
  const valueRef = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || end == null) return
    const target = valueRef.current ?? el
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        target.textContent = Math.round(end * eased).toLocaleString('en-IN')
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    if (!('IntersectionObserver' in window)) { run(); return }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])
  return [ref, valueRef]
}

/** Tracks the pointer inside an element as --mx / --my (for the `.spot` glow). Use as onPointerMove handler. */
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Gentle 3D tilt toward the pointer. Spread the returned handlers on the element. */
export function useTilt(max = 6) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const onPointerMove = (e) => {
    spotlight(e)
    if (reduce || e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`
  }
  const onPointerLeave = (e) => { e.currentTarget.style.transform = '' }
  return { onPointerMove, onPointerLeave }
}
