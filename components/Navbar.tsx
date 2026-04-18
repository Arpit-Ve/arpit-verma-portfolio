'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    /* Intersection observer for active section */
    const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact']
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(id) })
      }, { threshold: 0.4 })
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
        className={`nav ${scrolled ? 'scrolled' : ''}`}
      >
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              width: 30, height: 30,
              borderRadius: 4,
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Image src="/logo.png" alt="Arpit Verma" width={30} height={30} style={{ display: 'block', objectFit: 'cover' }} />
          </motion.div>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.02em', fontFamily: 'var(--sans)' }}>
              Arpit Verma
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="nav-links-desktop">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                color: activeSection === l.href.slice(1) ? 'var(--text-1)' : 'var(--text-2)',
                position: 'relative',
              }}
            >
              {l.label}
              {activeSection === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: 1, background: 'var(--accent)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <a href="mailto:vermaarpit627@gmail.com" className="nav-link nav-desktop-only" style={{ fontSize: '0.8rem' }}>
            vermaarpit627@gmail.com
          </a>
          <motion.a
            href="#contact"
            className="btn nav-desktop-only"
            style={{ padding: '0.475rem 1rem', fontSize: '0.75rem' }}
            whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            whileTap={{ scale: 0.96 }}
          >
            Hire Me
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            aria-label="Open menu"
          >
            <div style={{ width: 22 }}>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={
                    menuOpen
                      ? i === 0 ? { rotate: 45, y: 7, opacity: 1 }
                      : i === 1 ? { opacity: 0 }
                      : { rotate: -45, y: -7, opacity: 1 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  style={{
                    display: 'block', height: 1, marginBottom: i < 2 ? 6 : 0,
                    background: 'var(--text-1)',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            style={{
              position: 'fixed', top: 60, left: 0, right: 0, zIndex: 999,
              background: 'rgba(13,13,13,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0, 0, 1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{ textDecoration: 'none', fontSize: '1.125rem', color: 'var(--text-2)', fontFamily: 'var(--sans)' }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary"
                style={{ textAlign: 'center', justifyContent: 'center', fontSize: '0.8125rem' }}
              >
                Hire Me →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-links-desktop, .nav-desktop-only { display: flex !important; }
        .hamburger-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.25rem; }
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .nav-desktop-only { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
