'use client'

import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { useEffect } from 'react'

export default function Error({
  error,
}: // reset,
{
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <div className="w-full h-[70vh] px-16 md:px-0 flex items-center justify-center">
      <div className="watch:w-full watch:my-2 px-2 watch:px-1 flex flex-col items-center watch:items-stretch watch:flex-nowrap py-3 xs:py-1 rounded-md shadow-lg">
        <p className="text-6xl md:text-7xl watch:text-center lg:text-9xl font-bold tracking-wider dark:text-red-800 text-red-500">
          {translate.error.code}
        </p>
        <p className="text-2xl md:text-3xl watch:text-center  lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          {translate.error.message}
        </p>
        <p className="text-gray-500 mt-4 pb-4 text-center">
          {translate.error.description}
        </p>
      </div>
    </div>
  )
}
