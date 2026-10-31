'use client'

import { useTranslateContext } from 'providers'

const rights = {
  en: 'All rights reserved.',
  es: 'Todos los derechos reservados.',
}

const Footer = () => {
  const { lang } = useTranslateContext()

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-8">
        © 2022 Dalvin Molina. {rights[lang] ?? rights.en}
      </div>
    </footer>
  )
}

export default Footer
