'use client'

import { IoEye, IoLogoGithub } from 'react-icons/io5'
import { FormatterDate } from 'helpers'
import StatusProject from '@common/StatusProject'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'

const Project = ({ proyect }: { proyect: TypeProyects }) => {
  const { name, nameSpanish, state, date, deploy, repository } = proyect
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <li
      className="group relative bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 
      dark:border-slate-700/50 shadow-sm transition-all duration-300 
      hover:shadow-lg hover:-translate-y-1 transform-gpu">
      <div className="flex flex-col sm:flex-row items-start p-5 sm:p-6 gap-6">
        <div className="flex-1 min-w-0 space-y-3">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
            {lang == 'en' ? name : nameSpanish}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusProject
              state={state}
              message={
                state
                  ? translate.Project.status.done
                  : translate.Project.status.do
              }
            />
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <span className="inline-block w-4 h-4 mr-1.5">🚀</span>
              <span>
                {FormatterDate(date) ?? translate.Project.status.pending}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center ml-auto">
          {deploy && (
            <ProjectLink
              href={deploy}
              ariaLabel={translate.Project['aria-label'].eye}
              icon={<IoEye className="w-5 h-5" />}
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
            />
          )}
          {repository && (
            <ProjectLink
              href={repository}
              ariaLabel={translate.Project['aria-label'].github}
              icon={<IoLogoGithub className="w-5 h-5" />}
              className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            />
          )}
        </div>
      </div>
    </li>
  )
}

interface ProjectLinkProps {
  href: string
  ariaLabel: string
  icon: React.ReactNode
  className?: string
}

const ProjectLink = ({
  href,
  ariaLabel,
  icon,
  className = '',
}: ProjectLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={ariaLabel}
    className={`
      p-2.5 rounded-lg transition-all duration-200
      hover:scale-105 focus:scale-105 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800
      ${className}
    `}>
    {icon}
  </a>
)

export default Project
