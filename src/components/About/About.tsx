import Image from 'next/image'
// import { BiRadioCircle } from 'react-icons/bi'

const About = () => {
  return (
    <div className="container min-h-[60vh] flex items-center my-3">
      <div className="max-h-min">
        <div className="grid grid-cols-5 gap-3 auto-rows-fr">
          <div className="shrink col-span-3 py-2 flex flex-col">
            <h3 className="text-xl py-7">
              Soy un entusiasta desarrollador de software que busca siempre
              salir del confort y ser mejor que antes cada día.
            </h3>
          </div>
          <div className="col-span-2 max-w-sm mx-auto">
            <Image
              className="rounded-3xl"
              alt="icon profile"
              src="/img/avatar_profile.png"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
