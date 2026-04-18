'use client'

import { useEffect, useRef } from 'react'

/**
 * CursorSpotlight — warm amber radial glow that follows the cursor.
 * On a dark background, this creates a beautiful "ember light" effect
 * clearly visible as a warm illumination wherever you move the cursor.
 */
export default function CursorSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    // Two layers: outer halo (slow) + inner core (fast)
    let ox = mx, oy = my   // outer
    let ix = mx, iy = my   // inner

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const draw = () => {
      // lerp
      ox += (mx - ox) * 0.05   // outer: very slow, dreamy
      oy += (my - oy) * 0.05
      ix += (mx - ix) * 0.12   // inner: a bit faster
      iy += (my - iy) * 0.12

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* ── Outer large warm halo (500px) ── */
      const outerGlow = ctx.createRadialGradient(ox, oy, 0, ox, oy, 500)
      outerGlow.addColorStop(0,    'rgba(196, 168, 130, 0.07)')
      outerGlow.addColorStop(0.5,  'rgba(196, 168, 130, 0.035)')
      outerGlow.addColorStop(1,    'rgba(196, 168, 130, 0)')
      ctx.fillStyle = outerGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      /* ── Inner bright core (200px) ── */
      const innerGlow = ctx.createRadialGradient(ix, iy, 0, ix, iy, 200)
      innerGlow.addColorStop(0,    'rgba(220, 190, 150, 0.12)')
      innerGlow.addColorStop(0.4,  'rgba(196, 168, 130, 0.07)')
      innerGlow.addColorStop(1,    'rgba(196, 168, 130, 0)')
      ctx.fillStyle = innerGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
