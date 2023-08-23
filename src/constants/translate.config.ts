const translate = {
  en: {
    navbar: {
      'button-mode-dark': {
        'aria-label': {
          light: 'Switch to light mode',
          dark: 'Switch to dark mode',
        },
      },
    },
  },
  es: {
    navbar: {
      'button-mode-dark': {
        'aria-label': {
          light: 'Cambiando al modo claro',
          dark: 'Cambiando al modo oscuro',
        },
      },
    },
  },
}

export type Locales = 'en' | 'es'
export type typeEnTranslate = typeof translate['en']
export type typeEsTranslate = typeof translate['es']

export default translate
