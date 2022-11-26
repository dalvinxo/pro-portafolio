import About from '@components/About'
import { getHistoryDatabase } from 'services'

export const revalidate = 1200

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
