import About from './About'
import { getHistoryDatabase, getSocialMediaDatabas } from 'services'

export const revalidate = 1200

const fetchDataAbout = async (): Promise<{
  histories: Array<{ id: number; message: string }>
  social: Array<{ id: any; name: string; link: string }>
}> => {
  const [histories, social] = await Promise.all([
    getHistoryDatabase(),
    getSocialMediaDatabas(),
  ])

  return {
    histories,
    social,
  }
}

export default async function Home() {
  const data = await fetchDataAbout()

  return (
    <div>
      <About data={data.histories} social={data.social} />
    </div>
  )
}
