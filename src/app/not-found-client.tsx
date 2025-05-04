'use client'

import Link from 'next/link'
import { IoHomeOutline } from 'react-icons/io5'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import { routers } from 'var-contants'

export default function NotFoundClient() {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { navlink },
  } = routers

  const processedNavlink = navlink.map((item) => ({
    path: item.path,
    aliasText: item.alias(lang),
  }))

  const homeLink = processedNavlink[0]

  return (
    <div className="w-full min-h-[70vh] px-4 md:px-16 grid place-items-center">
      <div
        className="w-full max-w-lg mx-auto text-center p-6 rounded-lg shadow-lg bg-white/5 backdrop-blur-sm"
        role="alert">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300 animate-in fade-in">
          {translate.notFound.code}
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          {translate.notFound.message}
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2">
          {translate.notFound.description}
        </p>
        <Link
          href={homeLink.path}
          className="inline-flex items-center gap-2 px-4 py-2 mt-6 rounded transition-colors duration-200 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          title={homeLink.aliasText}>
          <IoHomeOutline aria-hidden="true" />
          <span>{homeLink.aliasText}</span>
        </Link>
      </div>
    </div>
  )
}
