import Portafolio from '@components/Portafolio'
import { NextPage } from 'next'

const ProjectsPages: NextPage = () => (
  <>
    <section className="flex flex-col items-center mt-8 mx-6">
      <Portafolio />
      <article className="container">
        <h4 className="text-lg">Repository</h4>
      </article>
    </section>
  </>
)

export default ProjectsPages
