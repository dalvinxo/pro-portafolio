import { NextPage } from 'next'
import { ReactNode } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

type TLayout = {
  children: ReactNode
}

const Layout: NextPage<TLayout> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
