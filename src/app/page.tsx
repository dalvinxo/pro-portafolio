import About from '@components/About/About'
import { useEffect, useState } from 'react'
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

;('use client')

const fetchDataAbout = async (): Promise<{
  history: Array<{ id: number; message: string }>
}> => {
  const histories = await getHistoryDatabase()

  return {
    history: histories,
  }
}

export default async function Home() {
  const [data, setdata] = useState(null)

  const setDataAbout = async () => {
    const info = await fetchDataAbout()
    setdata(info)
  }

  useEffect(() => {
    setDataAbout()
  }, [])

  return <div>{data && <About data={data.history} />}</div>
}
