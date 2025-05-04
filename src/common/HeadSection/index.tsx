type TypeHeadSection = {
  title: string
}

const HeadSection = ({ title }: TypeHeadSection) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight pb-4">
        {title}
      </h2>
      <div className="h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
    </div>
  )
}

export default HeadSection
