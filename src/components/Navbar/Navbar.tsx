import { NextPage } from 'next'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <div>
      <nav>
        <menu>
          <menuitem>
            <Link href="/">
              <a>Home</a>
            </Link>
          </menuitem>
          <menuitem>
            <Link href="/profile">
              <a>Projects</a>
            </Link>
          </menuitem>
        </menu>
      </nav>
    </div>
  )
}

export default Navbar
