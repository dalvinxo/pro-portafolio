import { useState } from 'react'

import { createContext, useContext } from 'react'
import { translate } from 'var-contants'

export type TypeTranslateContext = {
  lang: translate.Locales
  setLanguage: (lang?: string) => void
}

const TranslateContext = createContext<TypeTranslateContext>(null)

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<translate.Locales>('en')

  const setLanguage: (lang: translate.Locales) => void = (lang) => {
    setLang(lang)
  }

  return (
    <TranslateContext.Provider value={{ lang, setLanguage }}>
      {children}
    </TranslateContext.Provider>
  )
}

export default TranslateProvider
export const useTranslateContext = () => useContext(TranslateContext)
