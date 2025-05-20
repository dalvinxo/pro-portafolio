export const navbar: EntityRouters = {
  brand: {
    title: 'dalvinxo',
    avatar: '/img/faceavatar.webp',
    src: 'https://github.com/dalvinxo',
  },
  navlink: [
    {
      path: '/',
      alias(lang) {
        return lang == 'en' ? 'Home' : 'Inicio'
      },
    },
    {
      path: '/projects',
      alias(lang) {
        return lang == 'en' ? 'Projects' : 'Proyectos'
      },
    },
    {
      path: '/certificates',
      alias(lang) {
        return lang == 'en' ? 'Certificates' : 'Certificados'
      },
    },
  ],
}
