import type { NextPage } from 'next'



const Home: NextPage = () => {

  console.log(process.env, ' hola desde aqui... ');

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default Home
