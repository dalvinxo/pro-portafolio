// import Portafoly from '@components/Portafoly'
// import Repositories from '@components/Repositories'
import { NextPage } from 'next'
// import dynamic from 'next/dynamic'

// const Repositories = dynamic(() => import('@components/Repositories'), {
//   ssr: false,
// })

// const Portafoly = dynamic(() => import('@components/Portafoly'), {
//   ssr: false,
// })

const ProjectsPages: NextPage = () => (
  <div>
    <section className="flex flex-col mt-8 mx-6 items-center">
      <article className="container">{/* <Portafoly /> */}</article>
      <article className="container">{/* <Repositories /> */}</article>
    </section>
  </div>
)

export default ProjectsPages
