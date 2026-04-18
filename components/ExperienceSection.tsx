'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    period: 'Jun 2024 – Aug 2024',
    role: 'AI / ML Intern',
    company: 'Elevate Labs',
    type: 'Internship',
    desc: [
      'Built scalable ML pipelines (Python, scikit-learn, Pandas) with automated feature engineering — reducing manual data-cleaning time by ~40% and optimizing model testing by 30%.',
      'Authored model performance reports and AI research documentation, contributing to 3+ evaluation summaries adopted in production decision-making.',
    ],
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'EDA', 'Jupyter'],
  },
  {
    period: 'Apr 2024 – Jun 2024',
    role: 'Web Development Intern',
    company: 'Cipher Byte Technologies',
    type: 'Internship',
    desc: [
      'Engineered a full-featured shoe e-commerce site (HTML, CSS, JavaScript) with product catalog, cart logic, and responsive UI — improving UX and reducing bounce-rate friction.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
  {
    period: 'Feb 2024 – Apr 2024',
    role: 'Web Development Intern',
    company: 'Octanet',
    type: 'Internship',
    desc: [
      'Developed a pixel-perfect, fully responsive landing page following corporate design guidelines, delivered with zero revision cycles.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    period: 'Jan 2026 – Present',
    role: 'Co-Founder & Full-Stack Developer',
    company: 'Biblio AI',
    type: 'Founder',
    desc: [
      'Architected real-time AI reading app using Google Gemini API, React.js AI chat agent, personalized book recommendations, and freemium subscription tiers — deployed on Vercel + Railway.',
      'Designed dual-database architecture (PostgreSQL + MongoDB Atlas) with Express.js REST APIs, authentication, and subscription management.',
    ],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Google Gemini API', 'Railway', 'Vercel'],
  },
]

function ExpCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0, 0, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '3rem', padding: '2.5rem 0', borderBottom: '1px solid var(--border)' }}
      className="exp-row"
    >
      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <span className="t-label" style={{ color: 'var(--text-3)' }}>{exp.period}</span>
        <span className="t-label" style={{
          color: exp.type === 'Founder' ? 'var(--accent)' : 'var(--text-3)',
          border: `1px solid ${exp.type === 'Founder' ? 'rgba(200,184,154,0.25)' : 'var(--border)'}`,
          padding: '2px 8px', borderRadius: 2, marginTop: 4, width: 'fit-content',
        }}>
          {exp.type}
        </span>
      </div>

      {/* Right */}
      <div>
        <h3 className="t-display" style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{exp.role}</h3>
        <span className="t-label" style={{ color: 'var(--accent)', display: 'block', marginBottom: '1rem' }}>{exp.company}</span>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
          {exp.desc.map((d, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 + i * 0.08 }}
              style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.35rem', fontSize: '0.5rem' }}>▸</span>
              <p className="t-body" style={{ fontSize: '0.875rem' }}>{d}</p>
            </motion.li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {exp.stack.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            004 — Experience
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0, 0, 1] }}
          className="t-display"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', marginBottom: '3rem', maxWidth: 480 }}
        >
          Where I&apos;ve <em style={{ color: 'var(--accent)' }}>built things.</em>
        </motion.h2>

        {experiences.map((e, i) => <ExpCard key={i} exp={e} index={i} />)}

        <style>{`
          @media (max-width: 768px) { .exp-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; } }
        `}</style>
      </div>
    </section>
  )
}
