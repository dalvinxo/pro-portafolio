import { translate } from 'var-contants'

/**
 * Detecta el idioma del navegador del usuario
 * @returns El idioma detectado ('en' o 'es') o 'en' por defecto
 */
export const detectBrowserLanguage = (): translate.Locales => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const supportedLocales: translate.Locales[] = ['en', 'es']

  const browserLanguages = navigator.languages || [navigator.language]

  for (const browserLang of browserLanguages) {
    const langCode = browserLang
      .split('-')[0]
      .toLowerCase() as translate.Locales

    if (supportedLocales.includes(langCode)) {
      return langCode
    }
  }

  return 'en'
}
