// Server Component
import type { Metadata } from 'next'
import { getDictionary } from '@utils/dictionaries'
import NotFoundClient from './not-found-client'
import { routers } from 'var-contants'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  // Determine the language (use your preferred method)
  const lang = 'en' // Replace with your actual language detection logic

  // Get translations
  const translate = getDictionary(lang)

  const {
    navbar: { navlink },
  } = routers

  // Pre-compute the values that use functions
  const processedNavlink = navlink.map((item) => ({
    path: item.path,
    // Call the function on the server instead of passing the function itself
    aliasText: item.alias(lang),
  }))

  // Pass the processed data to the client component
  return (
    <NotFoundClient
      translate={translate}
      processedNavlink={processedNavlink}
      lang={lang}
    />
  )
}
