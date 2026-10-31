'use client'

import { EASE_OUT } from '@common/Motion'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslateContext } from 'providers'
import { classifyThoughts, toThought } from '@utils/thoughts'

export type PhilosophyItem = {
  id: number
  message: string
  messageSpanish: string | null
  category?: string | null
}

// Only announced to screen readers; the content speaks for itself on screen
const label = {
  en: 'My philosophy',
  es: 'Mi filosofía',
}

const reveal = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: EASE_OUT },
})

const QuoteGlyph = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={`fill-current ${className}`}>
    <path d="M13 8c-5 1.6-8 5.6-8 11v5h8v-8H9c0-3.2 1.6-5.4 4.8-6.6L13 8Zm14 0c-5 1.6-8 5.6-8 11v5h8v-8h-4c0-3.2 1.6-5.4 4.8-6.6L27 8Z" />
  </svg>
)

const Philosophy = ({ items }: { items: PhilosophyItem[] }) => {
  const { lang } = useTranslateContext()
  const reduceMotion = useReducedMotion() ?? false

  const thoughts = classifyThoughts(
    items
      .map((item) => ({
        thought: toThought(
          item.id,
          (lang === 'en' ? item.message : item.messageSpanish) ||
            item.message ||
            item.messageSpanish ||
            ''
        ),
        category: item.category ?? null,
      }))
      .filter(({ thought }) => thought.text)
  )

  if (thoughts.length === 0) return null

  const welcome = thoughts.filter((thought) => thought.kind === 'welcome')
  const cards = thoughts.filter((thought) => thought.kind === 'thought')
  const quotes = thoughts.filter((thought) => thought.kind === 'quote')

  return (
    <section aria-label={label[lang] ?? label.en} className="space-y-4">
      {welcome.map((thought) => (
        <motion.p
          key={thought.id}
          {...reveal(reduceMotion)}
          className="max-w-3xl border-l-2 border-accent/60 py-1 pl-5 text-xl leading-9 text-slate-700 dark:text-slate-200 sm:pl-6 sm:text-2xl sm:leading-10">
          {thought.text}
        </motion.p>
      ))}

      {cards.length > 0 && (
        <div
          className={`grid gap-4 md:grid-cols-2 ${
            welcome.length ? 'pt-6' : ''
          }`}>
          {cards.map((thought, index) => (
            <motion.figure
              key={thought.id}
              {...reveal(reduceMotion, index * 0.08)}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-7 backdrop-blur transition-colors duration-300 hover:border-accent/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/40 sm:p-8 ${
                cards.length % 2 === 1 && index === cards.length - 1
                  ? 'md:col-span-2'
                  : ''
              }`}>
              <QuoteGlyph className="h-8 w-8 text-accent/70 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <blockquote className="mt-5 text-lg font-medium leading-8 text-slate-800 dark:text-slate-100 sm:text-xl sm:leading-9">
                {thought.text}
              </blockquote>
            </motion.figure>
          ))}
        </div>
      )}

      {quotes.map((thought) => (
        <motion.figure
          key={thought.id}
          {...reveal(reduceMotion, 0.1)}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-2 p-[2px] shadow-xl shadow-accent/10">
          <div className="relative rounded-[calc(1.5rem-2px)] bg-white px-7 py-10 text-center dark:bg-slate-950 sm:px-12 sm:py-14">
            <QuoteGlyph className="pointer-events-none absolute left-6 top-6 h-16 w-16 text-accent/10 sm:h-24 sm:w-24" />
            {thought.lead && (
              <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {thought.lead.replace(/:$/, '')}
              </p>
            )}
            <blockquote className="relative mx-auto max-w-3xl text-xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white sm:text-2xl sm:leading-10">
              {thought.text}
            </blockquote>
            {thought.author && (
              <figcaption className="relative mt-6 inline-flex items-center gap-3 text-sm font-medium text-accent-ink">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {thought.author}
              </figcaption>
            )}
          </div>
        </motion.figure>
      ))}
    </section>
  )
}

export default Philosophy
