'use client'

import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          transition={{ type: 'linear' }}>
          <section className="px-4 sm:px-6 lg:px-8 py-2">
            {children}
          </section>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default PageWrapper
