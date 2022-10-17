import HeadSection from '@common/HeadSection'

const Repositories = () => {
  return (
    <div>
      <HeadSection title="Repositories Github" />
      <ol className="py-7 px-2 grid grid-row-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-3">
        <li className="border p-4 rounded-md shadow-md hover:bg-slate-900/25 border-slate-600 hover:-translate-y-1.5 hover:shadow-lg">
          <div className="flex flex-col space-y-4">
            <a href="">miniproyecto_ITla</a>
            <div>
              Primer miniproyecto, ItlaTwitter en la materia de programacion 3.
              dirigida por Leonardo Tavarez.
            </div>
            <div>C#, Etc.</div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Repositories
