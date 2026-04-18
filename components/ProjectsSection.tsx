'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  {
    id: '01',
    title: 'Biblio AI',
    tagline: 'AI Reading Companion · Co-Founded',
    category: 'AI Product · SaaS',
    image: '/images/biblio-ai.png',
    year: '2026',
    problem: 'Readers lacked a unified platform combining a vast library, AI-powered comprehension, social discovery, and freemium monetization in a single cohesive product.',
    solution: 'Co-founded and architected an AI reading app using Google Gemini API, React.js AI chat agent, personalized book recommendations, and a freemium tier system (Reader / Scholar / Author). Deployed on Vercel + Railway with dual-database backend (PostgreSQL + MongoDB Atlas) and Express.js REST APIs.',
    stack: ['React.js', 'Node.js', 'Express.js', 'Google Gemini API', 'PostgreSQL', 'MongoDB Atlas', 'Vercel', 'Railway'],
    impact: [
      { metric: 'Gemini', label: 'AI Chat Agent' },
      { metric: '3-Tier', label: 'Freemium Model' },
      { metric: 'Dual DB', label: 'PostgreSQL + Mongo' },
      { metric: 'Live', label: 'Vercel + Railway' },
    ],
    link: 'https://github.com/Arpit-Ve',
  },
  {
    id: '02',
    title: 'AI Business Outreach Automation',
    tagline: 'Lead Generation Pipeline · LLM + Email',
    category: 'AI Automation · Python',
    image: '/images/ai-outreach.png',
    year: '2024',
    problem: 'Manual B2B lead generation is slow, unscalable, and impersonal — causing low conversion rates and wasted sales effort.',
    solution: 'Automated lead gen & outreach system via Google Earth + OpenStreetMap → 500+ prospects using Google Gemini API with batching, deduplication/enrichment, and ~98% delivery reliability. Full pipeline from discovery → scoring → AI personalization → SMTP delivery.',
    stack: ['Python', 'Google Gemini API', 'OpenStreetMap', 'SMTP', 'MongoDB', 'n8n'],
    impact: [
      { metric: '500+', label: 'Prospects Generated' },
      { metric: '~98%', label: 'Delivery Reliability' },
      { metric: 'LLM', label: 'Personalization' },
      { metric: 'Full', label: 'Automated Pipeline' },
    ],
    link: '#',
  },
  {
    id: '03',
    title: 'Face Mask Detection',
    tagline: 'Computer Vision · MobileNetV2',
    category: 'AI / Computer Vision',
    image: '/images/face-mask.png',
    year: '2024',
    problem: 'Post-pandemic environments needed automated real-time mask compliance enforcement without manual monitoring overhead.',
    solution: 'ML model using TensorFlow, MobileNetV2, and OpenCV achieving 94%+ accuracy on live video streams with sub-50ms inference latency. Deployed via Flask for real-time edge inference.',
    stack: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'scikit-learn', 'Flask'],
    impact: [
      { metric: '94%+', label: 'Accuracy' },
      { metric: '<50ms', label: 'Inference Latency' },
      { metric: 'Live', label: 'Video Streams' },
      { metric: 'Edge', label: 'Deployable' },
    ],
    link: '#',
  },
  {
    id: '04',
    title: 'DeliverIt — Logistics System',
    tagline: 'MERN Stack · Driver Attendance',
    category: 'Full-Stack · Operations',
    image: '/images/deliverit.png',
    year: '2026',
    problem: 'Logistics companies relied on paper-based attendance tracking — causing compliance failures, location fraud, and zero operational visibility.',
    solution: 'Full-Stack MERN application to digitize logistics attendance, utilizing MongoDB Atlas to store vehicle entries. Built pandas-powered admin dashboard with live metrics, multi-device network access, automated Excel reporting, and WhatsApp integration for instant notifications.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Pandas', 'Tailwind CSS', 'Vercel'],
    impact: [
      { metric: 'Geo', label: 'Verified Entries' },
      { metric: 'Excel', label: 'Auto-Reporting' },
      { metric: 'WhatsApp', label: 'Notifications' },
      { metric: '45%', label: 'Less Manual Ops' },
    ],
    link: 'https://8087cc5a.urban-harvest.pages.dev/',
  },
  {
    id: '05',
    title: "A'Tech Builder",
    tagline: 'AI/ML + Web Dev Agency · Co-Founded',
    category: 'Agency · Full-Stack',
    image: '/images/atech-builder.png',
    year: '2024',
    problem: "Businesses needed a single tech partner for end-to-end AI/ML, data science, and web development — most agencies specialise in only one area, leaving clients to stitch together multiple vendors.",
    solution: "Co-founded A'Tech Builder — a duo development agency specialising in AI/ML, Data Science, and Web Development. Built the full agency website with project showcase, service offerings, client contact flow, and a dashboard. Secured 12+ projects and 5+ internship partnerships.",
    stack: ['React.js', 'Node.js', 'Tailwind CSS', 'Python', 'TensorFlow', 'MongoDB', 'Vercel'],
    impact: [
      { metric: '12+', label: 'Projects Delivered' },
      { metric: '5+', label: 'Internship Partners' },
      { metric: '8+', label: 'Technologies' },
      { metric: 'Live', label: 'Agency Site' },
    ],
    link: 'https://a-tech-builder-1.onrender.com/',
  },
]

function ProjectRow({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  /* Tilt for image */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-100, 100], [5, -5]), { stiffness: 200, damping: 25 })
  const ry = useSpring(useTransform(mx, [-100, 100], [-5, 5]), { stiffness: 200, damping: 25 })

  const handleImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleImgLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0, 0, 1] }}
    >
      {/* Row */}
      <div
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '3rem 1fr auto auto 2rem',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1.875rem 0',
          borderBottom: '1px solid var(--border)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        className="proj-row"
      >
        <motion.span
          className="t-label"
          animate={{ color: hovered ? 'var(--accent)' : 'var(--text-3)' }}
          transition={{ duration: 0.25 }}
        >
          {project.id}
        </motion.span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <motion.span
            className="t-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.625rem)' }}
            animate={{ color: hovered ? 'var(--text-1)' : 'var(--text-2)' }}
            transition={{ duration: 0.25 }}
          >
            {project.title}
          </motion.span>
          <span className="t-label proj-tagline-text">{project.tagline}</span>
        </div>

        <span className="t-label proj-cat" style={{ textAlign: 'right' }}>
          {project.category}
        </span>

        <span className="t-label" style={{ color: 'var(--text-3)', textAlign: 'right' }}>
          {project.year}
        </span>

        <motion.span
          animate={{ rotate: expanded ? 45 : 0, color: hovered ? 'var(--text-1)' : 'var(--text-3)' }}
          transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
          style={{ fontSize: '1.25rem', lineHeight: 1 }}
        >
          ↗
        </motion.span>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '2.5rem 0 3rem', borderBottom: '1px solid var(--border)' }} className="proj-detail">
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem' }} className="proj-inner">

                {/* Browser-frame image */}
                <motion.div
                  style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
                  onMouseMove={handleImgMove}
                  onMouseLeave={handleImgLeave}
                >
                  <div style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: '#1A1A1A',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                  }}>
                    {/* Browser chrome bar */}
                    <div style={{
                      background: '#252525',
                      padding: '0.55rem 0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      flexShrink: 0,
                    }}>
                      {/* Traffic lights */}
                      <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                        {[
                          { color: '#FF5F57', hover: '#FF3B30' },
                          { color: '#FEBC2E', hover: '#FF9F0A' },
                          { color: '#28C840', hover: '#30D158' },
                        ].map(d => (
                          <div key={d.color} style={{
                            width: 9, height: 9, borderRadius: '50%',
                            background: d.color, flexShrink: 0,
                          }} />
                        ))}
                      </div>
                      {/* URL bar */}
                      <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 5,
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.625rem',
                        color: 'rgba(255,255,255,0.3)',
                        fontFamily: 'var(--sans)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        letterSpacing: '0.01em',
                      }}>
                        🔒&nbsp;
                        {project.link !== '#'
                          ? project.link.replace('https://', '')
                          : `arpit-portfolio.vercel.app/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      </div>
                    </div>

                    {/* Screenshot — fixed height so image is always fully contained */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 280,
                      overflow: 'hidden',
                      background: 'var(--bg-3)',
                    }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top center',
                        }}
                        priority={project.id === '01'}
                      />
                      {/* Subtle bottom vignette */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(13,13,13,0.4))',
                        pointerEvents: 'none',
                      }} />
                      {/* Category badge */}
                      <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center',
                          fontSize: '0.6rem', fontWeight: 600,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.7)',
                          padding: '3px 8px',
                          background: 'rgba(0,0,0,0.6)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: 3,
                          fontFamily: 'var(--sans)',
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0, 0, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  {[
                    { label: 'Problem', text: project.problem },
                    { label: 'Solution', text: project.solution },
                  ].map(s => (
                    <div key={s.label}>
                      <span className="t-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent)' }}>{s.label}</span>
                      <p className="t-body" style={{ fontSize: '0.875rem' }}>{s.text}</p>
                    </div>
                  ))}

                  <div style={{ height: 1, background: 'var(--border)' }} />

                  <div>
                    <span className="t-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Stack</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {project.stack.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>

                  <div>
                    <span className="t-label" style={{ display: 'block', marginBottom: '0.875rem' }}>Impact</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                      {project.impact.map(m => (
                        <div key={m.label}>
                          <div className="t-display" style={{ fontSize: '1.5rem' }}>{m.metric}</div>
                          <div className="t-label" style={{ marginTop: '0.15rem' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="btn" style={{ width: 'fit-content', fontSize: '0.75rem' }}>
                      View Project ↗
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .proj-tagline-text { display: block; }
        .proj-cat { display: block; }
        @media (max-width: 768px) {
          .proj-row { grid-template-columns: 2.5rem 1fr 2rem !important; gap: 0.75rem !important; }
          .proj-cat { display: none !important; }
          .proj-inner { grid-template-columns: 1fr !important; }
          .proj-tagline-text { display: none !important; }
        }
      `}</style>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="section">
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            002 — Work
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
          <motion.span
            className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {projects.length} Projects
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{ maxWidth: 520, marginBottom: '3rem' }}
        >
          <h2 className="t-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', marginBottom: '0.875rem' }}>
            Projects that{' '}
            <em style={{ color: 'var(--accent)' }}>actually ship.</em>
          </h2>
          <p className="t-body" style={{ fontSize: '0.9rem' }}>
            Real-world AI and full-stack products with measurable outcomes.
            Click any row to reveal the full case study.
          </p>
        </motion.div>

        {projects.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
