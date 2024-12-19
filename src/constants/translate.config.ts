const translate = {
  en: {
    brand: {
      linkTitle: 'Repository Github - personal',
    },
    error: {
      code: '500',
      message: 'Internal Server Error.',
      description: 'Whoops, something went wrong on our servers.',
    },
    notFound: {
      code: '404',
      message: 'Page Not Found',
      description: 'Sorry, the page you are looking for could not be found',
    },
    title: {
      app: 'App',
      github: "Github's Repositories",
      descriptionGithub: 'This repository has no description in its contents',
    },
    about: {
      'aria-label-social': {
        github: 'social media, read more about repository',
        youtube: 'social media, read more about chanel youtube',
        linkedin: 'social media, read more about linkedin',
      },
    },
    Project: {
      status: {
        done: 'Completed',
        do: 'Working',
        pending: 'Waiting',
        all: 'All',
      },
      emptyApp: 'No app have been created',
      'aria-label': {
        github: 'Read more about code',
        eye: 'Read more about this project',
      },
    },
    navbar: {
      'button-language-mode': {
        title: 'change language through of this button.',
        'aria-label': {
          es: 'ES - Switch to spanish language',
          en: 'US - Switch to english language',
        },
      },
      'button-mode-dark': {
        title: 'change theme through of this button.',
        'aria-label': {
          light: 'Switch to light mode',
          dark: 'Switch to dark mode',
        },
      },
      'button-bug': {
        title: 'Report a bug',
        'aria-label': 'Report a bug',
      },
    },
  },
  es: {
    brand: {
      linkTitle: 'Repositorio de github',
    },
    error: {
      code: '500',
      message: 'Error Interno del Servidor',
      description: '¡Vaya! algo salió mal en nuestros servidores.',
    },
    notFound: {
      code: '404',
      message: 'Página no encontrada',
      description:
        'Lo sentimos, no se ha podido encontrar la página que buscas',
    },
    title: {
      app: 'Aplicaciones',
      github: 'Repositorios de Github',
      descriptionGithub:
        'Este repositorio no tiene descripción en su contenido',
    },
    about: {
      'aria-label-social': {
        github: 'redes sociales, conocer más sobre el autor en su repositorio',
        youtube:
          'redes sociales, conocer más sobre el autor en su canal youtube',
        linkedin:
          'redes sociales, conocer más sobre el autor en su cuenta de linkedin',
      },
    },
    Project: {
      status: {
        done: 'Terminado',
        do: 'En proceso',
        pending: 'En espera',
        all: 'Todos',
      },
      emptyApp: 'No se ha creado ninguna aplicación',
      'aria-label': {
        github: 'Leer más acerca del código de este proyecto',
        eye: 'Saber más acerca de este proyecto',
      },
    },
    navbar: {
      'button-language-mode': {
        title: 'cambiar idioma a través de este botón.',
        'aria-label': {
          es: 'ES - Cambiando al idioma español',
          en: 'US - Cambiando al idioma ingles',
        },
      },
      'button-mode-dark': {
        title: 'cambiar tema a través de este botón.',
        'aria-label': {
          light: 'Cambiando al modo claro',
          dark: 'Cambiando al modo oscuro',
        },
      },
      'button-bug': {
        title: 'Abrir un nuevo problema en GitHub',
        'aria-label': 'Abrir un nuevo problema en GitHub',
      },
    },
  },
}

export type Locales = 'en' | 'es'
export type typeEnTranslate = (typeof translate)['en']
export type typeEsTranslate = (typeof translate)['es']

export default translate
