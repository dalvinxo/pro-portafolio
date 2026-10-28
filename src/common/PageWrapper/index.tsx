'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="py-2"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}>
      {children}
    </motion.section>
  )
}

export default PageWrapper
