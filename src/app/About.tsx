'use client'

import { getDictionary } from '@utils/dictionaries'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslateContext } from 'providers'
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
  data: Array<{ id: number; message: string; messageSpanish: string | null }>
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

  const { lang } = useTranslateContext()

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

  const translate = getDictionary(lang)

  const ariaLabel = {
    github: translate.about['aria-label-social'].github,
    linkedin: translate.about['aria-label-social'].linkedin,
    youtube: translate.about['aria-label-social'].youtube,
  }
  const MediaSocials = {
    github: <IoLogoGithub className="hover:text-black" />,
    linkedin: <IoLogoLinkedin className="hover:text-sky-700" />,
    youtube: <IoLogoYoutube className="hover:text-rose-700" />,
  }

  return (
    <div className="w-full ">
      <div className="py-3 watch:px-0 xs:px-0 px-7 my-5 flex flex-col justify-center xl:h-[70vh]">
        <div className="flex justify-center items-center sm:items-start watch:flex-col custom-xs:flex-col">
          <div className="basis-1/1 custom-xs:order-last watch:order-last">
            <div className="space-x-4 flex justify-center items-center text-sm py-3">
              <IoChevronBackSharp
                onClick={() => {
                  onClickHandleArrow('left')
                }}
                className="block text-sky-500/75 text-lg"
              />
              {data.map((message) => (
                <div key={message.id}>
                  <label htmlFor={`input-${message.id}`}></label>
                  <input
                    id={`input-${message.id}`}
                    className="sr-only peer"
                    placeholder={`message #${message.id}`}
                    name="option"
                    type="radio"
                    value={message.id}
                    onChange={onChangeRadio}
                    checked={currentInfo.id === message.id}
                  />
                  <div className="w-3 h-3 flex items-center justify-center rounded-full border-2 border-sky-400/75 peer-checked:border-sky-400 peer-checked:bg-sky-400  peer-checked:shadow-3xl peer-checked:shadow-sky-300/50"></div>
                </div>
              ))}
              <IoChevronForwardSharp
                onClick={() => {
                  onClickHandleArrow('right')
                }}
                className="block text-sky-500 text-lg"
              />
            </div>
            {data.map((paragrapher, index) => (
              <div
                className="overflow-auto xs:max-h-32"
                key={`${index}-${paragrapher.id}`}>
                <p
                  className={`animate-hidden-fade text-xl watch:h-auto max-w-lg xs:py-2 sm:py-4 px-4 text-justify align-top ${
                    paragrapher.message != currentInfo.message && 'hidden'
                  }`}>
                  {lang == 'en'
                    ? paragrapher.message
                    : paragrapher.messageSpanish}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto min-w-[16rem] max-w-sm watch:max-h-80 custom-xs:max-h-96 p-2 basis-1/3 custom-xs:mx-0">
            <Image
              className="rounded-3xl"
              alt="icon profile"
              src="/img/avatar_profile.png"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="w-full space-x-20 xs:space-x-10 mx-auto my-8 xs:my-6 flex justify-center">
          {social.map((mediaSocial) => (
            <Link
              key={mediaSocial.name}
              href={mediaSocial.link}
              passHref
              legacyBehavior>
              <a
                target="_blank"
                rel="nofollow"
                className="text-6xl transition-colors ease-in-out dark:text-slate-300/50 text-slate-800"
                aria-label={ariaLabel[mediaSocial.name]}>
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
