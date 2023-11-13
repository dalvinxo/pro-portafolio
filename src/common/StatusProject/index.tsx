import { IoConstruct } from 'react-icons/io5'

type TypeStatusProject = {
  state: boolean
  message: string
}

const StatusProject = ({ state, message }: TypeStatusProject) => {
  return (
    <div
      className={
        state
          ? 'text-emerald-600/75 dark:text-emerald-400'
          : 'text-red-500/80 dark:text-red-400'
      }>
      <IoConstruct
        className={`${
          !state && 'animate-pulse shadow-3xl shadow-red-500/60'
        } rounded-full inline-block`}
      />{' '}
      {message}
    </div>
  )
}

export default StatusProject
