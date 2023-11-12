'use client'

import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          transition={{ type: 'linear' }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PageWrapper
