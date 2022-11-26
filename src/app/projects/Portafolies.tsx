import { IoEye, IoLogoGithub, IoRocket, IoConstruct } from 'react-icons/io5'
import HeadSection from '@common/HeadSection'
import { FormatterDate } from 'helpers'

type TypeProyects = {
  name: any
  state: any
  deploy: any
  repository: any
  date: any
}

const Portafoly = ({ proyects }: { proyects: Array<TypeProyects> }) => {
  return (
    <div>
      <HeadSection title="App" />
      <menu className="my-7 space-y-3">
        <li className="my-5 px-2 flex justify-between items-center py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-slate-900/10">
          <div className="flex-1">
            <h3 className="text-2xl">Linemerd</h3>
            <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="text-red-500/80">
                <IoConstruct className="animate-pulse shadow-3xl shadow-red-500/60 rounded-full inline-block" />{' '}
                working
              </div>
              <div className="text-slate-300/80">
                <IoRocket className="inline-block" /> {'pending'}
              </div>
            </div>
          </div>
          <div className="grid-cols-2 inline-grid sm:w-20 gap-3 text-slate-300/50">
            <IoEye className="hover:bg-slate-900 hover:text-blue-400/80 rounded-full h-9 w-9 p-1" />
            <IoLogoGithub className="hover:bg-slate-900 hover:text-white rounded-full h-9 w-9 p-1" />
          </div>
        </li>

        <li className="my-5 px-2 flex justify-between items-center py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-slate-900/10">
          <div className="flex-1">
            <h3 className="text-2xl">Linemerd</h3>
            <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="text-emerald-600/75">
                <IoConstruct className="rounded-full inline-block" /> completed
              </div>
              <div className="text-slate-300/80">
                <IoRocket className="inline-block" />{' '}
                {new Date().toLocaleString() + ''}
              </div>
            </div>
          </div>
          <div className="grid-cols-2 inline-grid sm:w-20 gap-3 text-slate-300/50">
            <IoEye className="hover:bg-slate-900 hover:text-blue-400/80 rounded-full h-9 w-9 p-1" />
            <IoLogoGithub className="hover:bg-slate-900 hover:text-white rounded-full h-9 w-9 p-1" />
          </div>
        </li>

        {proyects.map((project) => (
          <li
            key={project.name}
            className="my-5 px-2 flex justify-between items-center py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-slate-900/10">
            <div className="flex-1">
              <h3 className="text-2xl">{project.name}</h3>
              <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="text-red-500/80">
                  <IoConstruct className="animate-pulse shadow-3xl shadow-red-500/60 rounded-full inline-block" />{' '}
                  {project.state}
                </div>
                <div className="text-slate-300/80">
                  <IoRocket className="inline-block" />{' '}
                  {FormatterDate(project.date) ?? 'Pending'}
                </div>
              </div>
            </div>
            <div className="grid-cols-2 inline-grid sm:w-20 gap-3 text-slate-300/50">
              {project.deploy && (
                <IoEye className="hover:bg-slate-900 hover:text-blue-400/80 rounded-full h-9 w-9 p-1" />
              )}
              {project.repository && (
                <IoLogoGithub className="hover:bg-slate-900 hover:text-white rounded-full h-9 w-9 p-1" />
              )}
            </div>
          </li>
        ))}
      </menu>
    </div>
  )
}

export default Portafoly
