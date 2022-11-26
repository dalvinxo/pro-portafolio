import HeadSection from '@common/HeadSection'
import Project from './Project'

const Portafoly = ({ proyects }: { proyects: Array<TypeProyects> }) => {
  return (
    <div>
      <HeadSection title="App" />
      <menu className="my-7 space-y-3">
        {proyects.map((proyect) => (
          <Project key={proyect.name} proyect={proyect} />
        ))}
      </menu>
    </div>
  )
}

export default Portafoly
