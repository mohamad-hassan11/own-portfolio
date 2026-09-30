'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

// CSS forces the final state for reduced motion without changing hydrated markup.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={`motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${className ?? ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
