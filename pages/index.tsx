import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'


export const getStaticProps: GetStaticProps = async (context) => {


  return {
    props: {
      info: {}
    }
  }

}

interface Props {
  info?: ListBlockChildrenResponse;
}


const Home: NextPage<Props> = ({ info }) => {

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
