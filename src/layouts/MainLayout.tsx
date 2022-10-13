import { NextPage } from 'next'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

const MainLayout: NextPage<ElementWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100">
      <div className="xs:mx-0 xs:w-full xs:px-2 w-4/5 h-screen mx-auto py-4 font-sans">
        <Navbar />
        <main className="overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
