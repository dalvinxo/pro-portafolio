import { IoEye, IoLogoGithub, IoRocket, IoConstruct } from 'react-icons/io5'

const Portafolio = () => {
  return (
    <article className="w-[900px]">
      <h2 className="block text-3xl font-bold first-letter:uppercase py-4 px-2">
        app
      </h2>
      <hr />
      <menu className="my-7 space-y-3">
        <li className="my-5 px-2 flex justify-between items-center hover:bg-slate-900 py-3 rounded-md shadow-md">
          <div className="flex-1">
            <h3 className="text-2xl">Linemerd</h3>
            <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="text-red-500/80">
                <IoConstruct className="animate-pulse shadow-3xl shadow-red-500/60 rounded-full inline-block" />{' '}
                working
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

        <li className="my-5 px-2 flex justify-between items-center hover:bg-slate-900 py-3 rounded-md shadow-md">
          <div className="flex-1">
            <h3 className="text-2xl">Linemerd</h3>
            <div className="text-lg mt-0 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="text-red-500/80">
                <IoConstruct className="animate-pulse shadow-3xl shadow-red-500/60 rounded-full inline-block" />{' '}
                working
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
      </menu>
    </article>
  )
}

export default Portafolio
