import { IoConstruct } from 'react-icons/io5'

type TypeStatusProject = {
  state: string
}

const StatusProject = ({ state }: TypeStatusProject) => {
  return (
    <div
      className={
        state == 'completed' ? 'text-emerald-600/75' : 'text-red-500/80'
      }>
      <IoConstruct
        className={`${
          state != 'completed' && 'animate-pulse shadow-3xl shadow-red-500/60'
        } rounded-full inline-block`}
      />{' '}
      {state}
    </div>
  )
}

export default StatusProject
