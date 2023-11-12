'use client'

import Link from 'next/link'
// import { headers } from 'next/headers'
import { Metadata } from 'next'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import { IoHomeOutline } from 'react-icons/io5'
import { routers } from 'var-contants'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  // const headersList = headers()
  // const domain = headersList.get('host')

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { navlink },
  } = routers

  return (
    <div className="w-full h-[70vh] px-16 md:px-0 flex items-center justify-center">
      <div className="watch:w-full watch:my-2 px-2 watch:px-1 flex flex-col items-center watch:items-stretch watch:flex-nowrap py-3 xs:py-1 rounded-md shadow-lg">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
          {translate.notFound.code}
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          {translate.notFound.message}
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          {translate.notFound.description}
        </p>
        <Link
          href={navlink[0].path}
          className="flex items-center space-x-2 px-4 py-2 mt-6 rounded transition duration-150 dark:hover:text-cyan-500 hover:text-slate-600"
          title={navlink[0].alias(lang)}>
          <IoHomeOutline />
          <span>{navlink[0].alias(lang)}</span>
        </Link>
      </div>
    </div>
  )
}
