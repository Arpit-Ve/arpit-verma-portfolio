'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

function MagneticBtn({ children, href, className, style, onClick, type }: any) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      href={href}
      type={type}
      onClick={onClick}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Tag>
  )
}

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1400))
    setStatus('sent')
  }

  const socials = [
    { label: 'Email', value: 'vermaarpit627@gmail.com', href: 'mailto:vermaarpit627@gmail.com' },
    { label: 'GitHub', value: 'github.com/Arpit-Ve', href: 'https://github.com/Arpit-Ve' },
    { label: 'LinkedIn', value: 'linkedin.com/in/arpit-verma-bca-graduate', href: 'https://www.linkedin.com/in/arpit-verma-bca-graduate/' },
    { label: 'Location', value: 'Ghaziabad, India', href: '#' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}>
          <motion.span
            ref={ref} className="t-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            007 — Contact
          </motion.span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              style={{ height: '100%', background: 'var(--border-2)', transformOrigin: 'left' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }} className="contact-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0, 0, 1] }}
          >
            <h2 className="t-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Let&apos;s build{' '}
              <em style={{ color: 'var(--accent)' }}>something real.</em>
            </h2>
            <p className="t-body" style={{ marginBottom: '2.5rem' }}>
              Open to full-time SDE / AI roles, freelance projects, and meaningful
              collaborations. Based in Ghaziabad — available remotely.
              Typical response: under 24 hours.
            </p>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 2, padding: '0.5rem 0.875rem', background: 'rgba(74,222,128,0.04)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }}
              />
              <span className="t-label" style={{ color: 'rgba(74,222,128,0.8)' }}>Actively Looking · Open to Relocate</span>
            </motion.div>

            {/* Social links */}
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.125rem 0',
                  borderTop: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                <span className="t-label">{s.label}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-1)', fontFamily: 'var(--sans)' }}>
                  {s.value}
                </span>
              </motion.a>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0, 0, 1] }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                style={{ paddingTop: '2rem' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <div className="t-display" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Message received.</div>
                <p className="t-body">
                  Thanks {form.name}! I&apos;ll get back to you at <span style={{ color: 'var(--text-1)' }}>{form.email}</span> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="t-label" style={{ marginBottom: '2rem', display: 'block' }}>
                  Send a message — it only takes 30 seconds.
                </p>
                <div style={{ borderTop: '1px solid var(--border-2)' }}>
                  {[
                    { name: 'name', placeholder: 'Your full name', type: 'text' },
                    { name: 'email', placeholder: 'Your email address', type: 'email' },
                  ].map((f, i) => (
                    <motion.input
                      key={f.name}
                      type={f.type} name={f.name} required
                      value={(form as any)[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="input"
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      style={{ marginBottom: '1.75rem', display: 'block' }}
                    />
                  ))}
                  <motion.textarea
                    name="message" required rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or idea..."
                    className="input"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ marginBottom: '2.5rem', display: 'block' }}
                  />

                  <MagneticBtn
                    type="submit"
                    onClick={null}
                    className={`btn btn-primary`}
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.8125rem', display: 'flex', cursor: 'pointer' }}
                  >
                    {status === 'sending' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 12, height: 12, border: '1.5px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%' }}
                        />
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </MagneticBtn>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        `}</style>
      </div>
    </section>
  )
}
