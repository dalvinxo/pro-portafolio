'use client'

import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
        <div
          className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-10"
          role="alert"
          aria-live="assertive">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            {lang === 'en' ? 'Unexpected error' : 'Error inesperado'}
          </p>
          <p className="mt-4 text-6xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-7xl">
            {translate.error.code}
          </p>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            {translate.error.message}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            {translate.error.description}
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300">
              {lang === 'en' ? 'Try again' : 'Intentar de nuevo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
