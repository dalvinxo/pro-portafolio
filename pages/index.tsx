import type { NextPage } from 'next'



const Home: NextPage = () => {

  console.log(JSON.stringify(process.env, null, 2), process.env.NEXT_PUBLIC_NOTION_SECRECT, process.env.NODE_ENV, process.env.CI, process.env.NOTION_SECRECT, ' hola desde aqui... ');

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default Home
