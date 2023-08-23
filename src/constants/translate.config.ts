const translate = {
  en: {
    title: {
      app: 'App',
      github: "Github's Repositories",
      descriptionGithub: 'This repository has no description in its contents',
    },
    Project: {
      status: {
        done: 'Completed',
        do: 'Working',
        pending: 'Waiting',
      },
      emptyApp: 'No app have been created',
    },
    navbar: {
      'button-language-mode': {
        title: 'change language through of this button.',
        'aria-label': {
          es: 'Switch to spanish language',
          en: 'Switch to english language',
        },
      },
      'button-mode-dark': {
        title: 'change theme through of this button.',
        'aria-label': {
          light: 'Switch to light mode',
          dark: 'Switch to dark mode',
        },
      },
    },
  },
  es: {
    title: {
      app: 'Aplicaciones',
      github: 'Repositorios de Github',
      descriptionGithub:
        'Este repositorio no tiene descripción en su contenido',
    },
    Project: {
      status: {
        done: 'Terminado',
        do: 'En proceso',
        pending: 'En espera',
      },
      emptyApp: 'No se ha creado ninguna aplicación',
    },
    navbar: {
      'button-language-mode': {
        title: 'cambiar idioma a través de este botón.',
        'aria-label': {
          es: 'Cambiando al idioma español',
          en: 'Cambiando al idioma ingles',
        },
      },
      'button-mode-dark': {
        title: 'cambiar tema a través de este botón.',
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
