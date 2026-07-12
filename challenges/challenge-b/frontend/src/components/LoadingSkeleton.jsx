function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/80 ${className}`} />
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard content">
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70 sm:p-6">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="mt-3 h-8 w-64" />
        <SkeletonBlock className="mt-2 h-4 w-80" />
        <div className="mt-5 flex flex-wrap gap-3">
          <SkeletonBlock className="h-12 w-36" />
          <SkeletonBlock className="h-12 w-40" />
          <SkeletonBlock className="h-12 w-32" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/70">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="mt-4 h-24 w-full" />
        </div>
        <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/70">
          <SkeletonBlock className="h-4 w-36" />
          <SkeletonBlock className="mt-4 h-28 w-full" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70">
            <SkeletonBlock className="h-2 w-16" />
            <SkeletonBlock className="mt-4 h-5 w-24" />
            <SkeletonBlock className="mt-4 h-8 w-32" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/70">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="mt-4 h-[220px] w-full" />
      </div>
    </div>
  )
}

export default LoadingSkeleton
