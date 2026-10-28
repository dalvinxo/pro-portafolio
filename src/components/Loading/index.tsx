'use client'

import Image from 'next/image'

import { useTranslateContext } from 'providers'

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.06] ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:hidden dark:via-white/10" />
  </div>
)

const Loading = () => {
  const { lang } = useTranslateContext()

  return (
    <section className="py-6" role="status" aria-live="polite" aria-busy="true">
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-transparent">
        <div className="h-full w-2/5 animate-progress rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#38bdf8_120deg,#6366f1_240deg,#8b5cf6_360deg)] [animation-duration:1.2s] motion-reduce:animate-none"
            />
            <div className="absolute inset-[3px] overflow-hidden rounded-full bg-slate-50 dark:bg-slate-950">
              <Image
                src="/img/avatar_profile2.webp"
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>

          <p className="mt-6 text-sm font-semibold text-slate-900 dark:text-white">
            {lang === 'es' ? 'Cargando' : 'Loading'}
            <span className="inline-flex w-6 justify-start">
              <span className="animate-pulse">…</span>
            </span>
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {lang === 'es'
              ? 'Preparando el contenido'
              : 'Preparing the content'}
          </p>
        </div>

        <div aria-hidden="true" className="grid w-full gap-4 lg:grid-cols-3">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8 lg:col-span-2">
            <Skeleton className="h-3 w-28" />
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-8/12" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-1.5 w-8" />
              <Skeleton className="h-1.5 w-4" />
              <Skeleton className="h-1.5 w-4" />
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <Skeleton className="h-3 w-20" />
            {[0, 1, 2].map((item) => (
              <div key={item} className="flex items-center gap-4 pt-2">
                <Skeleton className="h-11 w-11 shrink-0 !rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-4/5" />
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
