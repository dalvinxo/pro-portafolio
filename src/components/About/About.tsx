// import profile from '../../../public/avatar_profile.png'
// import Image from 'next/image'
import { BiRadioCircle } from 'react-icons/bi'

const About = () => {
  return (
    <div className="container min-h-[30rem] flex items-center my-3">
      <div className="max-h-min">
        <div className="grid grid-cols-5 gap-3 auto-rows-fr">
          <div className="shrink col-span-3 py-2 flex flex-col ">
            <div className="grow">
              <h3 className="text-xl">
                Soy un entusiasta desarrollador de software que busca siempre
                salir del confort y ser mejor que antes cada día.
              </h3>
            </div>
            <div className="space-x-2 flex justify-center items-center py-4 text-sm font-bold">
              <label>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value="xs"
                  checked
                />
                <div className="w-3 h-3 rounded-full flex items-center justify-center ring-1 peer-checked:ring-2 peer-checked:bg-slate-500 "></div>
              </label>
              <label>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value="s"
                />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 ">
                  <BiRadioCircle />
                </div>
              </label>
              <label>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value="m"
                />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  M
                </div>
              </label>
            </div>
          </div>
          <div className="col-span-2">
            {/* <Image className="rounded-lg" alt="icon profile" src={profile} /> */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
