import About from './About'
import { getHistoryDatabase, getSocialMediaDatabas } from 'services'
import PageWrapper from '@common/PageWrapper'

export const revalidate = 1200

const fetchDataAbout = async (): Promise<{
  histories: Array<{
    id: number
    message: string
    messageSpanish: string | null
  }>
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

  const { histories, social } = data

  return (
    <div>
      <PageWrapper>
        <About data={histories} social={social} />
      </PageWrapper>
    </div>
  )
}
