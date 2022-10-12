import Image from 'next/image'
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoLogoGithub,
  IoLogoLinkedin,
} from 'react-icons/io5'

const About = () => {
  return (
    <div className="w-full h-[80vh]">
      <div className="w-11/12 h-full py-3 px-7 mx-auto flex flex-col justify-center">
        <div className="flex justify-center xs:flex-col">
          <div className="basis-1/2 xs:order-last">
            <div className="space-x-5 flex justify-center items-center text-sm py-3">
              <IoChevronBackSharp className="block text-sky-500/75 text-lg" />
              <label>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value="xs"
                  checked
                />
                <div className="w-3 h-3 flex items-center justify-center rounded-full border-2 border-sky-400/75 peer-checked:border-sky-400 peer-checked:bg-sky-400  peer-checked:shadow-3xl peer-checked:shadow-sky-300/50"></div>
              </label>
              <label>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value="s"
                />
                <div className="w-3 h-3 flex items-center justify-center rounded-full border-2 border-sky-400/75 peer-checked:border-sky-400 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"></div>
              </label>
              <IoChevronForwardSharp className="block text-sky-500 text-lg" />
            </div>
            <p className="text-xl h-80 py-2 px-1 text-justify align-top">
              Soy un entusiasta desarrollador de software que busca siempre
              salir del confort y ser mejor que antes cada día.
            </p>
          </div>
          <div className="max-w-sm mx-auto basis-1/3">
            <Image
              className="rounded-3xl"
              alt="icon profile"
              src="/img/avatar_profile.png"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="w-full space-x-20 mx-auto my-4 flex">
          <IoLogoGithub className="text-6xl text-sky-400" />
          <IoLogoLinkedin className="text-6xl text-sky-400" />
        </div>
      </div>
    </div>
  )
}

export default About
