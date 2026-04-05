import { IoConstruct } from 'react-icons/io5'

type TypeStatusProject = {
  state: boolean
  message: string
}

const StatusProject = ({ state, message }: TypeStatusProject) => {
  return (
    <span
      className={`inline-flex select-none items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${
        state
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-500/10 dark:text-emerald-300'
          : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-500/10 dark:text-amber-300'
      }`}
    >
      <IoConstruct
        className={`h-4 w-4 ${!state ? 'animate-pulse' : ''}`}
        aria-hidden="true"
      />
      <span>{message}</span>
    </span>
  )
}

export default StatusProject
