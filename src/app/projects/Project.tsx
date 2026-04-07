'use client'

import {
  IoArrowForward,
  IoCalendarOutline,
  IoEye,
  IoLogoGithub,
} from 'react-icons/io5'

import StatusProject from '@common/StatusProject'
import { FormatterDate } from 'helpers'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'

const Project = ({ proyect }: { proyect: TypeProyects }) => {
  const { name, nameSpanish, state, date, deploy, repository } = proyect
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const projectName = lang === 'en' ? name : nameSpanish
  const formattedDate = date
    ? FormatterDate(date)
    : translate.project.status.pending

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {lang === 'en' ? 'Project' : 'Proyecto'}
            </p>
            <h3 className="truncate text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
              {projectName}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusProject
              state={Boolean(state)}
              message={
                state
                  ? translate.project.status.done
                  : translate.project.status.do
              }
            />

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <IoCalendarOutline className="h-4 w-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          {deploy && (
            <ProjectLink
              href={deploy}
              ariaLabel={translate.project['aria-label'].eye}
              icon={<IoEye className="h-4 w-4" aria-hidden="true" />}
              label={lang === 'en' ? 'Live preview' : 'Vista en linea'}
              tone="primary"
            />
          )}

          {repository && (
            <ProjectLink
              href={repository}
              ariaLabel={translate.project['aria-label'].github}
              icon={<IoLogoGithub className="h-4 w-4" aria-hidden="true" />}
              label="GitHub"
              tone="secondary"
            />
          )}
        </div>
      </div>
    </article>
  )
}

interface ProjectLinkProps {
  href: string
  ariaLabel: string
  icon: React.ReactNode
  label: string
  tone: 'primary' | 'secondary'
}

const ProjectLink = ({
  href,
  ariaLabel,
  icon,
  label,
  tone,
}: ProjectLinkProps) => {
  const toneClassName = {
    primary:
      'border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900/60 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:border-sky-800 dark:hover:bg-sky-500/15',
    secondary:
      'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${toneClassName[tone]}`}>
      {icon}
      <span>{label}</span>
      <IoArrowForward className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

export default Project
