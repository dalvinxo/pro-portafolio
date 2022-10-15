type EntityRouters = {
  ['brand']: { title: string; avatar: string }
  ['navlink']: Array<{ path: string; alias: string }>
}

export const navbar: EntityRouters = {
  brand: {
    title: 'dalvinxo',
    avatar:
      'https://ui-avatars.com/api/?background=random&size=100&name=dalvin xo',
  },
  navlink: [
    {
      path: '/',
      alias: 'Home',
    },
    {
      path: '/projects',
      alias: 'Projects',
    },
  ],
}
