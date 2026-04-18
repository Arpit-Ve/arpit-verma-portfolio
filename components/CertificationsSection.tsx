'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const certs = [
  { year: '2024', title: 'Python for Data Science & AI', issuer: 'IBM · Coursera', topics: 'Pandas · NumPy · Matplotlib · Data Analysis' },
  { year: '2024', title: 'Machine Learning with Python', issuer: 'IBM · Coursera', topics: 'Supervised Learning · scikit-learn · Model Evaluation' },
  { year: '2024', title: 'Responsive Web Design', issuer: 'freeCodeCamp', topics: 'HTML · CSS · Mobile-First · Flexbox · Grid' },
  { year: '2024', title: 'Project Management', issuer: 'HarvardX · edX', topics: 'Planning · Scoping · Risk Management · Delivery' },
  { year: '2024', title: 'AI/ML Engineering Certificate', issuer: 'Elevate Labs', topics: 'ML Pipelines · Feature Engineering · EDA · Python' },
  { year: '2024', title: 'TensorFlow & Deep Learning', issuer: 'DeepLearning.AI · Coursera', topics: 'CNNs · Computer Vision · Transfer Learning' },
  { year: '2023', title: 'Full-Stack Web Development Bootcamp', issuer: 'freeCodeCamp / Odin Project', topics: 'React · Node.js · MongoDB · REST APIs · JWT' },
  { year: '2023', title: 'Computer Vision with OpenCV', issuer: 'OpenCV University', topics: 'Image Processing · Object Detection · Real-Time CV' },
  { year: '2023', title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', topics: 'Algorithms · ES6+ · Async/Await · OOP' },
  { year: '2023', title: 'Google Cloud & DevOps Essentials', issuer: 'Google / Cloudflare', topics: 'CI/CD · Containers · Cloud Deploy · DNS' },
]

export default function CertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            006 — Certifications
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
          <motion.span className="t-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.35 }}>
            {certs.length} verified
          </motion.span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '3rem' }} className="cert-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="t-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
          >
            Verified <em style={{ color: 'var(--accent)' }}>expertise.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0, 0, 1] }}
            className="t-body"
          >
            Structured learning across AI/ML, data science, full-stack development, and cloud — from IBM, Google, HarvardX, and freeCodeCamp.
          </motion.p>
        </div>

        {/* Cert rows */}
        {certs.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: [0.25, 0, 0, 1] }}
            style={{
              display: 'grid', gridTemplateColumns: '3.5rem 1fr 1fr',
              gap: '1.5rem', alignItems: 'start',
              padding: '1.375rem 0', borderBottom: '1px solid var(--border)',
            }}
            className="cert-row"
          >
            <span className="t-label" style={{ color: 'var(--text-3)', paddingTop: '0.1rem' }}>{c.year}</span>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontFamily: 'var(--sans)', fontWeight: 400, marginBottom: '0.2rem' }}>
                {c.title}
              </div>
              <div className="t-label" style={{ color: 'var(--accent)' }}>{c.issuer}</div>
            </div>
            <div className="t-label cert-topics" style={{ color: 'var(--text-3)', lineHeight: 1.6 }}>{c.topics}</div>
          </motion.div>
        ))}

        {/* Education block at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0, 0, 1] }}
          style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}
        >
          <span className="t-label" style={{ display: 'block', marginBottom: '2rem', color: 'var(--text-3)' }}>Education</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { abbr: 'BCA', deg: 'Bachelor of Computer Applications (BCA)', inst: 'Ghaziabad', yr: '2022 – 2025' },
              { abbr: '12th', deg: '12th Grade · CBSE Board', inst: 'Completed', yr: '2021' },
              { abbr: '10th', deg: '10th Grade · CBSE Board', inst: 'Completed', yr: '2019' },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  display: 'grid', gridTemplateColumns: '3.5rem 1fr auto',
                  gap: '1.5rem', padding: '1.25rem 0',
                  borderBottom: '1px solid var(--border)',
                  alignItems: 'center',
                }}
              >
                <span className="t-label" style={{ color: 'var(--text-3)' }}>{e.abbr}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontFamily: 'var(--sans)', fontWeight: 400 }}>{e.deg}</div>
                  <div className="t-label" style={{ color: 'var(--text-3)', marginTop: '0.15rem' }}>{e.inst}</div>
                </div>
                <span className="t-label" style={{ color: 'var(--text-3)', textAlign: 'right', flexShrink: 0 }}>{e.yr}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <style>{`
          @media (max-width: 768px) {
            .cert-header { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .cert-row { grid-template-columns: 3rem 1fr !important; }
            .cert-topics { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
