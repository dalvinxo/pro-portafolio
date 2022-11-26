import { IoEye, IoLogoGithub, IoRocket } from 'react-icons/io5'
import { FormatterDate } from 'helpers'
import { Fragment } from 'react'
import StatusProject from '@common/StatusProject'

const Project = ({ proyect }: { proyect: TypeProyects }) => {
  const { name, state, date, deploy, repository } = proyect

  return (
    <Fragment>
      <li className="my-5 px-2 flex justify-between items-center py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-slate-900/10">
        <div className="flex-1">
          <h3 className="text-2xl">{name}</h3>
          <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <StatusProject state={state} />
            <div className="text-slate-300/80">
              <IoRocket className="inline-block" />{' '}
              {FormatterDate(date) ?? 'Pending'}
            </div>
          </div>
        </div>
        <div className="grid-cols-2 inline-grid sm:w-20 gap-3 text-slate-300/50">
          {deploy && (
            <a href={deploy} target={'_blank'} rel={'noreferrer'}>
              <IoEye className="hover:bg-slate-900 hover:text-blue-400/80 rounded-full h-9 w-9 p-1" />
            </a>
          )}
          {repository && (
            <a href={repository} target={'_blank'} rel={'noreferrer'}>
              <IoLogoGithub className="hover:bg-slate-900 hover:text-white rounded-full h-9 w-9 p-1" />
            </a>
          )}
        </div>
      </li>
    </Fragment>
  )
}

export default Project
