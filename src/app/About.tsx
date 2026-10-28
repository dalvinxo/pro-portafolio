'use client'

import { getDictionary } from '@utils/dictionaries'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslateContext } from 'providers'
import { useEffect, useMemo, useState } from 'react'
import {
  IoArrowForward,
  IoChevronBack,
  IoChevronForward,
  // IoDocumentTextOutline, // Resume hidden temporarily
  IoFolderOpenOutline,
  IoInformationCircleOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoRibbonOutline,
} from 'react-icons/io5'

const profileImages = ['/img/avatar_profile2.webp', '/img/avatar_profile3.webp']

type AboutInfo = {
  id: number
  message: string
  messageSpanish: string | null
}

type SocialMediaName = 'github' | 'linkedin' | 'youtube'

const fallbackInfo: AboutInfo = {
  id: 1,
  message: 'Profile information is temporarily unavailable.',
  messageSpanish: 'La información del perfil no está disponible temporalmente.',
}

const mediaSocials: Record<SocialMediaName, React.ReactNode> = {
  github: <IoLogoGithub className="h-5 w-5" aria-hidden="true" />,
  linkedin: <IoLogoLinkedin className="h-5 w-5" aria-hidden="true" />,
  youtube: <IoLogoYoutube className="h-5 w-5" aria-hidden="true" />,
}

const copy = {
  en: {
    badge: 'Available for new opportunities',
    greeting: "Hi, I'm",
    role: 'Software Engineer',
    description:
      'I design and build reliable, thoughtful digital products — from clean interfaces to the services that power them.',
    primaryCta: 'View projects',
    // secondaryCta: 'Resume',
    journey: 'My journey',
    explore: 'Explore',
    unavailable: 'The personal journey could not be loaded right now.',
    previous: 'Show previous journey item',
    next: 'Show next journey item',
    goTo: (index: number) => `Show journey item ${index}`,
    status: (current: number, total: number) =>
      `Journey item ${current} of ${total}`,
    photo: (index: number) => `Dalvin Molina profile photo ${index}`,
    links: [
      {
        href: '/projects',
        title: 'Projects',
        text: 'Repositories and things I have built.',
        icon: IoFolderOpenOutline,
      },
      {
        href: '/certificates',
        title: 'Certificates',
        text: 'Courses and credentials I have earned.',
        icon: IoRibbonOutline,
      },
      // Resume hidden from the view temporarily
      // {
      //   href: '/resume',
      //   title: 'Resume',
      //   text: 'Experience, education and skills.',
      //   icon: IoDocumentTextOutline,
      // },
    ],
  },
  es: {
    badge: 'Disponible para nuevas oportunidades',
    greeting: 'Hola, soy',
    role: 'Ingeniero de Software',
    description:
      'Diseño y construyo productos digitales confiables y bien pensados — desde interfaces limpias hasta los servicios que las impulsan.',
    primaryCta: 'Ver proyectos',
    // secondaryCta: 'Currículum',
    journey: 'Mi recorrido',
    explore: 'Explorar',
    unavailable: 'El recorrido personal no se pudo cargar en este momento.',
    previous: 'Mostrar elemento anterior del recorrido',
    next: 'Mostrar siguiente elemento del recorrido',
    goTo: (index: number) => `Mostrar elemento ${index} del recorrido`,
    status: (current: number, total: number) =>
      `Elemento ${current} de ${total} del recorrido`,
    photo: (index: number) => `Foto de perfil de Dalvin Molina ${index}`,
    links: [
      {
        href: '/projects',
        title: 'Proyectos',
        text: 'Repositorios y cosas que he construido.',
        icon: IoFolderOpenOutline,
      },
      {
        href: '/certificates',
        title: 'Certificados',
        text: 'Cursos y credenciales obtenidas.',
        icon: IoRibbonOutline,
      },
      // Resume hidden from the view temporarily
      // {
      //   href: '/resume',
      //   title: 'Currículum',
      //   text: 'Experiencia, educación y habilidades.',
      //   icon: IoDocumentTextOutline,
      // },
    ],
  },
}

const pad = (value: number) => String(value).padStart(2, '0')

const About = ({
  data,
  social,
}: {
  data: AboutInfo[]
  social: Array<{ id: any; name: string; link: string }>
}) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)
  const t = copy[lang] ?? copy.en

  const hasJourneyData = data.length > 0
  const journeyItems = useMemo(
    () => (hasJourneyData ? data : [fallbackInfo]),
    [data, hasJourneyData]
  )

  const [currentImage, setCurrentImage] = useState(0)
  const [current, setCurrent] = useState(0)

  const total = journeyItems.length
  const currentInfo = journeyItems[Math.min(current, total - 1)]
  const canNavigateJourney = hasJourneyData && total > 1
  const currentMessage =
    (lang === 'en' ? currentInfo.message : currentInfo.messageSpanish) ||
    currentInfo.message

  const goTo = (index: number) => setCurrent((index + total) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % profileImages.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setCurrent(0)
  }, [journeyItems])

  return (
    <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20">
      {/* Hero */}
      <section className="grid items-center gap-12 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-10">
        <div className="order-2 space-y-8 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.badge}
          </span>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="block text-2xl font-medium text-slate-500 dark:text-slate-400 sm:text-3xl">
                {t.greeting}
              </span>
              <span className="mt-2 block bg-gradient-to-r from-accent to-accent-2 bg-clip-text pb-1 text-transparent">
                Dalvin Molina
              </span>
            </h1>
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 sm:text-xl">
              {t.role}
            </p>
            <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
              {t.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950">
              {t.primaryCta}
              <IoArrowForward
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            {/* Resume hidden from the view temporarily
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10">
              <IoDocumentTextOutline className="h-4 w-4" aria-hidden="true" />
              {t.secondaryCta}
            </Link>
            */}

            {social.length > 0 && (
              <span
                aria-hidden="true"
                className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-white/10 sm:block"
              />
            )}

            <ul className="flex items-center gap-1">
              {social.map((mediaSocial) => {
                const name = mediaSocial.name as SocialMediaName

                return (
                  <li key={mediaSocial.name}>
                    <a
                      href={mediaSocial.link}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      title={mediaSocial.name}
                      aria-label={
                        translate.about['aria-label-social'][name] ||
                        (lang === 'en'
                          ? `Open ${mediaSocial.name} profile`
                          : `Abrir perfil de ${mediaSocial.name}`)
                      }
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white">
                      {mediaSocials[name] || (
                        <IoInformationCircleOutline
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[280px] sm:max-w-sm lg:order-2 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent/30 to-accent-2/25 blur-3xl transition-colors duration-500 dark:from-accent/20 dark:to-accent-2/15"
          />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 p-[2px] shadow-2xl shadow-accent/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-slate-100 dark:bg-slate-900">
              {profileImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={t.photo(index + 1)}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 420px"
                  className={`object-cover transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento */}
      <section className="grid gap-4 lg:grid-cols-3">
        <article className="flex flex-col rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] sm:p-8 lg:col-span-2">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink">
                {t.journey}
              </h2>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {pad(current + 1)} / {pad(total)}
              </p>
              <p className="sr-only" aria-live="polite">
                {t.status(current + 1, total)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={!canNavigateJourney}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-900/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
                aria-label={t.previous}>
                <IoChevronBack className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={!canNavigateJourney}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-900/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
                aria-label={t.next}>
                <IoChevronForward className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex flex-1 items-center py-8">
            {hasJourneyData ? (
              <blockquote
                key={currentInfo.id}
                className="animate-hidden-fade text-lg leading-8 text-slate-700 dark:text-slate-200 sm:text-xl sm:leading-9">
                {currentMessage}
              </blockquote>
            ) : (
              <p
                role="status"
                className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
                <IoInformationCircleOutline className="mt-0.5 h-4 w-4 shrink-0" />
                {t.unavailable}
              </p>
            )}
          </div>

          {canNavigateJourney && (
            <div className="flex flex-wrap gap-2">
              {journeyItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={t.goTo(index + 1)}
                  aria-current={index === current ? 'step' : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    index === current
                      ? 'w-8 bg-accent'
                      : 'w-4 bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </article>

        <nav
          aria-label={t.explore}
          className="rounded-3xl border border-slate-200 bg-white/70 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="px-3 pb-2 pt-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink">
            {t.explore}
          </h2>
          <ul className="space-y-1">
            {t.links.map(({ href, title, text, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:hover:bg-white/5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                      {title}
                    </span>
                    <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
                      {text}
                    </span>
                  </span>
                  <IoArrowForward
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900 dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  )
}

export default About
