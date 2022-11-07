import About from '@components/About/About'
import { getHistoryDatabase, getSocialMediaDatabas } from 'services'

/*
  * 
  *  const octokit = new Octokit({
  ? auth: process.env.TOKEN_GITHUB,
  * })

  *const result = await octokit.request('GET /repos/{owner}/{repo}/issues', {
  ?  owner: 'dalvinxo',
  ?  repo: 'pro-portafolio',
  * })  
  */

const fetchDataAbout = async (): Promise<{
  history: Array<{ id: number; message: string }>
  social: Array<{ id: number; name: string; link: string }>
}> => {
  const socials = await getSocialMediaDatabas()
  const histories = await getHistoryDatabase()

  return {
    history: histories,
    social: socials,
  }
}

export default async function Home() {
  const data = await fetchDataAbout()

  return (
    <div>
      <About data={data.history} social={data.social} />
    </div>
  )
}
