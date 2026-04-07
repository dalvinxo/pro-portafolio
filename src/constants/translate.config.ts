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
      certificates: 'Certificates',
      app: 'Applications',
      resume: 'Resume',
      github: "Github's Repositories",
      descriptionGithub: 'This repository has no description in its contents',
    },
    about: {
      'aria-label-social': {
        github: 'social media, read more about repository',
        youtube: 'social media, read more about youtube channel',
        linkedin: 'social media, read more about linkedin',
      },
    },
    certificates: {
      noPreview: 'No preview available',
      type: 'Type',
      completed: 'Completed',
      expires: 'Expires',
      viewCertificate: 'View certificate',
      openCourse: 'Open online course',
      searchPlaceholder: 'Search certificates...',
      noCertificatesFound: 'No certificates found',
    },
    project: {
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
        title: 'change language through this button.',
        'aria-label': {
          es: 'ES - Switch to spanish language',
          en: 'US - Switch to english language',
        },
      },
      'button-mode-dark': {
        title: 'change theme through this button.',
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
      message: 'Error interno del servidor',
      description: 'Vaya, algo salio mal en nuestros servidores.',
    },
    notFound: {
      code: '404',
      message: 'Pagina no encontrada',
      description: 'Lo sentimos, no se ha podido encontrar la pagina que buscas',
    },
    title: {
      certificates: 'Certificados',
      app: 'Aplicaciones',
      resume: 'Resumen',
      github: 'Repositorios de Github',
      descriptionGithub: 'Este repositorio no tiene descripcion en su contenido',
    },
    about: {
      'aria-label-social': {
        github: 'redes sociales, conocer mas sobre el autor en su repositorio',
        youtube: 'redes sociales, conocer mas sobre el autor en su canal youtube',
        linkedin: 'redes sociales, conocer mas sobre el autor en su cuenta de linkedin',
      },
    },
    certificates: {
      noPreview: 'No hay vista previa disponible',
      type: 'Tipo',
      completed: 'Completado',
      expires: 'Expira',
      viewCertificate: 'Ver certificado',
      openCourse: 'Abrir curso en linea',
      searchPlaceholder: 'Buscar certificados...',
      noCertificatesFound: 'No se encontraron certificados',
    },
    project: {
      status: {
        done: 'Terminado',
        do: 'En proceso',
        pending: 'En espera',
        all: 'Todos',
      },
      emptyApp: 'No se ha creado ninguna aplicacion',
      'aria-label': {
        github: 'Leer mas acerca del codigo de este proyecto',
        eye: 'Saber mas acerca de este proyecto',
      },
    },
    navbar: {
      'button-language-mode': {
        title: 'cambiar idioma a traves de este boton.',
        'aria-label': {
          es: 'ES - Cambiando al idioma espanol',
          en: 'US - Cambiando al idioma ingles',
        },
      },
      'button-mode-dark': {
        title: 'cambiar tema a traves de este boton.',
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
