import About from '@components/About/About'
import { getHistoryDatabase } from 'services'

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

export const dynamic = 'force-dynamic'

const fetchDataAbout = async (): Promise<{
  history: Array<{ id: number; message: string }>
}> => {
  const histories = await getHistoryDatabase()

  return {
    history: histories,
  }
}

export default async function Home() {
  const data = await fetchDataAbout()

  return (
    <div>
      <About data={data.history} />
    </div>
  )
}
