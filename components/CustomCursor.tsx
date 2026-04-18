'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor — two-part design:
 *  • A small inner dot that snaps instantly to cursor position
 *  • A larger outer ring that lerps with lag (trailing feel)
 *  Both expand / change on hover of interactive elements
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -200, my = -200   // target position
    let rx = -200, ry = -200   // ring current (lerped)
    let raf: number

    /* Animate ring with lerp */
    const animate = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`
    }

    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)

    /* Detect hover on interactive elements */
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, [role="button"], input, textarea, label')
      setHovering(!!interactive)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousemove', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      {/* Outer ring — laggy */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width:  hovering ? 54 : clicking ? 22 : 36,
          height: hovering ? 54 : clicking ? 22 : 36,
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid var(--accent)'
            : '1.5px solid rgba(240,234,226,0.25)',
          background: hovering ? 'rgba(196,168,130,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99997,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      />

      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width:  clicking ? 3 : hovering ? 5 : 4,
          height: clicking ? 3 : hovering ? 5 : 4,
          borderRadius: '50%',
          background: hovering ? 'var(--accent)' : 'var(--text-1)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
