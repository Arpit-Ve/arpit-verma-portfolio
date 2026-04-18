'use client'

import { useRef, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const metrics = [
  { value: 500, suffix: '+', label: 'Leads Generated', sub: 'AI Outreach Automation System' },
  { value: 94, suffix: '%+', label: 'Model Accuracy', sub: 'Face Mask Detection · MobileNetV2' },
  { value: 40, suffix: '%', label: 'Data-Cleaning Cut', sub: 'ML Pipeline @ Elevate Labs' },
  { value: 50, suffix: 'ms', label: 'Inference Speed', sub: 'Sub-50ms Real-Time CV' },
  { value: 3, suffix: '+', label: 'Reports Produced', sub: 'Adopted in Production Decisions' },
  { value: 45, suffix: '%', label: 'Ops Overhead Cut', sub: 'DeliverIt Admin Dashboard' },
]

function CountUp({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    if (run && !ran.current && spanRef.current) {
      ran.current = true
      const el = spanRef.current
      const ctrl = animate(0, target, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: (v) => { el.textContent = Math.round(v).toString() },
      })
      return () => ctrl.stop()
    }
  }, [run, target])

  return (
    <span className="t-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1 }}>
      <span ref={spanRef}>0</span>{suffix}
    </span>
  )
}

export default function AchievementsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="achievements" className="section">
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            005 — Impact
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }} className="impact-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="t-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
          >
            Numbers that <em style={{ color: 'var(--accent)' }}>speak.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0, 0, 1] }}
            className="t-body"
          >
            Measurable outcomes across ML internships, AI automation, and production full-stack apps —
            not hypothetical benchmarks.
          </motion.p>
        </div>

        {/* Metrics grid — bordered */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }} className="metrics-grid">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.25, 0, 0, 1] }}
              style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
            >
              <CountUp target={m.value} suffix={m.suffix} run={inView} />
              <div style={{ marginTop: '0.5rem', marginBottom: '0.25rem', fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 500, fontFamily: 'var(--sans)' }}>
                {m.label}
              </div>
              <div className="t-label" style={{ color: 'var(--text-3)', lineHeight: 1.5 }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .impact-header { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .metrics-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .metrics-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
