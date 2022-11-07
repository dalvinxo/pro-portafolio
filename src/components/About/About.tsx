'use client'

import { socialIcon } from 'helpers'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoYoutube,
} from 'react-icons/io5'

const About = ({
  data,
  social,
}: {
  data: Array<{ id: number; message: string }>
  social: Array<{ id: number; name: string; link: string }>
}) => {
  const [position, setPosition] = useState<{ current: number; last: number }>({
    current: 0,
    last: data.length - 1,
  })

  const [currentInfo, setCurrentInfo] = useState<{
    id: number
    message: string
  }>(data[0])

  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const indexMessage = data.findIndex((info) => info.id === Number(value))

    setCurrentInfo(data[indexMessage])
    setPosition((prev) => ({ ...prev, current: indexMessage }))
  }

  const onClickHandleArrow = (action: string) => {
    const { current, last } = position

    let index = action === 'left' ? current - 1 : current + 1

    if (index > last) {
      index = 0
    }

    if (index < 0) {
      index = last
    }

    setPosition((prev) => ({ ...prev, current: index }))

    setCurrentInfo(data[index])
  }

  return (
    <div className="w-full h-[80vh]">
      <div className="w-11/12 h-full py-3 xs:px-0 px-7 mx-auto flex flex-col justify-center">
        <div className="flex justify-center xs:flex-col">
          <div className="basis-1/2 xs:order-last">
            <div className="space-x-5 flex justify-center items-center text-sm py-3">
              <IoChevronBackSharp
                onClick={() => {
                  onClickHandleArrow('left')
                }}
                className="block text-sky-500/75 text-lg"
              />
              {data.map((message) => (
                <div key={message.id}>
                  <label>
                    <input
                      className="sr-only peer"
                      name="option"
                      type="radio"
                      value={message.id}
                      onChange={onChangeRadio}
                      checked={currentInfo.id === message.id}
                    />
                    <div className="w-3 h-3 flex items-center justify-center rounded-full border-2 border-sky-400/75 peer-checked:border-sky-400 peer-checked:bg-sky-400  peer-checked:shadow-3xl peer-checked:shadow-sky-300/50"></div>
                  </label>
                </div>
              ))}
              <IoChevronForwardSharp
                onClick={() => {
                  onClickHandleArrow('right')
                }}
                className="block text-sky-500 text-lg"
              />
            </div>
            <p className="text-xl h-80 xs:h-auto py-2 px-1 text-justify align-top">
              {currentInfo.message}
            </p>
          </div>
          <div className="max-w-sm mx-auto basis-1/3 xs:mx-0">
            <Image
              className="rounded-3xl"
              alt="icon profile"
              src="/img/avatar_profile.png"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="w-full space-x-20 xs:space-x-10 mx-auto my-4 xs:my-2 flex justify-center mt-10">
          {social &&
            social.map((media) => (
              <div key={media.id + '-' + media.name}>
                {socialIcon[media.name](media.link)}
              </div>
            ))}
          {/* <Link href={'https://github.com/dalvinxo'} passHref legacyBehavior>
            <a target="_blank" rel="nofollow">
              <IoLogoGithub className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
            </a>
          </Link>
          <Link
            href={'https://do.linkedin.com/in/dalvin-m-138033204/'}
            passHref
            legacyBehavior>
            <a target="_blank" rel="nofollow">
              <IoLogoLinkedin className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
            </a>
          </Link>
          <Link
            href={'https://www.youtube.com/channel/UC2rkNywLkhbm6KTXDfoEhkw'}
            passHref
            legacyBehavior>
            <a target="_blank" rel="nofollow">
              <IoLogoYoutube className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default About
