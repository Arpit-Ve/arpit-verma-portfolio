'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll — wraps Lenis for that silky sirnik.co inertia scroll.
 * Also syncs Framer Motion's useScroll with Lenis RAF tick.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,           // scroll duration (seconds) — 1.2-1.4 is sirnik-feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // expo out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,     // slightly slower than default for that luxury feel
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    /* RAF loop */
    let raf: number
    function tick(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    /* Anchor link handling — lenis needs to intercept <a href="#section"> */
    function handleAnchor(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href?.startsWith('#')) return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])

  return <>{children}</>
}
