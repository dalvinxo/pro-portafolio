import { ReactNode } from 'react'

export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface ElementWithChildren<T = {}> {
    children: ReactNode
    props?: T
  }
}
