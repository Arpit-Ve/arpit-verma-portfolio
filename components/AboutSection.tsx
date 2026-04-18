'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* Stagger children */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0, 0, 1] } },
}

/* Animated line that expands on inView */
function AnimLine({ delay = 0 }: { delay?: number }) {
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <div ref={ref} style={{ height: 1, background: 'var(--border)', overflow: 'hidden', margin: '2rem 0' }}>
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.25, 0, 0, 1] }}
        style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
      />
    </div>
  )
}

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">

        {/* Section label with animated line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}>
          <motion.span
            className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            001 — About
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }} className="about-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0, 0, 1] }}
          >
            <h2 className="t-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', marginBottom: '2rem' }}>
              Building where{' '}
              <em style={{ color: 'var(--accent)' }}>AI meets</em>
              {' '}great products.
            </h2>
            <AnimLine delay={0.2} />
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { v: '3+', l: 'Internships' },
                { v: '12+', l: 'Projects' },
                { v: '10+', l: 'Certifications' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className="t-display" style={{ fontSize: '2rem' }}>{s.v}</div>
                  <div className="t-label" style={{ marginTop: '0.25rem' }}>{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <motion.p variants={item} className="t-body">
              I&apos;m <strong style={{ color: 'var(--text-1)', fontWeight: 500 }}>Arpit Verma</strong> — an AI Product
              Builder and Full-Stack Developer based in Ghaziabad, India. Co-founder of{' '}
              <span style={{ color: 'var(--accent)' }}>Biblio AI</span> — an AI reading platform
              integrating Google Gemini API, dual-database backend (PostgreSQL + MongoDB Atlas), and a React.js AI chat agent.
            </motion.p>
            <motion.p variants={item} className="t-body">
              I&apos;ve interned at Elevate Labs (AI/ML), Cipher Byte Technologies (web dev), and Octanet — shipping
              production ML pipelines, e-commerce platforms, and pixel-perfect UIs.
            </motion.p>
            <motion.p variants={item} className="t-body">
              From training computer vision models at 94%+ accuracy with sub-50ms inference, to automating
              outreach pipelines that generated 500+ leads — I operate at the intersection of{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>machine intelligence</span>{' '}
              and product engineering.
            </motion.p>

            <motion.div variants={item} style={{ height: 1, background: 'var(--border)' }} />

            {/* Approach steps */}
            {[
              { step: 'Understand', desc: 'Observe the problem deeply before writing a single line of code.' },
              { step: 'Engineer', desc: 'Build clean, scalable systems — LLM pipelines, REST APIs, ML models.' },
              { step: 'Ship', desc: 'Deploy production-ready on Vercel, Railway, Render — with real impact.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                variants={item}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <span className="t-label" style={{ flexShrink: 0, color: 'var(--accent)', minWidth: 84, paddingTop: '0.1rem' }}>
                  {String(i + 1).padStart(2, '0')} {s.step}
                </span>
                <span className="t-body" style={{ fontSize: '0.875rem' }}>{s.desc}</span>
              </motion.div>
            ))}

            <motion.div
              variants={item}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                border: '1px solid rgba(74,222,128,0.2)', borderRadius: 2,
                padding: '0.5rem 0.875rem', background: 'rgba(74,222,128,0.04)',
                width: 'fit-content', marginTop: '0.25rem',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }}
              />
              <span className="t-label" style={{ color: 'rgba(74,222,128,0.8)' }}>
              Open to Opportunities · vermaarpit627@gmail.com
              </span>
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
        `}</style>
      </div>
    </section>
  )
}
