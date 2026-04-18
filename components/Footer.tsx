'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: 4,
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Image src="/logo.png" alt="Arpit Verma" width={28} height={28} style={{ display: 'block', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-2)', fontFamily: 'var(--sans)' }}>
                Arpit Verma
              </div>
              <div className="t-label" style={{ marginTop: '0.1rem' }}>
                AI Product Builder · Ghaziabad, India
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="t-label link-hover" style={{ color: 'var(--text-3)' }}>
                {l}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/Arpit-Ve' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arpit-verma-bca-graduate/' },
              { label: 'Email', href: 'mailto:vermaarpit627@gmail.com' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="t-label"
                whileHover={{ color: 'var(--text-1)' }}
                style={{ color: 'var(--text-3)', textDecoration: 'none' }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="t-label" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Arpit Verma. All rights reserved. · +91 78628 02320
          </span>
          <span className="t-label" style={{ color: 'var(--text-3)' }}>
            Built with Next.js · Framer Motion · Vercel
          </span>
        </div>
      </div>
    </footer>
  )
}
