'use client'

import { useScroll, useSpring, motion } from 'framer-motion'

/**
 * A thin progress bar at the very top of the viewport
 * that fills as you scroll down the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1.5px',
        background: 'var(--accent)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 99999,
        opacity: 0.8,
      }}
    />
  )
}
