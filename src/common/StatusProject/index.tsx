type TypeStatusProject = {
  state: boolean
  message: string
}

const StatusProject = ({ state, message }: TypeStatusProject) => {
  return (
    <span
      className={`inline-flex select-none items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        state
          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
          : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
      }`}>
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {!state && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            state ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
      </span>
      {message}
    </span>
  )
}

export default StatusProject
