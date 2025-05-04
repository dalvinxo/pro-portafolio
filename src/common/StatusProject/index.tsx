import { IoConstruct } from 'react-icons/io5'

type TypeStatusProject = {
  state: boolean
  message: string
}

const StatusProject = ({ state, message }: TypeStatusProject) => {
  return (
    <div
      className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
      transition-all duration-300 select-none
      ${
        state
          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
          : 'bg-red-50 text-amber-600  dark:bg-red-500/10 dark:text-amber-400'
      }
    `}>
      <IoConstruct
        className={`
        w-4 h-4
        ${!state && 'animate-pulse'}
        transition-transform group-hover:scale-110
      `}
      />
      <span>{message}</span>
    </div>
  )
}

export default StatusProject
