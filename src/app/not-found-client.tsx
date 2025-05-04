'use client'

import Link from 'next/link'
import { IoHomeOutline } from 'react-icons/io5'
import { useTranslateContext } from 'providers'

// Update the props type to match the processed data
interface NotFoundClientProps {
  translate: {
    notFound: {
      code: string
      message: string
      description: string
    }
  }
  processedNavlink: {
    path: string
    aliasText: string
  }[]
  lang: string
}

export default function NotFoundClient({
  translate,
  processedNavlink,
  lang,
}: NotFoundClientProps) {
  // You can still use context if needed
  const { lang: contextLang } = useTranslateContext()

  // Use the first navlink item
  const homeLink = processedNavlink[0]

  return (
    <div className="w-full h-[70vh] px-16 md:px-0 flex items-center justify-center">
      <div className="watch:w-full watch:my-2 px-2 watch:px-1 flex flex-col items-center watch:items-stretch watch:flex-nowrap py-3 xs:py-1 rounded-md shadow-lg">
        <p className="text-6xl md:text-7xl watch:text-center lg:text-9xl font-bold tracking-wider text-gray-300">
          {translate.notFound.code}
        </p>
        <p className="text-2xl md:text-3xl watch:text-center lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          {translate.notFound.message}
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          {translate.notFound.description}
        </p>
        <Link
          href={homeLink.path}
          className="flex items-center space-x-2 px-4 py-2 mt-6 rounded transition duration-150 dark:hover:text-cyan-500 hover:text-slate-600"
          title={homeLink.aliasText}>
          <IoHomeOutline />
          <span>{homeLink.aliasText}</span>
        </Link>
      </div>
    </div>
  )
}
