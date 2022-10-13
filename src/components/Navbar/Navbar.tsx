import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-7">
        <div className="flex items-center space-x-3">
          <Image
            className="h-8 w-8 rounded-full"
            alt="icon profile"
            //src={'/img/avatar_profile.png'}
            src={
              'https://ui-avatars.com/api/?background=random&size=100&name=dalvin xo'
            }
            width={40}
            height={40}
          />
          <h1 className="text-center text-lg first-letter:text-lg font-medium">
            Dalvinxo
          </h1>
        </div>

        <nav>
          <menu className="space-x-7 text-base">
            <Link href="/">
              <a className="text-cyan-500 bg-slate-900 px-2 py-1 rounded-md">
                Home
              </a>
            </Link>
            <Link className="" href="/projects">
              <a className="hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
                Projects
              </a>
            </Link>
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
