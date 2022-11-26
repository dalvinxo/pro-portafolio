import Image from 'next/image'
import Link from 'next/link'
import { routers } from 'var-contants'

const Header = ({ brand }: EntityBrand) => {
  return (
    <div>
      <Link
        href={routers.navbar.navlink[0].path}
        className="flex items-center space-x-3">
        <Image
          className="h-8 w-8 rounded-full"
          alt="icon profile"
          src={brand.avatar}
          width={40}
          height={40}
        />
        <h1 className="text-center text-lg first-letter:text-lg first-letter:uppercase font-medium">
          {brand.title}
        </h1>
      </Link>
    </div>
  )
}

export default Header
