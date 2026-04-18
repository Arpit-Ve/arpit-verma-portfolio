'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function useMagnet(strength = 0.32) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return { sx, sy, onMove, onLeave }
}

const WORDS = ['Intelligent', 'Scalable', 'Precise', 'Impactful']

function TypewriterWord() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[idx]
    let t: NodeJS.Timeout
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    else { setDeleting(false); setIdx(i => (i + 1) % WORDS.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, idx])

  return (
    <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.55, ease: 'steps(1)' }}
        style={{ display: 'inline-block', width: 2, height: '0.85em', background: 'var(--accent)', marginLeft: 2, verticalAlign: 'middle' }}
      />
    </span>
  )
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 60])
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const btn1 = useMagnet(); const btn2 = useMagnet()



  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: '0 2.5rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>



      <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        {/* Scroll indicator top-right */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: 'absolute', top: '8rem', right: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}
        >
          <span className="t-label">Scroll to explore</span>
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 48, background: 'var(--border-2)', transformOrigin: 'top' }}
          />
        </motion.div>

        {/* Status dot */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}
          />
          <span className="t-label" style={{ color: 'var(--text-2)' }}>
            Available for projects &amp; collaborations — Ghaziabad, India
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ maxWidth: 1000, marginBottom: '2.5rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.25, 0, 0, 1] }}
            className="t-display"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', marginBottom: '0.35rem' }}
          >
            AI Product Builder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0, 0, 1] }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontStyle: 'italic',
              color: 'var(--accent)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
            }}
          >
            &ldquo;First, solve the problem. Then, write the code.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0, 0, 1] }}
            className="t-body" style={{ fontSize: '1.125rem', maxWidth: 500 }}
          >
            Turning ideas into <TypewriterWord /> solutions.
          </motion.p>
        </div>

        {/* CTAs + stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.25, 0, 0, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <motion.a href="#projects" className="btn btn-primary"
              style={{ x: btn1.sx, y: btn1.sy } as any}
              onMouseMove={btn1.onMove as any} onMouseLeave={btn1.onLeave}
              whileTap={{ scale: 0.97 }}>
              View Work
            </motion.a>
            <motion.a href="#contact" className="btn"
              style={{ x: btn2.sx, y: btn2.sy } as any}
              onMouseMove={btn2.onMove as any} onMouseLeave={btn2.onLeave}
              whileTap={{ scale: 0.97 }}>
              Hire Me ↗
            </motion.a>
            <motion.a href="/resume.pdf" download="Arpit_Verma_Resume.pdf" className="btn" whileTap={{ scale: 0.97 }}>
              Resume ↓
            </motion.a>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {[['12+','Projects'],['94%+','CV Accuracy'],['500+','Leads Gen']].map(([v, l], i) => (
              <motion.div key={l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }} style={{ textAlign: 'right' }}>
                <div className="t-display" style={{ fontSize: '1.75rem' }}>{v}</div>
                <div className="t-label" style={{ marginTop: '0.2rem' }}>{l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 1.1, ease: [0.25, 0, 0, 1] }}
        style={{ height: 1, background: 'var(--border)', marginTop: '4rem', transformOrigin: 'left' }}
      />
    </section>
  )
}
