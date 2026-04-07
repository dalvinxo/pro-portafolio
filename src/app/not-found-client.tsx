'use client'

import Link from 'next/link'
import { IoHomeOutline } from 'react-icons/io5'

import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { routers } from 'var-contants'

export default function NotFoundClient() {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { navlink },
  } = routers

  const homeLink = {
    path: navlink[0].path,
    aliasText: navlink[0].alias(lang),
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
        <div
          className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-10"
          role="alert">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            {lang === 'en' ? 'Page missing' : 'Pagina no encontrada'}
          </p>
          <p className="mt-4 text-6xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-7xl">
            {translate.notFound.code}
          </p>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            {translate.notFound.message}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            {translate.notFound.description}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href={homeLink.path}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
              title={homeLink.aliasText}>
              <IoHomeOutline className="h-4 w-4" aria-hidden="true" />
              <span>{homeLink.aliasText}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
