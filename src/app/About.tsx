'use client'

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
  social: Array<{ id: any; name: string; link: string }>
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

  const styleSocial =
    'text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300'
  const MediaSocials = {
    github: <IoLogoGithub className={styleSocial} />,
    linkedin: <IoLogoLinkedin className={styleSocial} />,
    youtube: <IoLogoYoutube className={styleSocial} />,
  }

  return (
    <div className="w-full">
      <div className="py-3 xs:px-0 px-7 my-5 flex flex-col justify-center">
        <div className="flex justify-center items-start xs:flex-col">
          <div className="basis-1/1 xs:order-last">
            <div className="space-x-4 flex justify-center items-center text-sm py-3">
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
            <p className="animate-hidden-fade duration-500 text-xl xs:h-auto py-6 px-4 text-justify align-top">
              {currentInfo.message}
            </p>
          </div>
          <div className="max-w-sm mx-auto min-w-[16rem] p-2 basis-1/3 xs:mx-0">
            <Image
              className="rounded-3xl"
              alt="icon profile"
              src="/img/avatar_profile.png"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="w-full space-x-20 xs:space-x-10 mx-auto my-8 xs:my-2 flex justify-center">
          {social.map((mediaSocial) => (
            <Link
              key={mediaSocial.name}
              href={mediaSocial.link}
              passHref
              legacyBehavior>
              <a target="_blank" rel="nofollow">
                {MediaSocials[mediaSocial.name]}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
