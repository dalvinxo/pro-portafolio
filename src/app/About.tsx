'use client'

import { getDictionary } from '@utils/dictionaries'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslateContext } from 'providers'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoYoutube,
} from 'react-icons/io5'

const profileImages = ['/img/avatar_profile2.webp', '/img/avatar_profile3.webp']

const About = ({
  data,
  social,
}: {
  data: Array<{ id: number; message: string; messageSpanish: string | null }>
  social: Array<{ id: any; name: string; link: string }>
}) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const [currentImage, setCurrentImage] = useState(0)
  const [position, setPosition] = useState<{ current: number; last: number }>({
    current: 0,
    last: data.length - 1,
  })
  const [currentInfo, setCurrentInfo] = useState<{
    id: number
    message: string
    messageSpanish: string | null
  }>(data[0])

  const ariaLabel = {
    github: translate.about['aria-label-social'].github,
    linkedin: translate.about['aria-label-social'].linkedin,
    youtube: translate.about['aria-label-social'].youtube,
  }

  const mediaSocials = {
    github: <IoLogoGithub className="h-5 w-5" />,
    linkedin: <IoLogoLinkedin className="h-5 w-5" />,
    youtube: <IoLogoYoutube className="h-5 w-5" />,
  }

  const currentMessage = useMemo(() => {
    return lang === 'en' ? currentInfo.message : currentInfo.messageSpanish
  }, [currentInfo.message, currentInfo.messageSpanish, lang])

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % profileImages.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-slate-200/70 via-transparent to-sky-100/70 blur-2xl dark:from-slate-800/60 dark:to-sky-950/30" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-3 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-950">
              {profileImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Profile image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover transition-all duration-700 ${index === currentImage
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-8 opacity-0'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              {lang === 'en' ? 'About me' : 'Sobre mi'}
            </span>

            <div className="space-y-3">
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
                {lang === 'en'
                  ? 'Building thoughtful digital products with clarity and craft.'
                  : 'Construyendo productos digitales con claridad y detalle.'}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
                {lang === 'en'
                  ? 'A concise look at my path, the way I work, and the platforms where you can follow what I build.'
                  : 'Una vista breve de mi recorrido, mi forma de trabajar y los espacios donde comparto lo que construyo.'}
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  {lang === 'en' ? 'Journey' : 'Recorrido'}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {String(position.current + 1).padStart(2, '0')} /{' '}
                  {String(data.length).padStart(2, '0')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onClickHandleArrow('left')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                  aria-label="Previous slide">
                  <IoChevronBackSharp className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => onClickHandleArrow('right')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                  aria-label="Next slide">
                  <IoChevronForwardSharp className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-[190px] py-6">
              <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-[1.15rem] dark:text-slate-200">
                {currentMessage}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              {data.map((message) => (
                <label
                  key={message.id}
                  className="group inline-flex cursor-pointer items-center gap-2">
                  <input
                    id={`input-${message.id}`}
                    className="sr-only"
                    name="option"
                    type="radio"
                    value={message.id}
                    onChange={onChangeRadio}
                    checked={currentInfo.id === message.id}
                  />
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-all ${currentInfo.id === message.id
                        ? 'bg-slate-900 ring-4 ring-slate-200 dark:bg-slate-100 dark:ring-slate-800'
                        : 'bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-700 dark:group-hover:bg-slate-600'
                      }`}
                  />
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {String(message.id).padStart(2, '0')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {social.map((mediaSocial) => (
              <Link
                key={mediaSocial.name}
                href={mediaSocial.link}
                target="_blank"
                rel="nofollow"
                aria-label={ariaLabel[mediaSocial.name]}
                className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100">
                <span className="text-slate-500 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">
                  {mediaSocials[mediaSocial.name]}
                </span>
                <span className="capitalize">{mediaSocial.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
