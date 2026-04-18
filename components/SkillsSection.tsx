'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* Marquee strip for skills */
const allSkills = [
  'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Python',
  'Google Gemini API', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'scikit-learn',
  'LLM Integration', 'Prompt Engineering', 'PostgreSQL', 'MongoDB Atlas', 'MySQL',
  'REST API', 'Docker', 'Vercel', 'Railway', 'Render', 'Cloudflare',
  'Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Feature Engineering',
  'JWT / OAuth2', 'Figma', 'VS Code', 'GitHub',
]

function Marquee() {
  const doubled = [...allSkills, ...allSkills]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0', marginBottom: '4rem' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {doubled.map((s, i) => (
          <span key={i} className="t-label" style={{ color: 'var(--text-3)', flexShrink: 0 }}>
            {s}
            <span style={{ marginLeft: '2.5rem', color: 'var(--border-2)' }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const groups = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend & DB',
    skills: ['Node.js', 'Express.js', 'Python', 'Flask', 'PostgreSQL', 'MongoDB Atlas', 'MySQL', 'REST API'],
  },
  {
    title: 'AI / ML',
    skills: ['Google Gemini API', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'scikit-learn', 'LLM Integration', 'Prompt Engineering'],
  },
  {
    title: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Feature Engineering', 'Supervised Learning', 'Jupyter'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker (basics)', 'Vercel', 'Railway', 'Render', 'Cloudflare', 'GitHub', 'Figma', 'VS Code'],
  },
]

export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="skills" className="section">
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            003 — Stack
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* Scrolling marquee */}
        <Marquee />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }} className="skills-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0, 0, 1] }}
          >
            <h2 className="t-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1.5rem' }}>
              Tools of the <em style={{ color: 'var(--accent)' }}>trade.</em>
            </h2>
            <p className="t-body" style={{ marginBottom: '2rem' }}>
              A production-proven stack for AI pipelines, full-stack SaaS, and ML deployment.
              Skilled in LLM integration, REST APIs, computer vision, and cloud deployment on Vercel, Railway, and Render.
            </p>
            <p className="t-body" style={{ fontSize: '0.875rem' }}>
              Languages:{' '}
              <span style={{ color: 'var(--text-1)' }}>Python · JavaScript</span>
            </p>
          </motion.div>

          {/* Right — grouped list with stagger */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {groups.map((g, gi) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + gi * 0.1, ease: [0.25, 0, 0, 1] }}
                style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <span className="t-label" style={{ color: 'var(--accent)' }}>{g.title}</span>
                  <span className="t-label">{String(g.skills.length).padStart(2, '0')} tools</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem 1.25rem' }}>
                  {g.skills.map(s => (
                    <motion.span
                      key={s}
                      whileHover={{ color: 'var(--text-1)' }}
                      style={{ fontSize: '0.875rem', color: 'var(--text-2)', fontFamily: 'var(--sans)', cursor: 'default', transition: 'color 0.2s ease' }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
        `}</style>
      </div>
    </section>
  )
}
