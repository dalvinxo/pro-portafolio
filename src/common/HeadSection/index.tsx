type TypeHeadSection = {
  title: string
  eyebrow?: string
  description?: string
  count?: number
  children?: React.ReactNode
}

const HeadSection = ({
  title,
  eyebrow,
  description,
  count,
  children,
}: TypeHeadSection) => {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-3">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h2 className="flex items-baseline gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {title}
          {typeof count === 'number' && (
            <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 font-mono text-sm font-medium text-slate-500 dark:bg-white/10 dark:text-slate-400">
              {String(count).padStart(2, '0')}
            </span>
          )}
        </h2>
        {description && (
          <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </header>
  )
}

export default HeadSection
