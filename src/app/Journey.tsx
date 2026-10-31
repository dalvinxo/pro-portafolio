'use client'

import { EASE_OUT } from '@common/Motion'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useTranslateContext } from 'providers'
import { useRef } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

export type JourneyItem = {
  id: number
  message: string
  messageSpanish: string | null
}

const copy = {
  en: {
    title: 'My journey',
    subtitle: 'How I got here',
    unavailable: 'The personal journey could not be loaded right now.',
    stage: (index: string) => `Stage ${index}`,
    now: 'Today',
    count: (total: number) => `${total} ${total === 1 ? 'stage' : 'stages'}`,
  },
  es: {
    title: 'Mi recorrido',
    subtitle: 'Cómo llegué hasta aquí',
    unavailable: 'El recorrido personal no se pudo cargar en este momento.',
    stage: (index: string) => `Etapa ${index}`,
    now: 'Actualidad',
    count: (total: number) => `${total} ${total === 1 ? 'etapa' : 'etapas'}`,
  },
}

const pad = (value: number) => String(value).padStart(2, '0')

const Journey = ({ items }: { items: JourneyItem[] }) => {
  const { lang } = useTranslateContext()
  const t = copy[lang] ?? copy.en
  const reduceMotion = useReducedMotion() ?? false

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const total = items.length

  const getMessage = (item: JourneyItem) =>
    (lang === 'en' ? item.message : item.messageSpanish) || item.message

  return (
    <section ref={sectionRef} aria-labelledby="journey-title">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink">
            {t.title}
          </p>
          <h2
            id="journey-title"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.subtitle}
          </h2>
        </div>
        {total > 0 && (
          <p className="font-mono text-xs text-slate-400">{t.count(total)}</p>
        )}
      </header>

      {total === 0 ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          <IoInformationCircleOutline className="mt-0.5 h-4 w-4 shrink-0" />
          {t.unavailable}
        </p>
      ) : (
        <ol className="relative">
          {/* Rail and the accent fill that follows the scroll */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-4 w-0.5 rounded-full bg-gradient-to-b from-slate-200 via-slate-200 to-transparent dark:from-white/10 dark:via-white/10 md:left-[calc(50%-1px)]"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : progress }}
            className="absolute bottom-0 left-[15px] top-4 w-0.5 origin-top rounded-full bg-gradient-to-b from-accent to-accent-2 md:left-[calc(50%-1px)]"
          />

          {items.map((item, index) => {
            const isLeft = index % 2 === 0
            const isLast = index === total - 1
            const number = pad(index + 1)

            return (
              <li
                key={item.id}
                className="relative pb-10 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-3 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:left-1/2">
                  {isLast && !reduceMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
                  )}
                  <span
                    className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-semibold ${
                      isLast
                        ? 'border-accent-solid bg-accent-solid text-white'
                        : 'border-accent/50 bg-white text-accent-ink dark:bg-slate-900'
                    }`}>
                    {number}
                  </span>
                </span>

                <motion.article
                  initial={
                    reduceMotion ? false : { opacity: 0, x: isLeft ? -24 : 24 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className={`group relative rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/40 sm:p-7 ${
                    isLeft ? 'md:col-start-1' : 'md:col-start-2'
                  }`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-3 select-none font-mono text-5xl font-bold leading-none text-slate-900/[0.04] transition-colors group-hover:text-accent/10 dark:text-white/[0.05]">
                    {number}
                  </span>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {t.stage(number)}
                    {isLast && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 normal-case tracking-normal text-accent-ink">
                        {t.now}
                      </span>
                    )}
                  </p>
                  <p className="relative mt-3 text-base leading-7 text-slate-700 dark:text-slate-200 sm:text-lg sm:leading-8">
                    {getMessage(item)}
                  </p>
                </motion.article>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

export default Journey
