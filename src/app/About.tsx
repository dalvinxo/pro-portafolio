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
    github: <IoLogoGithub className="transition-all duration-300" />,
    linkedin: <IoLogoLinkedin className="transition-all duration-300" />,
    youtube: <IoLogoYoutube className="transition-all duration-300" />,
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-sky-300/50 to-blue-500/50 rounded-3xl opacity-50 
                    blur-lg group-hover:opacity-75 transition duration-700 group-hover:duration-200"></div>
            <div className="relative">
              <Image
                className="rounded-3xl transform transition duration-500 hover:scale-105 object-cover"
                alt="icon profile"
                src="/img/avatar_profile.png"
                height={800}
                width={800}
                quality={100}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNldRV1dXTTZBTGJhYmN5e4B7hYyQkJrR2deZ/9sAQAEVFx0eHR4rGiovKWpBPUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col space-y-8">
            {/* Navigation Controls */}
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={() => onClickHandleArrow('left')}
                className="p-3 rounded-full bg-gradient-to-r from-sky-400/10 to-blue-500/10 
                          hover:from-sky-400/20 hover:to-blue-500/20 transition-all duration-300"
                aria-label="Previous slide">
                <IoChevronBackSharp className="text-2xl text-sky-500 dark:text-sky-400" />
              </button>

              <div className="flex space-x-6">
                {data.map((message) => (
                  <div key={message.id} className="relative">
                    <input
                      id={`input-${message.id}`}
                      className="sr-only peer"
                      name="option"
                      type="radio"
                      value={message.id}
                      onChange={onChangeRadio}
                      checked={currentInfo.id === message.id}
                    />
                    <div
                      className="w-3 h-3 rounded-full border-2 border-sky-400 peer-checked:border-0 
                                  peer-checked:w-4 peer-checked:h-4 
                                  peer-checked:bg-gradient-to-r from-sky-400 to-blue-500
                                  transition-all duration-300 cursor-pointer hover:scale-110
                                  after:content-[''] after:w-full after:h-full after:absolute 
                                  after:top-0 after:left-0 after:rounded-full after:shadow-[0_0_15px] 
                                  after:shadow-sky-400/50 peer-checked:after:opacity-100 after:opacity-0"></div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onClickHandleArrow('right')}
                className="p-3 rounded-full bg-gradient-to-r from-sky-400/10 to-blue-500/10 
                          hover:from-sky-400/20 hover:to-blue-500/20 transition-all duration-300"
                aria-label="Next slide">
                <IoChevronForwardSharp className="text-2xl text-sky-500 dark:text-sky-400" />
              </button>
            </div>

            <div className="relative min-h-[200px]">
              {data.map((paragrapher, index) => (
                <div
                  key={`${index}-${paragrapher.id}`}
                  className={`absolute w-full transition-all duration-700 ease-out
                            ${
                              paragrapher.message === currentInfo.message
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8 pointer-events-none'
                            }`}>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
                    {lang === 'en'
                      ? paragrapher.message
                      : paragrapher.messageSpanish}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-10 pt-6">
              {social.map((mediaSocial) => (
                <Link
                  key={mediaSocial.name}
                  href={mediaSocial.link}
                  target="_blank"
                  rel="nofollow"
                  className="group relative"
                  aria-label={ariaLabel[mediaSocial.name]}>
                  <span
                    className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 px-3 py-2 
                                rounded-lg text-xs font-medium text-white bg-sky-900 transition-all 
                                duration-300 group-hover:scale-100 after:content-[''] after:absolute 
                                after:left-1/2 after:-translate-x-1/2 after:top-[100%] after:-translate-y-0.5 
                                after:border-4 after:border-x-transparent after:border-b-transparent 
                                after:border-t-sky-900">
                    {mediaSocial.name}
                  </span>
                  <span
                    className="block p-3 text-4xl bg-gradient-to-r from-sky-400/10 to-blue-500/10 
                                rounded-full transition-all duration-300 group-hover:from-sky-400/20 
                                group-hover:to-blue-500/20 group-hover:scale-110 
                                group-hover:text-sky-500 dark:text-gray-300 dark:group-hover:text-sky-400">
                    {MediaSocials[mediaSocial.name]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
