import { Metadata } from 'next'
import Portafolies from './Portafolies'
import Repositories from './Repositories'
import { getPortafoliesWorking } from 'services'
import { environment } from 'var-contants'
import PageWrapper from '@common/PageWrapper'

type GithubRepositoryResponse = {
  name: string
  html_url: string
  languages_url: string
  description: string | null
}

type RepositoryItem = {
  name: string
  link: string
  language: string[]
  description: string | null
}

type RepositoryItemPendingLanguages = {
  name: string
  link: string
  languagesUrl: string
  description: string | null
}

export const metadata: Metadata = {
  title: 'Projects',
}

const getGithubRepository = async (): Promise<{
  repositories: RepositoryItemPendingLanguages[]
  portafolies: TypeProyects[]
}> => {
  const res = await fetch('https://api.github.com/users/dalvinxo/repos', {
    headers: {
      Authorization: `bearer ${environment.TOKEN_GITHUB}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 180 },
  })

  const repositories = (await res.json()) as GithubRepositoryResponse[]

  const portafolies = await getPortafoliesWorking()

  const data = repositories.map((repos) => ({
    name: repos.name,
    link: repos.html_url,
    languagesUrl: repos.languages_url,
    description: repos.description,
  }))

  return { repositories: data, portafolies }
}

const getListLanguageRepository = async (
  data: RepositoryItemPendingLanguages[]
): Promise<RepositoryItem[]> => {
  return Promise.all(
    data.map(async (item) => {
      const response = await fetch(item.languagesUrl, {
        headers: {
          Authorization: `bearer ${environment.TOKEN_GITHUB}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
      })

      const languages = (await response.json()) as Record<string, number>

      return {
        ...item,
        language: Object.keys(languages),
      }
    })
  )
}

const ProjectsPages = async () => {
  const project = await getGithubRepository()
  const dataProjects = await getListLanguageRepository(project.repositories)

  return (
    <PageWrapper>
      <div className="flex flex-col space-y-8">
        <article className="w-full max-w-7xl mx-auto">
          <Portafolies proyects={project.portafolies} />
        </article>
        <article className="w-full max-w-7xl mx-auto">
          <Repositories data={dataProjects} />
        </article>
      </div>
    </PageWrapper>
  )
}

export default ProjectsPages
