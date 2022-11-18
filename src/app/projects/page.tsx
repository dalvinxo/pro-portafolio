// import Portafoly from '@components/Portafoly'
// import Repositories from '@components/Repositories'
// import dynamic from 'next/dynamic'

// const Repositories = dynamic(() => import('@components/Repositories'), {
//   ssr: false,
// })

// const Portafoly = dynamic(() => import('@components/Portafoly'), {
//   ssr: false,
// })

import Portafoly from '@components/Portafoly'
import Repositories from './Repositories'

const getGithubRepository = async () => {
  const res = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `bearer ${process.env.TOKEN_GITHUB}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 180 },
  }).then((res) => res.json())

  let infoGithub = res

  const data = infoGithub.map((repos) => ({
    name: repos.name,
    link: repos.html_url,
    language: repos.languages_url,
    description: repos.description,
  }))

  return data
}

const getListLanguageRepository = async (data) => {
  for (let item of data) {
    const languages = await fetch(item.language, {
      headers: {
        Authorization: `bearer ${process.env.TOKEN_GITHUB}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())

    item.language = Object.keys(languages)
  }

  return data
}

const ProjectsPages = async () => {
  const repositories = await getGithubRepository()
  const dataProjects = await getListLanguageRepository(repositories)

  return (
    <div>
      <section className="flex flex-col mt-8 mx-6 items-center">
        <article className="container">
          <Portafoly />
        </article>
        <article className="container">
          <Repositories data={dataProjects} />
        </article>
      </section>
    </div>
  )
}

export default ProjectsPages
