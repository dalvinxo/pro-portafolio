// import { Client } from '@notionhq/client'
import About from '@components/About/About'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  // const notion = new Client({
  //   auth: process.env.NOTION_SECRECT
  // });

  // const data = await notion.blocks.children.list({
  //   block_id: process.env.PAGE_ID || 'af18787b0125493ab83aa2e240a01e29'
  // })
  const data = [
    {
      id: 9,
      message:
        'Soy un entusiasta desarrollador de software que busca siempre salir del confort y ser mejor que antes cada día.',
    },
    {
      id: 1,
      message: 'Ser mejor que lo demas es el objetivo',
    },
    {
      id: 2,
      message: 'Estamos superando nuestro limites',
    },
  ]

  return {
    props: {
      info: 'test',
      data,
    },
  }
}

interface Props {
  info?: ListBlockChildrenResponse
  data: Array<{ id: number; message: string }>
}

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <About data={props.data} />
    </div>
  )
}

export default Home
