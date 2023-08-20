import { Metadata } from 'next'
import Portafolies from './Portafolies'
import Repositories from './Repositories'
import { getPortafoliesWorking } from 'services'
import { environment } from 'var-contants'

export const metadata: Metadata = {
  title: 'Projects',
}

const getGithubRepository = async () => {
  const res = await fetch('https://api.github.com/users/dalvinxo/repos', {
    headers: {
      Authorization: `bearer ${environment.TOKEN_GITHUB}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 180 },
  }).then((res) => res.json())

  const portafolies = await getPortafoliesWorking()

  let infoGithub = res

  const data = infoGithub.map((repos) => ({
    name: repos.name,
    link: repos.html_url,
    language: repos.languages_url,
    description: repos.description,
  }))

  return { repositories: data, portafolies }
}

const getListLanguageRepository = async (data) => {
  for (let item of data) {
    const languages = await fetch(item.language, {
      headers: {
        Authorization: `bearer ${environment.TOKEN_GITHUB}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())

    item.language = Object.keys(languages)
  }

  return data
}

const ProjectsPages = async () => {
  const project = await getGithubRepository()
  const dataProjects = await getListLanguageRepository(project.repositories)

  return (
    <div>
      <section className="flex flex-col mt-8 mx-6 watch:mt-3 watch:mx-0 items-center">
        <article className="container">
          <Portafolies proyects={project.portafolies} />
        </article>
        <article className="container">
          <Repositories data={dataProjects} />
        </article>
      </section>
    </div>
  )
}

export default ProjectsPages
