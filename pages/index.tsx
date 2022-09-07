// import { Client } from '@notionhq/client'
// import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import type { NextPage } from 'next'
import useSWR from 'swr';


// export const getServerSideProps: GetServerSideProps = async () => {

  
  // const notion = new Client({
  //   auth: process.env.NOTION_SECRECT
  // });

  // const data = await notion.blocks.children.list({
  //   block_id: process.env.PAGE_ID || 'af18787b0125493ab83aa2e240a01e29'
  // })

  // return {
  //   props: {
  //     info: data
  //   }
  // }

// }

// interface Props {
//   info?: ListBlockChildrenResponse;
// }
const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {

  const { data } = useSWR('/api/notion', fetcher)

  const info = data;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <pre>
        {JSON.stringify(info || {}, null, 2)}
      </pre>

    </div>
  )
}

export default Home

