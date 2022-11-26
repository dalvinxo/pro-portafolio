import { ReactNode } from 'react'

export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface ElementWithChildren<T = {}> {
    children?: ReactNode
    props?: T
  }

  type EntityRouters = {
    ['brand']: { title: string; avatar: string }
    ['navlink']: Array<{ path: string; alias: string }>
  }

  type EntityBrand = Pick<EntityRouters, 'brand'>

  type TypeProyects = {
    name: string | null
    state: string | null
    deploy: string | null
    repository: string | null
    date: string | null
  }
}
