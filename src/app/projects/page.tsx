import { Metadata } from 'next'
import Portafolies from './Portafolies'
import Repositories from './Repositories'
import { getPortafoliesWorking } from 'services'
import { environment } from 'var-contants'
import PageWrapper from '@common/PageWrapper'

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
    <div className="min-h-screen">
      <PageWrapper>
        <section className="flex flex-col space-y-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <article className="w-full max-w-7xl mx-auto">
            <Portafolies proyects={project.portafolies} />
          </article>
          <article className="w-full max-w-7xl mx-auto">
            <Repositories data={dataProjects} />
          </article>
        </section>
      </PageWrapper>
    </div>
  )
}

export default ProjectsPages
