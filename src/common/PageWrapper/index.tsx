'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { EASE_OUT } from '@common/Motion'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="py-2"
      initial={
        shouldReduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }
      }
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: EASE_OUT }}>
      {children}
    </motion.section>
  )
}

export default PageWrapper
