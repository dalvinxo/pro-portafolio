'use client'

import { IoEye, IoLogoGithub } from 'react-icons/io5'
import { FormatterDate } from 'helpers'
import { Fragment } from 'react'
import StatusProject from '@common/StatusProject'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'

const Project = ({ proyect }: { proyect: TypeProyects }) => {
  const { name, nameSpanish, state, date, deploy, repository } = proyect

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <Fragment>
      <li className="my-5 watch:w-full watch:my-2 px-2 watch:px-1 flex xs:flex-col justify-between items-center watch:items-stretch watch:flex-nowrap py-3 xs:py-1 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 dark:hover:bg-slate-900/10 hover:bg-gray-200">
        <div className="flex-1">
          <h3 className="text-2xl xs:text-center">
            {lang == 'en' ? name : nameSpanish}
          </h3>
          <div className="text-lg mt-0 flex flex-col items-center sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <StatusProject
              state={state}
              message={
                state
                  ? translate.Project.status.done
                  : translate.Project.status.do
              }
            />
            <div className="dark:text-slate-300/80 text-gray-600">
              🚀{FormatterDate(date) ?? translate.Project.status.pending}
            </div>
          </div>
        </div>
        <div
          className={`${
            deploy && repository ? 'grid-cols-2' : 'grid-cols-1'
          } inline-grid sm:w-20 gap-3 dark:text-slate-300/50 text-slate-900/70`}>
          {deploy && (
            <a
              href={deploy}
              target={'_blank'}
              rel={'noreferrer'}
              aria-label={translate.Project['aria-label'].eye}>
              <IoEye className="transition-colors duration-300 hover:bg-slate-900 dark:hover:text-blue-400/80 hover:text-white rounded-full h-9 w-9 p-1" />
            </a>
          )}
          {repository && (
            <a
              href={repository}
              target={'_blank'}
              rel={'noreferrer'}
              aria-label={translate.Project['aria-label'].github}>
              <IoLogoGithub className="transition-colors duration-300 hover:bg-slate-900 hover:text-white rounded-full h-9 w-9 p-1" />
            </a>
          )}
        </div>
      </li>
    </Fragment>
  )
}

export default Project
