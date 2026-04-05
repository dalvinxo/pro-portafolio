'use client'

const Loading = () => {
  return (
    <section
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mx-auto grid min-h-[60vh] max-w-4xl place-items-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-100" />
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
              Loading
            </p>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              Preparing content...
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 h-6 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-11/12 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-8/12 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Loading
