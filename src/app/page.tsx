// import { Client } from '@notionhq/client'
import About from '@components/About/About'
// import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
// import type { GetStaticProps, NextPage } from 'next'
// import { resolve } from 'path'
// import { Octokit } from 'octokit'

// interface Props {
//   info?: ListBlockChildrenResponse
//   data: Array<{ id: number; message: string }>
// }

const fetchDataAbout = async (): Promise<{
  information: Array<{
    id: number
    message: string
  }>
}> => {
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

  // const notion = new Client({
  //   auth: process.env.NOTION_SECRECT
  // });

  // const data = await notion.blocks.children.list({
  //   block_id: process.env.PAGE_ID || 'af18787b0125493ab83aa2e240a01e29'
  // })

  // const octokit = new Octokit({
  // auth: process.env.TOKEN_GITHUB,
  // })

  // const result = await octokit.request('GET /repos/{owner}/{repo}/issues', {
  //   owner: 'dalvinxo',
  //   repo: 'pro-portafolio',
  // })

  const content = await new Promise<
    Array<{
      id: number
      message: string
    }>
  >((resolve) =>
    setTimeout(() => {
      resolve(data)
    }, 2000)
  )

  return {
    information: content,
  }
}

export default async function Home() {
  // const octokit = new Octokit({
  //   auth: process.env.TOKEN_GITHUB
  // });

  const data = await fetchDataAbout()

  // const gets = async () => {
  //   const result = await octokit.request("GET /user/emails");

  //   console.log(result);
  // }

  // useEffect(()=> {
  //   gets();
  // }, []);

  console.log(data)

  return (
    <div>
      <About data={data.information} />
    </div>
  )
}
