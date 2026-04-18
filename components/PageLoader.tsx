'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [phase, setPhase] = useState<'name' | 'reveal' | 'done'>('name')
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  /* Counter ticking while name is shown */
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(interval); return 100 }
        return c + Math.ceil(Math.random() * 8)
      })
    }, 28)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 2000)  // curtains open
    const t2 = setTimeout(() => setShow(false),   2900)   // unmount
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const curtainEase = [0.76, 0, 0.24, 1] as const

  return (
    <AnimatePresence>
      {show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, pointerEvents: phase === 'reveal' ? 'none' : 'all' }}>

          {/* ── Top curtain ─────────────────────────────────────────── */}
          <motion.div
            initial={{ y: 0 }}
            animate={phase === 'reveal' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: curtainEase }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '50%',
              background: '#1A1612',
              display: 'flex', alignItems: 'flex-end',
              paddingBottom: '0.5px',
              overflow: 'hidden',
            }}
          >
            {/* Subtle texture line on curtain edge */}
            <div style={{ width: '100%', height: 1, background: 'rgba(200,184,154,0.15)' }} />
          </motion.div>

          {/* ── Bottom curtain ──────────────────────────────────────── */}
          <motion.div
            initial={{ y: 0 }}
            animate={phase === 'reveal' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: curtainEase }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '50%',
              background: '#1A1612',
              display: 'flex', alignItems: 'flex-start',
              paddingTop: '0.5px',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%', height: 1, background: 'rgba(200,184,154,0.15)' }} />
          </motion.div>

          {/* ── Center content (revealed as curtains part) ───────────── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={
                phase === 'reveal'
                  ? { opacity: 0, scale: 1.06, filter: 'blur(6px)' }
                  : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              }
              transition={
                phase === 'reveal'
                  ? { duration: 0.4, ease: 'easeOut' }
                  : { duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }
              }
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: '#F2EDE8',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                ARPIT VERMA
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C8B89A',
                  marginTop: '1rem',
                }}
              >
                AI Product Builder &nbsp;·&nbsp; Full-Stack Developer
              </motion.div>
            </motion.div>
          </div>

          {/* ── Counter bottom-right ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute', bottom: '2rem', right: '2.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'rgba(200,184,154,0.5)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(Math.min(count, 100)).padStart(3, '0')}%
          </motion.div>

          {/* ── Horizontal line at center (seam between curtains) ────── */}
          <motion.div
            animate={phase === 'reveal' ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              top: '50%', left: 0, right: 0,
              height: 1,
              background: 'rgba(200,184,154,0.15)',
              transformOrigin: 'center',
            }}
          />

          {/* ── Progress bar (left edge) ─────────────────────────────── */}
          <motion.div
            style={{
              position: 'absolute', left: 0, bottom: 0, top: 0,
              width: 2,
              background: '#C8B89A',
              transformOrigin: 'bottom',
              opacity: 0.4,
            }}
            initial={{ scaleY: 0 }}
            animate={phase === 'reveal' ? { scaleY: 1, opacity: 0 } : { scaleY: count / 100, opacity: 0.4 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
