import Link from 'next/link'
import { IoLogoGithub, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io5'

export const socialIcon = {
  github: (link: string): JSX.Element => {
    return (
      <Link href={link} passHref legacyBehavior>
        <a target="_blank" rel="nofollow">
          <IoLogoGithub className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
        </a>
      </Link>
    )
  },
  youtube: (link: string): JSX.Element => {
    return (
      <Link href={link} passHref legacyBehavior>
        <a target="_blank" rel="nofollow">
          <IoLogoYoutube className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
        </a>
      </Link>
    )
  },
  linkedin: (link: string): JSX.Element => {
    return (
      <Link href={link} passHref legacyBehavior>
        <a target="_blank" rel="nofollow">
          <IoLogoLinkedin className="text-6xl transition-colors ease-in-out text-slate-300/50 hover:text-slate-300" />
        </a>
      </Link>
    )
  },
}
