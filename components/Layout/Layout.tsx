import { NextPage } from 'next'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const Layout: NextPage<ElementWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
