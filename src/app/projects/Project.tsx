'use client'

import {
  IoArrowForward,
  IoArrowUp,
  IoCalendarClearOutline,
  IoLogoGithub,
} from 'react-icons/io5'

import StatusProject from '@common/StatusProject'
import { FormatterDate } from 'helpers'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch (error) {
    return null
  }
}

const Project = ({
  proyect,
  index,
}: {
  proyect: TypeProyects
  index: number
}) => {
  const { name, nameSpanish, state, date, deploy, repository } = proyect
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const projectName = (lang === 'en' ? name : nameSpanish) || name
  const formattedDate = date
    ? FormatterDate(date)
    : translate.project.status.pending
  const hostname = deploy ? getHostname(deploy) : null

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/40 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between gap-3">
        <StatusProject
          state={Boolean(state)}
          message={
            state ? translate.project.status.done : translate.project.status.do
          }
        />
        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative mt-6 flex-1 space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {projectName}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <IoCalendarClearOutline
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            <time dateTime={date ?? undefined}>{formattedDate}</time>
          </span>
          {hostname && <span className="truncate">{hostname}</span>}
        </div>
      </div>

      {(deploy || repository) && (
        <div className="relative mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
          {deploy && (
            <a
              href={deploy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${translate.project['aria-label'].eye}: ${projectName}`}
              className="group/link inline-flex items-center gap-2 rounded-full bg-accent-solid px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-solid/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
              {lang === 'en' ? 'Live preview' : 'Vista en línea'}
              <IoArrowUp
                className="h-3.5 w-3.5 rotate-45 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}

          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${translate.project['aria-label'].github}: ${projectName}`}
              className="group/link inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5">
              <IoLogoGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
              <IoArrowForward
                className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default Project
