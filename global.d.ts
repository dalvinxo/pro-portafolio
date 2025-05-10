import { ReactNode } from 'react'

export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface ElementWithChildren<T = {}> {
    children?: ReactNode
    props?: T
  }

  type EntityRouters = {
    ['brand']: { title: string; avatar: string; src?: string }
    ['navlink']: Array<{ path: string; alias: (lang: string) => string }>
  }

  type EntityBrand = Pick<EntityRouters, 'brand'>

  type TypeProyects = {
    nameSpanish: string | null
    name: string | null
    state: boolean | null
    deploy: string | null
    repository: string | null
    date: string | null
  }

  type TypeCertificates = {
    id: string
    title: string
    description: string
    descriptionSpanish: string
    type: string
    completionDate: string
    expiryDate: string | null
    certificateUrl: string | null
    previewUrl: string | null
  }
}
